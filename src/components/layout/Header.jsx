import {Link,useLocation} from "react-router-dom"
import {logout} from "../../slices/user/user"
import {useDispatch,useSelector} from "react-redux"
import {toast} from "react-toastify"
import Search from "./Search"
import DefaultUser from "../../../assets/img/default_user.png"

import React from "react"
const categories=[
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
const Header = () => {

  const dispatch=useDispatch()

  const {user}=useSelector(state=>state.auth)
  const {cartItems}=useSelector(state=>state.cart)

 const {pathname}=useLocation()
 
 
  
 
  
  const logoutHandler=()=>{
      dispatch(logout())
      setTimeout(()=>{
        toast.success("Logged out successfully", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        },100)
  }
  return (
    <>
    <div className="container-fluid">
        <div className="row bg-secondary py-1 px-xl-5">
            <div className="col-lg-6 d-none d-lg-block">
                <div className="d-inline-flex align-items-center h-100">
                    <Link className="text-body mr-3" to="#!">About</Link>
                    <Link className="text-body mr-3" to="#!">Contact</Link>
                    <Link className="text-body mr-3" to="#!">Help</Link>
                    <Link className="text-body mr-3" to="#!">FAQs</Link>
                </div>
            </div>
            <div className="col-lg-6 text-center text-lg-right">
                <div className="d-inline-flex align-items-center">
                    <div className="btn-group">
                        {user? 
                            <>
                                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-bs-toggle="dropdown"><img style={{width:"30px"}} className="rounded" src={`${user.avatar?user.avatar.url :DefaultUser}`} alt={user.name} /> {user.name}</button>
                        
                                    <div aria-labelledby='dropDownMenuButton' className="dropdown-menu dropdown-menu-right">
                          
                                    <button className="dropdown-item" type="button"><Link style={{textDecoration:"none",color:"black"}} to="/me">Profile</Link></button>
                                    {user.role==="admin"&&(
                                        <button  className="dropdown-item" type="button"><Link style={{textDecoration:"none"}} to="/dashboard">Dashboard</Link> </button>
                                    )}
                                    <button  className="dropdown-item" type="button"><Link style={{textDecoration:"none",color:"black"}} to="/orders/me">Orders</Link> </button>
                                    <button onClick={logoutHandler} className="dropdown-item" type="button"><Link style={{textDecoration:"none",color:"red"}} to="/">Logout</Link> </button>
                         
                            
                        </div>
                            </>
                                 : 
                                 <>
                                    <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-bs-toggle="dropdown"> My Profile</button>
                        
                        <div aria-labelledby='dropDownMenuButton' className="dropdown-menu dropdown-menu-right">
                          
                            <button className="dropdown-item" type="button"><Link style={{textDecoration:"none",color:"black"}} to="/login">Sign in</Link> </button>
                            <button className="dropdown-item" type="button"><Link style={{textDecoration:"none",color:"black"}} to="/register">Sign up</Link></button>
                         
                            
                        </div>
                                 </>
                                 }
                       
                        
                    </div>
              
                    <div className="btn-group mx-2">
                        <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-bs-toggle="dropdown">USD</button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <button className="dropdown-item" type="button">EUR</button>
                            <button className="dropdown-item" type="button">CUP</button>
                        </div>
                    </div>
                    <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-bs-toggle="dropdown">EN</button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <button className="dropdown-item" type="button">ESP</button>
                        </div>
                    </div>
                </div>
                <div className="d-inline-flex align-items-center d-block d-lg-none">
                    <Link to="#!" className="btn px-0 ml-2">
                        <i className="fas fa-heart text-dark"></i>
                        <span className="badge text-dark border border-dark rounded-circle" style={{paddingBottom:"2px"}}>0</span>
                    </Link>
                    <Link  to="/cart" className="btn px-0 ml-2">
                        <i className="fas fa-shopping-cart text-dark"></i>
                        <span className="badge text-dark border border-dark rounded-circle" style={{paddingBottom:"2px"}}>{cartItems.length}</span>
                    </Link>
                </div>
            </div>
        </div>
        <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
            <div className="col-lg-4">
                <a href="" className="text-decoration-none">
                <Link  style={{textDecoration:"none"}} to="/">
                  <span className="h1 text-uppercase text-primary bg-dark px-2">JALVERY</span>
                    <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">Shop</span>

                </Link>
                    
                </a>
            </div>
            <div className="col-lg-4 col-6 text-left">
              <Search />
                
            </div>
            <div className="col-lg-4 col-6 text-right">
                <p className="m-0">Customer Service</p>
                <h5 className="m-0">+53 55414804</h5>
            </div>
        </div>
    </div>


    

    <div className="container-fluid bg-dark mb-30">
        <div className="row px-xl-5">
            <div className="col-lg-3 d-none d-lg-block">
                <a id="categoryCollapse" className="btn d-flex align-items-center justify-content-between bg-primary w-100" data-bs-toggle="collapse" href="#navbar-vertical" style={{padding:"0 30px",height:"65px"}} >
                    <h6 className="text-dark m-0"><i className="fa fa-bars mr-2"></i>Categories</h6>
                    <i className="fa fa-angle-down text-dark"></i>
                </a>
                <nav className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" id="navbar-vertical" style={{zIndex:"999",width:"calc(100% - 30px)"}}>
                    <div className="navbar-nav w-100">
                        {categories.map(category=>(
                            
                                <Link onClick={()=>document.querySelector("#categoryCollapse").click()} key={category}  className="nav-item nav-link"   to={`/shop/search/${category}`}>{category} </Link>
                            
                                    
                            ))}
                        
                    </div>
                </nav>
            </div>
            <div className="col-lg-9">
                <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                    <Link to="/" className="text-decoration-none d-block d-lg-none">
                        <span className="h1 text-uppercase text-dark bg-light px-2">Jalvery</span>
                        <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
                    </Link>
                    <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div className="navbar-nav mr-auto py-0">
                            <Link to="/" className={`nav-item nav-link ${pathname==="/"&&"active"}`}>Home</Link>
                            <Link to="/shop" className={`nav-item nav-link ${pathname.includes("/shop")&&"active"}`}>Shop</Link>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages <i className="fa fa-angle-down mt-1"></i></a>
                                <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                                    <Link to="/cart" className="dropdown-item">Shopping Cart</Link>
                                    <Link to="/shipping" className="dropdown-item">Checkout</Link>
                                </div>
                            </div>
                            {user && user.role==="admin"&&<Link to="/dashboard" className={`nav-item nav-link ${pathname==="/dashboard"&&"active"}}`}>Dashboard</Link> } 
                            
                        </div>
                        <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                            <Link to="#!" className="btn px-0">
                                <i className="fas fa-heart text-primary"></i>
                                <span className="badge text-secondary border border-secondary rounded-circle" style={{paddingBottom:"2px"}}>0</span>
                            </Link>
                            <Link to="/cart" className="btn px-0 ml-3">
                                <i className="fas fa-shopping-cart text-primary"></i>
                                <span className="badge text-secondary border border-secondary rounded-circle" style={{paddingBottom:"2px"}}>{cartItems.length}</span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
    </>
  )
}

export default Header