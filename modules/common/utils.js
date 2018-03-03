exports.verifyApiArgs = function(req, res, next, args) {
	for(var a of args) {
		if(!(a in req)) {
			return this.failReply('MISSING_API_ARGUMENTS', 'key not found : ' + a, res)
		}
	}
	next();
}

exports.failReply = function(err, msg, res) {
	res.status(400).send({status: 'FAILURE', err, data: null, msg})
}

exports.successReply = function(data, msg, res) {
	res.status(200).send({status: 'SUCCESS', data, err: null, msg})
}

exports.generalCallback = function(res) {
	return (err, data, msg) => {
		if(err) {
			this.failReply(err, msg, res)
		} else {
			this.successReply(data, msg, res)
		}
	}
}
