import React,{useEffect,useState} from 'react'

import {useDispatch,useSelector} from "react-redux"
import { forgotPassword,clearErrors } from '../../slices/user/user'
import {  toast,ToastContainer } from 'react-toastify';
import MetaData from "../layout/MetaData"

import {loadUser} from "../../slices/user/user"



const ForgotPassword = () => {

    const [email,setEmail]=useState("")
  
  const dispatch=useDispatch()

  const { error,loading, message} =useSelector(state=>state.auth)

  useEffect(() => {

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
    
    if(message){
            toast.success(message, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
              dispatch(loadUser())
              
              dispatch({
                type:forgotPassword
              })
    }
  }, [dispatch,message,error])
  
  const submitHandler=(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.set("email", email)

    dispatch(forgotPassword(formData))
  }


  return (
    <>
    <MetaData title={"Forgot Password"} />
        <div className="row ">
                <div className="col-10 m-auto">
                    <form onSubmit={submitHandler} className="shadow-lg w-50 m-auto p-5">
                        <h1 className="mb-5">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                            />
                        </div>
                        <div className="p-3 text-center">
                        <button
                            disabled={ loading ? true : false}
                            id="forgot_password_button"
                            type="submit"
                            className="btn text-center btn-warning  py-2">
                            <span className='h6 text-uppercase text-dark px-2 ml-n1'>
                                Send Email
                            </span>  
                    </button>
                        </div>
                        

                    </form>
                </div>
            </div>
    </>
  )
}

export default ForgotPassword