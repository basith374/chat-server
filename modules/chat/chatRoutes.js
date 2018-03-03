module.exports = function(app) {
	var utils = require('../common/utils')
	var chat = require('./chat')
	var auth = require('../auth/auth')

	app.post('/sendmsg', auth.verifyToken, function(req, res) {
		chat.sendMsg(req, utils.generalCallback(res))
	})
}
