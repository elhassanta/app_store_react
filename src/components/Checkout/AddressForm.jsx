import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../../lib/commerce';
import FormInput from './FormInput';

const AddressForm = ({ checkoutToken, test }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const {handleSubmit,register,methods} = useForm();

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]);
  const showData = (data) => {
    //data.preventDefault();
    data.shippingCountry=shippingCountry;
    data.shippingSubdivision=shippingSubdivision;
    data.shippingOption=shippingOption;
    console.log(data);

    test( data );
    //console.log(shippingCountry, shippingSubdivision, shippingOption);
  }
return(
  <>
  <Typography variant="h6" gutterBottom>Shipping address</Typography>
  <FormProvider {...methods}>
    <form onSubmit={handleSubmit(showData)}>
    <input required  {...register("firstname")} placeholder ="First name" />
    <input required {...register("lastname")} placeholder="Last name" />
    <input required  {...register("address")} placeholder="Address line 1" />
    <input required {...register("email")} placeholder="Email" />
    <input required {...register("city")} placeholder="City" />
    <input required  {...register("zip")} placeholder="Zip" />
    <Button type="submit" variant="contained" color="primary">Next</Button>
    </form>
    <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
    <InputLabel>Shipping Country</InputLabel>
    <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
    {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
      <option key={item.id} value={item.id}>
      {item.label}
      </option>
      ))}
      </Select>
      </Grid>
      <Grid item xs={12} sm={6}>
      <InputLabel>Shipping Subdivision</InputLabel>
      <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
      {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
        <option key={item.id} value={item.id}>
        {item.label}
        </option>
        ))}
        </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
        <InputLabel>Shipping Options</InputLabel>
        <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
        {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
          <option key={item.id} value={item.id}>
          {item.label}
          </option>
          ))}
          </Select>
          </Grid>
          </Grid>
      <br />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
        
      </div>
    
  </FormProvider>
</>
);
};

export default AddressForm;

