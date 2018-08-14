import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch,Redirect } from "react-router-dom";
import Provider from 'components/Context/Provider'
import "assets/css/ctg-ai-lab.css?v=1.4.0";
import Context from 'components/Context/Context'
import indexRoutes from "routes/index.jsx";

const hist = createBrowserHistory();



const PrivateRoute = ({ component: Component, ...rest }) => (
  <Context.Consumer>
  {context => 
  <Route {...rest} render={(props) => (
    //context.authenticated === true
      //? 
      <Component {...props} />
    //  : 
      //<Redirect to='/pages/login-page' />
  )} />
}
</Context.Consumer>
)


ReactDOM.render(
  
  <Provider>
  
  <Router history={hist}>
    <Switch>
    
      {indexRoutes.map((prop, key) => {
        if (prop.path==='/pages'){
          console.log("found route login-page")
          return <Route path={prop.path} component={prop.component} key={key} />;
          
      } else { 
        
        return <PrivateRoute path={prop.path} component={prop.component} key={key} />
        }
      }
      
      )
      }
       
    </Switch>

  </Router>
  
  </Provider>,
  document.getElementById("root")
);
