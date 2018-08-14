import React from "react";
//meterial
import Icon from "@material-ui/core/Icon";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
// @material-ui/icons
import ListItem from 'components/ListItem/ListItem.jsx'

// import ArrowRight from "@material-ui/icons/ArrowRight";
// import Warning from "@material-ui/icons/Warning";
// import DateRange from "@material-ui/icons/DateRange";
// import LocalOffer from "@material-ui/icons/LocalOffer";
// import Update from "@material-ui/icons/Update";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
// import Accessibility from "@material-ui/icons/Accessibility";
// import BugReport from "@material-ui/icons/BugReport";
// import Code from "@material-ui/icons/Code";
// import Cloud from "@material-ui/icons/Cloud";


//components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import LineGraph from "components/Graphs/LineGraph"
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";


import dashboardStyle from "assets/jss/ctg-ai-lab/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
    render() {
        const { classes } = this.props;
return (
<div>
<GridContainer>
  
          <GridItem xs={12} sm={12} md={6} style={{flexGrow: 1,}}>
            
       
      

            
            <Card style={{  display: 'flex',flexDirection: 'column', flex:1, minHeight:"91%"}}>
          
              
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon>help</Icon>
                </CardIcon>
                <h2 className={classes.cardTitle}>HOW TO</h2>
                </CardHeader>
                <p> </p>
                <CardBody>
             
                <ListItem>First <a href="/dataupload">upload</a> some data in json format, or import from <a href="/imports"> SQL Server</a> you can monitor your upload and model conversion in the <a href="/monitoring"> monitoring page</a> </ListItem>
                <ListItem>Split your data by language, select training and testing ratio, or transform your data into a supervised or unsupervised dataset in the <a href="/managedata">data management page</a></ListItem> 
                <ListItem>Then go to <a href="/training">training</a> and select your dataset, and configure training settings</ListItem>
                
                <ListItem>In the <a href="/monitor"> monitor page</a> you should see the training workers activity and training results</ListItem>
                <ListItem>In the <a href="/statistics"> statistics page</a> you can get the evaluation of quality of your trained model</ListItem>
                <ListItem>In the <a href="/prediction"> prediction page</a> you can submit text for your model, and get the API URL and settings</ListItem>
                
                
                <h3 className={classes.cardTitle}>
                  
                </h3>
              </CardBody>
              <CardFooter stats>
                <div className={classes.stats}>
                  
                </div>
              </CardFooter>
     
              </Card>

              </GridItem>
        
          <GridItem xs={12} sm={12} md={6} >
       
            <Card style={{  display: 'flex',flexDirection: 'column', flex:1, minHeight:"91%"}}>
              <CardHeader color="primary" stats icon>
                <CardIcon color="primary">
                  <Icon>storage</Icon>
                </CardIcon>
                <h2 className={classes.cardTitle}>DATA VOLUME STRUCTURE</h2>
                </CardHeader>
                <CardBody>
              
                <ListItem>Logs : /data/logs/</ListItem>
             
                <ListItem>Unsupervised learning Fasttext files /data/datafiles/unsupervised/ </ListItem>
                <ListItem>Supervised learning Fasttext files /data/datafiles/supervised/</ListItem>
           
                <ListItem>Vector fasttext model : /data/models/modelname/version/model.bin </ListItem>
                <ListItem>Quantized vector fasttext model : /data/models/modelname/version/model.ftz </ListItem>
     
                <ListItem>You can import json data files into /data/json/</ListItem>
                <ListItem>SQL Server Connector also dumps json files in /data/json/</ListItem>
                <h3 className={classes.cardTitle}>
                  { //80<small>%</small>
                  }
                </h3>
              </CardBody>
              <CardFooter stats>
             {/*    <div className={classes.stats}>
                  <a href="#advanced" onClick={e => e.preventDefault()}>
                    Advanced stats

                  </a>
                </div> */}
              </CardFooter>
            </Card>
 
          </GridItem>
         
          <GridItem xs={12} sm={12} md={6}>
          <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon>cloud</Icon>
                </CardIcon>
                <h2 className={classes.cardTitle}>ARCHITECTURE</h2>
                </CardHeader>
                <CardBody>
                <ListItem>Reverse proxy at : <a href="http://proxy.tina.ctg.lu">proxy.tina.ctg.lu</a></ListItem>
                
                <ListItem>This console at : <a href="http://console.tina.ctg.lu">console.tina.ctg.lu</a></ListItem>
                
                <ListItem>Portainer container Management at : <a href="http://portainer.tina.ctg.lu">portainer.tina.ctg.lu</a></ListItem>
                
                <ListItem>Web Api : <a href="http://api.tina.ctg.lu">api.tina.ctg.lu</a></ListItem>
                <h3 className={classes.cardTitle}>
                  
                </h3>
              </CardBody>
              <CardFooter stats>
                <div className={classes.stats}>
                  
                </div>
              </CardFooter>
              </Card>
              </GridItem>

          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <h2 className={classes.cardTitle}>RCSL Trained Models Efficiency</h2>
              </CardHeader>
              <LineGraph />
              <CardFooter stats>
               
              </CardFooter>
            </Card>
          </GridItem>


     


          </GridContainer>





</div>)


    }}

export default withStyles(dashboardStyle)(Dashboard);
