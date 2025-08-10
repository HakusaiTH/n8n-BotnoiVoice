// nodes/BotnoiGensub/BotnoiGensub.node.ts

import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';

export class BotnoiGensub implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Botnoi Gensub',
		name: 'botnoiGensub',
		icon: 'file:botnoi.svg', // optional
		group: ['transform'],
		version: 1,
		description: 'Generate subtitles (gensub) using Botnoi Voice API',
		defaults: {
			name: 'Botnoi Gensub',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				// ใช้ credentials เดิมของคุณ
				name: 'botnoiApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				options: [
					{ name: 'From URL', value: 'fromUrl', description: 'Generate subtitles from an audio URL', action: 'Generate subtitles from an audio URL' },
					{ name: 'From File', value: 'fromFile', description: 'Upload audio file to generate subtitles', action: 'Upload audio file to generate subtitles' },
				],
				default: 'fromUrl',
				noDataExpression: true,
			},

			// ===== From URL fields =====
			{
				displayName: 'Audio URL',
				name: 'audioUrl',
				type: 'string',
				default: '',
				placeholder: 'https://example.com/audio.wav',
				description: 'Direct link to the raw audio file',
				displayOptions: { show: { operation: ['fromUrl'] } },
			},

			// ===== From File fields =====
			{
				displayName: 'Binary Property',
				name: 'binaryPropertyName',
				type: 'string',
				default: 'data',
				description: 'Name of the binary property that holds the audio file from a previous node',
				displayOptions: { show: { operation: ['fromFile'] } },
			},

			// ===== Common options =====
			{
				displayName: 'Max Duration (Seconds)',
				name: 'maxDuration',
				type: 'number',
				typeOptions: { minValue: 1 },
				default: 10,
				description: 'Maximum duration to process',
			},
			{
				displayName: 'Max Silence (Seconds)',
				name: 'maxSilence',
				type: 'number',
				typeOptions: { minValue: 0 },
				default: 0.3,
				description: 'Maximum silence threshold',
			},
			{
				displayName: 'Return SRT',
				name: 'srt',
				type: 'options',
				options: [
					{ name: 'No', value: 'no' },
					{ name: 'Yes', value: 'yes' },
				],
				default: 'no',
				description: 'Set to "yes" to get SRT format in the response',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add option',
				default: {},
				options: [
				   {
					   displayName: 'Timeout (Ms)',
						name: 'timeout',
						type: 'number',
						default: 60000,
						description: 'Custom request timeout in milliseconds',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		// ใช้ BotnoiApi.credentials.ts เดิม — field คือ apiKey
		const { apiKey } = (await this.getCredentials('botnoiApi')) as { apiKey: string };
		const baseUrl = 'https://api-voice.botnoi.ai';

		for (let i = 0; i < items.length; i++) {
			const operation = this.getNodeParameter('operation', i) as 'fromUrl' | 'fromFile';
			const maxDuration = this.getNodeParameter('maxDuration', i) as number;
			const maxSilence = this.getNodeParameter('maxSilence', i) as number;
			const srt = this.getNodeParameter('srt', i) as 'yes' | 'no';
			const additionalFields = this.getNodeParameter('additionalFields', i, {}) as { timeout?: number };
			const timeout = additionalFields.timeout ?? 60000;

			try {
				let response: any;

				if (operation === 'fromUrl') {
					const audioUrl = this.getNodeParameter('audioUrl', i) as string;

					response = await this.helpers.httpRequest.call(this, {
						method: 'POST',
						url: `${baseUrl}/api/genai/gensub_json`,
						headers: {
							accept: 'application/json',
							'Botnoi-Token': apiKey, // header ชื่อใดก็ได้เพราะ case-insensitive แต่ให้ตรงกับระบบคุณ
							'Content-Type': 'application/json',
						},
						body: {
							audio_url: audioUrl,
							max_duration: maxDuration,
							max_silence: maxSilence,
							srt,
						},
						json: true,
						timeout,
					});
				} else {
					// fromFile — expect binary data from previous node
					const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
					const item = items[i];

					if (!item.binary || !item.binary[binaryPropertyName]) {
						throw new NodeOperationError(this.getNode(), `Binary property "${binaryPropertyName}" not found on item`, { itemIndex: i });
					}

					const binaryData = item.binary[binaryPropertyName];
					const buffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);

					// multipart/form-data ต้องส่งผ่าน "formData" (ไม่ใช่ body)
					const formData: Record<string, any> = {
						audio_file: {
							value: buffer,
							options: {
								filename: binaryData.fileName || 'audio.wav',
								contentType: binaryData.mimeType || 'audio/wav',
							},
						},
						max_duration: maxDuration,
						max_silence: maxSilence,
						srt,
					};

				   response = await this.helpers.httpRequest.call(this, {
					   method: 'POST',
					   url: `${baseUrl}/api/genai/gensub_upload`,
					   headers: {
						   accept: 'application/json',
						   'Botnoi-Token': apiKey,
						   // อย่าตั้ง 'Content-Type' เอง ให้ n8n ใส่ boundary ให้
					   },
					   body: formData, // << สำคัญ
					   timeout,
				   });
				}

				returnData.push({ json: response });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: i });
				} else {
					throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
				}
			}
		}

		return [returnData];
	}
}
