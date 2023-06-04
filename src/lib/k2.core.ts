import { z } from "zod";

export type K2Options = {
	clientId: string;
	clientSecret: string;
	apiKey: string;
	baseUrl: string;
}

/**
 * Core functionality of the Kopokopo k2 api wrapped in a composable class.
 */
class K2Core {
	version: string = "v1";

	options: K2Options;

	constructor(options: K2Options) {
		this.options = options;
	}

	validateInitializationData() {
		const ApiOptionsData = z.object({
			clientId: z.string(),
			clientSecret: z.string(),
			apiKey: z.string(),
			baseUrl: z.string()
		});
	
		const isValidData = ApiOptionsData.parse(this.options);
	
		return isValidData;
	};
}

export function Kopokopo(options: K2Options) {
	return new K2Core(options);
}
