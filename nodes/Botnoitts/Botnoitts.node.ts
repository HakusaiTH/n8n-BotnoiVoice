import {
	IExecuteFunctions,
	INodeType,
	INodeTypeDescription,
	INodeExecutionData,
	NodeOperationError,
	NodeConnectionType,
} from 'n8n-workflow';

export class Botnoitts implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Botnoi TTS',
		name: 'botnoitts',
		icon: 'file:botnoi.svg',
		group: ['transform'],
		version: 1,
		description: 'Generates audio from text using Botnoi AI API',
		defaults: {
			name: 'Botnoi TTS',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'botnoiApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				default: '',
				placeholder: 'Enter the text to convert to audio',
				description: 'The text to be converted into audio',
				required: true,
			},
			{
				displayName: 'Speaker',
				name: 'speaker',
				type: 'options',
				options: [
					{
						name: 'Speaker 1',
						value: '1',
					},
					{
						name: 'Speaker 2',
						value: '2',
					},
				],
				default: '1',
				description: 'The speaker voice to use for audio generation',
			},
			{
				displayName: 'Volume',
				name: 'volume',
				type: 'number',
				default: 1,
				description: 'The volume of the generated audio (0 to 2)',
				typeOptions: {
					min: 0,
					max: 2,
					step: 0.1,
				},
			},
			{
				displayName: 'Speed',
				name: 'speed',
				type: 'number',
				default: 1,
				description: 'The speed of the generated audio (0.5 to 2)',
				typeOptions: {
					min: 0,
					max: 2,
					step: 0.1,
				},
			},
			{
				displayName: 'Media Type',
				name: 'typeMedia',
				type: 'options',
				options: [
					{
						name: 'MP3',
						value: 'mp3',
					},
					{
						name: 'WAV',
						value: 'wav',
					},
				],
				default: 'mp3',
				description: 'The format of the output audio file',
			},
			{
				displayName: 'Save File',
				name: 'saveFile',
				type: 'boolean',
				default: true,
				description: 'Whether to save the generated audio file',
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'options',
				options: [
					{
						name: 'Thai',
						value: 'th',
					},
					{
						name: 'English',
						value: 'en',
					},
				],
				default: 'th',
				description: 'The language of the input text',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			const text = this.getNodeParameter('text', itemIndex) as string;
			const speaker = this.getNodeParameter('speaker', itemIndex) as string;
			const volume = this.getNodeParameter('volume', itemIndex) as number;
			const speed = this.getNodeParameter('speed', itemIndex) as number;
			const typeMedia = this.getNodeParameter('typeMedia', itemIndex) as string;
			const saveFile = this.getNodeParameter('saveFile', itemIndex) as boolean;
			const language = this.getNodeParameter('language', itemIndex) as string;

			const credentials = (await this.getCredentials('botnoiApi')) as { apiKey: string };
			const apiKey = credentials.apiKey;

			const options: any = {
				method: 'POST',
				url: 'https://api-voice.botnoi.ai/openapi/v1/generate_audio',
				json: true,
				headers: {
					'Botnoi-Token': apiKey,
					'Content-Type': 'application/json',
				},
				body: {
					text,
					speaker,
					volume,
					speed,
					type_media: typeMedia,
					save_file: saveFile,
					language,
				},
			};

			let responseData;
			try {
				responseData = await this.helpers.httpRequest(options);
			} catch (error) {
				throw new NodeOperationError(this.getNode(), error);
			}

			returnData.push({
				json: {
					response: responseData,
				},
			});
		}

		return this.prepareOutputData(returnData);
	}
}
