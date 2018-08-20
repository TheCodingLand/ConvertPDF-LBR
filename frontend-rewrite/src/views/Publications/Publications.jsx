import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from 'components/CustomButtons/Button.jsx'
import Context from 'components/Context/Context.jsx'
import { Paper } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    
    textArea: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: '99%'
    },
    
      progress: {
        margin: theme.spacing.unit,
      },
        
    
    textAreaPaper: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: '100%'
    },
    menu: {
      width: 200,
    },
  });
  


class TextFields extends React.Component {
    state = {
      name: '',
      rcs: '',
      fjur: '',
      address: '',
      liquidation: false,
      text:'',
      loading:false
      
    };
    
    submit = (context) => {
      

      let s = Date.now();
      s = s.toString()
      s = s + this.state.name
      let token = btoa(s)
      if (token.length<25){
        token = token.slice(8,19)
        } else{
        token = token.slice(8,24)
      }
        
    console.log(context)
    
    let obj = { ...this.state, token:token}
    console.log(obj)
    context.sendPub('publication', obj)
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    handleChangeChecked = name => event => {
        this.setState({ [name]: event.target.checked });
    };
      render() {
        const { classes } = this.props;
    
        return (
        <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="name"
          label="Nom de la Société"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <TextField
          id="rcs"
          label="Numero RCS"
          className={classes.textField}
          value={this.state.rcs}
          onChange={this.handleChange('rcs')}
          margin="normal"
        />
        <TextField
          id="address"
          label="Siège social"
          className={classes.textField}
          value={this.state.address}
          onChange={this.handleChange('address')}
          margin="normal"
        />
        <TextField
          id="fjur"
          label="Forme Juridique"
          className={classes.textField}
          value={this.state.fjur}
          onChange={this.handleChange('fjur')}
          margin="normal"
        />
      <Paper className={classes.textAreaPaper}>
        <TextField
          id="text"
          label="Texte"
          multiline
          rowsMax=""
          rows={12}
          value={this.state.text}
          onChange={this.handleChange('text')}
          className={classes.textArea}
          margin="normal"
        /></Paper>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.liquidation}
              onChange={this.handleChangeChecked('liquidation')}
              value="liquidation"
            />
          }
          label="En liquidation volontaire ?"
        />
        <Context.Consumer>{context =>
        <div>
               <Button onClick={()=>this.submit(context)}>Génerer PDF</Button>
               {context.loading === true ? <CircularProgress className={classes.progress}/> : "" }
                {context.publink ? <Button onClick={()=> { window.open('http://converted.'+ context.host +'/' + context.publink, "_blank") }}>Voir Resultat</Button> :"" }
              </div>  
              }
                
                </Context.Consumer>
        
        </form>
        
        )
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(TextFields);