import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './style';

const CartItem = ({ item,onUpdateCartQty/*, onUpdateCartQty, onRemoveFromCart*/ }) => {

  const classes = useStyles();

  // const handleUpdateCartQty = (lineItemId, newQuantity) => onUpdateCartQty(lineItemId, newQuantity);

  // const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);
  const handleIncrement = ()=>{
    const  add= item.quantity+1;
    const id =item.id;
    onUpdateCartQty(id,add);
  }
  console.log(item.quantity+1);
  const handleDecrement = ()=>{
    const  dec= item.quantity-1;
    const id =item.id;
    onUpdateCartQty(id,dec);
  }
  const handleRemove = ()=>{
    const  rem= 0;
    const id =item.id;
    onUpdateCartQty(id,rem);

  }
  console.log(window.innerWidth);
  let font_size=(window.innerWidth>500)?'20px':'7vw';
  return (
    <Card className="cart-item" >
      {console.log(onUpdateCartQty,item)}
      <CardMedia image={item.image.url} alt={item.name} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4" style={{fontSize:font_size}}>{item.name}</Typography>
        <Typography variant="h5" style={{fontSize:font_size}}>{item.line_total.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}  display="flex">
        <div className={classes.buttons} style={{fontSize:"1.6vw",with:"70%"}}>
          <Button type="button" size="small" style={{fontSize:"1.6vw",with:"30%"}} onClick={() =>{handleIncrement()} }>+</Button>{/*handleUpdateCartQty(item.id, item.quantity - 1)*/}
          <Typography style={{fontSize:"1.6vw"}} >&nbsp;{item.quantity}&nbsp;</Typography>
          <Button type="button" size="small"  onClick={() =>{handleDecrement()}}>-</Button>{/* handleUpdateCartQty(item.id, item.quantity + 1)*/}
        </div>
        <Button variant="contained"  type="button" color="secondary" onClick={() =>{handleRemove()}}><span>Remove</span></Button>{ /*handleRemoveFromCart(item.id)*/}
      </CardActions>
    </Card>
  );
};

export default CartItem;