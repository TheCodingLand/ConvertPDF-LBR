import React, { Component } from 'react'
import DropzoneComponent from 'react-dropzone-component'

import 'assets/css/filepicker.css'

import { withStyles } from '@material-ui/core/styles'
import FolderList from 'components/FileUpload/folderList'
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
            conversion : "idle",
            message:"Cliquez sur la zone grise pour charger un fichier",
            visible: 'true'
        }
        // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration
        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,.pdf",
            
            dictDefaultMessage: this.state.message,
            /* previewTemplate: ReactDOMServer.renderToStaticMarkup(
                <div className="dz-preview dz-file-preview">
                  <div className="dz-details">
                    <div className="dz-filename"><span data-dz-name="true"></span></div>
                    <img data-dz-thumbnail="true" />
                  </div>
                  <div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress="true"></span></div>
                  <div className="dz-success-mark"><span>✔</span></div>
                  <div className="dz-error-mark"><span>✘</span></div>
                  <div className="dz-error-message"><span data-dz-errormessage="true"></span></div>
                </div>
              ) */
        }

        this.componentConfig = {
            iconFiletypes: ['.jpg', '.pdf'],
            showFiletypeIcon: true,
            postUrl: 'https://uploadpdf.'+this.props.host+'/uploadHandler'
        }

        
        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
        this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')]
        
        // Simple callbacks work too, of course
        this.success = file => { console.log('uploaded', file) 
        this.setState({conversion:"started",filename:file.name, uploading:false})
        //this.props.socket.send("message", file.name ) 

        this.removedfile(file)   
    }
        this.added = (file) => {this.setState({visible:'None', filesize:file.size, uploading:true})} 
        this.send = (file, xhr, formData) => {
        this.setState({links:[]})
        
        let currentdate = new Date()
        let s = Date.now();
        s = s.toString()
        s = s + file.name

        let token = btoa(s)
        if (token.length<25){
        token = token.slice(8,19)
    }   else{token = token.slice(8,24)}
        this.setState({token:token})
        formData.append('token', token)
        //localStorage.setItem(this.state)
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
                
                
                let links = o.links.replace(/'/g, "\'")
                console.log('links :',links)
                o.links = JSON.parse(links)

            }
        
        this.setState( { ...o } )
       
       
        if (this.state.status ==="completed") {
            //this.getOutputFile()
            this.setState({conversion:'idle',visible:'true', uploading:false})
        
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
            removedfile: this.removedfile,
            sending:this.send 
        }

            return (
              <section>
                  <Typography>Veuillez SVP lire les avertissements dans la partie Documentation</Typography>
                
                 
                {this.state.conversion ==='idle' ?
                <div className="dropzone" style={{display:this.state.visible}}> 
                  <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig}></DropzoneComponent>    
                </div>:"" }
                {this.state.uploading ? <div><Typography>Chargement du fichier en cours</Typography> <CircularProgress /></div>: ""}
                <aside>
                <Typography> 
                       {this.state.name ? "Conversion :"+this.state.name : ""}                   
                       </Typography>

                        <Typography variant="headline" component="h2">
                         
                      {this.state.progress ? "Page : "+ this.state.progress : ""}
                      {this.state.pages ? this.state.pages !=='1' ? '/'+this.state.pages : "" : "" }     
                      </Typography >
                      {this.state.pages?
                      <LinearProgress value={parseInt(this.state.progress, 10)} max={parseInt(this.state.pages,10)} />
                      :""} 
                     
                     
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

