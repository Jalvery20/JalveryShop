import React from 'react'
import {Link} from "react-router-dom"

import Carousel1 from "../../../assets/img/carousel1.jpg"
import Carousel2 from "../../../assets/img/carousel2.jpg"
import Carousel3 from "../../../assets/img/carousel3.jpg"

import offer1 from "../../../assets/img/offer-1.jpg"
import offer2 from "../../../assets/img/offer-2.jpg"

const Carousel = () => {
  return (
    <div className="container-fluid mb-3">
        <div className="row px-xl-5">
            <div className="col-lg-8">
                <div id="header-carousel" className="carousel slide carousel-fade mb-30 mb-lg-0" data-bs-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-bs-target="#header-carousel" data-bs-slide-to="0" className="active"></li>
                        <li data-bs-target="#header-carousel" data-bs-slide-to="1"></li>
                        <li data-bs-target="#header-carousel" data-bs-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item position-relative active" style={{height: "430px"}}>
                            <img className="position-absolute w-100 h-100" src={Carousel1} style={{objectFit: "cover"}}/>
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div className="p-3" style={{maxWidth: "700px"}}>
                                    <h4 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">We got the best for you</h4>
                                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">All kind of stuff you can buy from home</p>
                                    <Link className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" to="/shop">Shop Now</Link>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item position-relative" style={{height: "430px"}}>
                            <img className="position-absolute w-100 h-100" src={Carousel2} style={{objectFit: "cover"}} />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div className="p-3" style={{maxWidth: "700px"}}>
                                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Personal Computers</h1>
                                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Pcs and tools needed in your home or work</p>
                                    <Link className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" to={`/shop/search/PC`}>Shop Now</Link>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item position-relative" style={{height:"430px"}}>
                            <img className="position-absolute w-100 h-100" src={Carousel3} style={{objectFit: "cover"}} />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div className="p-3" style={{maxWidth: "700px"}}>
                                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Clothes Fashion</h1>
                                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Many sizes and color of your choice</p>
                                    <Link className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" to={`/shop/search/Clothes_Shoes`}>Shop Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="product-offer mb-30" style={{height: "200px"}}>
                    <img className="img-fluid" src={offer1} alt="offer" />
                    <div className="offer-text">
                        <h6 className="text-white text-uppercase">Save 20%</h6>
                        <h3 className="text-white mb-3">Special Offer</h3>
                        <Link to="/shop" className="btn btn-primary">Shop Now</Link>
                    </div>
                </div>
                <div className="product-offer mb-30" style={{height: "200px"}}>
                    <img className="img-fluid" src={offer2} alt="offer" />
                    <div className="offer-text">
                        <h6 className="text-white text-uppercase">Save 20%</h6>
                        <h3 className="text-white mb-3">Special Offer</h3>
                        <Link to="/shop" className="btn btn-primary">Shop Now</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Carousel