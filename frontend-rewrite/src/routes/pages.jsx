
import LoginPage from "views/Pages/LoginPage.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";

// @material-ui/icons
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";



const pagesRoutes = [
 
  {
    path: "/pages/login-page",
    sidebarName: "Login Page",
    navbarName: "Login",
    mini: "LP",
    icon: Fingerprint,
    component: LoginPage
  },
  
  {
    redirect: true,
    path: "/pages",
    pathTo: "/pages/register-page",
    name: "Register Page"
  }
];

export default pagesRoutes;
