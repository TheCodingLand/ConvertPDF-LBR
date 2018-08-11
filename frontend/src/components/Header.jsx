
import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
      backgroundColor:'red',
      opacity:.6
    },
    text: {
        color:'white'
    }
  });
function Header(props) {

    const { classes } = props;
  
    const bull = <span >•</span>;
    return(
        <Paper className={classes.root} elevation={1}>
    <Typography className={classes.text} variant="headline" component="h2">
    Convertisseur PDF
<br />
{//{bull}{bull}{bull} 
}

    EXPERIMENTAL  
    <br />
    
    
  </Typography>
  </Paper>)
}

export default withStyles(styles)(Header)