import React, { Fragment } from "react";
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import useStyle from "./style";
import { Link ,NavLink} from "react-router-dom";

const Navbar = ({totalItem}) => {
    const classes=useStyle();
    const items= (totalItem>0)?totalItem:"0";
    const bacgrond_color=(totalItem>0)?"yellow":"none";
    const logo = "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350";
  return(<Fragment>
    <AppBar position="fixed" className={classes.appBar} color="inherit">
    <Toolbar>
    <Typography variant="h6" className={classes.title} color="inherit">
    <NavLink to="/" style={{textDecoration:"none",color:"black"}}>
        <img src={logo} alt="commerce.js" height="25px" className={classes.image} /> Commerce.js
        </NavLink>
      </Typography>
      <div className={classes.grow} />
      {true && (
      <div className={classes.button}>
      <NavLink to="/cart">
        <IconButton aria-label="Show cart items" style={{background:bacgrond_color}} color="inherit">
        
          <Badge badgeContent={items}  color="secondary" overlap="rectangular" >
            <ShoppingCart  />
            </Badge>
        </IconButton>
            </NavLink>
      </div>
      )}
    </Toolbar>
  </AppBar>
    </Fragment>
    );
};

export default Navbar;
