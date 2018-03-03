module.exports = function(wserver, console) {
	var mqtt = require('mqtt')

	var mqtt_client = null;

	let MQTT_CLIENTID = 'mqttclient_' + new Date().getTime()
	let MQTT_SERVER = 'mqtt://172.26.9.103:8883'

	function mqttinit() {
		if(mqtt_client == null) {
			mqtt_client = mqtt.connect(MQTT_SERVER, {clientId: MQTT_CLIENTID, protocolId: 'MQIsdp', protocolVersion: 3, connectionTimeout: 1000, debug: true})
			mqtt_client.on('connect', function() {
				mqtt_client.subscribe('chat')
			})
			mqtt_client.on('message', updateLastMsg)

		}
	}
	var msglisteners = []
	function updateLastMsg(topic, msg) {
		msg = msg.toString()
		for(var listener of msglisteners) {
			listener(topic, msg)
		}
	}
	function addListener(listener) {
		var id = msglisteners.length
		msglisteners.push(listener)
		return id;
	}
	wserver.on('connection', function(socket) {
		mqttinit()
		
		var funcid = addListener(sendMsg)

		function sendMsg(topic, message) {
			var msgJSON = JSON.parse(message)
			socket.emit('message', msgJSON)
		}
	})
}
