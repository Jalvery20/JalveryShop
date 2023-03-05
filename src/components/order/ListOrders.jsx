import React,{useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"

import {  toast,ToastContainer } from 'react-toastify';
import MetaData from "../layout/MetaData"
import {Link} from "react-router-dom"

import { MyOrders } from '../../slices/order/order';
import {MDBDataTable} from "mdbreact"
import Loader from "../layout/Loader"
const ListOrders = () => {

    const dispatch=useDispatch();

    const {loading,error,orders}=useSelector(state=>state.order)


    useEffect(() => {
        dispatch(MyOrders())

        if(error){
            toast.error(error,{
                position: "bottom-center",
                autoClose: 5000,
                bodyStyle:"background:black",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
                dispatch(clearErrors())
        }
    }, [dispatch,toast,error])

    const setOrders=()=>{
        const data={
            columns:[
                {
                    label:"Order ID",
                    field:"id",
                    sort:"asc"
                },
                {
                    label:"Num of Items",
                    field:"numOfItems",
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
                    sort:"asc"
                }

            ],
            rows:[]
        }
        
        orders.forEach(order=>{
            data.rows.push({
                id:order._id,
                numOfItems:order.orderItems.length,
                amount:`$${order.totalPrice}`,
                status:order.orderStatus&& String(order.orderStatus).includes("Delivered")
                        ? <p style={{color:"green"}}>{order.orderStatus} </p>
                        :  <p style={{color:"red"}}>{order.orderStatus} </p>,
                    
                actions: <Link className='btn btn-primary' to={`/order/${order._id}`}>
                            <i className='fa fa-eye'></i>
                        </Link>        
            })
        })

        return data
    }
  return (
    <>
        <MetaData title="My Orders"/>
        <ToastContainer toastStyle={{background:"black",color:"white"}}/>

        <h1 className='my-5'>My Orders</h1>
        {loading? <Loader/> :(
            <MDBDataTable
                data={setOrders()}
                className="px-3"
                bordered
                striped
                hover/>
            
        )}  
    </>
  )
}

export default ListOrders