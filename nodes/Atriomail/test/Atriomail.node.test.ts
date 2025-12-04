import { Atriomail } from '../Atriomail.node';

describe('Atriomail Node', () => {
	let node: Atriomail;

	beforeEach(() => {
		node = new Atriomail();
	});

	describe('Node Description', () => {
		it('should have correct basic properties', () => {
			expect(node.description.displayName).toBe('Atriomail');
			expect(node.description.name).toBe('atriomail');
			expect(node.description.group).toContain('transform');
			expect(node.description.version).toBe(1);
		});

		it('should have an icon', () => {
			expect(node.description.icon).toBe('file:atriomail.svg');
		});

		it('should have inputs and outputs', () => {
			expect(node.description.inputs).toContain('main');
			expect(node.description.outputs).toContain('main');
		});

		it('should require atriomailApi credentials', () => {
			const credentials = node.description.credentials;
			expect(credentials).toBeDefined();
			expect(credentials).toHaveLength(1);
			expect(credentials![0].name).toBe('atriomailApi');
			expect(credentials![0].required).toBe(true);
		});

		it('should have a subtitle', () => {
			expect(node.description.subtitle).toBe('={{$parameter["operation"] + ": " + $parameter["resource"]}}');
		});
	});

	describe('Resources', () => {
		it('should have resource property as first property', () => {
			const resourceProp = node.description.properties.find(
				(prop) => prop.name === 'resource'
			);
			expect(resourceProp).toBeDefined();
			expect(resourceProp!.type).toBe('options');
		});

		it('should have all four resources', () => {
			const resourceProp = node.description.properties.find(
				(prop) => prop.name === 'resource'
			);
			const resourceOptions = resourceProp!.options as Array<{ value: string }>;
			const resourceValues = resourceOptions.map((opt) => opt.value);

			expect(resourceValues).toContain('domain');
			expect(resourceValues).toContain('mailbox');
			expect(resourceValues).toContain('forwarder');
			expect(resourceValues).toContain('catchAll');
		});
	});

	describe('Domain Operations', () => {
		it('should have all domain operations', () => {
			const operationProp = node.description.properties.find(
				(prop) =>
					prop.name === 'operation' &&
					prop.displayOptions?.show?.resource?.includes('domain')
			);
			expect(operationProp).toBeDefined();

			const operations = operationProp!.options as Array<{ value: string }>;
			const operationValues = operations.map((opt) => opt.value);

			expect(operationValues).toContain('create');
			expect(operationValues).toContain('delete');
			expect(operationValues).toContain('get');
			expect(operationValues).toContain('getAll');
			expect(operationValues).toContain('update');
		});

		it('should have domainName field for create operation', () => {
			const domainNameProp = node.description.properties.find(
				(prop) =>
					prop.name === 'domainName' &&
					prop.displayOptions?.show?.operation?.includes('create')
			);
			expect(domainNameProp).toBeDefined();
			expect(domainNameProp!.required).toBe(true);
		});

		it('should have domainId field for delete operation', () => {
			const domainIdProp = node.description.properties.find(
				(prop) =>
					prop.name === 'domainId' &&
					prop.displayOptions?.show?.operation?.includes('delete')
			);
			expect(domainIdProp).toBeDefined();
			expect(domainIdProp!.required).toBe(true);
		});

		it('should have returnAll option for getAll operation', () => {
			const returnAllProp = node.description.properties.find(
				(prop) =>
					prop.name === 'returnAll' &&
					prop.displayOptions?.show?.resource?.includes('domain')
			);
			expect(returnAllProp).toBeDefined();
			expect(returnAllProp!.type).toBe('boolean');
		});
	});

	describe('Mailbox Operations', () => {
		it('should have all mailbox operations', () => {
			const operationProp = node.description.properties.find(
				(prop) =>
					prop.name === 'operation' &&
					prop.displayOptions?.show?.resource?.includes('mailbox')
			);
			expect(operationProp).toBeDefined();

			const operations = operationProp!.options as Array<{ value: string }>;
			const operationValues = operations.map((opt) => opt.value);

			expect(operationValues).toContain('create');
			expect(operationValues).toContain('delete');
			expect(operationValues).toContain('get');
			expect(operationValues).toContain('getAll');
			expect(operationValues).toContain('update');
		});

		it('should have required fields for create operation', () => {
			const domainIdProp = node.description.properties.find(
				(prop) =>
					prop.name === 'domainId' &&
					prop.displayOptions?.show?.resource?.includes('mailbox') &&
					prop.displayOptions?.show?.operation?.includes('create')
			);
			expect(domainIdProp).toBeDefined();
			expect(domainIdProp!.required).toBe(true);

			const localPartProp = node.description.properties.find(
				(prop) =>
					prop.name === 'localPart' &&
					prop.displayOptions?.show?.resource?.includes('mailbox')
			);
			expect(localPartProp).toBeDefined();
			expect(localPartProp!.required).toBe(true);

			const passwordProp = node.description.properties.find(
				(prop) =>
					prop.name === 'password' &&
					prop.displayOptions?.show?.resource?.includes('mailbox') &&
					prop.displayOptions?.show?.operation?.includes('create')
			);
			expect(passwordProp).toBeDefined();
			expect(passwordProp!.required).toBe(true);
		});

		it('should have domain dropdown with loadOptionsMethod', () => {
			const domainIdProp = node.description.properties.find(
				(prop) =>
					prop.name === 'domainId' &&
					prop.displayOptions?.show?.resource?.includes('mailbox')
			);
			expect(domainIdProp).toBeDefined();
			expect(domainIdProp!.type).toBe('options');
			expect(domainIdProp!.typeOptions?.loadOptionsMethod).toBe('getDomains');
		});
	});

	describe('Forwarder Operations', () => {
		it('should have all forwarder operations', () => {
			const operationProp = node.description.properties.find(
				(prop) =>
					prop.name === 'operation' &&
					prop.displayOptions?.show?.resource?.includes('forwarder')
			);
			expect(operationProp).toBeDefined();

			const operations = operationProp!.options as Array<{ value: string }>;
			const operationValues = operations.map((opt) => opt.value);

			expect(operationValues).toContain('create');
			expect(operationValues).toContain('delete');
			expect(operationValues).toContain('get');
			expect(operationValues).toContain('getAll');
			expect(operationValues).toContain('update');
		});

		it('should have gotoArray field for create operation', () => {
			const gotoArrayProp = node.description.properties.find(
				(prop) =>
					prop.name === 'gotoArray' &&
					prop.displayOptions?.show?.resource?.includes('forwarder') &&
					prop.displayOptions?.show?.operation?.includes('create')
			);
			expect(gotoArrayProp).toBeDefined();
			expect(gotoArrayProp!.required).toBe(true);
		});
	});

	describe('CatchAll Operations', () => {
		it('should have all catchAll operations', () => {
			const operationProp = node.description.properties.find(
				(prop) =>
					prop.name === 'operation' &&
					prop.displayOptions?.show?.resource?.includes('catchAll')
			);
			expect(operationProp).toBeDefined();

			const operations = operationProp!.options as Array<{ value: string }>;
			const operationValues = operations.map((opt) => opt.value);

			expect(operationValues).toContain('create');
			expect(operationValues).toContain('delete');
			expect(operationValues).toContain('get');
			expect(operationValues).toContain('getAll');
			expect(operationValues).toContain('update');
		});

		it('should have catchAllId field for delete operation', () => {
			const catchAllIdProp = node.description.properties.find(
				(prop) =>
					prop.name === 'catchAllId' &&
					prop.displayOptions?.show?.operation?.includes('delete')
			);
			expect(catchAllIdProp).toBeDefined();
			expect(catchAllIdProp!.required).toBe(true);
		});
	});

	describe('Load Options Methods', () => {
		it('should have getDomains load option method', () => {
			expect(node.methods).toBeDefined();
			expect(node.methods.loadOptions).toBeDefined();
			expect(node.methods.loadOptions.getDomains).toBeDefined();
			expect(typeof node.methods.loadOptions.getDomains).toBe('function');
		});
	});

	describe('Execute Method', () => {
		it('should have execute method', () => {
			expect(node.execute).toBeDefined();
			expect(typeof node.execute).toBe('function');
		});
	});
});
