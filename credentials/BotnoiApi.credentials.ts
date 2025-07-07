import {
	ICredentialType,
	ICredentialTestRequest,
	INodeProperties,
} from 'n8n-workflow';

export class BotnoiApi implements ICredentialType {
	name = 'botnoiApi';
	displayName = 'Botnoi API';
	documentationUrl = 'https://www.botnoi.ai/openapi';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
			description: 'Your Botnoi.ai API Key',
		},
	];

	// ✅ เพิ่ม test ให้ n8n ตรวจสอบ credential ได้
	// ใช้การส่ง HTTP request ไป endpoint จริง
	// แล้วตรวจสอบว่า key ใช้ได้ไหม
	test: ICredentialTestRequest = {
		request: {
			method: 'POST',
			url: 'https://api-voice.botnoi.ai/openapi/v1/generate_audio',
			headers: {
				'Content-Type': 'application/json',
				'Botnoi-Token': '={{$credentials.apiKey}}',
			},
			body: {
				text: 'hello world',
				speaker: '1',
				volume: 1,
				speed: 1,
				type_media: 'mp3',
				save_file: false,
				language: 'en',
			},
		},
	};
}
