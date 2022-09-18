import React from "react";
import Grid from '@material-ui/core/Grid';
import Product from "./Prouduct/Product";
import useStyle from "./style";
import { CircularProgress } from "@material-ui/core";

const Products = ({products,onAddToCart}) => {
    const classes = useStyle();
   
    
   
  return ((products !==[]) && (products!== undefined))?(<main style={{width:"100%"}}>
        <div className={classes.toolbar} />
        <Grid container spacing={3} display="flex" >
                {products.map((product)=> { return (
                        <Grid item  item xs={12} sm={4}  key={product.id}>
                                <Product product={product} onAddToCart={onAddToCart}  />
                        </Grid>
                        ) }
                        )}
        </Grid>
                </main>):(<p><div className={classes.toolbar} /> <CircularProgress/> </p>);
};

export default Products;
