import {
	ICredentialType,
	ICredentialTestRequest,
	INodeProperties,
	IAuthenticateGeneric,
} from 'n8n-workflow';

export class BotnoiApi implements ICredentialType {
	name = 'botnoiApi';
	displayName = 'Botnoi API';
	documentationUrl = 'https://www.botnoigroup.com/botnoivoice/doc/api-user-guide';

	// ให้เลือกว่าจะส่งคีย์ด้วย header ไหน
	properties: INodeProperties[] = [
		{
			displayName: 'Header Name',
			name: 'headerName',
			type: 'options',
			options: [
				{ name: 'Botnoi-Token (Legacy)', value: 'Botnoi-Token' },
				{ name: 'Api-Key (AWS/Docs)', value: 'Api-Key' },
			],
			default: 'Botnoi-Token',
			description: 'เลือกชื่อ header สำหรับส่งคีย์ตามบัญชี/เอกสารที่คุณใช้งาน',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			typeOptions: { password: true },
			description: 'Your Botnoi Voice API key',
		},
	];

	// ให้ n8n ฉีด header ให้อัตโนมัติเมื่อใช้ httpRequestWithAuthentication
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				// ใช้ headerName ที่ผู้ใช้เลือก
				'={{$credentials.headerName}}': '={{$credentials.apiKey}}',
				'Content-Type': 'application/json',
			},
		},
	};

	// ใช้ headerName เดียวกับที่เลือกในหน้า cred ตอนทดสอบ
	test: ICredentialTestRequest = {
		request: {
			method: 'POST',
			url: 'https://api-voice.botnoi.ai/openapi/v1/generate_audio',
			headers: {
				'={{$credentials.headerName}}': '={{$credentials.apiKey}}',
				'Content-Type': 'application/json',
			},
			// ตัวอย่าง payload สั้น ๆ และไม่บังคับ save_file เป็นไฟล์
			body: {
				text: 'hello',
				speaker: '1',
				volume: 1,
				speed: 1,
				type_media: 'mp3',
				save_file: false,
				language: 'en',
			},
			// ถ้า API คืน 2xx ถือว่าผ่าน (บางสภาพแวดล้อมอาจคืน 201)
		},
	};
}
