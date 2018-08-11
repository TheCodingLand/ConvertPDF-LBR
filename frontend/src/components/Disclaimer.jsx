import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function DisclaimerList(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;
  
  return (
    <div className={classes.root}>
      
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Plus d'infos :</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Card className={classes.card}>
        <CardContent>
          
        
          <Typography className={classes.pos} color="textSecondary">
          
          Ce système a été conçu pour faciliter le traitement d'une erreur commune lors du chargement d'un document pdf sur le site du Luxembourg Business Registers.
          cliquez sur la zone grise ci-dessous pour selectionner un fichier.
          Une fois chargé, des liens seront affichés pour télécharger les documents.
          </Typography>
          <Typography component="p">
            Le code source est libre, et toujours en cours d'amélioration.
            Ce système n'a aucun lien avec direct avec le LBR. 
            <br />
            Algorithme optimisé par réseaux neuronaux.
            <br />
            Powered by Docker and Kubernetes on GKE.

          </Typography>
        </CardContent>
        <CardActions>
         
        </CardActions>
      </Card>
    
        </ExpansionPanelDetails>
      </ExpansionPanel>
      
    </div>
  );
}

DisclaimerList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisclaimerList);