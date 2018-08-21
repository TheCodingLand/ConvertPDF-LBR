import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import footerStyle from "assets/jss/ctg-ai-lab/components/footerStyle";

function Footer({ ...props }) {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            
            <ListItem className={classes.inlineBlock}>
              <a href="https://www.linkedin.com/in/julien-le-bourg-184a6a9/" className={classes.block}>
              <i class="fab fa-linkedin fa-3x"></i>
                

              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://patreon.com/jlebourg" className={classes.block}>
              <i class="fab fa-patreon fa-3x"></i>
                

              </a>
            </ListItem>
           
            <ListItem className={classes.inlineBlock}>
              <a href="https://github.com/TheCodingLand" className={classes.block}>
              <i class="fab fa-github fa-3x"></i>
                

              </a>
            </ListItem>
            
            
          </List>
          
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a href="https://www.pdfexp.com" className={classes.a}>
              julien Le Bourg
            </a>, PDF Conversion Platform for LBR 
             
          </span>
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
