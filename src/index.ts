import { cloneDeep } from "lodash";
import { z } from "zod";

const Webhooks = require('./webhooks').Webhooks
const StkService = require('./stk').StkService
const TokenService = require('./tokens').TokenService
const PayService = require('./pay').PayService
const TransferService = require('./transfer').TransferService
const PollingService = require('./polling').PollingService
const SmsNotificationService = require('./sms_notification').SmsNotificationService

type K2Options = {
	clientId: string;
	clientSecret: string;
	apiKey: string;
	baseUrl: string;
}

export function K2(options: K2Options) {
	const ApiOptionsData = z.object({
		clientId: z.string(),
		clientSecret: z.string(),
		apiKey: z.string(),
		baseUrl: z.string()
	});

	const validateOptionsData = (options: unknown) => {
		const isValidData = ApiOptionsData.parse(options);
		return isValidData;
	};

	var version = "v1"
	var versionedOptions = _.cloneDeep(options)
	versionedOptions.baseUrl = options.baseUrl + "/api/" + version

	this.Webhooks = new Webhooks(versionedOptions)
	this.TokenService = new TokenService(this.options)
	this.StkService = new StkService(versionedOptions)
	this.PayService = new PayService(versionedOptions)
	this.TransferService = new TransferService(versionedOptions)
	this.PollingService = new PollingService(versionedOptions)
	this.SmsNotificationService = new SmsNotificationService(versionedOptions)
}
