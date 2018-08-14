import Dashboard from "@material-ui/icons/Dashboard";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Documentation from "views/Documentation/Documentation.jsx";
import Help from "@material-ui/icons/Help";




//var pages = [].concat(pagesRoutes);
var dashboardRoutes = [
    {
      path: "/convert",
      sidebarName: "PDF Conversion",
      navbarName: "Conversion",
      icon: Dashboard,
      component: DashboardPage
    },
   
    {
      path: "/documentation",
      sidebarName: "Documentation",
      navbarName: "Documentation",
      icon: Help,
      component: Documentation
    },
      { redirect: true, path: "/", to:'/convert', navbarName: "Redirect" }
    ];
    
    export default dashboardRoutes;