const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const bodyParser = require('body-parser')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', req.headers.origin)
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})
app.use(morgan('dev'))

server.listen('3000', () => console.log('App listening on 3000'))

app.get('/', (req, res) => {
	res.send('Hello world!')		
})

require('./modules/auth/authRoutes')(app)
require('./modules/chat/chatRoutes')(app)
require('./modules/wserver/wserver')(io, console)
