import type {
	IDataObject,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
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
		description: '',
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
						name: 'Agent',
						value: 'agent',
					},
					{
						name: 'Call',
						value: 'call',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Workspace',
						value: 'workspace',
					},
				],
				default: 'call',
			},

			// Agent operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['agent'],
					},
				},
				options: [
					{
						name: 'Create Agent',
						value: 'create',
						description: 'Create a new agent within a workspace',
						action: 'Create an agent',
					},
					{
						name: 'Delete Agent',
						value: 'delete',
						description: "Delete agent. This action is permanent and can't be undone.",
						action: 'Delete an agent',
					},
					{
						name: 'Find Agent',
						value: 'find',
						description: 'Find and get an agent details',
						action: 'Find an agent',
					},
					{
						name: 'Update Agent',
						value: 'update',
						description: 'Updates an agent within a workspace',
						action: 'Update an agent',
					},
				],
				default: 'create',
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
						name: 'Make Phone Call',
						value: 'create',
						description: 'Creates an outbound phone call using Nedzo voice agent',
						action: 'Make a phone call',
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
						name: 'Create/Update Contact',
						value: 'upsert',
						description: 'Creates or updates a contact in a workspace',
						action: 'Create or update a contact',
					},
					{
						name: 'Delete Contact',
						value: 'delete',
						description: 'Deletes a contact in a workspace',
						action: 'Delete a contact',
					},
					{
						name: 'Find Contact',
						value: 'find',
						description: 'Gets a contact and all its information',
						action: 'Find a contact',
					},
				],
				default: 'upsert',
			},

			// Workspace operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['workspace'],
					},
				},
				options: [
					{
						name: 'Create Workspace',
						value: 'create',
						description: 'Creates a workspace in an account',
						action: 'Create a workspace',
					},
					{
						name: 'Delete Workspace',
						value: 'delete',
						description: "Deletes a workspace. This action is permanent and can't be undone.",
						action: 'Delete a workspace',
					},
				],
				default: 'create',
			},

			// ==================
			// Agent Parameters
			// ==================

			// Agent: Create
			{
				displayName: 'Workspace',
				name: 'workspaceId',
				type: 'options',
				required: true,
				typeOptions: {
					loadOptionsMethod: 'getWorkspaces',
				},
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'The workspace to create the agent in',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Agent name',
			},
			{
				displayName: 'Agent Type',
				name: 'agentType',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['create'],
					},
				},
				options: [
					{
						name: 'Inbound Voice',
						value: 'Inbound Voice',
					},
					{
						name: 'Outbound Voice',
						value: 'Outbound Voice',
					},
					{
						name: 'Chat',
						value: 'Chat',
					},
					{
						name: 'Widget',
						value: 'Widget',
					},
				],
				default: 'Outbound Voice',
				description: 'Type of agent to create',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['create'],
					},
				},
				options: [
					{
						displayName: 'Prompt',
						name: 'prompt',
						type: 'string',
						default: '',
						description: 'System prompt for the agent',
						displayOptions: {
							show: {
								'/agentType': ['Inbound Voice', 'Outbound Voice'],
							},
						},
					},
					{
						displayName: 'Voice ID',
						name: 'voiceId',
						type: 'string',
						default: '',
						description: 'Voice provider ID for text-to-speech',
						displayOptions: {
							show: {
								'/agentType': ['Inbound Voice', 'Outbound Voice'],
							},
						},
					},
					{
						displayName: 'Is Active',
						name: 'isActive',
						type: 'boolean',
						default: true,
						description: 'Whether the agent is active',
						displayOptions: {
							show: {
								'/agentType': ['Inbound Voice', 'Outbound Voice'],
							},
						},
					},
					{
						displayName: 'Background Sound',
						name: 'backgroundSound',
						type: 'boolean',
						default: true,
						description: 'Enable background sound during calls',
						displayOptions: {
							show: {
								'/agentType': ['Inbound Voice', 'Outbound Voice'],
							},
						},
					},
					{
						displayName: 'Opening Line',
						name: 'openingLine',
						type: 'string',
						default: '',
						description: 'First message the agent speaks when a call starts',
						displayOptions: {
							show: {
								'/agentType': ['Inbound Voice', 'Outbound Voice'],
							},
						},
					},
					{
						displayName: 'Language',
						name: 'language',
						type: 'options',
						options: [
							{ name: 'English', value: 'english' },
							{ name: 'Spanish', value: 'spanish' },
							{ name: 'French', value: 'french' },
							{ name: 'German', value: 'german' },
							{ name: 'Portuguese', value: 'portuguese' },
							{ name: 'Dutch', value: 'dutch' },
							{ name: 'Chinese', value: 'chinese' },
							{ name: 'Japanese', value: 'japanese' },
						],
						default: 'english',
						description: 'Agent language',
						displayOptions: {
							show: {
								'/agentType': ['Inbound Voice', 'Outbound Voice'],
							},
						},
					},
					{
						displayName: 'Voicemail',
						name: 'voicemail',
						type: 'boolean',
						default: false,
						description: 'Enable voicemail detection',
						displayOptions: {
							show: {
								'/agentType': ['Outbound Voice'],
							},
						},
					},
					{
						displayName: 'Voicemail Message',
						name: 'voicemailMessage',
						type: 'string',
						default: '',
						description: 'Message to leave when voicemail is detected',
						displayOptions: {
							show: {
								'/agentType': ['Outbound Voice'],
							},
						},
					},
					{
						displayName: 'HIPAA Compliance',
						name: 'hipaaCompliance',
						type: 'boolean',
						default: false,
						description:
							'When this is enabled, no logs, recordings, or transcriptions will be stored (default: false)',
						displayOptions: {
							show: {
								'/agentType': ['Inbound Voice', 'Outbound Voice'],
							},
						},
					},
					{
						displayName: 'Call Duration',
						name: 'callDuration',
						type: 'number',
						default: 30,
						description: 'Maximum call duration in minutes (1-60)',
						displayOptions: {
							show: {
								'/agentType': ['Inbound Voice', 'Outbound Voice'],
							},
						},
					},
					{
						displayName: 'Speed',
						name: 'speed',
						type: 'number',
						default: 1.0,
						description: 'Voice speed multiplier (0.5-1.5)',
						displayOptions: {
							show: {
								'/agentType': ['Inbound Voice', 'Outbound Voice'],
							},
						},
					},
				],
			},

			// Agent: Find, Update, Delete
			{
				displayName: 'Agent ID',
				name: 'agentId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['find', 'update', 'delete'],
					},
				},
				default: '',
				placeholder: 'e.g. eecbbbaf-d2c6-4b49-b36f-9d0bb503dd75',
				description: 'UUID of the agent',
			},

			// Agent: Update - Agent Type selector
			{
				displayName: 'Agent Type',
				name: 'updateAgentType',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['update'],
					},
				},
				options: [
					{
						name: 'Inbound Voice',
						value: 'Inbound Voice',
					},
					{
						name: 'Outbound Voice',
						value: 'Outbound Voice',
					},
					{
						name: 'Chat',
						value: 'Chat',
					},
					{
						name: 'Widget',
						value: 'Widget',
					},
				],
				default: 'Outbound Voice',
				description:
					'Select the type of agent you are updating. This ensures only relevant fields are shown.',
			},

			// Agent: Update
			{
				displayName: 'Update Fields',
				name: 'updateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['update'],
					},
				},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Agent name',
					},
					{
						displayName: 'Prompt',
						name: 'prompt',
						type: 'string',
						default: '',
						description: 'System prompt for the agent',
						displayOptions: {
							show: {
								'/updateAgentType': ['Inbound Voice', 'Outbound Voice'],
							},
						},
					},
					{
						displayName: 'Voice ID',
						name: 'voiceId',
						type: 'string',
						default: '',
						description: 'Voice provider ID for text-to-speech',
						displayOptions: {
							show: {
								'/updateAgentType': ['Inbound Voice', 'Outbound Voice'],
							},
						},
					},
					{
						displayName: 'Is Active',
						name: 'isActive',
						type: 'boolean',
						default: true,
						description: 'Whether the agent is active',
						displayOptions: {
							show: {
								'/updateAgentType': ['Inbound Voice', 'Outbound Voice'],
							},
						},
					},
					{
						displayName: 'Background Sound',
						name: 'backgroundSound',
						type: 'boolean',
						default: true,
						description: 'Enable background sound during calls',
						displayOptions: {
							show: {
								'/updateAgentType': ['Inbound Voice', 'Outbound Voice'],
							},
						},
					},
					{
						displayName: 'Opening Line',
						name: 'openingLine',
						type: 'string',
						default: '',
						description: 'First message the agent speaks when a call starts',
						displayOptions: {
							show: {
								'/updateAgentType': ['Inbound Voice', 'Outbound Voice'],
							},
						},
					},
					{
						displayName: 'Language',
						name: 'language',
						type: 'options',
						options: [
							{ name: 'English', value: 'english' },
							{ name: 'Spanish', value: 'spanish' },
							{ name: 'French', value: 'french' },
							{ name: 'German', value: 'german' },
							{ name: 'Portuguese', value: 'portuguese' },
							{ name: 'Dutch', value: 'dutch' },
							{ name: 'Chinese', value: 'chinese' },
							{ name: 'Japanese', value: 'japanese' },
						],
						default: 'english',
						description: 'Agent language',
						displayOptions: {
							show: {
								'/updateAgentType': ['Inbound Voice', 'Outbound Voice'],
							},
						},
					},
					{
						displayName: 'Voicemail',
						name: 'voicemail',
						type: 'boolean',
						default: false,
						description: 'Enable voicemail detection',
						displayOptions: {
							show: {
								'/updateAgentType': ['Outbound Voice'],
							},
						},
					},
					{
						displayName: 'Voicemail Message',
						name: 'voicemailMessage',
						type: 'string',
						default: '',
						description: 'Message to leave when voicemail is detected',
						displayOptions: {
							show: {
								'/updateAgentType': ['Outbound Voice'],
							},
						},
					},
					{
						displayName: 'HIPAA Compliance',
						name: 'hipaaCompliance',
						type: 'boolean',
						default: false,
						description:
							'When this is enabled, no logs, recordings, or transcriptions will be stored (default: false)',
						displayOptions: {
							show: {
								'/updateAgentType': ['Inbound Voice', 'Outbound Voice'],
							},
						},
					},
					{
						displayName: 'Call Duration',
						name: 'callDuration',
						type: 'number',
						default: 30,
						description: 'Maximum call duration in minutes (1-60)',
						displayOptions: {
							show: {
								'/updateAgentType': ['Inbound Voice', 'Outbound Voice'],
							},
						},
					},
					{
						displayName: 'Speed',
						name: 'speed',
						type: 'number',
						default: 1.0,
						description: 'Voice speed multiplier (0.5-1.5)',
						displayOptions: {
							show: {
								'/updateAgentType': ['Inbound Voice', 'Outbound Voice'],
							},
						},
					},
				],
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

			// Contact: Delete, Find
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['delete', 'find'],
					},
				},
				default: '',
				description: 'The ID of the contact',
			},

			// Contact: Upsert
			{
				displayName: 'Workspace',
				name: 'workspaceId',
				type: 'options',
				required: true,
				typeOptions: {
					loadOptionsMethod: 'getWorkspaces',
				},
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['upsert'],
					},
				},
				default: '',
				description: 'The workspace to create/update the contact in',
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
				placeholder: '+1-555-123-4567',
				description:
					'Contact phone number (primary matching field). Either phone or email must be provided.',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['upsert'],
					},
				},
				default: '',
				description:
					'Contact email address (fallback matching field). Either phone or email must be provided.',
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

			// ==================
			// Workspace Parameters
			// ==================

			// Workspace: Create
			{
				displayName: 'Name',
				name: 'workspaceName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['workspace'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Workspace name',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['workspace'],
						operation: ['create'],
					},
				},
				options: [
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Workspace description',
					},
					{
						displayName: 'Timezone',
						name: 'timezone',
						type: 'string',
						default: 'UTC',
						placeholder: 'America/New_York',
						description: 'Workspace timezone (IANA format)',
					},
					{
						displayName: 'Contact Name',
						name: 'contactName',
						type: 'string',
						default: '',
						description: 'Contact name for workspace',
					},
					{
						displayName: 'Contact Email',
						name: 'contactEmail',
						type: 'string',
						default: '',
						placeholder: 'contact@example.com',
						description: 'Contact email for workspace',
					},
					{
						displayName: 'Contact Phone',
						name: 'contactPhone',
						type: 'string',
						default: '',
						placeholder: '+1234567890',
						description: 'Contact phone for workspace',
					},
					{
						displayName: 'Street Address',
						name: 'streetAddress',
						type: 'string',
						default: '',
						description: 'Street address for workspace',
					},
					{
						displayName: 'State',
						name: 'state',
						type: 'string',
						default: '',
						description: 'State/province for workspace',
					},
					{
						displayName: 'ZIP',
						name: 'zip',
						type: 'string',
						default: '',
						description: 'ZIP/postal code for workspace',
					},
					{
						displayName: 'Country',
						name: 'country',
						type: 'string',
						default: '',
						description: 'Country for workspace',
					},
					{
						displayName: 'Business Registration Number',
						name: 'businessRegistrationNumber',
						type: 'string',
						default: '',
						description: 'Business registration number (EIN, VAT, etc.)',
					},
				],
			},

			// Workspace: Delete
			{
				displayName: 'Workspace ID',
				name: 'workspaceIdToDelete',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['workspace'],
						operation: ['delete'],
					},
				},
				default: '',
				placeholder: 'e.g. 789e4567-e89b-12d3-a456-426614174000',
				description: 'UUID of the workspace to delete',
			},
		],
	};

	methods = {
		loadOptions: {
			async getWorkspaces(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const workspaces = await nedzoApiRequest.call(this, 'GET', '/v1/workspaces');
				if (Array.isArray(workspaces)) {
					for (const workspace of workspaces) {
						returnData.push({
							name: workspace.name,
							value: workspace.id,
						});
					}
				}
				return returnData;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: unknown;

				// Agent
				if (resource === 'agent') {
					if (operation === 'create') {
						const workspaceId = this.getNodeParameter('workspaceId', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const agentType = this.getNodeParameter('agentType', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							workspaceId,
							name,
							agentType,
							...additionalFields,
						};

						responseData = await nedzoApiRequest.call(this, 'POST', '/v1/agents', body);
					}

					if (operation === 'find') {
						const agentId = this.getNodeParameter('agentId', i) as string;
						responseData = await nedzoApiRequest.call(this, 'GET', `/v1/agents/${agentId}`);
					}

					if (operation === 'update') {
						const agentId = this.getNodeParameter('agentId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						responseData = await nedzoApiRequest.call(
							this,
							'PATCH',
							`/v1/agents/${agentId}`,
							updateFields,
						);
					}

					if (operation === 'delete') {
						const agentId = this.getNodeParameter('agentId', i) as string;
						responseData = await nedzoApiRequest.call(this, 'DELETE', `/v1/agents/${agentId}`);
						if (!responseData) {
							responseData = { success: true, deleted: true, agentId };
						}
					}
				}

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
					if (operation === 'find') {
						const contactId = this.getNodeParameter('contactId', i) as string;
						responseData = await nedzoApiRequest.call(this, 'GET', `/v1/contacts/${contactId}`);
					}

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

				// Workspace
				if (resource === 'workspace') {
					if (operation === 'create') {
						const workspaceName = this.getNodeParameter('workspaceName', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							name: workspaceName,
							...additionalFields,
						};

						responseData = await nedzoApiRequest.call(this, 'POST', '/v1/workspaces', body);
					}

					if (operation === 'delete') {
						const workspaceIdToDelete = this.getNodeParameter('workspaceIdToDelete', i) as string;
						responseData = await nedzoApiRequest.call(
							this,
							'DELETE',
							`/v1/workspaces/${workspaceIdToDelete}`,
						);
						if (!responseData) {
							responseData = { success: true, deleted: true, workspaceId: workspaceIdToDelete };
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
