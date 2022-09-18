import React, { useEffect } from "react";
import useStyles from "./style";
import CartItem from "./Prouduct/CartItem";
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { NavLink } from "react-router-dom";
// import { Link } from "react-router-dom";



const Cart = ({ cart,onUpdateCartQty,onRemoveCart/*, onUpdateCartQty, onRemoveFromCart, onEmptyCart*/ }) => {
    useEffect(()=>{},[cart]);
    const classes = useStyles();
    // const handleEmptyCart = () => onEmptyCart();
    const handleEmptyCart= ()=>{
      onRemoveCart();
    }
  
    const renderEmptyCart = () => (
      <div>
      <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart is Empty</Typography>
      <Typography className={classes.title} color="primary" variant="subtitle1">start adding some <NavLink to="/">products</NavLink>
      
      </Typography>
      </div>
    );
  
    if (!cart.line_items) return 'Loading';
  
    const renderCart = () => (
      <main>
      <Typography className={classes.title} variant="h3" style={{fontSize:"3vw"}} gutterBottom>Your Shopping Cart</Typography>
        <Grid container spacing={2} display="flex" >
          {cart.line_items.map((lineItem) => (
            <Grid item xs={12} sm={4} key={lineItem.id}>
              <CartItem item={lineItem}  onUpdateCartQty={onUpdateCartQty} />{/*onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart} */}
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
          <div className={classes.toolbar} />
          <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
          <div className={classes.toolbar} />
          <div style= {{width:"100%", display:"flex" ,justifyContent:"space-around",marign:"5px"}} >
            <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={()=>{handleEmptyCart()}}>Empty cart</Button>{/* handleEmptyCart */}
            <NavLink to="/checkout" style={{textDecoration:"none",color:"white"}}>
              <Button className={classes.checkoutButton}  size="large" type="button" variant="contained" color="primary">Checkout</Button>
            </NavLink>
          </div>
        </div>
      </main>
    );
  
    return (
      <Container>
        <div className={classes.toolbar} />
        { (cart.line_items.length>0) ? renderCart():renderEmptyCart()  }
      </Container>
    );
  };
  
  export default Cart;
