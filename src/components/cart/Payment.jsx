import React from 'react'
import {useDispatch,useSelector} from "react-redux"

import MetaData from "../layout/MetaData"

import { useNavigate} from "react-router-dom"
import {toast,ToastContainer} from "react-toastify"
import CheckoutSteps from './CheckoutSteps'

import {useStripe,useElements,CardNumberElement,CardExpiryElement,CardCvcElement} from "@stripe/react-stripe-js"

import axios from "axios"

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
const Payment = () => {

  const stripe=useStripe()
  const elements=useElements();
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const {user}=useSelector(state=>state.auth)
  const {cartItems, shippingInfo}=useSelector(state=>state.cart)
  

  const orderInfo=JSON.parse(sessionStorage.getItem("orderInfo"));

  const paymentData={
    amount:Math.round(orderInfo.totalPrice * 100)
  }
  
  const submitHandler=async (e)=>{
    e.preventDefault()

    document.querySelector("#pay_btn").disabled = true;

    let res;

    try {
      const config={
        headers:{
          "Content-Type":"application.json"
        }
      }

      res=await axios.post("http://localhost:4000/api/v1/payment/process",paymentData,config)

      const clientSecret=res.data.client_secret;
      if(!stripe||!elements){
        return;
      }

      const result=await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
          card:elements.getElement(CardNumberElement),
          billing_details:{
            name:user.name,
            email:user.email
          }
        }
      });

      if(result.error){
        toast.error(result.error.message,{
          position: "bottom-center",
          autoClose: 5000,
          bodyStyle:"background:black",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
          document.querySelector("#pay_btn").disabled = false;
      
      }else{
        //The payment is processed or not
        if(result.paymentIntent.status==="succeeded"){


          //TODO new Order

          navigate("/success")
        }else{
          toast.error("There is some issue while payment processing",{
            position: "bottom-center",
            autoClose: 5000,
            bodyStyle:"background:black",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
        
        }
      }
    } catch (error) {
      document.querySelector("#pay_btn").disabled = false;
      toast.error(error.response ? error.response.data.errMessage : error.message,{
        position: "bottom-center",
        autoClose: 5000,
        bodyStyle:"background:black",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
    }
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
                  <CardNumberElement
                    type="text"
                    id="card_num_field"
                    className="form-control"
                    options={options}
                  />
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_exp_field">Card Expiry</label>
                  <CardExpiryElement
                    type="text"
                    id="card_exp_field"
                    className="form-control"
                    options={options}
                  />
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_cvc_field">Card CVC</label>
                  <CardCvcElement
                    type="text"
                    id="card_cvc_field"
                    className="form-control"
                    options={options}
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

export default Payment