import React, { Component } from 'react'
import DropzoneComponent from 'react-dropzone-component';
import axios from 'axios'
import 'react-dropzone-component/styles/filepicker.css'
import TextField from '@material-ui/core/TextField'
import { linkSync } from 'fs';
import { withStyles } from '@material-ui/core/styles';
import FolderList from './folderList';
//import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import LinearProgress from './LinearProgress'
const styles = theme => ({
    root: {
      flexGrow: 1,
    },})

class Upload extends Component {
   
    constructor(props) {
        super(props);
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
            postUrl: 'http://uploadpdf.lbr.lu/uploadHandler'
        }

        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
        this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];
        
        // Simple callbacks work too, of course
        this.added = () => {};
        this.success = file => { console.log('uploaded', file); 
        this.setState({conversion:"started"})
        this.setState({filename:file.name})

        //this.props.socket.send("message", file.name ) 

        this.removedfile(file)   
    }

        this.removedfile = file => { console.log('removing...', file)
        this.selectPagesEnable()
        }

        this.selectPagesEnable = () => this.setState({selectpages:true})
        this.dropzone = null;
        this.props.socket.on('event', this.gotMessage)
        this.props.socket.on('message', this.gotMessage)
           
      
    }

    gotMessage = (message) => { 
        console.log(message)
        console.log(JSON.parse(message))
        let o = JSON.parse(message)
        if (o.name === this.state.filename){
            if (o.links) {
                
                //var newString = mystring.replace(/i/g, "a");
                let links = o.links.replace(/'/g, "\"")
                console.log('links :',links)
                o.links = JSON.parse(links)

            }
        
        this.setState( { filestate: o } )
       
       
        if (this.state.filestate.status ==="completed") {
            //this.getOutputFile()
            this.setState({conversion:'idle'})
        }

}
    }
   
getOutputFile(){
    let links = []
    if  (this.state.filestate.link1){
    let patharray = this.state.filestate.link1.split('/')
    let filename=patharray[patharray.length-1]
    let link = {url:'http://converted.lbr.lu/' + filename, name: filename}
    console.log(link)
    links.push(link)
    }

    if  (this.state.filestate.link2){
    let patharray = this.state.filestate.link2.split('/')
    let filename=patharray[patharray.length-1]
    let link = {url:'http://converted.lbr.lu/' + filename, name:filename}
    links.push(link)
}
    if  (this.state.filestate.link3){
    let patharray = this.state.filestate.link3.split('/')
    let filename=patharray[patharray.length-1]
    let link = {url:'http://converted.lbr.lu/' + filename, name:filename}
    links.push(link)
    this.setState({conversion:'idle'})
    }
    this.setState({links:links})
    console.log(this.state.links)
    
}
    

    render() {
        const { classes } = this.props;
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        
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
                       {this.state.filestate.name ? "Converting :"+this.state.filestate.name : ""}                   
                      </Typography>
                
                      <Typography>       
                      {this.state.filestate.progress ? this.state.filestate.progress+'/'+this.state.filestate.pages : ""}                   
                      <LinearProgress value={parseInt(this.state.filestate.progress, 10)} max={parseInt(this.state.filestate.pages,10)} />
                     </Typography>
                     
                      <Typography> 
                      {this.state.filestate.status ? this.state.filestate.status : ""}                   
                      </Typography>
                    <Grid className={classes.root} container alignItems="center" justify="center">
                    {this.state.filestate.links ? 
                    <Grid item >
                      <FolderList name={this.state.filestate.name} links={this.state.filestate.links} />
                      </Grid> :<div> </div>
                    }
                  </Grid>
                </aside>
              </section>
            );
          }
        }
        
    
        export default withStyles(styles)(Upload)

