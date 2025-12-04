import type {
	IDataObject,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { atriomailApiRequest, atriomailApiRequestAllItems } from './GenericFunctions';

import {
	domainOperations,
	domainFields,
	mailboxOperations,
	mailboxFields,
	forwarderOperations,
	forwarderFields,
	catchAllOperations,
	catchAllFields,
} from './descriptions';

export class Atriomail implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Atriomail',
		name: 'atriomail',
		icon: 'file:atriomail.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Manage email domains, mailboxes, forwarders, and catch-all configurations with Atriomail',
		defaults: {
			name: 'Atriomail',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'atriomailApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Catch-All',
						value: 'catchAll',
					},
					{
						name: 'Domain',
						value: 'domain',
					},
					{
						name: 'Forwarder',
						value: 'forwarder',
					},
					{
						name: 'Mailbox',
						value: 'mailbox',
					},
				],
				default: 'domain',
			},
			...domainOperations,
			...domainFields,
			...mailboxOperations,
			...mailboxFields,
			...forwarderOperations,
			...forwarderFields,
			...catchAllOperations,
			...catchAllFields,
		],
	};

	methods = {
		loadOptions: {
			async getDomains(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const domains = await atriomailApiRequestAllItems.call(this, 'GET', '/domains');

				for (const domain of domains) {
					returnData.push({
						name: domain.domain_name as string,
						value: domain.id as number,
					});
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
				let responseData: IDataObject | IDataObject[];

				// ----------------------------------------
				//              domain
				// ----------------------------------------
				if (resource === 'domain') {
					if (operation === 'create') {
						const domainName = this.getNodeParameter('domainName', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							domain_name: domainName,
						};

						if (additionalFields.active !== undefined) {
							body.active = additionalFields.active;
						}
						if (additionalFields.description) {
							body.description = additionalFields.description;
						}

						responseData = await atriomailApiRequest.call(this, 'POST', '/domains', body);
					} else if (operation === 'delete') {
						const domainId = this.getNodeParameter('domainId', i) as string;
						responseData = await atriomailApiRequest.call(this, 'DELETE', `/domains/${domainId}`);
					} else if (operation === 'get') {
						const domainId = this.getNodeParameter('domainId', i) as string;
						responseData = await atriomailApiRequest.call(this, 'GET', `/domains/${domainId}`);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await atriomailApiRequestAllItems.call(this, 'GET', '/domains');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const qs: IDataObject = { per_page: limit };
							const response = await atriomailApiRequest.call(this, 'GET', '/domains', {}, qs);
							responseData = (response as IDataObject).data as IDataObject[];
						}
					} else if (operation === 'update') {
						const domainId = this.getNodeParameter('domainId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body: IDataObject = {};

						if (updateFields.active !== undefined) {
							body.active = updateFields.active;
						}
						if (updateFields.description) {
							body.description = updateFields.description;
						}

						responseData = await atriomailApiRequest.call(this, 'PUT', `/domains/${domainId}`, body);
					}
				}

				// ----------------------------------------
				//              mailbox
				// ----------------------------------------
				if (resource === 'mailbox') {
					if (operation === 'create') {
						const domainId = this.getNodeParameter('domainId', i) as number;
						const localPart = this.getNodeParameter('localPart', i) as string;
						const password = this.getNodeParameter('password', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							domain_id: domainId,
							local_part: localPart,
							password,
						};

						if (additionalFields.name) {
							body.name = additionalFields.name;
						}
						if (additionalFields.quota) {
							body.quota = additionalFields.quota;
						}

						responseData = await atriomailApiRequest.call(this, 'POST', '/mailboxes', body);
					} else if (operation === 'delete') {
						const mailboxId = this.getNodeParameter('mailboxId', i) as string;
						responseData = await atriomailApiRequest.call(this, 'DELETE', `/mailboxes/${mailboxId}`);
					} else if (operation === 'get') {
						const mailboxId = this.getNodeParameter('mailboxId', i) as string;
						responseData = await atriomailApiRequest.call(this, 'GET', `/mailboxes/${mailboxId}`);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await atriomailApiRequestAllItems.call(this, 'GET', '/mailboxes');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const qs: IDataObject = { per_page: limit };
							const response = await atriomailApiRequest.call(this, 'GET', '/mailboxes', {}, qs);
							responseData = (response as IDataObject).data as IDataObject[];
						}
					} else if (operation === 'update') {
						const mailboxId = this.getNodeParameter('mailboxId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body: IDataObject = {};

						if (updateFields.active !== undefined) {
							body.active = updateFields.active;
						}
						if (updateFields.name) {
							body.name = updateFields.name;
						}
						if (updateFields.password) {
							body.password = updateFields.password;
						}
						if (updateFields.quota) {
							body.quota = updateFields.quota;
						}

						responseData = await atriomailApiRequest.call(this, 'PUT', `/mailboxes/${mailboxId}`, body);
					}
				}

				// ----------------------------------------
				//              forwarder
				// ----------------------------------------
				if (resource === 'forwarder') {
					if (operation === 'create') {
						const domainId = this.getNodeParameter('domainId', i) as number;
						const localPart = this.getNodeParameter('localPart', i) as string;
						const gotoArrayString = this.getNodeParameter('gotoArray', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const gotoArray = gotoArrayString.split(',').map((email) => email.trim());

						const body: IDataObject = {
							domain_id: domainId,
							local_part: localPart,
							goto_array: gotoArray,
						};

						if (additionalFields.active !== undefined) {
							body.active = additionalFields.active;
						}
						if (additionalFields.privateComment) {
							body.private_comment = additionalFields.privateComment;
						}

						responseData = await atriomailApiRequest.call(this, 'POST', '/forwarders', body);
					} else if (operation === 'delete') {
						const forwarderId = this.getNodeParameter('forwarderId', i) as string;
						responseData = await atriomailApiRequest.call(this, 'DELETE', `/forwarders/${forwarderId}`);
					} else if (operation === 'get') {
						const forwarderId = this.getNodeParameter('forwarderId', i) as string;
						responseData = await atriomailApiRequest.call(this, 'GET', `/forwarders/${forwarderId}`);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await atriomailApiRequestAllItems.call(this, 'GET', '/forwarders');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const qs: IDataObject = { per_page: limit };
							const response = await atriomailApiRequest.call(this, 'GET', '/forwarders', {}, qs);
							responseData = (response as IDataObject).data as IDataObject[];
						}
					} else if (operation === 'update') {
						const forwarderId = this.getNodeParameter('forwarderId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body: IDataObject = {};

						if (updateFields.active !== undefined) {
							body.active = updateFields.active;
						}
						if (updateFields.gotoArray) {
							const gotoArrayString = updateFields.gotoArray as string;
							body.goto_array = gotoArrayString.split(',').map((email) => email.trim());
						}
						if (updateFields.privateComment) {
							body.private_comment = updateFields.privateComment;
						}

						responseData = await atriomailApiRequest.call(this, 'PUT', `/forwarders/${forwarderId}`, body);
					}
				}

				// ----------------------------------------
				//              catchAll
				// ----------------------------------------
				if (resource === 'catchAll') {
					if (operation === 'create') {
						const domainId = this.getNodeParameter('domainId', i) as number;
						const gotoArrayString = this.getNodeParameter('gotoArray', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const gotoArray = gotoArrayString.split(',').map((email) => email.trim());

						const body: IDataObject = {
							domain_id: domainId,
							goto_array: gotoArray,
						};

						if (additionalFields.active !== undefined) {
							body.active = additionalFields.active;
						}
						if (additionalFields.privateComment) {
							body.private_comment = additionalFields.privateComment;
						}

						responseData = await atriomailApiRequest.call(this, 'POST', '/catch-all', body);
					} else if (operation === 'delete') {
						const catchAllId = this.getNodeParameter('catchAllId', i) as string;
						responseData = await atriomailApiRequest.call(this, 'DELETE', `/catch-all/${catchAllId}`);
					} else if (operation === 'get') {
						const catchAllId = this.getNodeParameter('catchAllId', i) as string;
						responseData = await atriomailApiRequest.call(this, 'GET', `/catch-all/${catchAllId}`);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await atriomailApiRequestAllItems.call(this, 'GET', '/catch-all');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const qs: IDataObject = { per_page: limit };
							const response = await atriomailApiRequest.call(this, 'GET', '/catch-all', {}, qs);
							responseData = (response as IDataObject).data as IDataObject[];
						}
					} else if (operation === 'update') {
						const catchAllId = this.getNodeParameter('catchAllId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body: IDataObject = {};

						if (updateFields.active !== undefined) {
							body.active = updateFields.active;
						}
						if (updateFields.gotoArray) {
							const gotoArrayString = updateFields.gotoArray as string;
							body.goto_array = gotoArrayString.split(',').map((email) => email.trim());
						}
						if (updateFields.privateComment) {
							body.private_comment = updateFields.privateComment;
						}

						responseData = await atriomailApiRequest.call(this, 'PUT', `/catch-all/${catchAllId}`, body);
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData!),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
