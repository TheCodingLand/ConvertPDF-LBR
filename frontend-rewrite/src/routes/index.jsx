import Dashboard from "layouts/Dashboard.jsx";
import Pages from "layouts/Pages.jsx";

let authenticated = false
let redirectpage = '/pages/login-page'
if (authenticated) {
  redirectpage = '/dashboard'
}





const indexRoutes = [
    {  path: "/pages", name: "Pages", component: Pages },
    {  path: "/", name:"Home",component: Dashboard },
    
    
    
];

export default indexRoutes;