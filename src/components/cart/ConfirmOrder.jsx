import React, { Fragment } from 'react'
import {useSelector} from "react-redux"
import MetaData from "../layout/MetaData"

import {Link,useNavigate} from "react-router-dom"

import CheckoutSteps from './CheckoutSteps'

const ConfirmOrder = () => {
    const navigate=useNavigate()
    const {cartItems,shippingInfo}=useSelector(state=>state.cart)
    const {user}=useSelector(state=>state.auth)
    
    //Calculate Order Prices

    const itemsPrice=cartItems.reduce((acc,item)=>acc + item.price * item.quantity,0)

    const proceedToPayment=()=>{
        const data={
            itemsPrice:itemsPrice.toFixed(2),
            shippingPrice:10,
            totalPrice:Number(itemsPrice.toFixed(2))+10
        }

        sessionStorage.setItem("orderInfo",JSON.stringify(data))
        navigate("/payment")
    }
  
    return (
        <>
            <MetaData title={"Confirm Order"} />
            <CheckoutSteps shipping confirmOrder />


            <div className="row p-5  d-flex justify-content-between">
            <div className="col-12 shadow pt-4  col-lg-8 mt-5 order-confirm">

                <h4 className="mb-3">Shipping Info</h4>
                <p><b>Name:</b>{user&&user.name}</p>
                <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                <p className="mb-4"><b>Address:</b>{`${shippingInfo.address},${shippingInfo.postalCode}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}`} </p>
                
                <hr />
                <h4 className="mt-4">Your Cart Items:</h4>

                 {cartItems.map(item=> (
                    <Fragment>
                <hr key={item.product} />
                <div key={item.product} className="cart-item my-1">
                    <div className="row">
                        <div className="col-4 col-lg-2">
                            <img src={item.image} alt="Laptop" height="45" width="65"/>
                        </div>

                        <div className="col-5 col-lg-6">
                            <Link style={{color:"darkgrey"}} to={`/product/${item.product}`}>{item.name}</Link>
                        </div>


                        <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                            <p>{item.quantity} x ${item.price} = <b>${(item.quantity * item.price).toFixed(2)}</b></p>
                        </div>

                    </div>
                </div>
                    </Fragment>
                 ))}
                
                <hr />

            </div>
			
			<div className="col-12 col-lg-3 border mt-3 p-4 shadow my-4">
                    <div id="order_summary ">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${itemsPrice.toFixed(2)}</span></p>
                        <p>Shipping: <span className="order-summary-values">$10</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">${(itemsPrice+10).toFixed(2)}</span></p>

                        <hr />
                        <button onClick={proceedToPayment} id="checkout_btn" className="btn btn-block mt-5  btn-primary font-weight-bold">Proceed to Payment</button>
                    </div>
                </div>
			
			
        </div>
        
        </>
    
  )
}

export default ConfirmOrder