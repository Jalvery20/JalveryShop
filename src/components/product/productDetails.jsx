import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import { getProductDetails,clearErrors, newReview,NewReviewReset } from '../../slices/product/productDetails'
import {  toast,ToastContainer } from 'react-toastify';
import MetaData from "../layout/MetaData"
import Loader from "../layout/Loader"
import {useParams,Link} from "react-router-dom"
import { addItemToCart } from '../../slices/cart/cart';
import "./productDetails.css"

const productDetails = () => {
    const {id}=useParams();
    const dispatch=useDispatch();
    const [quantity,setQuantity]=useState(1);
    const [rating,setRating]=useState(0)
    const [comment,setComment]=useState("")
    const {loading,error,product,success}=useSelector(state=>state.productDetails)
    const {user}=useSelector(state=>state.auth)

    useEffect(() => {
      
        window.scrollTo(0,0)
    }, [])
    
    
    
    useEffect(() => {
        
        
        dispatch(getProductDetails(id))
        
        if(error){
            toast.error(error, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            dispatch(clearErrors())
        }
        if(success){
            toast.success("Review posted successfully", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            dispatch({type:NewReviewReset})
        }
        
    
    }, [dispatch,toast,error,id,success])

    const addToCart=()=>{
        dispatch(addItemToCart(id,quantity))
        toast.success("Item added to Cart", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
    }
    
    function setUserRatings(){
       const stars=document.querySelectorAll(".starhov")
        stars.forEach((star,index)=>{
            star.starValue=index+1;

            ["click","mouseover","mouseout"].forEach((e)=>{
                star.addEventListener(e,showRatings)
            })
        })
        function showRatings(e){
            stars.forEach((star,index)=>{
                if(e.type==="click"){
                    if(index<this.starValue){
                        star.classList.remove("far")
                        star.classList.add("fas")

                        setRating(this.starValue)
                    }else{
                        star.classList.remove("fas")
                        star.classList.add("far")
                    }
                }
                if(e.type==="mouseover"){
                    if(index<this.starValue){
                        star.classList.remove("far")
                        star.classList.add("fas")
                    }else{
                        star.classList.remove("fas")
                        star.classList.add("far")
                    }
                   
                }else if(e.type==="mouseout"){
                    if(index>=this.starValue){
                        star.classList.remove("fas")
                        star.classList.add("far")
                    }else{
                        star.classList.remove("far")
                        star.classList.add("fas")
                    }
                   
                   }
            })
            
        }
       
        }

        
    const reviewHandler=()=>{
        const formData=new FormData();

        formData.set("rating",rating)
        formData.set("comment",comment)
        formData.set("productId",id)

        dispatch(newReview(formData))
    }
        
  return (
        <>
            <MetaData title={product.name} />
            {loading ? <Loader />: (
                <>
                    <div className="container-fluid">
                        <div className="row px-xl-5">
                            <div className="col-12">
                                <nav className="breadcrumb bg-light mb-30">
                                    <Link className='breadcrumb-item' to="/">
                                        <a className="text-dark" href="#">Home</a>
                                    </Link>
                                    <a className="breadcrumb-item text-dark" href="#">Shop</a>
                                    <span className="breadcrumb-item active">Shop Detail</span>
                                </nav>
                            </div>
                        </div>
                    </div>



                    <div className="container-fluid pb-5">
        <div className="row px-xl-5">
            <div className="col-lg-5 mb-30">
                <div id="product-carousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner bg-light">
                        {product.images && product.images.map((img,index)=>(
                            <div key={img} className={`carousel-item ${index===1 && "active"}`}>
                                <img className="w-100 h-100" src={img.url} alt="Image"/>
                            </div>
                        ))}
                        
                    </div>
                    <a className="carousel-control-prev" href="#product-carousel" data-bs-slide="prev">
                        <i className="fa fa-2x fa-angle-left text-dark"></i>
                    </a>
                    <a className="carousel-control-next" href="#product-carousel" data-bs-slide="next">
                        <i className="fa fa-2x fa-angle-right text-dark"></i>
                    </a>
                </div>
            </div>

            <div className="col-lg-7 h-auto mb-30">
                <div className="h-100 bg-light p-30">
                    <h3>{product.name}</h3>
                    <div className="d-flex mb-3">
                        <div className="text-primary mr-2">
                        <small className={`${product.ratings>=1?"fa fa-star text-primary":product.ratings>0?"fa fa-star-half-alt text-primary":"far fa-star text-primary"}  mr-1`}></small>
                            <small className={` ${product.ratings>=2?"fa fa-star text-primary":product.ratings>1?"fa fa-star-half-alt text-primary":"far fa-star text-primary"} mr-1`}></small>
                            <small className={`${product.ratings>=3?"fa fa-star text-primary":product.ratings>2?"fa fa-star-half-alt text-primary":"far fa-star text-primary"} mr-1`}></small>
                            <small className={` ${product.ratings>=4?"fa fa-star text-primary":product.ratings>3?"fa fa-star-half-alt text-primary":"far fa-star text-primary"} mr-1`}></small>
                            <small className={` ${product.ratings>=5?"fa fa-star text-primary":product.ratings>4?"fa fa-star-half-alt text-primary":"far fa-star  text-primary"} mr-1`}></small>
                            
                        </div>
                        <small  className="pt-1">({product.numOfReviews} Reviews)</small>
                    </div>
                    <h3 className="font-weight-semi-bold mb-4">${product.price}</h3>
                    <p className="mb-4">{product.description}</p>
                    
                    
                    <div className="d-flex align-items-center mb-4 pt-2">
                        <div className="input-group quantity mr-3" style={{width: "130px"}}>
                            <div className="input-group-btn">
                                <button onClick={()=>quantity>1&&setQuantity(quantity-1)} className="btn btn-primary btn-minus">
                                    <i className="fa fa-minus"></i>
                                </button>
                            </div>
                            <input type="text" className="form-control bg-secondary border-0 text-center" value={quantity} />
                            <div className="input-group-btn">
                                <button onClick={()=>product.stock>quantity&&setQuantity(quantity+1)} className="btn btn-primary btn-plus">
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <button disabled={product.stock===0} onClick={addToCart} className="btn btn-primary px-3"><i className="fa fa-shopping-cart mr-1"></i> Add To
                            Cart
                        </button>                             
                    </div>
                    <div className='d-flex align-items-center mb-4 pt-2'>
                            <strong className="text-dark mr-2">Status:</strong>
                            <span style={{color:`${product.stock===0 ? "red":"green"}`,textShadow:".3px .3px .3px  black "}} >{product.stock===0?"Out of stock":"In Stock"}</span> 
                    </div>
                    <div className="d-flex pt-2">
                        <strong className="text-dark mr-2">Share on:</strong>
                        <div className="d-inline-flex">
                            <a className="text-dark px-2" href="">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a className="text-dark px-2" href="">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a className="text-dark px-2" href="">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a className="text-dark px-2" href="">
                                <i className="fab fa-pinterest"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row px-xl-5">
            <div className="col">
                <div className="bg-light p-30">
                    <div className="nav nav-tabs mb-4">
                        <a className="nav-item nav-link text-dark active" data-bs-toggle="tab" href="#tab-pane-1">Description</a>
                        <a onClick={setUserRatings}  className="nav-item nav-link text-dark" data-bs-toggle="tab" href="#tab-pane-3">Reviews ({product.numOfReviews})</a>
                    </div>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="tab-pane-1">
                            <h4 className="mb-3">Product Description</h4>
                            <p>{product.description}</p>
                            </div>
                       
                        <div className="tab-pane fade" id="tab-pane-3">
                            <div className="row">
                            {product.reviews&&product.reviews.length>0&&(
                            product.reviews.map(review=>(
    
                                <div key={review._id} className="col-md-6">
                                    <h4 className="mb-4">1 review for {product.name}</h4>
                                    <div className="media mb-4">
                                        <img src="../img/user.jpg" alt="Image" className="img-fluid mr-3 mt-1" style={{width: "45px"}}/>
                                        <div className="media-body">
                                            <h6>{review.name}</h6>
                                            <div className="text-primary mb-2">
                                                <small className={`${review.rating>=1?"fa fa-star text-primary":review.rating>0?"fa fa-star-half-alt text-primary":"far fa-star text-primary"}  mr-1`}></small>
                                                <small className={` ${review.rating>=2?"fa fa-star text-primary":review.rating>1?"fa fa-star-half-alt text-primary":"far fa-star text-primary"} mr-1`}></small>
                                                <small className={`${review.rating>=3?"fa fa-star text-primary":review.rating>2?"fa fa-star-half-alt text-primary":"far fa-star text-primary"} mr-1`}></small>
                                                <small className={` ${review.rating>=4?"fa fa-star text-primary":review.rating>3?"fa fa-star-half-alt text-primary":"far fa-star text-primary"} mr-1`}></small>
                                                <small className={` ${review.rating>=5?"fa fa-star text-primary":review.rating>4?"fa fa-star-half-alt text-primary":"far fa-star  text-primary"} mr-1`}></small>
                          
                                            </div>
                                            <p>{review.comment}.</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                                )}
                                {user ?
                                <div className="col-md-6">
                                <h4 className="mb-4">Leave a review</h4>
                                <div className="d-flex my-3">
                                    <p className="mb-0 mr-2">Your Rating:</p>
                                    <div style={{cursor:"pointer"}} className="text-primary ">
                                        <i   className="far fa-star starhov"></i>
                                        <i   className="far fa-star starhov"></i>
                                        <i className="far fa-star starhov"></i>
                                        <i className="far fa-star starhov"></i>
                                        <i   className="far fa-star starhov"></i>
                                    </div>
                                </div>
                                <form>
                                    <div className="form-group">
                                        <label for="message">Your Review </label>
                                        <textarea onChange={(e)=>setComment(e.target.value)} value={comment} id="message" cols="30" rows="5" className="form-control"></textarea>
                                    </div>
                                    
                                    <div className="form-group mb-0">
                                        <input onClick={reviewHandler} type="submit" value="Leave Your Review" className="btn btn-primary px-3"/>
                                    </div>
                                </form>
                            </div>:
                            <div className="col-md-6">
                                <h5 className="mb-5 mx-auto">Login to post your review</h5>
                            </div>
                        } 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
                </>
                
            
        )}
        </>
    )
    

}

export default productDetails;