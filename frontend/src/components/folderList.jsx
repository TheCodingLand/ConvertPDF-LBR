import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import AttachmentIcon from '@material-ui/icons/Attachment'


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
})

function FolderList(props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <List>
      {props.links.map(link => {
        return <ListItem key={link}>
          <Avatar>
            <AttachmentIcon />
          </Avatar>
          <ListItemText onClick={()=> window.open('http://converted.'+ props.host+'/'+link, "_blank")} button primary={props.name} secondary={link} />
      </ListItem> 
      })}

      </List>
    </div>
  )
}

FolderList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FolderList)