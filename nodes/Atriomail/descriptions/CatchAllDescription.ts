import type { INodeProperties } from 'n8n-workflow';

export const catchAllOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['catchAll'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new catch-all configuration',
				action: 'Create a catch all',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a catch-all configuration',
				action: 'Delete a catch all',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a catch-all configuration by ID',
				action: 'Get a catch all',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many catch-all configurations',
				action: 'Get many catch alls',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a catch-all configuration',
				action: 'Update a catch all',
			},
		],
		default: 'getAll',
	},
];

export const catchAllFields: INodeProperties[] = [
	// ----------------------------------
	//         catchAll:create
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
		description: 'The domain for the catch-all. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: {
				resource: ['catchAll'],
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
		description: 'Comma-separated list of email addresses to forward catch-all emails to',
		displayOptions: {
			show: {
				resource: ['catchAll'],
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
				resource: ['catchAll'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Active',
				name: 'active',
				type: 'boolean',
				default: true,
				description: 'Whether the catch-all is active',
			},
			{
				displayName: 'Private Comment',
				name: 'privateComment',
				type: 'string',
				default: '',
				description: 'A private comment for the catch-all',
			},
		],
	},

	// ----------------------------------
	//         catchAll:delete
	// ----------------------------------
	{
		displayName: 'Catch-All ID',
		name: 'catchAllId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the catch-all to delete',
		displayOptions: {
			show: {
				resource: ['catchAll'],
				operation: ['delete'],
			},
		},
	},

	// ----------------------------------
	//         catchAll:get
	// ----------------------------------
	{
		displayName: 'Catch-All ID',
		name: 'catchAllId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the catch-all to retrieve',
		displayOptions: {
			show: {
				resource: ['catchAll'],
				operation: ['get'],
			},
		},
	},

	// ----------------------------------
	//         catchAll:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['catchAll'],
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
				resource: ['catchAll'],
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
	//         catchAll:update
	// ----------------------------------
	{
		displayName: 'Catch-All ID',
		name: 'catchAllId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the catch-all to update',
		displayOptions: {
			show: {
				resource: ['catchAll'],
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
				resource: ['catchAll'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Active',
				name: 'active',
				type: 'boolean',
				default: true,
				description: 'Whether the catch-all is active',
			},
			{
				displayName: 'Forward To',
				name: 'gotoArray',
				type: 'string',
				default: '',
				placeholder: 'user1@example.com, user2@example.com',
				description: 'Comma-separated list of email addresses to forward catch-all emails to',
			},
			{
				displayName: 'Private Comment',
				name: 'privateComment',
				type: 'string',
				default: '',
				description: 'A private comment for the catch-all',
			},
		],
	},
];
