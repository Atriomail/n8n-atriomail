import type { INodeProperties } from 'n8n-workflow';

export const domainOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['domain'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new domain',
				action: 'Create a domain',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a domain',
				action: 'Delete a domain',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a domain by ID',
				action: 'Get a domain',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many domains',
				action: 'Get many domains',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a domain',
				action: 'Update a domain',
			},
		],
		default: 'getAll',
	},
];

export const domainFields: INodeProperties[] = [
	// ----------------------------------
	//         domain:create
	// ----------------------------------
	{
		displayName: 'Domain Name',
		name: 'domainName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'example.com',
		description: 'The domain name to create',
		displayOptions: {
			show: {
				resource: ['domain'],
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
				resource: ['domain'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Active',
				name: 'active',
				type: 'boolean',
				default: true,
				description: 'Whether the domain is active',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'A description for the domain',
			},
		],
	},

	// ----------------------------------
	//         domain:delete
	// ----------------------------------
	{
		displayName: 'Domain ID',
		name: 'domainId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the domain to delete',
		displayOptions: {
			show: {
				resource: ['domain'],
				operation: ['delete'],
			},
		},
	},

	// ----------------------------------
	//         domain:get
	// ----------------------------------
	{
		displayName: 'Domain ID',
		name: 'domainId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the domain to retrieve',
		displayOptions: {
			show: {
				resource: ['domain'],
				operation: ['get'],
			},
		},
	},

	// ----------------------------------
	//         domain:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['domain'],
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
				resource: ['domain'],
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
	//         domain:update
	// ----------------------------------
	{
		displayName: 'Domain ID',
		name: 'domainId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the domain to update',
		displayOptions: {
			show: {
				resource: ['domain'],
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
				resource: ['domain'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Active',
				name: 'active',
				type: 'boolean',
				default: true,
				description: 'Whether the domain is active',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'A description for the domain',
			},
		],
	},
];
