'use strict'
// light-weight server
const unirest = require('unirest')
const dispatch = require('./helpers/dispatch')
const tokenValidate = require('./validate/token').tokenValidate

/**
 * Handles oauth2 operations
 * @module TokenService
 * @constructor
 * @param {object} options
 * @param {string} options.clientId
 * @param {string} options.clientSecret
 * @param {string} options.baseUrl
*/
function TokenService(options) {
	this.options = options
	var clientSecret = this.options.clientSecret
	var clientId = this.options.clientId
	var baseUrl = this.options.baseUrl

	/**
	 * Handles requests for getting information on the token
	 * @function infoToken
	 * @memberof TokenService
	 * @param {object} opts
	 * @param {string} opts.accessToken - The access token to be revoked.
	 * @returns {Promise} Promise object having the scope, expires_in, application.uid, created_at
	*/
	this.infoToken = function (opts) {
		return new Promise(function (resolve, reject) {
			let validationError = tokenValidate(opts)

			if (validationError) {
				reject(validationError)
			}

			dispatch.getContent(baseUrl + '/oauth/token/info', opts.accessToken)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
			})
		})
	}
}

module.exports = {
	TokenService
}
