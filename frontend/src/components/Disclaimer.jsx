import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
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
};

function SimpleCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          
          <Typography variant="headline" component="h2">
            Convertisseur PDF
<br />
            {bull}
            
            {bull}{bull}
            
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
          Ce système a été conçu pour faciliter le traitement d'une erreur commune lors du chargement d'un document pdf sur le site du Luxembourg Business Registers.
          cliquez sur la zone grise ci-dessous pour selectionner un fichier.
          Une fois chargé, des liens seront affichés pour télécharger les documents.
          </Typography>
          <Typography component="p">
            Le code source est libre, et toujours en cours d'amélioration.
            Ce système n'a aucun lien avec direct avec le LBR. 
            <br />
            Algorythme optimisé par réseaux neuronaux, sur google cloud engine.
            
          </Typography>
        </CardContent>
        <CardActions>
          <Button href='https://github.com/TheCodingLand/ConvertPDF-LBR' size="small">En Savoir plus :</Button>
        </CardActions>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);