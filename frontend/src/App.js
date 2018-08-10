import React, { Component } from 'react'
import './App.css'
import Upload from './components/Upload'
import AppBar from './components/AppBar'
import io from 'socket.io-client'

import CircularProgress from '@material-ui/core/CircularProgress'
import purple from '@material-ui/core/colors/purple'

class App extends Component {
  constructor() {
    super()
    this.gethost = () => {
      let host = window.location.host
      // console.log(host)
      // if (host === "localhost:3000") {
      //   return "tina.ctg.lu" //dev env
      // }
      // else {
      //   let hostpath = host.split('.')
      //   hostpath.shift()
      //   return hostpath.join('.')
     
      // }
      //return host
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
    return (
      <div className="App">
         
          {this.state.socket.connected ==true ? <div> <AppBar /><Upload host={this.state.host} socket={this.state.socket}/></div> :<CircularProgress style={{ color: purple[500] }} thickness={7} /> }
          
      </div>
    );
  }
}

export default App
