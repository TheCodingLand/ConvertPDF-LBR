import React from "react";
//meterial
import Icon from "@material-ui/core/Icon";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
// @material-ui/icons
import ListItem from 'components/ListItem/ListItem.jsx'

//components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Context from 'components/Context/Context.jsx'
import dashboardStyle from "assets/jss/ctg-ai-lab/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  
    
    render() {

        const { classes } = this.props;
return (
<div>
<GridContainer>
  
          <GridItem xs={12} sm={12} md={6} style={{flexGrow: 1,}}>
            <Card style={{  display: 'flex',flexDirection: 'column', flex:1, minHeight:"91%"}}>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon>help</Icon>
                </CardIcon>
                <h2 className={classes.cardTitle}>HOW TO</h2>
                </CardHeader>
                <p> </p>
                <CardBody>
                <ListItem>Cliquez sur la zone grise pour charger un fichier.</ListItem>
                <ListItem>Une fois chargé, le processus de conversion débute.</ListItem>      
                <ListItem>Des liens seront affichés pour télécharger les documents</ListItem>
                <ListItem>Il y a 3 qualités de contraste fournis, ce qui permet de contourner certains problèmes avec des documents trop clairs ou trop sombres</ListItem>
                <ListItem>Les fichiers seront au format CCITT Fax Group 4</ListItem>
                <ListItem>L'algorithme de conversion a été optimisé par des réseaux neuronaux et se base sur le principe décris dans la publication suivante <a href="https://arxiv.org/ftp/arxiv/papers/1201/1201.5227.pdf">pdf</a></ListItem>   
                <ListItem>Outil concu pour fonctionner sur le cloud Google, grâce à Docker et Kubenretes</ListItem>   
                <ListItem>Languages : Python, Javascript / ReactJs</ListItem>   
                <ListItem>Messaging system via un pont redis - websockets</ListItem>   
                <ListItem>Api upload sous NodeJs</ListItem>  
              </CardBody>
              </Card>
              </GridItem>
        
          <GridItem xs={12} sm={12} md={6} >
       
            <Card style={{  display: 'flex',flexDirection: 'column', flex:1, minHeight:"91%"}}>
              <CardHeader color="primary" stats icon>
                <CardIcon color="danger">
                  <Icon>storage</Icon>
                </CardIcon>
                <h2 className={classes.cardTitle}>AVERTISSEMENT :</h2>
                </CardHeader>
                <CardBody>
              
                <ListItem>Ce système est expérimental</ListItem>
                <ListItem>Il a été conçu pour faciliter le traitement d'une erreur commune lors du chargement d'un document pdf sur le site du Luxembourg Business Registers.
                </ListItem>
                <ListItem>Aucune Garantie n'est fournie concernant la qualité, la lisibilité des fichiers etc...
                </ListItem>
                <ListItem>Ceci fonctionne sur le cloud, sur mon budget personnel à titre d'expérience et proof of concept. Je ne peux pas en assurer un suivi ou un support particulier.
                </ListItem>
                <ListItem>Travail réalisé sur mon temps libre, n'ayant donc aucun lien direct avec le LBR.
                </ListItem>
                <ListItem>Un petit package foncitonnant localement sous windows est en préparation.
                </ListItem>               
              </CardBody>         
            </Card>
 
          </GridItem>
          <GridItem xs={12} sm={12} md={6} style={{flexGrow: 1,}}>
            <Card style={{  display: 'flex',flexDirection: 'column', flex:1, minHeight:"91%"}}>
              <CardHeader color="success" stats icon>
                <CardIcon color="primary">
                  <Icon>description</Icon>
                </CardIcon>
                <h2 className={classes.cardTitle}>Licences et code source</h2>
                </CardHeader>
                <p> </p>
                <CardBody>
                <ListItem>Utilise le projet opensource  <a href="https://github.com/ImageMagick/ImageMagick">ImageMagick sous licence Apache 2</a></ListItem>
                <ListItem>Code source sous <a href="https://en.wikipedia.org/wiki/MIT_LicenseMIT">Licence MIT</a>, fichiers de configuration pour la plate-forme Kubernetes</ListItem>   
                <ListItem>Etant un proof en concept rapide, un nettoyage du code source est nécessaire. Je manque de temps pour m'y coller tout de suite.</ListItem>

              </CardBody>
              </Card>
              </GridItem>
            
              <GridItem xs={12} sm={12} md={6} style={{flexGrow: 1,}}>
            <Card style={{  display: 'flex',flexDirection: 'column', flex:1, minHeight:"91%"}}>
              <CardHeader color="success" stats icon>
                <CardIcon color="primary">
                  <Icon>description</Icon>
                </CardIcon>
                <h2 className={classes.cardTitle}>Statistiques d'utilisation</h2>
                </CardHeader>
                <p> </p>
                <CardBody>
                  <Typography> Nombre de documents convertis : (depuis le 17/8/2018) </Typography>
                <Context.Consumer>{ context => 
                    <p> {context.stats ? context.stats : ""}</p>
                    }
                    </Context.Consumer>
              </CardBody>
              </Card>
              </GridItem>
          </GridContainer>


</div>)


    }}

export default withStyles(dashboardStyle)(Dashboard);
