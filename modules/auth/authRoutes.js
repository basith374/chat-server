module.exports = function(app) {
	const auth = require('./auth')
	const utils = require('../common/utils')

	app.post('/authenticate', function(req, res, next) {
		utils.verifyApiArgs(req.body, res, next, ['username', 'password'])
	}, function(req, res) {
		auth.authenticate(req, utils.generalCallback(res))
	})

	app.post('/verify', auth.verifyToken, function(req, res) {
		auth.verify(req, utils.generalCallback(res))
	})

}
