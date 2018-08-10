import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import jsPDF from 'jspdf/dist'

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
  menu: {
    width: 200,
  },
});

var doc = new jsPDF()

doc.text('Hello world!', 10, 10)



class GeneratePun extends React.Component {
  state = {
    text:''
  };
  generatePdf = () => {
      let lines = this.state.text.split('\n')
      lines.map(line => { doc.text(line)})

      doc.save('pdf.pdf')


  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
    <div>





<TextField
          id="multiline-flexible"
          label="Multiline"
          multiline
          rowsMax="4"
          value={this.state.multiline}
          onChange={this.handleChange('text')}
          className={classes.textField}
          margin="normal"
        />
        <button onclick={() => generatePdf}></button>
</div>

    )
}
}


