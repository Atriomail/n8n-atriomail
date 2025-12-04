import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AtriomailApi implements ICredentialType {
	name = 'atriomailApi';

	displayName = 'Atriomail API';

	documentationUrl = 'https://system.atriomail.com/api/documentation';

	properties: INodeProperties[] = [
		{
			displayName: 'API URL',
			name: 'apiUrl',
			type: 'string',
			default: 'https://system.atriomail.com',
			placeholder: 'https://system.atriomail.com',
			description: 'The base URL of your Atriomail instance',
			required: true,
		},
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'The API token for authentication. Generate this from your Atriomail dashboard.',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.apiUrl}}',
			url: '/api/v1/domains',
			method: 'GET',
		},
	};
}
