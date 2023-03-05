import React,{useEffect,useState} from 'react'

import {useDispatch,useSelector} from "react-redux"
import { register,clearErrors } from '../../slices/user/user'
import {  toast,ToastContainer } from 'react-toastify';
import {useNavigate,Link} from "react-router-dom"
import MetaData from "../layout/MetaData"


const Register = () => {
    
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:""
    })

    const {name,email,password} =user;
    const [avatar,setAvatar]=useState("")
    const [avatarPreview,setAvatarPreview]=useState("/images/default_avatar.png")
    const [validationError,setValidationError]=useState("")
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const {isAuthenticated, error, loading} =useSelector(state=>state.auth)
  
  useEffect(() => {

    if(isAuthenticated){
        navigate(`/`)
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

    if(validationError){
      setTimeout(()=>{
        toast.error(validationError, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        setValidationError("")
      },100)
}
  }, [dispatch,isAuthenticated,error,loading,validationError])
  
  const submitHandler=(e)=>{
    e.preventDefault();
    const mailformat = /^([A-Za-z0-9_\-\-])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(!email.match(mailformat)){
      setValidationError("Please input a valid email")
      return;
    }else if(password.length<8){
      setValidationError("Password must have at least 8 characters ")
      return;
    }
    const formData=new FormData();
    formData.set("name", name)
    formData.set("email", email)
    formData.set("password", password)
    formData.set("avatar", avatar)

    dispatch(register(formData))
  }

  const onChange=e=>{
     setUser({...user,[e.target.name]:e.target.value})
    
  }
  return (
    <>
        <MetaData title={"Register user"} />
        <form onSubmit={submitHandler} className='container w-50  p-5 border shadow rounded'>
        <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label"><i className="fa fa-user"></i>   Name</label>
    <input 
                type="name" 
                id="name_field" 
                className="form-control" 
                name="name"
                value={name}
                onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label"><i className="fa fa-envelope"></i>   Email address</label>
    <input type="email" name="email"  value={email}  onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label"><i className="fa fa-key"></i>  Password</label>
    <input  value={password} name="password" onChange={onChange} type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className='text-center p-3'>
  <button type="submit" className="btn h2 text-uppercase text-dark bg-primary ">
    <span className="h5 text-uppercase text-dark bg-primary px-2 ml-n1">Register</span>
  </button>
  
  </div>
  <div className='text-center p-2'>
     <span>Already have an account?</span> <Link style={{color:"#2700ff"}} to="/login">Sign in here</Link>
  </div>
 
</form>
    
    </>
  )
}

export default Register