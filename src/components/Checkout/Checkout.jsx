import React,{Fragment, useState,useEffect} from "react";
import useStyles from "./style";
import {Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button} from "@material-ui/core";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import { ConfirmationNumber } from "@material-ui/icons";
import { commerce } from "../../lib/commerce";
import { NavLink } from "react-router-dom";
const steps=["shipping address","payment details"];

const Checkout = ({cart,order,onCaptureCheckout, error}) => {

  const [checkoutToken,setcheckoutToken]=useState(null);

  const [activeStep,setActiveStep]=useState(0);

  const [shippingData,setShippingData]=useState({});//data is set to an empty object

    const next = (data)=>{
      setShippingData(data);
      nextStep();
    }
    const nextStep =()=>setActiveStep( ( previousStep )=>previousStep+1 );
    const backStep =()=>setActiveStep( ( previousStep )=>previousStep-1 );


    let Confirmation = () => (order.customer ? (
      <React.Fragment>
        <div>
          <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
        </div>
        <br />
        <NavLink to="/">
        <Button  variant="outlined" type="button" >Back to home</Button>
        </NavLink>
      </React.Fragment>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    ));
  
    if (error) {
      Confirmation = () => (
        <React.Fragment>
          <Typography variant="h5">Error: {error}</Typography>
          <br />
          <NavLink to="/">
            <Button  variant="outlined" type="button" >Back to home</Button>
          </NavLink>
        </React.Fragment>
      );
    }
  
  console.log(cart);
  const classes=useStyles();
  const Form = () => (activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} nextStep={nextStep} setShippingData={setShippingData} test={next} />
    : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} cart={cart} onCaptureCheckout={onCaptureCheckout} />);

  useEffect(()=>{
    const generateToken = async ()=>{
          try{
          const checkoutToken = await commerce.checkout.generateToken(cart.id,{type:"cart"});
          console.log("Hi");
          // setcheckoutToke(checkoutToken);
          console.log(checkoutToken);
          setcheckoutToken(checkoutToken)
        }catch(error){
          console.log(error);
          throw(error);
        }
      }
    generateToken();
  },[cart]);

  return (<Fragment>
      <div className={classes.toolbar}/>
      <main className={classes.layout}  >
      <Typography variant="h4" align="center" >Checkout</Typography>
        <div className={classes.toolbar}/>
        <Paper className={classes.paper} style={{margin:"30px",padding:"20px"}}>
          <Stepper activeStep={activeStep} className={classes.stepper} >
          {//setActiveStep(activ)
          }
          {steps.map((step)=>(
            <Step key={step}><StepLabel>{step}</StepLabel></Step>
            ))}
            </Stepper>
            {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}

        </Paper>
      </main>
    </Fragment>);
};

export default Checkout;
