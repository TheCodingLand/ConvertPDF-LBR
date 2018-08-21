
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },

    highlight: {
  
    borderRadius: '100%',
    border: 'solid #f33 3px',
    boxShadow: '0 0 10px 2px #300',
    left: '20%',
    position: 'absolute',
    textAlign: 'center',
    top: '50%',
    width: 150,
    color: '#f33',
    content: 'มั๊ย',
    
    fontSize: 70,
    height: 150,
    marginTop: 0,
    marginDown: -1,
    textShadow: '1px 4px 6px #000, 0 0 0 #000, 1px 4px 6px #000',
    padding: 20
    }
})


class Figure extends React.Component {
   
    render() {
        const { classes } = this.props;
        return(<div><figure className={classes.highlight}>มั๊ย</figure></div>)

}
}
export default withStyles(styles)(Figure)
