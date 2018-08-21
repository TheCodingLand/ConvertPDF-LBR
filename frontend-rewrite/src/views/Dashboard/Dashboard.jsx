import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
//components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import Context from 'components/Context/Context'
import UploadFile from "components/FileUpload/Upload"
import dashboardStyle from "assets/jss/ctg-ai-lab/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
    render() {
        const { classes } = this.props;
return (<div>

<GridContainer>
    <GridItem xs={12} sm={12} md={12}>
    
    </GridItem>
      <GridItem xs={12} sm={12} md={12}>
          <Context.Consumer>
          {context => 
          
          context.connected ? <UploadFile context={context} host={context.host} socket={context.socket} /> : ""
          }</Context.Consumer> 
           
         
          </GridItem>

          </GridContainer>





</div>)


    }}

export default withStyles(dashboardStyle)(Dashboard);
