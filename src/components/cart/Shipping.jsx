import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {countries} from "countries-list"
import MetaData from "../layout/MetaData"

import {useNavigate} from "react-router-dom"

import CheckoutSteps from './CheckoutSteps'

import { saveShippingInfo } from '../../slices/cart/cart';

const Shipping = () => {

  const countriesList=Object.values(countries)

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {shippingInfo}=useSelector(state=>state.cart)
  const {cartItems}=useSelector(state=>state.cart)

  const [address,setAddress]=useState(shippingInfo&&shippingInfo.address)
  const [state,setState]=useState(shippingInfo&&shippingInfo.address)
  const [city,setCity]=useState(shippingInfo&&shippingInfo.city)
  const [postalCode,setPostalCode]=useState(shippingInfo&&shippingInfo.postalCode)
  const [phoneNo,setPhoneNo]=useState(shippingInfo&&shippingInfo.phoneNo)
  const [country,setCountry]=useState(shippingInfo&&shippingInfo.country)


  const submitHandler=(e)=>{
    e.preventDefault()
    if(!country) setCountry("Cuba")
    dispatch(saveShippingInfo({address,state,city,phoneNo,postalCode,country}))
    navigate("/order/confirm")
  }
  
  return (
    <>
        <MetaData title={"Shipping Info"} />
        <CheckoutSteps shipping />

        <div className="container-fluid mt-4">
        <div className="row px-xl-5">
            <form onSubmit={submitHandler} className="col-lg-12">
                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Billing Address</span></h5>
                <div className="bg-light p-30 mb-5">
                    <div className="row">
                
                        <div className="col-md-6 form-group">
                            <label>Mobile No</label>
                            <input required onChange={(e)=>setPhoneNo(e.target.value)} name="phoneNo" className="form-control" value={phoneNo} type="number" placeholder="+53 "/>
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Address </label>
                            <input required name="address" onChange={(e)=>setAddress(e.target.value)} value={address} className="form-control" type="text" placeholder="28 Street"/>
                        </div>
                       
                        <div className="col-md-6 form-group">
                            <label>Country</label>
                            <select value={country}  required onChange={(e)=>setCountry(e.target.value)} className="custom-select">
                                
                                {countriesList.map(e =>(
                                    
                                     <option value={e.name}  key={e.name}   >{e.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6 form-group">
                            <label>City</label>
                            <input required onChange={(e)=>setCity(e.target.value)} value={city} className="form-control" type="text" placeholder="Santa Clara"/>
                        </div>
                        <div className="col-md-6 form-group">
                            <label>State</label>
                            <input required onChange={(e)=>setState(e.target.value)} value={state} className="form-control" type="text" placeholder="Villa Clara"/>
                        </div>
                        <div className="col-md-6 form-group">
                            <label>ZIP Code</label>
                            <input required onChange={(e)=>setPostalCode(e.target.value)} value={postalCode} className="form-control" type="text" placeholder="675"/>
                            
                        </div>
                        <div className="w-100 pt-3 text-center ">
                      <button className="btn text-uppercase  btn-primary font-weight-bold py-2">Confirm Order</button>
           
                      </div>
                    </div>
                    
                </div>
                 </form>
            
        </div>
    </div>
    
    </>
  )
}

export default Shipping