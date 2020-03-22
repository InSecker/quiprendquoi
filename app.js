const router = require('./api/router')
const socket = require('./api/socket')
require('dotenv').config()

router.run(process.env.PORT);
socket.init();

