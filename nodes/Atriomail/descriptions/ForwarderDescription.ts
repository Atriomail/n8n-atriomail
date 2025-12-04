import type { INodeProperties } from 'n8n-workflow';

export const forwarderOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['forwarder'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new forwarder',
				action: 'Create a forwarder',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a forwarder',
				action: 'Delete a forwarder',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a forwarder by ID',
				action: 'Get a forwarder',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many forwarders',
				action: 'Get many forwarders',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a forwarder',
				action: 'Update a forwarder',
			},
		],
		default: 'getAll',
	},
];

export const forwarderFields: INodeProperties[] = [
	// ----------------------------------
	//         forwarder:create
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
		description: 'The domain for the forwarder. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: ['forwarder'],
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
		placeholder: 'sales',
		description: 'The local part of the forwarder address (before the @)',
		displayOptions: {
			show: {
				resource: ['forwarder'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Forward To',
		name: 'gotoArray',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'user1@example.com, user2@example.com',
		description: 'Comma-separated list of email addresses to forward to',
		displayOptions: {
			show: {
				resource: ['forwarder'],
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
				resource: ['forwarder'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Active',
				name: 'active',
				type: 'boolean',
				default: true,
				description: 'Whether the forwarder is active',
			},
			{
				displayName: 'Private Comment',
				name: 'privateComment',
				type: 'string',
				default: '',
				description: 'A private comment for the forwarder',
			},
		],
	},

	// ----------------------------------
	//         forwarder:delete
	// ----------------------------------
	{
		displayName: 'Forwarder ID',
		name: 'forwarderId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the forwarder to delete',
		displayOptions: {
			show: {
				resource: ['forwarder'],
				operation: ['delete'],
			},
		},
	},

	// ----------------------------------
	//         forwarder:get
	// ----------------------------------
	{
		displayName: 'Forwarder ID',
		name: 'forwarderId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the forwarder to retrieve',
		displayOptions: {
			show: {
				resource: ['forwarder'],
				operation: ['get'],
			},
		},
	},

	// ----------------------------------
	//         forwarder:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['forwarder'],
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
				resource: ['forwarder'],
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
	//         forwarder:update
	// ----------------------------------
	{
		displayName: 'Forwarder ID',
		name: 'forwarderId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the forwarder to update',
		displayOptions: {
			show: {
				resource: ['forwarder'],
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
				resource: ['forwarder'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Active',
				name: 'active',
				type: 'boolean',
				default: true,
				description: 'Whether the forwarder is active',
			},
			{
				displayName: 'Forward To',
				name: 'gotoArray',
				type: 'string',
				default: '',
				placeholder: 'user1@example.com, user2@example.com',
				description: 'Comma-separated list of email addresses to forward to',
			},
			{
				displayName: 'Private Comment',
				name: 'privateComment',
				type: 'string',
				default: '',
				description: 'A private comment for the forwarder',
			},
		],
	},
];
