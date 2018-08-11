import React, { Component, Fragment } from 'react'
import DropzoneComponent from 'react-dropzone-component'
import ReactDOMServer from 'react-dom/server'


import { withStyles } from '@material-ui/core/styles'


import Grid from '@material-ui/core/Grid'
import Upload from './Upload'
import Disclaimer from './Disclaimer'


function Layout(props) {
    const { classes } = props;
   
  
    return (
      <Fragment>
      
      <Grid container justify="center">
      <Grid item sm={8} md={8} xs={12}>
      <Disclaimer />
      </Grid>
      <Grid item sm={8} md={8} xs={12}>
      <Upload host={props.host} socket={props.socket}/>
      </Grid>
      </Grid>
      </Fragment>
    )
}

export default Layout