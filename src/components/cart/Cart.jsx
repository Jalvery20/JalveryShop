import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from "react-redux"

import {  toast,ToastContainer } from 'react-toastify';
import MetaData from "../layout/MetaData"
import {Link, useNavigate} from "react-router-dom"

import { addItemToCart,removeItemFromCart } from '../../slices/cart/cart';


const Cart = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const {cartItems}=useSelector(state=>state.cart)
    const [subTotal,setSubTotal]=useState(0)

    useEffect(() => {
        let total=0;
        cartItems.forEach(product => {
           total+=product.price*product.quantity
        })
        setSubTotal(total)
    }, [cartItems])

    const removeCartItemHandler=(id)=>{
        dispatch(removeItemFromCart(id))
    }
    
    const decreaseQty=(id,quantity,stock)=>{
        const newQty=quantity-1

        if(newQty===0) return;

        dispatch(addItemToCart(id,newQty))
    }

    const increaseQty=(id,quantity,stock)=>{
        const newQty=quantity+1

        if(newQty>stock) return;

        dispatch(addItemToCart(id,newQty))
    }

    const checkoutHandler=()=>{
        navigate("/login?redirect=shipping")
    }
  return (
    <>
    <MetaData title={"Your Cart"} />
    {cartItems.length===0
        ? 
        <div className='text-center'>
                <h3 className='mt-5'>Your Cart is Empty</h3>
        
        </div>
        :
        <>
     <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-12">
                <nav className="breadcrumb bg-light mb-30">
                    
                        <Link className="breadcrumb-item text-dark" to="/">Home</Link>
                    
                        <Link className="breadcrumb-item text-dark" to="/shop">Shop</Link>
                        <span className="breadcrumb-item active">Shopping Cart</span>
                 </nav>
            </div>
        </div>
    </div>

    <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-lg-8 table-responsive mb-5">
                <table className="table table-light table-borderless table-hover text-center mb-0">
                    <thead className="thead-dark">
                        <tr>
                            <th>Products</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody className="align-middle">
                        {cartItems.map(product=>(
                            <tr key={product.product}>
                            <td className="align-middle"><img src={product.image} alt="Product Image" style={{width: "50px"}}/>{product.name}</td>
                            <td className="align-middle">${product.price}</td>
                            <td className="align-middle">
                                <div className="input-group quantity mx-auto" style={{width: "100px"}}>
                                <div className="input-group-btn">
                                        <button onClick={()=>decreaseQty(product.product,product.quantity,product.stock)} className="btn btn-sm btn-primary btn-minus" >
                                        <i className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                    <input type="text" className="form-control form-control-sm bg-secondary border-0 text-center" value={product.quantity} />
                                    <div className="input-group-btn">
                                        <button onClick={()=>increaseQty(product.product,product.quantity,product.stock)} className="btn btn-sm btn-primary btn-plus">
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </td>
                            <td className="align-middle">${(product.quantity*product.price).toFixed(2)}</td>
                            <td className="align-middle"><button onClick={()=>removeCartItemHandler(product.product)}  className="btn btn-sm btn-danger"><i className="fa fa-times"></i></button></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="col-lg-4">
                
                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Cart Summary</span></h5>
                <div className="bg-light p-30 mb-5">
                    <div className="border-bottom pb-2">
                    <div className="d-flex justify-content-between mb-3">
                            <h6>Units</h6>
                            <h6>{cartItems.reduce((acc,item)=>(acc+Number(item.quantity)),0)}</h6>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <h6>Subtotal</h6>
                            <h6>${subTotal.toFixed(2)}</h6>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h6 className="font-weight-medium">Shipping</h6>
                            <h6 className="font-weight-medium">$10</h6>
                        </div>
                    </div>
                    <div className="pt-2">
                        <div className="d-flex justify-content-between mt-2">
                            <h5>Total</h5>
                            <h5>${(subTotal+10).toFixed(2)}</h5>
                        </div>
                        <button onClick={checkoutHandler} className="btn btn-block btn-primary font-weight-bold my-3 py-3">Proceed To Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>}
    </>
  )
}

export default Cart