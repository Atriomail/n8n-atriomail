import { AtriomailApi } from './AtriomailApi.credentials';

describe('AtriomailApi Credentials', () => {
	let credentials: AtriomailApi;

	beforeEach(() => {
		credentials = new AtriomailApi();
	});

	describe('Basic Properties', () => {
		it('should have correct name', () => {
			expect(credentials.name).toBe('atriomailApi');
		});

		it('should have correct display name', () => {
			expect(credentials.displayName).toBe('Atriomail API');
		});

		it('should have documentation URL', () => {
			expect(credentials.documentationUrl).toBe('https://system.atriomail.com/api/documentation');
		});
	});

	describe('Properties', () => {
		it('should have apiUrl property', () => {
			const apiUrlProp = credentials.properties.find((prop) => prop.name === 'apiUrl');
			expect(apiUrlProp).toBeDefined();
			expect(apiUrlProp!.type).toBe('string');
			expect(apiUrlProp!.required).toBe(true);
			expect(apiUrlProp!.default).toBe('https://system.atriomail.com');
		});

		it('should have apiToken property', () => {
			const apiTokenProp = credentials.properties.find((prop) => prop.name === 'apiToken');
			expect(apiTokenProp).toBeDefined();
			expect(apiTokenProp!.type).toBe('string');
			expect(apiTokenProp!.required).toBe(true);
			expect(apiTokenProp!.typeOptions?.password).toBe(true);
		});
	});

	describe('Authentication', () => {
		it('should use generic authentication type', () => {
			expect(credentials.authenticate).toBeDefined();
			expect(credentials.authenticate.type).toBe('generic');
		});

		it('should set X-API-Key header', () => {
			expect(credentials.authenticate.properties.headers).toBeDefined();
			expect(credentials.authenticate.properties.headers!['X-API-Key']).toBe(
				'={{$credentials.apiToken}}'
			);
		});
	});

	describe('Test Request', () => {
		it('should have test request configuration', () => {
			expect(credentials.test).toBeDefined();
			expect(credentials.test!.request).toBeDefined();
		});

		it('should test against domains endpoint', () => {
			expect(credentials.test!.request.url).toBe('/api/v1/domains');
			expect(credentials.test!.request.method).toBe('GET');
		});

		it('should use apiUrl as base URL', () => {
			expect(credentials.test!.request.baseURL).toBe('={{$credentials.apiUrl}}');
		});
	});
});
