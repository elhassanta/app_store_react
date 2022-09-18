import React,{useState,useEffect} from "react";
import { commerce } from "./lib/commerce";
import {Navbar,Products ,Cart ,Checkout } from "./components/index";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

const App = () => {
    const [products,setProducts]=useState([]);

    const [cart,setCart]=useState({});
    // const [xx,setXx]=useState([1]);
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProduct = async ()=>{
        const {data} = await commerce.products.list();
        setProducts(data);
    }
    const fetchCart = async ()=>{
        const data = await commerce.cart.retrieve();
        setCart(data);
    }
    
    useEffect(()=>{
        fetchProduct();
        fetchCart();
    },[]);//useEffect Component Didmount on the start 
    useEffect(()=>{
        fetchCart();
    },[]);//useEffect Component Didmount on the start 
    const handleAddToCart = async (itemId,quantity)=>{
        const item = await commerce.cart.add(itemId,quantity);
        setCart(item.cart);
        console.log(cart);
    }
    const onUpdateCartQty = async (product_id,quantity)=>{
        const {cart}= await commerce.cart.update(product_id,{quantity});
        setCart(cart);
    }
    const onRemoveCart = async ()=>{
        const {cart}= await commerce.cart.empty();
        setCart(cart);
    }
    
    const totalItem=(cart.line_items)?cart.line_items.length:0;

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
    
        setCart(newCart);
      };
    
      const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
          const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
    
          setOrder(incomingOrder);
    
          refreshCart();
        } catch (error) {
          setErrorMessage(error.data.error.message);
        }
      };
    
  return (<Router>
            <Navbar totalItem={totalItem} />
            <Routes>
            <Route path="/" element={<Products products={products} onAddToCart={handleAddToCart} />} />
            <Route path="/cart" element={ (cart.line_items === undefined)?<p>Empty Cart</p>:<Cart  cart={cart} onRemoveCart={onRemoveCart} onUpdateCartQty={onUpdateCartQty} />} />
            <Route path="/checkout" element={ <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />} />
            </Routes>
        </Router>);
};

export default App;
