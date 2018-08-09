

const express = require('express')
const app = express()
var cors = require('cors');
var redis = require('redis');
const redis_host= process.env.REDIS_HOST

var host = "redis://" + redis_host + ":6379";
var redisclient = redis.createClient(host);
redisclient.select(2);

app.set('port', process.env.PORT || 8080)
app.set('destination', process.env.DESTINATION || '/data')
app.use(express.static('../'))
//app.use(express.static('/data'))
app.redisclient=redisclient
app.use(cors());
// Call the multerImpl and pass in app state to it
require('./src-server/multerImpl')(app)

module.exports = app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
  
})




