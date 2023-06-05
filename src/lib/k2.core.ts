import axios from "axios";
import { validateInitializationData } from "./validators";
import { AuthorizationToken, IntrospectedAuthorizationToken } from "./authorization/types";

export type K2Options = {
	clientId: string;
	clientSecret: string;
	apiKey: string;
}

/**
 * Core functionality of the Kopokopo k2 api wrapped in a composable class.
 */
class K2Core {
	version: string = "v1";

	options: K2Options;

	isProductionApp: boolean;

	constructor(options: K2Options, isProductionApp: boolean) {
		this.options = options;

		this.isProductionApp = isProductionApp;
	}

	/**
	 * Generate base url for all API requests.
	 */
	baseUrl() {
		if (this.isProductionApp) {
			return 'https://api.kopokopo.com';
		}

		return 'https://sandbox.kopokopo.com';
	}

	/**
	 * Authorize the client to make requests to the Kopokopo API.
	 * 
	 * @returns string
	 */
	async authorize(): Promise<AuthorizationToken> {
		const requestBody = {
			client_id: this.options.clientId,
			client_secret: this.options.clientSecret,
			grant_type: 'client_credentials'
		}

		const req = await axios.post(`${this.baseUrl()}/oauth/token`, requestBody);

		return req.data;
	}

	/**
	 * @todo catch API errors.
	 * @todo add a timeout for API requests.
	 * 
	 * @param token 
	 * @returns 
	 */
	async revokeAuthorizationToken(token: string): Promise<object> {
		const requestBody = {
			client_id: this.options.clientId,
			client_secret: this.options.clientSecret,
			token
		}

		const req = await axios.post(`${this.baseUrl()}/oauth/revoke`, requestBody);

		return req.data;
	}

	/**
	 * @todo catch API errors.
	 * @todo add a timeout for API requests.
	 * 
	 * @param token 
	 * @returns 
	 */
	async introspectAuthorizationToken(token: string): Promise<IntrospectedAuthorizationToken> {
		const requestBody = {
			client_id: this.options.clientId,
			client_secret: this.options.clientSecret,
			token
		}

		const req = await axios.post(`${this.baseUrl()}/oauth/introspect`, requestBody);

		return req.data;
	}
}

export function Kopokopo(options: K2Options, isProductionApp:boolean = false) {
	validateInitializationData(options);

	return new K2Core(options, isProductionApp);
}
