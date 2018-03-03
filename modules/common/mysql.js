const mysql = require('mysql')

const pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'basi',
	password: 'qwe123',
	database: 'chatdb'
})

exports.runRequests = function() {
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
