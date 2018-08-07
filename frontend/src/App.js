import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Upload from './components/Upload'
import AppBar from './components/AppBar'
import io from 'socket.io-client';

import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';

class App extends Component {
  constructor() {
    super()
    let SOCKET_URL = "uploadws.lbr.lu"
    let socket = io.connect(SOCKET_URL)
    this.state = {
      socket: socket,
      connected:false
    }
    
    this.state.socket.on('connect', this.setConnected)

      
    this.state.socket.on('disconnect',this.setDisconnected)
    //{ this.setState({connected : false})}).bind(this);


  }
  setConnected = () => { this.setState({connected : true})
    console.log('setting connected') } 
    setDisconnected = () => {  
      this.setState({connected : false})}

  render() {
    return (
      <div className="App">
         
          {this.state.socket.connected ==true ? <div> <AppBar /><Upload socket={this.state.socket}/></div> :<CircularProgress style={{ color: purple[500] }} thickness={7} /> }
          
      </div>
    );
  }
}

export default App;
