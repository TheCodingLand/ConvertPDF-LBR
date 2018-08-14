import React from 'react';
import Sockette  from 'sockette'

export default class Websocket {

constructor(props) {
    
    this.data = {
    message: "no messages yet",
    text : "",
    wsState : "",
    redisLoad : 0,
    modelsList : [],
    dataSetsList : [],
    listFiles : [],
    hostStats : {}
    };

    this.ws = new Sockette('ws://ws.tina.ctg.lu', {
        timeout: 5e3,
        maxAttempts: 10,
        onopen: e => this.initData(),
        //onmessage: e => console.log('Received :' , e),
        onmessage: e => this.handleData(e),
        onreconnect: e => this.data.wsState = "Reconnecting",
        onmaximum: e => console.log('Stop Attempting!', e),
        onclose: e => this.data.wsState = "Closed",
        onerror: e => this.data.wsState = "Error",
      });
    console.log(this.ws)  
     
            
}
initData() {
    this.data.wsState = "Connected"
    this.getRedisLoad()
    this.getModelsList()
    this.getDataSetsList()
    this.listFiles()
    this.hostStats()
}

getRedisLoad() {
    this.ws.send("getRedisLoad")   
}
getModelsList() {
    this.ws.send("getModelsList")
}
getDataSetsList() {
    this.ws.send("getDataSetsList")
}
listFiles() {
    this.ws.send("listFiles")
}
hostStats() {
    this.ws.send("hostStats")
}


sendData(data) {
    this.ws.send(this.state.text)
    

}

handleData(e) {
    console.log(e)
    console.log(e.data)
    let result = JSON.parse(e.data);
    this.setState( result );
    
    
}

  

}
