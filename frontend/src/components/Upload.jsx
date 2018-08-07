import React, { Component } from 'react'
import DropzoneComponent from 'react-dropzone-component'

import 'react-dropzone-component/styles/filepicker.css'

import { withStyles } from '@material-ui/core/styles'
import FolderList from './folderList'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import LinearProgress from './LinearProgress'
const styles = theme => ({
    root: {
      flexGrow: 1,
    },})

class Upload extends Component {
   
    constructor(props) { 
        super(props)
        this.state = {
            selectpages : false,
            selectedpages : [],
            filestate : {},
            links:[],
            filename : "",
            conversion : "idle"
        }
        // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration
        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,.pdf"
        }

        this.componentConfig = {
            iconFiletypes: ['.jpg', '.pdf'],
            showFiletypeIcon: true,
            postUrl: 'http://uploadpdf.'+this.props.host+'/uploadHandler'
        }

        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
        this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')]
        
        // Simple callbacks work too, of course
        this.added = () => {}
        this.success = file => { console.log('uploaded', file) 
        this.setState({conversion:"started"})
        this.setState({filename:file.name})

        //this.props.socket.send("message", file.name ) 

        this.removedfile(file)   
    }

        this.removedfile = file => { console.log('removing...', file)
        this.selectPagesEnable()
        }

        this.selectPagesEnable = () => this.setState({selectpages:true})
        this.dropzone = null
        this.props.socket.on('event', this.gotMessage)
        this.props.socket.on('message', this.gotMessage)
           
      
    }

    gotMessage = (message) => { 
        console.log(message)
        console.log(JSON.parse(message))
        let o = JSON.parse(message)
        if (o.name === this.state.filename){
            if (o.links) {
                
                //var newString = mystring.replace(/i/g, "a")
                let links = o.links.replace(/'/g, "\"")
                console.log('links :',links)
                o.links = JSON.parse(links)

            }
        
        this.setState( { ...o } )
       
       
        if (this.state.status ==="completed") {
            //this.getOutputFile()
            this.setState({conversion:'idle'})
        }

}
    }
       

    render() {
        const { classes } = this.props
        const config = this.componentConfig
        const djsConfig = this.djsConfig

        
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            drop: this.callbackArray,
            addedfile: this.added,
            success: this.success,
            removedfile: this.removedfile
        }

            return (
              <section>
                {this.state.conversion ==='idle' ?
                <div className="dropzone" > 
                  <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig}></DropzoneComponent>    
                </div>:<CircularProgress />}
                
                <aside>
                <Typography> 
                       {this.state.name ? "Converting :"+this.state.name : ""}                   
                      </Typography>
                
                      <Typography>       
                      {this.state.progress ? this.state.progress+'/'+this.state.pages : ""}                   
                      <LinearProgress value={parseInt(this.state.progress, 10)} max={parseInt(this.state.pages,10)} />
                     </Typography>
                     
                      <Typography> 
                      {this.state.status ? this.state.status : ""}                   
                      </Typography>
                    <Grid className={classes.root} container alignItems="center" justify="center">
                    {this.state.links ? 
                    <Grid item >
                      <FolderList host={this.props.host} name={this.state.name} links={this.state.links} />
                      </Grid> :<div> </div>
                    }
                  </Grid>
                </aside>
              </section>
            )
          }
        }
        
    
        export default withStyles(styles)(Upload)

