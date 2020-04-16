const cors = require('cors')

module.exports = cors({
  credentials: true,
  //origin: [process.env.ALLOW_ORIGINS]
 origin:['https://josuevalrob.github.io/S2R2-PROJECT', 'https://josuevalrob.github.io']
})
