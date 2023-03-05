import React from 'react'

import {Link} from "react-router-dom"
import { useSelector } from "react-redux";

const Products = () => {

      
  const {products}=useSelector(state=>state.products)
  return (
    <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Featured Products</span></h2>
        <div className="row px-xl-5">
            {products.map(product=>(
                <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div className="product-item bg-light mb-4">
                    <div className="product-img position-relative overflow-hidden">
                        <img className="img-fluid w-100" src="img/product-1.jpg" alt={product.name} />
                        <div className="product-action">
                            <Link to={`/product/${product._id}`}><a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-shopping-cart"></i></a></Link>
                            <a className="btn btn-outline-dark btn-square" href=""><i className="far fa-heart"></i></a>
                        </div>
                    </div>
                    <div className="text-center py-4">
                    <Link  to={`/product/${product._id}`}>
                    <a className="h6 text-decoration-none text-truncate" href="">{product.name}</a>
                    </Link>
                        <div className="d-flex align-items-center justify-content-center mt-2">
                            <h5>${product.price}</h5><h6 className="text-muted ml-2"><del>${product.price}</del></h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mb-1">
                            <small className={`${product.ratings>=1?"fa fa-star text-primary":product.ratings>0?"fa fa-star-half-alt text-primary":"far fa-star text-primary"}  mr-1`}></small>
                            <small className={` ${product.ratings>=2?"fa fa-star text-primary":product.ratings>1?"fa fa-star-half-alt text-primary":"far fa-star text-primary"} mr-1`}></small>
                            <small className={`${product.ratings>=3?"fa fa-star text-primary":product.ratings>2?"fa fa-star-half-alt text-primary":"far fa-star text-primary"} mr-1`}></small>
                            <small className={` ${product.ratings>=4?"fa fa-star text-primary":product.ratings>3?"fa fa-star-half-alt text-primary":"far fa-star text-primary"} mr-1`}></small>
                            <small className={` ${product.ratings>=5?"fa fa-star text-primary":product.ratings>4?"fa fa-star-half-alt text-primary":"far fa-star  text-primary"} mr-1`}></small>
                            <small>({product.numOfReviews}) </small>
                        </div>
                    </div>
                </div>
            </div>
            ))}
            
            
        </div>
    </div>
  )
}

export default Products