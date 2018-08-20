
var redis = require('redis');
var io = require('socket.io')(3001);

var redis = require('redis');
const redis_host= process.env.REDIS_HOST

var host = "redis://" + redis_host + ":6379";
var redisclient = redis.createClient(host);
redisclient.select(5);






console.log("v0.05")



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

    socket.on('getstats', function (msg,from) {
      console.log("recieved getstats")
      
        redisclient.keys('*', (err,keys) => {
        console.log('answering to ', from)
        socket.emit('getstats',JSON.stringify({data:keys.length}))
        
      
        })
      })
    

      socket.on('filestatus', function (filename, from) {
        console.log("recieved filestatus")
        
          
        console.log('answering to ', filename)
        console.log(filename)
        let redis_sub = redis.createClient(host)
        redis_sub.psubscribe(`conversion.${filename}`)
        redis_sub.on("pmessage", function(channel, message) { 
          redisclient.hgetall(message, function(err,result) {
          console.log(result)
          socket.emit( 'message' , JSON.stringify(result) )
        }) //stored key is the same name as the channel
        })
        })


      
        socket.on('publication', function (msg, from) {
          console.log("recieved publication")
          let o = JSON.parse(msg)
          let redis_sub = redis.createClient(host)
          redis_sub.psubscribe(`publication.${o.token}`)
          redis_sub.on("pmessage", function(channel, message) { 
            redisclient.hgetall(message, function(err,result) {
            console.log(result)
            socket.emit( 'pub' , JSON.stringify(result) )
          }) //stored key is the same name as the channel
          })
          let redisout = redis.createClient(host);
          redisout.select(2);
          redisout.hmset('publication.'+o.token, o)
          })
      
    socket.on('disconnect', function () {
      //io.emit('user disconnected');
     
    });  
  });


  
  

  