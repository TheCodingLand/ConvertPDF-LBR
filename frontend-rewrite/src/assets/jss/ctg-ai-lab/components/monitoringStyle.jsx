import {
    defaultFont,
    container,
    primaryColor
  } from "assets/jss/ctg-ai-lab.jsx";
  
  const monitoringStyle = {
    block: {
        color: "inherit",
        padding: "15px",
        textTransform: "uppercase",
        borderRadius: "3px",
        textDecoration: "none",
        position: "relative",
        display: "block",
        ...defaultFont,
        fontWeight: "500",
        fontSize: "12px"
      },  
    
    terminalText: {
      color: "#00ccaa",
      padding: "0px",
      
      textTransform: "uppercase",
      borderRadius: "3px",
      textDecoration: "none",
      position: "relative",
      display: "block",
      ...defaultFont,
      fontWeight: "600",
      fontSize: "12px"
    },
    listitem:{
        
    },
    terminalHeader: {
      paddingTop:"15px",
      backgroundColor:"#000000",
      opacity:.75,
  },
  gridContainer: {
    
    
    flexGrow: 1,
    alignItems:'center',
            direction:'row'
  },

    terminal: {
        width:"50%",
        paddingTop:"15px",
        backgroundColor:"#000000",
        opacity:.75,
    },
    left: {
      float: "left!important",
      display: "block"
    },
    right: {
      padding: "15px 0",
      margin: "0",
      fontSize: "14px",
      float: "right!important"
    },
    footer: {
      bottom: "0",
      borderTop: "1px solid #e7e7e7",
      padding: "15px 0",
      ...defaultFont
    },
    container,
    a: {
      color: primaryColor,
      textDecoration: "none",
      backgroundColor: "transparent"
    },
    list: {
      marginBottom: "10px",
      
      padding: "0",
      marginTop: "0"
    },
    inlineBlock: {
      alignContent:'left',
      display: "inline-block",
      paddingTop: "0px",
      paddingBottom: "5px",
      width: "auto"
    }
  };
  export default monitoringStyle;
  