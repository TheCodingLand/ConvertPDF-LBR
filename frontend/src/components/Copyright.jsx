import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
const styles = {
  card: {

    display: 'inline-block',
    overflow: "hidden",
    position: "relative",
    bottom: 0,

    height:130,
    width: '100%',
  },
  media: {
    height:130
   
    
  },
};

function SimpleMediaCard(props) {
  const { classes } = props;
  return (
    <div style={{display:'inline-block', position:'fixed', bottom:0, left:0, width:'100%'}}>
    <Grid container justify="center">
    <Grid item>
      <Card className={classes.card}>
       
       
        <CardContent>
        <Grid container>
        <Grid item sm={6} md={6} xs={6}>
          <Typography>
            Projet hébergé sur github, Licence MIT, Julien Le Bourg.
          </Typography>
          <Button href="https://github.com/TheCodingLand/ConvertPDF-LBR" size="small" color="primary">
          Pdf conversion
          </Button>
         
        </Grid>
        <Grid item sm={6} md={6} xs={6}>
          <CardMedia
          className={classes.media}
          image="https://avatars3.githubusercontent.com/u/2324869?s=460&v=4"
          title="Julien Le Bourg"
        />
        </Grid>
        </Grid>
        </CardContent>
       
      </Card>
      </Grid>
      </Grid>
     
  </div>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);