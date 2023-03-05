import React,{useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"

import {  toast,ToastContainer } from 'react-toastify';
import MetaData from "../layout/MetaData"
import {Link, useParams} from "react-router-dom"

import { getOrderDetails,clearErrors } from "../../slices/order/order";

import Loader from "../layout/Loader"


const OrderDetails = () => {
    const dispatch=useDispatch();
    const {id}=useParams();
    const {loading,error,order}=useSelector(state=>state.order)
    const {shippingInfo,orderItems,paymentInfo,user,totalPrice,orderStatus}=order
   

    // const isPaid= paymentInfo&& paymentInfo.status==="succeeded"?true:false Stripe account needed

    const isPaid=true;
    useEffect(() => {
        dispatch(getOrderDetails(id))

        if(error){
            toast.error(error, {
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
    }, [id,dispatch,toast])
    
    const shippingDetails=shippingInfo && `${shippingInfo.address}, ${shippingInfo.city},${shippingInfo.postalCode}, ${shippingInfo.country}`
    return (
    <>
        <MetaData title={"Order Details"}/>
        {loading? <Loader/>:
            <>
            <div className="row d-flex p-3 justify-content-between">
                    <div className="col-12 col-lg-8 mt-5 order-details">

                        <h1 className="my-5">Order # {order._id}</h1>

                        <h4 className="mb-4">Shipping Info</h4>
                        <p><b>Name:</b> {user&& user.name}</p>
                        <p><b>Phone:</b> {shippingInfo&& shippingInfo.phoneNo}</p>
                        <p className="mb-4"><b>Address:</b>{shippingDetails}</p>
                        <p><b>Amount:</b> ${totalPrice}</p>

                        <hr />

                        <h4 className="my-4">Payment</h4>
                        <p style={{color:`${isPaid?"green":"red"} `}} ><b>{isPaid?"PAID":"NOT PAID"}</b></p>


                        <h4 className="my-4">Order Status:</h4>
                        <p className='text-uppercase' style={{color:`${order.orderStatus&&String(order.orderStatus).includes("Delivered")?"green":"red"} `}} ><b>{order.orderStatus&&String(order.orderStatus).includes("Delivered")?"Delivered":"Not Delivered "}</b></p>


                        <h4 className="my-4">Order Items:</h4>

                        <hr />
                        <div className="cart-item my-1">
                            {orderItems && orderItems.map(item=>(
                                <div key={item.product} className="row my-5">
                                <div className="col-4 col-lg-2">
                                    <img src={item.image} alt={item.name} height="45" width="65" />
                                </div>

                                <div className="col-5 col-lg-5">
                                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                                </div>


                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                    <p>${item.price}</p>
                                </div>

                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                    <p>{item.quantity} Piece(s)</p>
                                </div>
                            </div>
                            ))}
                                    
                        </div>
                        <hr />
                    </div>
                </div>
            </>}
    </>
  )
}

export default OrderDetails