import React,{useState} from 'react'
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux'

const Footer = () => {

    const [message,setMessage]=useState()
  const {user}=useSelector(state=>state.auth)


  const submitHandler=()=>{

  }
  return (
    <>


    <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
        <div className="row px-xl-5 pt-5">
            <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
                <h5 className="text-secondary text-uppercase mb-4">Get In Touch</h5>
                <p className="mb-4">Contact us if you want this website for your business</p>
                <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3"></i>Santa Clara, Villa Clara, Cuba</p>
                <p className="mb-2"><i className="fa fa-envelope text-primary mr-3"></i>jalvery20@gmail.com</p>
                <p className="mb-0"><i className="fa fa-phone-alt text-primary mr-3"></i>+53 55414804</p>
            </div>
            <div className="col-lg-8 col-md-12">
                <div className="row">
                    <div className="col-md-4 mb-5">
                        <h5 className="text-secondary text-uppercase mb-4">Quick Shop</h5>
                        <div className="d-flex flex-column justify-content-start">
                            <Link onClick={()=>window.scrollTo(0,0)} className="text-secondary mb-2" to="/"><i className="fa fa-angle-right mr-2"></i>Home</Link>
                            <Link onClick={()=>window.scrollTo(0,0)} className="text-secondary mb-2" to="/shop"><i className="fa fa-angle-right mr-2"></i>Our Shop</Link>
                            <Link onClick={()=>window.scrollTo(0,0)} className="text-secondary mb-2" to="/cart"><i className="fa fa-angle-right mr-2"></i>Shopping Cart</Link>
                            <Link onClick={()=>window.scrollTo(0,0)} className="text-secondary mb-2" to="/shipping"><i className="fa fa-angle-right mr-2"></i>Checkout</Link>
                            <Link onClick={()=>window.scrollTo(0,0)} className="text-secondary" to="#!"><i className="fa fa-angle-right mr-2"></i>Contact Us</Link>
                        </div>
                    </div>
                    <div className="col-md-4 mb-5">
                        <h5 className="text-secondary text-uppercase mb-4">{user?user.name:"My Account"}</h5>
                        <div className="d-flex flex-column justify-content-start">
                            <Link onClick={()=>window.scrollTo(0,0)} className="text-secondary mb-2" to="/orders/me"><i className="fa fa-angle-right mr-2"></i>My Orders</Link>
                            <Link onClick={()=>window.scrollTo(0,0)} className="text-secondary mb-2" to="/shipping"><i className="fa fa-angle-right mr-2"></i>Checkout</Link>
                            
                        </div>
                    </div>
                    <div className="col-md-4 mb-5">
                        <h5 className="text-secondary text-uppercase mb-4">Newsletter</h5>
                        <p>Write to us!</p>
                        
                        <h6 className="text-secondary text-uppercase mt-4 mb-3">Follow Us</h6>
                        <div className="d-flex">
                            <a className="btn btn-primary btn-square mr-2" href="#"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-primary btn-square mr-2" href="#"><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-primary btn-square mr-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                            <a className="btn btn-primary btn-square" href="#"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row border-top mx-xl-5 py-4" style={{borderColor:"rgba(256, 256, 256, .1) !important"}} >
            <div className="col-md-6 px-xl-0">
                <p className="mb-md-0 text-center text-md-left text-secondary">
                    &copy; <a className="text-primary" href="#">JalveryShop.com</a>. All Rights Reserved 2022
                </p>
            </div>
            <div className="col-md-6 px-xl-0 text-center text-md-right">
                <img className="img-fluid" src="img/payments.png" alt=""  />
            </div>
        </div>
    </div>
    <a href="#" className="btn btn-primary back-to-top"><i className="fa fa-angle-double-up"></i></a>

</>
  )
}

export default Footer