import React from "react";
import useStyle from "./style";
import {AddShoppingCart} from "@material-ui/icons"

import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
const Product = ({product,onAddToCart}) => {
    // console.log(product,onAddToCart)
    
    const classes = useStyle();
    let font_size=(window.innerWidth>500)?'10px':'3vw';
  return (product?
    (<Card className={classes.root}>
      <CardMedia className={classes.media} image={product.image.url} title={product.name} />
      <CardContent>
      <hr />
        <div className={classes.cardContent}>
          <Typography style={{fontSize:font_size}} gutterBottom variant="h6" component="body">
            {product.name}
          </Typography>
          <Typography style={{fontSize:font_size}} gutterBottom variant="h6" component="body">
            ${product.price.formatted}
          </Typography>
        </div>
        <Typography style={{fontSize:font_size}} dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" component="p" />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions} onClick={()=>{onAddToCart(product.id,1)}}>
        <IconButton aria-label="Add to Cart" onClick={()=>{}}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>):<p> <div className={classes.toolbar} /> Loading...</p>
  );
};

export default Product;
