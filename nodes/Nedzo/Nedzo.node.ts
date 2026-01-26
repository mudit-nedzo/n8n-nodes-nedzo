import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

import { nedzoApiRequest } from './GenericFunctions';

export class Nedzo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Nedzo',
		name: 'nedzo',
		icon: 'file:nedzo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Nedzo API',
		defaults: {
			name: 'Nedzo',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'nedzoApi',
				required: true,
			},
		],
		properties: [
			// Resource
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Call',
						value: 'call',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
				],
				default: 'call',
			},

			// Call operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['call'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Initiate an outbound call',
						action: 'Initiate an outbound call',
					},
				],
				default: 'create',
			},

			// Contact operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contact'],
					},
				},
				options: [
					{
						name: 'Create or Update',
						value: 'upsert',
						description: 'Create a new contact or update an existing one',
						action: 'Create or update a contact',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a contact',
						action: 'Delete a contact',
					},
				],
				default: 'upsert',
			},

			// ==================
			// Call Parameters
			// ==================

			// Call: Create
			{
				displayName: 'Agent ID',
				name: 'agentId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['call'],
						operation: ['create'],
					},
				},
				default: '',
				placeholder: 'e.g. eecbbbaf-d2c6-4b49-b36f-9d0bb503dd75',
				description: 'UUID of the agent to use for the call',
			},
			{
				displayName: 'Call Type',
				name: 'callType',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['call'],
						operation: ['create'],
					},
				},
				options: [
					{
						name: 'Phone Number',
						value: 'phoneNumber',
						description: 'Call a phone number directly',
					},
					{
						name: 'Contact',
						value: 'contact',
						description: 'Call a contact by ID',
					},
				],
				default: 'phoneNumber',
				description: 'Whether to call a phone number directly or a contact',
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['call'],
						operation: ['create'],
						callType: ['phoneNumber'],
					},
				},
				default: '',
				placeholder: '+14155551234',
				description: 'Phone number to call in E.164 format (e.g., +14155551234)',
			},
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['call'],
						operation: ['create'],
						callType: ['contact'],
					},
				},
				default: '',
				description: 'The ID of the contact to call',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['call'],
						operation: ['create'],
						callType: ['phoneNumber'],
					},
				},
				options: [
					{
						displayName: 'Business Name',
						name: 'businessName',
						type: 'string',
						default: '',
						description: 'Business or company name',
					},
					{
						displayName: 'Custom Fields (JSON)',
						name: 'customFields',
						type: 'json',
						default: '{}',
						description:
							'Custom field values by field name. Field names must match existing custom field definitions.',
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						placeholder: 'name@email.com',
						default: '',
						description: 'Email address',
					},
					{
						displayName: 'First Name',
						name: 'firstName',
						type: 'string',
						default: '',
						description: 'First name',
					},
					{
						displayName: 'Last Name',
						name: 'lastName',
						type: 'string',
						default: '',
						description: 'Last name',
					},
					{
						displayName: 'Variables (JSON)',
						name: 'variables',
						type: 'json',
						default: '{}',
						description:
							'Custom variables to pass to the assistant. These override contact field values.',
					},
				],
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['call'],
						operation: ['create'],
						callType: ['contact'],
					},
				},
				options: [
					{
						displayName: 'Variables (JSON)',
						name: 'variables',
						type: 'json',
						default: '{}',
						description:
							'Custom variables to pass to the assistant. These override contact field values.',
					},
				],
			},

			// ==================
			// Contact Parameters
			// ==================

			// Contact: Upsert (Create or Update)
			{
				displayName: 'Workspace ID',
				name: 'workspaceId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['upsert'],
					},
				},
				default: '',
				description: 'The workspace ID to create/update the contact in',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['upsert'],
					},
				},
				default: '',
				placeholder: '+14155551234',
				description: 'Contact phone number in E.164 format. Primary matching field. Required if Email not provided.',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['upsert'],
					},
				},
				default: '',
				placeholder: 'name@email.com',
				description: 'Contact email address. Fallback matching field. Required if Phone not provided.',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['upsert'],
					},
				},
				options: [
					{
						displayName: 'First Name',
						name: 'firstName',
						type: 'string',
						default: '',
						description: 'Contact first name',
					},
					{
						displayName: 'Last Name',
						name: 'lastName',
						type: 'string',
						default: '',
						description: 'Contact last name',
					},
				],
			},

			// Contact: Delete
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['delete'],
					},
				},
				default: '',
				description: 'The ID of the contact to delete',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: unknown;

				// Call
				if (resource === 'call') {
					if (operation === 'create') {
						const agentId = this.getNodeParameter('agentId', i) as string;
						const callType = this.getNodeParameter('callType', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							agentId,
							type: callType,
						};

						if (callType === 'phoneNumber') {
							const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;
							body.phoneNumber = phoneNumber;

							// Phone number specific fields
							if (additionalFields.firstName) {
								body.firstName = additionalFields.firstName;
							}
							if (additionalFields.lastName) {
								body.lastName = additionalFields.lastName;
							}
							if (additionalFields.email) {
								body.email = additionalFields.email;
							}
							if (additionalFields.businessName) {
								body.businessName = additionalFields.businessName;
							}
							if (additionalFields.customFields) {
								const customFields = additionalFields.customFields;
								body.customFields =
									typeof customFields === 'string' ? JSON.parse(customFields) : customFields;
							}
						} else if (callType === 'contact') {
							const contactId = this.getNodeParameter('contactId', i) as string;
							body.contactId = contactId;
						}

						if (additionalFields.variables) {
							const variables = additionalFields.variables;
							body.variables = typeof variables === 'string' ? JSON.parse(variables) : variables;
						}

						responseData = await nedzoApiRequest.call(this, 'POST', '/v1/call', body);
					}
				}

				// Contact
				if (resource === 'contact') {
					if (operation === 'upsert') {
						const workspaceId = this.getNodeParameter('workspaceId', i) as string;
						const phone = this.getNodeParameter('phone', i) as string;
						const email = this.getNodeParameter('email', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							workspaceId,
						};

						if (phone) {
							body.phone = phone;
						}
						if (email) {
							body.email = email;
						}
						if (additionalFields.firstName) {
							body.firstName = additionalFields.firstName;
						}
						if (additionalFields.lastName) {
							body.lastName = additionalFields.lastName;
						}

						responseData = await nedzoApiRequest.call(this, 'POST', '/v1/contacts/upsert', body);
					}

					if (operation === 'delete') {
						const contactId = this.getNodeParameter('contactId', i) as string;
						responseData = await nedzoApiRequest.call(this, 'DELETE', `/v1/contacts/${contactId}`);
						if (!responseData) {
							responseData = { success: true, deleted: true, contactId };
						}
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as IDataObject | IDataObject[]),
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
