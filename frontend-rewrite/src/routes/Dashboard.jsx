import Dashboard from "@material-ui/icons/Dashboard";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Documentation from "views/Documentation/Documentation.jsx";
import Publications from "views/Publications/Publications.jsx";
import Help from "@material-ui/icons/Help";




//var pages = [].concat(pagesRoutes);
var dashboardRoutes = [
    {
      path: "/convert",
      sidebarName: "Conversion",
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
    {
      path: "/publications",
      sidebarName: "Publications",
      navbarName: "Publications",
      icon: Help,
      component: Publications
    },
      { redirect: true, path: "/", to:'/convert', navbarName: "Redirect" }
    ];
    
    export default dashboardRoutes;