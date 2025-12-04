import type { INodeProperties } from 'n8n-workflow';

export const mailboxOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['mailbox'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new mailbox',
				action: 'Create a mailbox',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a mailbox',
				action: 'Delete a mailbox',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a mailbox by ID',
				action: 'Get a mailbox',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many mailboxes',
				action: 'Get many mailboxes',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a mailbox',
				action: 'Update a mailbox',
			},
		],
		default: 'getAll',
	},
];

export const mailboxFields: INodeProperties[] = [
	// ----------------------------------
	//         mailbox:create
	// ----------------------------------
	{
		displayName: 'Domain Name or ID',
		name: 'domainId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getDomains',
		},
		required: true,
		default: '',
		description: 'The domain for the mailbox. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: ['mailbox'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Local Part',
		name: 'localPart',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'john',
		description: 'The local part of the email address (before the @)',
		displayOptions: {
			show: {
				resource: ['mailbox'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Password',
		name: 'password',
		type: 'string',
		typeOptions: {
			password: true,
		},
		required: true,
		default: '',
		description: 'The password for the mailbox',
		displayOptions: {
			show: {
				resource: ['mailbox'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['mailbox'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The display name for the mailbox',
			},
			{
				displayName: 'Quota (MB)',
				name: 'quota',
				type: 'number',
				default: 1024,
				description: 'The quota for the mailbox in megabytes',
			},
		],
	},

	// ----------------------------------
	//         mailbox:delete
	// ----------------------------------
	{
		displayName: 'Mailbox ID',
		name: 'mailboxId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the mailbox to delete',
		displayOptions: {
			show: {
				resource: ['mailbox'],
				operation: ['delete'],
			},
		},
	},

	// ----------------------------------
	//         mailbox:get
	// ----------------------------------
	{
		displayName: 'Mailbox ID',
		name: 'mailboxId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the mailbox to retrieve',
		displayOptions: {
			show: {
				resource: ['mailbox'],
				operation: ['get'],
			},
		},
	},

	// ----------------------------------
	//         mailbox:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['mailbox'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['mailbox'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         mailbox:update
	// ----------------------------------
	{
		displayName: 'Mailbox ID',
		name: 'mailboxId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the mailbox to update',
		displayOptions: {
			show: {
				resource: ['mailbox'],
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['mailbox'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Active',
				name: 'active',
				type: 'boolean',
				default: true,
				description: 'Whether the mailbox is active',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The display name for the mailbox',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'The new password for the mailbox',
			},
			{
				displayName: 'Quota (MB)',
				name: 'quota',
				type: 'number',
				default: 1024,
				description: 'The quota for the mailbox in megabytes',
			},
		],
	},
];
