import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	IRequestOptions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

export async function atriomailApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<IDataObject | IDataObject[]> {
	const credentials = await this.getCredentials('atriomailApi');

	const options: IRequestOptions = {
		method,
		body,
		qs,
		uri: `${credentials.apiUrl}/api/v1${endpoint}`,
		json: true,
	};

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	if (Object.keys(qs).length === 0) {
		delete options.qs;
	}

	try {
		const response = await this.helpers.requestWithAuthentication.call(
			this,
			'atriomailApi',
			options,
		);
		return response as IDataObject | IDataObject[];
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

export async function atriomailApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<IDataObject[]> {
	const returnData: IDataObject[] = [];

	let responseData;
	qs.page = 1;
	qs.per_page = 100;

	do {
		responseData = (await atriomailApiRequest.call(this, method, endpoint, body, qs)) as IDataObject;

		if (responseData.data && Array.isArray(responseData.data)) {
			returnData.push(...(responseData.data as IDataObject[]));
		}

		qs.page = (qs.page as number) + 1;
	} while (
		responseData.meta &&
		(responseData.meta as IDataObject).current_page !== (responseData.meta as IDataObject).last_page
	);

	return returnData;
}
