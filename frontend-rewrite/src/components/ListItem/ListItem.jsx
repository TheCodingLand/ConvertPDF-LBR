import React from "react";

import Typography from '@material-ui/core/Typography';
// @material-ui/icons
import ArrowRight from "@material-ui/icons/ArrowRight";

export default class ListItem extends React.Component {
    render() {
        return (<div style={{display:'flex'}}> 
        <ArrowRight style={{padding:"5px"}}/>
        <Typography style={{padding:"5px"}} component="p">
        { this.props.children }
        </Typography></div>
        )
    }
}
