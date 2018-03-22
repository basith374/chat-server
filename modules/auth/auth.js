const jwt = require('jsonwebtoken')
const db = require('../common/mysql')
const config = require('../../config')
const utils = require('../common/utils')
const bcrypt = require('bcrypt')

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

exports.register = function(req, cb) {
	let {username, password} = req.body;
	db.query('select id from users where username = ?', [username], err => {
		cb(err, null, 'Error fetching users')
	}, results => {
		if(results.length) return cb({}, null, 'Username already exists')
		bcrypt.hash(password, 10, (err, hash) => {
			if(err) return cb(err, null, 'Error hashing password')
			db.query('insert into users(username, password)values(?,?)', [username, hash], err => {
				cb(err, null, 'Error creating user')
			}, result => {
				cb(null, result, 'User created')
			})
		})
	}) 
}

exports.authenticate = function(req, cb) {
	const {username, password} = req.body;
	db.query('select * from users where username=?', [username], err => {
		cb(err, null, 'Error fetching users')
	}, data => {
		var found = data[0];
		if(found) {
			bcrypt.compare(password, found.password, (err, res) => {
				if(err) return cb(err, null, 'Error')
				if(res) {
					var payload = {
						username
					}
					var token = jwt.sign(payload, config.secret)
					cb(null, {token}, 'Login success')
				} else {
					cb({msg: 'Invalid credentials'}, null, 'Login failed')
				}
				
			})
		} else {
			cb({msg: 'Invalid credentials.'}, null, 'Login failed')
		}
	})
}
