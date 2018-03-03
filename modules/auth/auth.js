const jwt = require('jsonwebtoken')
const db = require('../common/mysql')
const config = require('../../config')
const utils = require('../common/utils')

exports.verifyToken = function(req, res, next) {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	console.log(token)
	if(token) {
		jwt.verify(token, config.secret, function(err, decoded) {
			if(err) {
				utils.failReply({}, 'Invalid token', res)
			} else {
				req.decoded = decoded;
				next()
			}
		})
	} else {
		return utils.failReply({}, 'No token', res)
	}
}

exports.verify = function(req, cb) {
	cb(null, {user: req.decoded}, 'Token verified')
}

exports.authenticate = function(req, cb) {
	const {username, password} = req.body;
	db.query('select * from users where username=? and password=?', [username, password], function(err) {
		cb(err, null, 'Error fetching users')
	}, function(data) {
		var found = data.length > 0;
		if(found) {
			var payload = {
				username
			}
			var token = jwt.sign(payload, config.secret)
			cb(null, {token}, 'Login success')
		} else {
			cb({msg: 'Invalid credentials'}, null, 'Login failed')
		}
	})
}
