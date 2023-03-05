import React,{useEffect,useState} from 'react'

import {useDispatch,useSelector} from "react-redux"
import { login,clearErrors } from '../../slices/user/user'
import {  toast,ToastContainer } from 'react-toastify';
import { Link,useNavigate,useLocation } from 'react-router-dom'


import Loader from "../layout/Loader"
import MetaData from "../layout/MetaData"


const Login = () => {

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const location=useLocation()
  const {isAuthenticated, error, loading} =useSelector(state=>state.auth)
  
  const redirect= location.search ? `/`+location.search.split("=")[1]:"/"
  
  useEffect(() => {
    console.log(redirect);
    if(isAuthenticated){
        navigate(redirect)
    }
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
  }, [dispatch,isAuthenticated,error,loading])
  
  const submitHandler=(e)=>{
    e.preventDefault();
    dispatch(login(email,password))
  }
  
  
  return (
    <>
        {loading ? <Loader />:(
            <>
                <MetaData title={"Login"} />
                    <form onSubmit={submitHandler} className='container w-50  p-5 border shadow rounded'>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label"><i className="fa fa-envelope"></i>   Email address</label>
    <input type="email"  value={email}  onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label"><i className="fa fa-key"></i>  Password</label>
    <input  value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className='text-center p-2'>
    <Link style={{color:"#2700ff"}} to="/password/forgot">Forgot password?</Link>
  </div>
  <div className='text-center'>
  <button type="submit" className="btn h2 text-uppercase text-dark bg-primary ">
    <span className="h5 text-uppercase text-dark bg-primary px-2 ml-n1">Log in</span>
  </button>
  
  </div>
  <div className='text-center p-2'>
     <span>Don`t have an account yet?</span> <Link style={{color:"#2700ff"}} to="/register">Sign up here</Link>
  </div>
 
</form>
            
            </>
        )}
    
    </>
  )
}

export default Login;