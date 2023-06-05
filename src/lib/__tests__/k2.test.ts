import { Kopokopo, K2Options } from "@kopokopo/k2/lib/k2.core";

const testCredentials: K2Options = {
	clientId: "a-client-id",
	clientSecret: "a-client-secret",
	apiKey: "ai-api-key"
}

describe('Kopokopo module initialization', () => {
	it('throws an error if the credentials are not provided', () => {
		const credentials = { ...testCredentials, ...{ clientId: "" } }

		expect(() => Kopokopo(credentials)).toThrowError();
	});

	it('sets the base url according to the environment', () => {
		expect(
			() => Kopokopo(testCredentials, true).baseUrl() === 'https://api.kopokopo.com'
		).toBeTruthy;
	});
})
