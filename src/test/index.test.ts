import { K2, K2Options } from "../k2";

describe('K2 module initialization', () => {
	const testCredentials: K2Options = {
		clientId: "",
		clientSecret: "",
		apiKey: "",
		baseUrl: ""
	}

	it('runs a test', () => {
		expect(() => K2({
			clientId: "",
			clientSecret: "",
			apiKey: "",
			baseUrl: ""
		})).toThrowError
	});
})
