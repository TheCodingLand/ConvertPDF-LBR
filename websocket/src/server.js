
var redis = require('redis');
var io = require('socket.io')(3001);
const redis_host = "redis"
var host = "redis://" + redis_host + ":6379";
var redisclient = redis.createClient(host);
redisclient.select(5);
var redis_sub = redis.createClient(host)
console.log("v0.03")

redis_sub.psubscribe('conversion.*')


let previousConversions = redisclient.get('conversion.*')
console.log(previousConversions)


//SOCKETIO
redis_sub.on("pmessage", function (channel, message) {
  console.log("pdf :" + channel)
  console.log(message)
  let err =""
  let keyvalue = ""
  
  redisclient.hgetall(message, function(err,result) {
    console.log(result)
    io.emit( 'message' , JSON.stringify(result) )
  }) //stored key is the same name as the channel
  
  
})


io.on('connection', function (socket) {
    console.log('connexion started')
    
    //socket.send('message', { test: 'be received by client' });

    socket.on('message', function (from, msg) {
      console.log('I received a private message by ', from);
      })
      
    socket.on('disconnect', function () {
      //io.emit('user disconnected');
     
    });  
  });


  
  

  