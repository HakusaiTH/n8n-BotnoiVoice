import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class BotnoiApi implements ICredentialType {
	name = 'botnoiApi'; // ชื่อนี้ต้องตรงกับที่ใช้ใน Node
	displayName = 'Botnoi API';
	// เพิ่ม documentationUrl เพื่อให้ ESLint ผ่าน
	documentationUrl = 'https://www.botnoi.ai/openapi'; // แนะนำให้ใช้ URL เอกสาร API จริงของ Botnoi
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			typeOptions: { password: true }, // ซ่อนข้อมูล API Key
			description: 'Your Botnoi.ai API Key',
		},
	];
}
