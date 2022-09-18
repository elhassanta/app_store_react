import React,{useState} from "react";
import { Typography, List, ListItem, ListItemText,CircularProgress,Button } from '@material-ui/core';

const Review = ({review,cart,checkoutToken}) => {
    // const [data,setData]=useState(null);
    // if(review) setData(review);

    if(review) console.log(review.hosted_checkout_url);
    // console.log(cart);
    // console.log(checkoutToken);
    // console.log(checkoutToken.hosted_checkout_url);

    return ( <>
        <Typography variant="h6" gutterBottom>Order summary</Typography>
        <List disablePadding>
          {checkoutToken.live.line_items.map((product) => (
            <ListItem style={{ padding: '10px 0' }} key={product.name}>
              <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
              <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
            </ListItem>
          ))}
          <ListItem style={{ padding: '10px 0' }}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
              {checkoutToken.live.subtotal.formatted_with_symbol}

            </Typography>
            <Button background='primary'>&nbsp;<a href={cart.hosted_checkout_url} target="_blank">Click Here To Pay</a></Button>
          </ListItem>
        </List>
      </>)
};

export default Review;
