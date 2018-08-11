// MIN = Minimum expected value
// MAX = Maximium expected value
import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'

// Function to normalise the values (MIN / MAX could be integrated)
const normalise = (value,max) => (value) * 100 / (max)

// Example component that utilizes the `normalise` function at the point of render.
export default function Progress(props) {
  return (
    <React.Fragment>
      <br />
      
      <LinearProgress variant="determinate" value={normalise(props.value, props.max)} />
      <br />
    </React.Fragment>
  )
}