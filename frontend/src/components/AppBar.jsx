import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const styles = {
  root: {
    flexGrow: 1,
    
  },
  bar: {
  color:"primary",
  backgroundColor:"red",
  opacity:.8,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
    
  },
}

function DenseAppBar(props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar className={classes.bar} position="static">
        <Toolbar variant="dense">
         { //<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
           // <MenuIcon />
         // </IconButton>
          }
          <Typography variant="title" color="inherit">
            PDF Converter
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

DenseAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DenseAppBar)