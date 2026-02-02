import type { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class NedzoApi implements ICredentialType {
	name = 'nedzoApi';

	displayName = 'Nedzo API';

	documentationUrl = 'https://docs.nedzo.ai';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};
}
