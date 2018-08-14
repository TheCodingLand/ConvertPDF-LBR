// MIN = Minimum expected value
// MAX = Maximium expected value
import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles } from '@material-ui/core/styles';

// Function to normalise the values (MIN / MAX could be integrated)
const normalise = (value,max) => (value) * 100 / (max)

const styles = theme => ({
  root: {
    width: '100%',
    marginBottom: 16,
    height: "25px",
    color:'purple'
  },

})
// Example component that utilizes the `normalise` function at the point of render.
function Progress(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <br />
      
      <LinearProgress className={classes.root} variant="determinate" value={normalise(props.value, props.max)} />
      <br />
    </React.Fragment>
  )
}


export default withStyles(styles)(Progress);