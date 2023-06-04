const _ = require('lodash')
const validate = require('validate.js')

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
	this.options = _.cloneDeep(options)

	validate.validators.isString = function (value) {
		if (validate.isEmpty(value) || validate.isString(value)) {
			return null
		} else {
			return 'must be a string'
		}
	}

	var constraints = {
		clientId: {
			presence: true,
			isString: true
		},
		clientSecret: {
			presence: true,
			isString: true
		},
		baseUrl: {
			presence: true,
			isString: true
		},
		apiKey: {
			presence: true,
			isString: true
		}
	}

	const error = validate(this.options, constraints)
	if (error) {
		throw error
	}

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
