var mqtt = require('mqtt')

var MQTT_SERVER = 'mqtt://172.26.9.103:8883';
var MQTT_CLIENTID = 'mqttclient_' + new Date().getTime()

var socket = mqtt.connect(MQTT_SERVER, {clientId: MQTT_CLIENTID, protocolId: 'MQIsdp', protocolVersion: 3, connectionTimeout: 1000, debug: true})

exports.sendMsg = function(req, cb) {
	cb(null, null, 'Message sent')
	socket.publish('chat', JSON.stringify({
		from: req.decoded.username,
		msg: req.body.msg
	}))
}
