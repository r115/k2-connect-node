require('should')
var TEST_ACCOUNT = null

describe('Initialization', function() {
	this.timeout(5000)

	it('validates options', function() {
		(function() {
			require('..')(TEST_ACCOUNT)
		}).should.throw()
	})
})
