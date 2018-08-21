import React from "react";


import Context from "./Context";
import io from 'socket.io-client'
export default class AppProvider extends React.Component {

constructor() {
  super();
    this.gethost = () => {
      let host = window.location.host
      if (host!== 'convert.tina.ctg.lu') {
      return 'pdfexp.com'
    }
      else
      {
        return 'tina.ctg.lu'
      }
      
    }
    let SOCKET_URL = `https://uploadws.${this.gethost()}`
    if (this.gethost()==='tina.ctg.lu'){
      SOCKET_URL = `http://uploadws.${this.gethost()}`
    }
    if (this.gethost() ==='localhost') {SOCKET_URL = `http://uploadws.${this.gethost()}`}
    let socket = io.connect(SOCKET_URL)
    
    this.state = {
      socket: socket,
      loading:false,
      connected:false,
      host:this.gethost(),
      stats: 0,
      sendPub: this.sendPub,
      publink : '',
      filename: '',
      setFileName : this.setFileName,
      links : [],
      setLinks: this.setLinks,
      stateChange : this.stateChange,
      conversion: 'idle'
    }

    this.state.socket.on('pub', this.gotPub)
    this.state.socket.on('connect', this.setConnected)  
    this.state.socket.on('disconnect',this.setDisconnected)  
    this.state.socket.on('getstats', this.gotStats)
    
  }
  stateChange = (obj) => this.setState(obj)
  setLinks = (links) => this.setState({links:links})
  setFileName = (filename) => this.setState({filename:filename})
  gotPub = (message) => {
    console.log(message)
    let o = JSON.parse(message)
    console.log(o)

    let links = o.links.replace(/\['/g, '["')
               
    links = links.replace(/\'\]/g, '"]')
    links = links.replace(/', '/g, '", "')
                
    o.links = JSON.parse(links)


    if (o.links.length > 0) {
      
      this.setState({publink:o.links[0], loading:false})
    }

  } 
 
           
      

gotStats = (message) => {
    
    console.log(message)
    let o = JSON.parse(message)
    if (o.data){

    console.log(o.data)
    this.setState( { stats:o.data } )
    }
  }

  sendPub = (channel,obj) => {
    this.setState({publink:false, loading:true})
    console.log('sending data' , channel, obj)
    this.state.socket.emit(channel, JSON.stringify(obj))

  }

  setConnected = () => { this.setState({connected : true})
    console.log('setting connected') 
    this.state.socket.emit('getstats') 
  } 
    

    setDisconnected = () => {  
      this.setState({connected : false})}
      

    
  
  
  
  render() {
      return (<Context.Provider value={this.state}>
      {this.props.children}
      </Context.Provider>)
    }
  }