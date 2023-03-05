
import {Link,useParams,useNavigate} from "react-router-dom"

import React,{ useEffect,useState} from 'react'
import MetaData from "./layout/MetaData"
import Loader from "./layout/Loader"
import { useSelector,useDispatch } from "react-redux";
import Pagination from "react-js-pagination"
import {  toast } from 'react-toastify';
import {getProducts,clearErrors} from "../slices/product/products";

const categories=[
    "All Categories",
    "Appliances",
    "Cameras",
    "PC",
    "Headphones",
    "Food",
    "Books",
    "Clothes_Shoes",
    "Beauty_Health",
    "Sport",
    "Outdoor",
    "Home"
  ]

const Shop = () => {
  const {keyword}=useParams();
    const navigate=useNavigate();
  
  const dispatch=useDispatch();
  const [currentPage,setCurrentPage]=useState(1)
  const prices=[[0,1_000_000],[0,100],[100,200],[200,300],[300,400],[400,500]]
  const [price,setPrice]=useState([1,1000])
  const [category,setCategory]=useState("")
  const [order,setOrder]=useState("")
  
  const {loading, resPerPage,products, error, productsCount,filteredProductsCount}=useSelector(state=>state.products)


  

  useEffect(() => {
    let isCategory=false;
    for (let i = 0; i < categories.length; i++) {
        if(keyword==="all"||categories[i]===keyword) isCategory=true;
        
    }
    if(keyword&&isCategory) setCategory(keyword)
    else setCategory("")
  }, [keyword])
  
  useEffect(()=>{
    if(error){
      setTimeout(()=>{
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
      },100)
      
    
  }  

  let isCategory=false;
    for (let i = 0; i < categories.length; i++) {
        if(keyword==="all"||categories[i]===keyword) isCategory=true;
        
    }
  
  dispatch(getProducts(isCategory?"":keyword,currentPage,price,category,order))

},[dispatch,error,currentPage,price,category,order])

const setCurrentPageNo=(pageNumber)=>{
    setCurrentPage(pageNumber)
} 
let count=productsCount;
if(keyword) {
  count=filteredProductsCount
}
  return (
    <>
    <MetaData title={"Products List"}/>
    {loading?<Loader/> :
    <>
    <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-12">
                <nav className="breadcrumb bg-light mb-30">
                    
                        <Link className="breadcrumb-item text-dark" to="/">Home</Link>
                    
                        <span className="breadcrumb-item text-dark">Shop</span>
                        <span className="breadcrumb-item active">Shop List</span>
                 </nav>
            </div>
        </div>
    </div>
    


    <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-lg-3 col-md-4">
            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filter by Category</span></h5>
                <div className="bg-light p-4 mb-30">
                    <form>
                        {categories.map((element)=>(
                            <div key={element} className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                
                                <input value={element} onChange={()=>{setCategory(element==="All Categories"?"":element);navigate(`/shop/search/${element==="All Categories"?"all":element}`)}} checked={(element==="All Categories"&&!category)?true:category===element?true:false }  type="checkbox" className="custom-control-input" id={element} />
                                <label className="custom-control-label" htmlFor={element}>{element}</label>
                            </div>
                        ))}
                        
                        
                    </form>
                </div>
                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filter by price</span></h5>
                <div className="bg-light p-4 mb-30">
                    <form>
                        {prices.map(element=>(
                            <div key={element} className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input checked={element===price?true:false}  onChange={()=>setPrice(element)} type="checkbox" className="custom-control-input" id={element}/>
                                <label className="custom-control-label" htmlFor={element}>{element[1]===1_000_000 ? "All Prices":`${element[0]} - ${element[1]}`}</label>
                            </div>
                        ))}
                    
                    </form>
                </div>
                
                

                
               
            </div>

            <div className="col-lg-9 col-md-8">
                <div className="row pb-3">
                    <div className="col-12 pb-1">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <div>
                                <button className="btn btn-sm btn-light"><i className="fa fa-th-large"></i></button>
                                <button className="btn btn-sm btn-light ml-2"><i className="fa fa-bars"></i></button>
                            </div>
                            <div className="ml-2">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-bs-toggle="dropdown">Sorting</button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <a onClick={()=>setOrder("CreatedAt")} className="dropdown-item" href="#">Latest</a>
                                        <a onClick={()=>setOrder("ratings")} className="dropdown-item" href="#">Best Rating</a>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    {products.length===0?
                        <div className="text-center pt-4">
                            <h2>There is no product with this filters</h2>
                        </div>
                        : products.map(el=>(
                        <div className="col-lg-4 col-md-6 col-sm-6 pb-1">
                        <div className="product-item bg-light mb-4">
                            <div className="product-img position-relative overflow-hidden">
                                <img className="img-fluid w-100" src={el.images[0].url} alt={el.name} />
                                <div className="product-action">
                                    <Link className="btn btn-outline-dark btn-square" to={`/product/${el._id}`}><i className="fa fa-shopping-cart"></i></Link>
                                    <a className="btn btn-outline-dark btn-square" href=""><i className="far fa-heart"></i></a>
                                </div>
                            </div>
                            <div className="text-center py-4">
                                <Link className="h6 text-decoration-none text-truncate" to={`/product/${el._id}`}>{el.name}</Link>
                                <div className="d-flex align-items-center justify-content-center mt-2">
                                    <h5>${el.price}</h5>
                                </div>
                                <div className="d-flex align-items-center justify-content-center mb-1">
                                <small className={`${el.ratings>=1?"fa fa-star text-primary":el.ratings>0?"fa fa-star-half-alt text-primary":"far fa-star text-primary"}  mr-1`}></small>
                                <small className={` ${el.ratings>=2?"fa fa-star text-primary":el.ratings>1?"fa fa-star-half-alt text-primary":"far fa-star text-primary"} mr-1`}></small>
                                <small className={`${el.ratings>=3?"fa fa-star text-primary":el.ratings>2?"fa fa-star-half-alt text-primary":"far fa-star text-primary"} mr-1`}></small>
                                <small className={` ${el.ratings>=4?"fa fa-star text-primary":el.ratings>3?"fa fa-star-half-alt text-primary":"far fa-star text-primary"} mr-1`}></small>
                                <small className={` ${el.ratings>=5?"fa fa-star text-primary":el.ratings>4?"fa fa-star-half-alt text-primary":"far fa-star  text-primary"} mr-1`}></small>
                            
                                    <small>({el.numOfReviews})</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                    
                    
                    {(productsCount>8&&(products.length>=8||currentPage!==1)) && (
                  <div className="d-flex justify-content-center mt-5">
                  <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resPerPage} 
                      totalItemsCount={productsCount}
                      onChange={setCurrentPageNo}
                      nextPageText={"Next"}
                      prevPageText={"Prev"}
                      firstPageText={"First"}
                      lastPageText={"Last"}
                      itemClass="page-item"
                      linkClass='page-link'
                   />
               </div>
              )}
                    
                </div>
            </div>
        </div>
    </div>
    </>} 
    </>
  )
}

export default Shop