import {BrowserRouter as Router,Routes, Route} from "react-router-dom"
import axios from "axios"
import {  ToastContainer } from 'react-toastify';
import { useEffect,useState } from "react";
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import Home from "./components/Home"
import ProductDetails from "./components/product/productDetails";
 
import "./style.css"
import "../assets/lib/animate/animate.min.css"
import "../assets/lib/owlcarousel/assets/owl.carousel.min.css"

//Auth Imports
import Login from "./components/user/Login"
import Register from "./components/user/Register";
import Profile from "./components/user/Profile"
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";

import  {loadUser} from "./slices/user/user"
import {store} from "./store"
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import Shop from "./components/Shop";

//Order Imports
import ListOrders from "./components/order/ListOrders"
import OrderDetails from "./components/order/OrderDetails";


//Admin imports
import Dashboard from "./components/admin/Dashboard";
//Payment

import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";


import {useSelector} from "react-redux"
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import SimulatePayment from "./components/cart/SimulatePayment";



function App() {

  const [stripeApiKey,setStripeApiKey]=useState("")
  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripeApiKey(){
      const {data}=await axios.get(`https://jalveryshopapi.onrender.com/api/v1/stripeapi`);
      setStripeApiKey(data.stripeApiKey)
    }

    getStripeApiKey()
    

  }, [])

  const {user,loading}=useSelector(state=>state.auth)
  
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}  />
          <Route path="/shop/search/:keyword" element={<Shop/>}  />
          <Route path="/product/:id" element={<ProductDetails/>}  />
          <Route path="/cart" element={<Cart/>}  />
          
          
          <Route path="/login" element={<Login/>}  />
          <Route path="/register" element={<Register/>}  />
          <Route path="/password/forgot" element={<ForgotPassword/>}  />
          <Route path="/password/reset/:token" element={<NewPassword/>}  />
          <Route path="/shop" 
            element={<Shop />} />
          <Route path="/me" 
            element={<ProtectedRoute >
                        <Profile />     
                  </ProtectedRoute >} />
          <Route path="/me/update" 
            element={<ProtectedRoute >
                        <UpdateProfile />     
                  </ProtectedRoute >} />
            <Route path="/order/confirm" 
            element={<ProtectedRoute >
                        <ConfirmOrder />     
                  </ProtectedRoute >} />
            {stripeApiKey? 
              
            <Route path="/payment" 
            element={<ProtectedRoute >
                      <Elements stripe={loadStripe(stripeApiKey)} >
                          <Payment /> 
                      </Elements>     
                  </ProtectedRoute>} />:
            <Route path="/payment" 
                element={<ProtectedRoute >
                          <SimulatePayment />    
                      </ProtectedRoute>} />
              
              }
          <Route path="/shipping" 
            element={<ProtectedRoute >
                        <Shipping />     
                  </ProtectedRoute >} />
          <Route path="/password/update" 
            element={<ProtectedRoute >
                        <UpdatePassword />     
                  </ProtectedRoute >} />

          <Route path="/orders/me" 
            element={<ProtectedRoute >
                        <ListOrders />     
                  </ProtectedRoute >} />
          <Route path="/order/:id" 
            element={<ProtectedRoute >
                        <OrderDetails />     
                  </ProtectedRoute >} />

          <Route path="/dashboard" 
            element={<ProtectedRoute isAdmin={true} >
                        <Dashboard />     
                  </ProtectedRoute >} />
          <Route path="/admin/products" 
            element={<ProtectedRoute isAdmin={true} >
                        <ProductList />     
                  </ProtectedRoute >} />
          
          <Route path="/admin/product" 
            element={<ProtectedRoute isAdmin={true} >
                        <NewProduct />     
                  </ProtectedRoute >} />
          <Route path="/admin/product/:id" 
            element={<ProtectedRoute isAdmin={true} >
                        <UpdateProduct />     
                  </ProtectedRoute >} />
          <Route path="/admin/orders" 
            element={<ProtectedRoute isAdmin={true} >
                        <OrdersList />     
                  </ProtectedRoute >} />
          <Route path="/admin/order/:id" 
            element={<ProtectedRoute isAdmin={true} >
                        <ProcessOrder />     
                  </ProtectedRoute >} />
          <Route path="/admin/users" 
            element={<ProtectedRoute isAdmin={true} >
                        <UsersList />     
                  </ProtectedRoute >} />
                  <Route path="/admin/user/:id" 
            element={<ProtectedRoute isAdmin={true} >
                        <UpdateUser />     
                  </ProtectedRoute >} />
          
        </Routes>
        <ToastContainer toastStyle={{background:"black",color:"white"}}/>
        {!loading &&user && user.role!=="admin"&&(
          <Footer/>
          
        )}
        {!user && <Footer/>}
        
      </div>
    </Router>
  );
}

export default App;