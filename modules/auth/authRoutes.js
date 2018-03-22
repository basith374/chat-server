module.exports = function(app) {
	const auth = require('./auth')
	const utils = require('../common/utils')

	app.post('/register', (req, res, next) => {
		utils.verifyApiArgs(req.body, res, next, ['username', 'password'])
	}, (req, res) => {
		auth.register(req, utils.generalCallback(res))
	})

	app.post('/authenticate', (req, res, next) => {
		utils.verifyApiArgs(req.body, res, next, ['username', 'password'])
	}, (req, res) => {
		auth.authenticate(req, utils.generalCallback(res))
	})

	app.post('/verify', auth.verifyToken, (req, res) => {
		auth.verify(req, utils.generalCallback(res))
	})

}
