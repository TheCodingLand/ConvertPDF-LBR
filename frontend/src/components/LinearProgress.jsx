// MIN = Minimum expected value
// MAX = Maximium expected value
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

// Function to normalise the values (MIN / MAX could be integrated)
const normalise = (value,max) => (value) * 100 / (max)

// Example component that utilizes the `normalise` function at the point of render.
export default function Progress(props) {
  return (
    <React.Fragment>
      
      <LinearProgress variant="determinate" value={normalise(props.value, props.max)} />
    </React.Fragment>
  )
}