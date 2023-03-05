import React,{useEffect,useState} from 'react'
import Sidebar from "./Sidebar"
import {useDispatch,useSelector} from "react-redux"
import {  toast } from 'react-toastify';
import {useNavigate, useParams} from "react-router-dom"
import MetaData from "../layout/MetaData"

import { updateUser,UpdateUserReset,getUserDetails,clearErrors } from '../../slices/user/allUsers';

const UpdateUser = () => {

    
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [role,setRole]=useState("")
    
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const {user,error, isUpdated} =useSelector(state=>state.allUsers)
  
  const {id}=useParams()

  useEffect(() => {

    if(user&& user._id!==id){
        dispatch(getUserDetails(id))
    }else {
        setName(user.name)
        setEmail(user.email)
        setRole(user.role)
    }

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
    if(isUpdated){
            toast.success("User updated successfully", {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
              navigate("/admin/users")
              
              dispatch({
                type:UpdateUserReset
              })
    }
  }, [error,dispatch,navigate,isUpdated,toast,user])

  
  const submitHandler=(e)=>{
    e.preventDefault();

    const formData=new FormData();
    formData.set("name", name)
    formData.set("email", email)
    formData.set("role", role)
    dispatch(updateUser(user._id,formData))
  }

  

  return (
    <>
        <MetaData title={`Update User`}/>
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>

            <div className="col-12 col-md-10">
            <div className="row wrapper">
                <div className="col-10 mx-auto col-lg-5">
                    <form onSubmit={submitHandler} className="shadow p-4 mb-5">
                        <h1 className="mt-2 mb-5">Update User</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input 
								type="name" 
								id="name_field" 
								className="form-control"
                                name='name'
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                                    <label htmlFor="role_field">Role</label>

                                    <select
                                        id="role_field"
                                        className="form-control"
                                        name='role'
                                        value={role}
                                        onChange={(e)=>setRole(e.target.value)}
                                    >
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </div>

                        <button type="submit" className="btn btn-primary btn-block mt-5 text-uppercase font-weight-bold" >Update</button>
                    </form>
                </div>
            </div>
        
            </div>
        </div>
    </>
  )
}

export default UpdateUser