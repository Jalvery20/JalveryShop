import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import Sidebar from "./Sidebar"
import {  toast } from 'react-toastify';
import MetaData from "../layout/MetaData"
import {Link,useNavigate} from "react-router-dom"

import {MDBDataTable} from "mdbreact"
import Loader from "../layout/Loader"

import { getOrderDetails } from '../../slices/order/order';
import {updateOrder,clearErrors} from "../../slices/order/allOrders"
import { UpdateOrderReset } from '../../slices/order/allOrders';


const ProcessOrder = () => {

    const [status,setStatus]=useState("");

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {id}= useParams()
    
    const {loading,order={}}=useSelector(state=>state.order)
    const {shippingInfo,orderItems,paymentInfo,user,totalPrice,orderStatus}=order
   

    const {error,isUpdated}=useSelector(state=>state.allOrders)


    useEffect(() => {
        dispatch(getOrderDetails(id))
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
        if(isUpdated){
            toast.success("Order updated successfully",{
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
                dispatch({type:UpdateOrderReset})
        
        
        }
      }, [id,dispatch,toast,error,isUpdated])
      

      const updateOrderHandler=(id)=>{
    
        const formData=new FormData();
        formData.set("status", status)
        images.forEach(image=>{
            formData.append("images",image)
        })
        dispatch(updateOrder(id,formData))
      }

      const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`
      
      const isPaid =paymentInfo && paymentInfo.status=== "succeeded" ? true : false
  
      return (
        <>
        <MetaData title={`Process Order # ${order &&order._id}`}/>
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>

            <div className="col-12 col-md-10">
                <>
                {loading ?<Loader/>:(
                    <div className="row d-flex justify-content-around">
                    <div className="col-12 col-lg-7 order-details">

                        <h2 className="my-5">Order # {order._id}</h2>

                        <h4 className="mb-4">Shipping Info</h4>
                        <p><b>Name:</b> {user && user.name}</p>
                        <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                        <p className="mb-4"><b>Address:</b>{shippingDetails}</p>
                        <p><b>Amount:</b> ${totalPrice}</p>

                        <hr />

                        <h4 className="my-4">Payment</h4>
                        <p style={{color:`${isPaid?"green":"red"} `}} ><b>{isPaid?"PAID":"NOT PAID"}</b></p>

                        <h4 className="my-4">Stripe ID</h4>
                        <p><b>{paymentInfo&&paymentInfo.id}</b></p>



                        <h4 className="my-4">Order Status:</h4>
                        <p style={{color:`${order.orderStatus&&String(order.orderStatus).includes("Delivered")?"green":"red"} `}} ><b>Delivered</b></p>


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
					
					<div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Status</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={status}
                                            onChange={(e)=>setStatus(e.target.value)}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>

                                    <button onClick={()=>updateOrderHandler(order._id)} classNameName="btn btn-primary btn-block">
                                        Update Status
                                </button>
                                </div>
					
                </div>
                ) }
                </>
            </div>
        </div>
    </>
  )
}

export default ProcessOrder