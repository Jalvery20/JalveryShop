import React,{useEffect,useState} from 'react'

import {useDispatch,useSelector} from "react-redux"
import { updatePassword,clearErrors, UpdatePasswordReset } from '../../slices/user/user'
import {  toast,ToastContainer } from 'react-toastify';
import {useNavigate} from "react-router-dom"
import MetaData from "../layout/MetaData"

import {loadUser} from "../../slices/user/user"

const UpdatePassword = () => {
    const [oldPassword,setOldPassword]=useState("")
    const [password,setPassword]=useState("")

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const { error, isUpdated,loading} =useSelector(state=>state.auth)

  useEffect(() => {

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
    if(isUpdated){
        setTimeout(()=>{
            toast.success("Password updated successfully", {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
              dispatch(loadUser())
              navigate("/me")
              
              dispatch({
                type:UpdatePasswordReset
              })
          },100)
    }
  }, [dispatch,navigate,error,isUpdated])
  
  const submitHandler=(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.set("oldPassword", oldPassword)
    formData.set("newPassword", password)

    dispatch(updatePassword(formData))
  }

    return (

    <>
            <MetaData title={"Change Password"} />
        <div className="p-5 container-fluid">
                <div className="m-auto p-5 ">
                    <form onSubmit={submitHandler} className="shadow-lg m-auto w-50 p-5">
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e)=>setOldPassword(e.target.value)}
                            
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>

                        <button  disabled={loading ? true : false} type="submit" className="btn btn-warning btn-block mt-4 mb-3">
                          <span className='h5 text-uppercase text-dark px-2 ml-n1'>
                          Update Password
                          </span>
                          </button>
                    </form>
                </div>
            </div>
    </>
  )
}

export default UpdatePassword