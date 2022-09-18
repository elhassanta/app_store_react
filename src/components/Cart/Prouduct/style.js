import {makeStyles} from "@material-ui/core/styles";

export default makeStyles(()=>({
	root:{
        margin:"10px",
        padding:"5px",
		
    },media:{
        height:0,
        paddingTop:"56.25%",
       
        
    },
    cardActions: {
            display:'flex',
            justifyContent:"space-between",
            fontSize:"1vh"
    },
    cardContent: {
        display:'flex',
        justifyContent:'space-around',
        margin:'3px'
            
    },buttons:{
        display:"flex",
        justifyContent:"sapce-between"
    }
	
}));