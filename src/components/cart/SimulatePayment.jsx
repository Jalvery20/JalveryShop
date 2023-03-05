import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"

import MetaData from "../layout/MetaData"

import { useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import CheckoutSteps from './CheckoutSteps'
import { createOrder, CreateOrderReset } from '../../slices/order/order'
import { resetCart } from '../../slices/cart/cart'
import { updateProductStock } from '../../slices/product/updateStock'

const options={
  style:{
    base:{
      fontSize:"16px"
    },
    invalid:{
      color:"#9e2146"
    }
  }
}
const SimulatePayment = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate()

  const [cardNum,setCardNum]=useState("")
  const [cardExpire,setCardExpire]=useState("")
  const [cardCVC,setCardCVC]=useState("")

  const {user}=useSelector(state=>state.auth)
  const {cartItems, shippingInfo}=useSelector(state=>state.cart)
  const {error,isCreated}=useSelector(state=>state.order)
  
  const orderInfo=JSON.parse(sessionStorage.getItem("orderInfo"));
  

  useEffect(() => {
    if(error){
        toast.error(error,{
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
            dispatch(clearErrors())
    }
    if(isCreated){
        toast.success("Payment Complete - Order created successfully",{
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
            
            cartItems.forEach(item=>{
                dispatch(updateProductStock(item.product,{stock:Number(item.stock)-Number(item.quantity)}))
            })
            dispatch({type:CreateOrderReset})
            dispatch(resetCart())
            
            
            navigate("/orders/me")
    }
  }, [error,isCreated,dispatch,navigate])
  

  
  const submitHandler=async (e)=>{
    e.preventDefault()
    const order={
        shippingInfo,
        user,
        orderItems:cartItems,
        paidAt:Date.now(),
        itemsPrice:orderInfo &&orderInfo.itemsPrice,
        taxPrice:0,
        shippingPrice:orderInfo && orderInfo.shippingPrice,
        totalPrice:orderInfo && orderInfo.totalPrice
    }
    
    dispatch(createOrder(order))


    
  }
  return (
    <>
            <MetaData title={"Payment"} />
            <CheckoutSteps shipping confirmOrder payment />
            <div className="row ">
		<div className="col-10 mx-auto col-lg-5">
            <form onSubmit={submitHandler} className="shadow mt-5  p-4">
                <h1 className="mb-4">Card Info</h1>
                <div className="form-group">
                  <label htmlFor="card_num_field">Card Number</label>
                  <input
                    type="number"
                    minLength={16}
                    id="card_num_field"
                    className="form-control"
                    value={cardNum}
                    onChange={(e)=>setCardNum(e.target.value)}
                  />
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_exp_field">Card Expiry</label>
                  <input
                    type="date"
                    id="card_exp_field"
                    className="form-control"
                    value={cardExpire}
                    onChange={(e)=>setCardExpire(e.target.value)}
                  
                  />
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_cvc_field">Card CVC</label>
                  <input
                    type="number"
                    id="card_cvc_field"
                    className="form-control"
                    value={cardCVC}
                    onChange={(e)=>setCardCVC(e.target.value)}
                  
                  />
                </div>
      
            
                <button
                  id="pay_btn"
                  type="submit"
                  className="btn btn-primary btn-block mt-5   font-weight-bold"
                >
                  Pay {`- ${orderInfo&& orderInfo.totalPrice}`}
                </button>
    
              </form>
			  </div>
        </div>
    </>
  )
}

export default SimulatePayment