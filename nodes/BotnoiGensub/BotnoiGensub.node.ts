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
		icon: 'file:botnoi.svg',
		group: ['transform'],
		version: 1,
		description: 'Generate subtitles (gensub) using Botnoi Voice API (URL only)',
		defaults: { name: 'Botnoi Gensub' },
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [{ name: 'botnoiApi', required: true }],
		properties: [
			// มีแค่ From URL — ไม่ต้องมีตัวเลือก operation แล้ว
			{
				displayName: 'Audio URL',
				name: 'audioUrl',
				type: 'string',
				default: '',
				placeholder: 'https://example.com/audio.wav',
				description: 'Direct link to the raw audio file',
				required: true,
			},
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
		const baseUrl = 'https://api-voice.botnoi.ai';

		for (let i = 0; i < items.length; i++) {
			const audioUrl = this.getNodeParameter('audioUrl', i) as string;
			const maxDuration = this.getNodeParameter('maxDuration', i) as number;
			const maxSilence = this.getNodeParameter('maxSilence', i) as number;
			const srt = this.getNodeParameter('srt', i) as 'yes' | 'no';
			const additionalFields = this.getNodeParameter('additionalFields', i, {}) as { timeout?: number };
			const timeout = additionalFields.timeout ?? 60000;

			try {
				const response = await this.helpers.httpRequestWithAuthentication.call(this, 'botnoiApi', {
					method: 'POST',
					url: `${baseUrl}/api/genai/gensub_json`,
					headers: {
						accept: 'application/json',
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

				returnData.push({ json: response, pairedItem: { item: i } });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
