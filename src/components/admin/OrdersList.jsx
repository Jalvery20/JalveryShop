import React,{useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import Sidebar from "./Sidebar"
import {  toast } from 'react-toastify';
import MetaData from "../layout/MetaData"
import {Link,useNavigate} from "react-router-dom"

import {MDBDataTable} from "mdbreact"
import Loader from "../layout/Loader"


import {allOrders, deleteOrder,clearErrors,DeleteOrderReset} from "../../slices/order/allOrders"

const OrdersList = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate()
  const {isDeleted,loading,error,orders}=useSelector(state=>state.allOrders)
 
  useEffect(() => {
      dispatch(allOrders())

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
      if(isDeleted){
          toast.success("Order Deleted successfully ",{
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
              navigate("/admin/orders")
              dispatch(clearErrors())
              dispatch({type:DeleteOrderReset})
      } 
  }, [dispatch,toast,error,isDeleted,navigate])


  const deleteOrderHandler=(id)=>{
    dispatch(deleteOrder(id))
  }
  const setOrders=()=>{
      const data={
          columns:[
              {
                  label:"Order ID",
                  field:"id",
                  sort:"asc"
              },
              {
                  label:"No of Items",
                  field:"numofItems",
                  sort:"asc"
              },
              {
                  label:"Amount",
                  field:"amount",
                  sort:"asc"
              },
              {
                  label:"Status",
                  field:"status",
                  sort:"asc"
              },
              {
                  label:"Actions",
                  field:"actions",
              }

          ],
          rows:[]
      }

      orders.forEach(order=>{
          data.rows.push({
              id:order._id,
              numofItems:order.orderItems.length,
              amount:`$${order.totalPrice}`,
              status:order.orderStatus&& String(order.orderStatus).includes("Delivered")
                        ? <p style={{color:"green"}}>{order.orderStatus} </p>
                        :  <p style={{color:"red"}}>{order.orderStatus} </p>,
                    
              actions: <> 
                      <Link className='btn btn-primary py-1 px-2' to={`/admin/order/${order._id}`}>
                          <i className='fa fa-eye'></i>
                      </Link>   
                      <button onClick={()=>deleteOrderHandler(order._id)} className="btn btn-danger py-1 px-2 ml-2" >
                          <i className='fa fa-trash'></i>
                      </button>  
                      </>   
          })
      })

      return data
  }

  return (
    
    <>
        <MetaData title={"All Orders"}/>
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>

            <div className="col-12 col-md-10">
                <>
                    <h1 >All Orders</h1>
        
                    {loading? <Loader/>:
                    <>
                     <MDBDataTable
                        data={setOrders()}
                        className="px-3"
                        bordered
                        striped
                        hover/>
                    </>}
                </>
            </div>
        </div>
    </>
  )
}

export default OrdersList