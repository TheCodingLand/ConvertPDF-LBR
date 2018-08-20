
var redis = require('redis');
var io = require('socket.io')(3001);

var redis = require('redis');
const redis_host= process.env.REDIS_HOST

var host = "redis://" + redis_host + ":6379";
var redisclient = redis.createClient(host);
redisclient.select(5);

var redis_sub = redis.createClient(host)
console.log("v0.03")



/* 
redis_sub.psubscribe('conversion.*')



redis_sub.on("pmessage", function (channel, message) {
  console.log("pdf :" + channel)
  console.log(message)
  let err =""
  let keyvalue = ""
  
  redisclient.hgetall(message, function(err,result) {
    console.log(result)
    io.emit( 'message' , JSON.stringify(result) )
  }) 
}) */



io.on('connection', function (socket) {
    console.log('connexion started')
    
    //socket.send('message', { test: 'be received by client' });

    socket.on('getstats', function (from, msg) {
      console.log("recieved getstats")
      
        redisclient.keys('*', (err,keys) => {
        console.log('answering to ', from)
        socket.emit('getstats',JSON.stringify({data:keys.length}))
        
      
        })
      })
    

      socket.on('filestatus', function (from, msg) {
        console.log("recieved filestatus")
        
          
          console.log('answering to ', from)
          console.log(msg)
          let redis_sub = redis.createClient(host)
          redis_sub.psubscribe(`conversion.${msg}`)
          redis_sub.on("pmessage", function() {  redisclient.hgetall(message, function(err,result) {
            console.log(result)
            socket.emit( 'message' , JSON.stringify(result) )
          }) //stored key is the same name as the channel
          
          
        })
          
        
          
        })
      
    socket.on('disconnect', function () {
      //io.emit('user disconnected');
     
    });  
  });


  
  

  