import { Kopokopo, K2Options } from "@kopokopo/k2/lib/k2.core";

describe('Kopokopo module initialization', () => {
	const testCredentials: K2Options = {
		clientId: "pp",
		clientSecret: "",
		apiKey: "",
		baseUrl: ""
	}

	it('runs a test', () => {
		expect(() => Kopokopo(testCredentials)).toThrowError
	});
})
