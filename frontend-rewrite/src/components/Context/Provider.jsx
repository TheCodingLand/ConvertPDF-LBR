import React from "react";



import Context from "./Context";
import io from 'socket.io-client'
export default class AppProvider extends React.Component {

constructor() {
  super();
    this.gethost = () => {
      let host = window.location.host
   //will do this later
      return 'pdfexp.com'
      
    }
    

    let SOCKET_URL = `https://uploadws.${this.gethost()}`
    
    let socket = io.connect(SOCKET_URL)
    this.state = {
      socket: socket,
      connected:false,
      host:this.gethost()
    }
  
    this.state.socket.on('connect', this.setConnected)  
    this.state.socket.on('disconnect',this.setDisconnected)  

  }
  setConnected = () => { this.setState({connected : true})
    console.log('setting connected') } 
  
    setDisconnected = () => {  
      this.setState({connected : false})}
    

  
  
  render() {
      return (<Context.Provider value={this.state}>
      {this.props.children}
      </Context.Provider>)
    }
  }