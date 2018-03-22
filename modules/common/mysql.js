const mysql = require('mysql')
const Q = require('q')

const pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'basi',
	password: 'qwe123',
	database: 'chatdb'
})

exports.runParallel = (cb, queries) => {
}

exports.runTransaction = function(cb, queries) {
	pool.getConnection((err, conn) => {
		conn.beginTransaction(err => {
			if(err) cb(err, null, 'Begin transaction failed')
			let errs = {}
			let results = {}

		})
	})
}

exports.query = function(query, args, fcb, scb) {
	pool.getConnection(function(err, conn) {
		if(err) {
			return fcb(err)
		}
		conn.query(query, args, function(err, results) {
			if(err) {
				fcb(err)
			} else {
				scb(results)
			}
		})
	})
}
