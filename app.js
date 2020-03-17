const router = require('./api/router')
require('dotenv').config()

router.run(process.env.PORT);
