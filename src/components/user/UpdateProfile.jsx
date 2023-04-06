import React,{useEffect,useState} from 'react'

import {useDispatch,useSelector} from "react-redux"
import { updateProfile,UpdateProfileReset,loadUser,clearErrors } from '../../slices/user/user'
import {  toast,ToastContainer } from 'react-toastify';
import {useNavigate} from "react-router-dom"
import MetaData from "../layout/MetaData"
import Loader from '../layout/Loader';

import defaultUser from "../../../assets/img/default_user.png"


const UpdateProfile = () => {

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [avatar,setAvatar]=useState("")
    const [avatarPreview,setAvatarPreview]=useState(defaultUser)

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const { user , error, isUpdated,loading} =useSelector(state=>state.auth)

  useEffect(() => {

    if(user){
        setName(user.name)
        setEmail(user.email)
        if(user.avatar) setAvatarPreview(user.avatar.url)
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
              dispatch(loadUser())
              navigate("/me")
              
              dispatch({
                type:UpdateProfileReset
              })
    }
  }, [dispatch,navigate,isUpdated])

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
        
  }, [error])
  
  const submitHandler=(e)=>{
    e.preventDefault();

    const formData=new FormData();
    formData.set("name", name)
    formData.set("email", email)
    formData.set("avatar", avatar)
    dispatch(updateProfile(formData))
  }

  

  const onChange=e=>{

    function getFileExtension(fileName){
        var  fileExtension;
        fileExtension = fileName.replace(/^.*\./, '');
        return fileExtension;
    }
    function isIMage(fileName){
        var fileExt = getFileExtension(fileName);
        var imagesExtension = ["png", "jpg", "jpeg"];
        if(imagesExtension.indexOf(fileExt) !== -1){
            return true;
        } else{
            return false;
        }
    }
    if(!isIMage(e.target.files[0].name)){
          toast.error("You have to upload an image", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return;
    }
        
        
        const reader=new FileReader();
        
        reader.onload=()=>{
            if(reader.readyState===2){
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
        
  }
  return (
    <>
        <MetaData title={"Update Profile"} />
        {loading ? <Loader/> :
            <div className="row container-fluid">
            <div className=" p-5 m-auto w-50">
                <form className="shadow-lg p-5" onSubmit={submitHandler} encType='multipart/form-data'>
                    <h1 className="mt-2 mb-5">Update Profile</h1>

                    <div className="form-group">
                        <label htmlFor="email_field">Name</label>
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

                    <div className='form-group'>
                        <label htmlFor='avatar_upload'>Avatar</label>
                        <div className='d-flex align-items-center'>
                            <div>
                                <figure className='avatar mr-3 item-rtl'>
                                    <img
                                        style={{width:"40px"}}
                                        src={avatarPreview}
                                        
                                        alt='Avatar Preview'
                                    />
                                </figure>
                            </div>
                            <div className='custom-file'>
                                <input
                                    type='file'
                                    name='avatar'
                                    className='custom-file-input'
                                    id='customFile'
                                    accept='image/*'
                                    onChange={onChange}
                                />
                                <label className='custom-file-label' htmlFor='customFile'>
                                    Choose Avatar
                            </label>
                            </div>
                        </div>
                    </div>

                    <button disabled={loading ? true : false} type="submit" className="btn btn-warning   btn-block mt-4 mb-3" >
                      <span className='h5 text-uppercase text-dark px-2 ml-n1'>
                      Update
                      </span>  
                    </button>
                </form>
            </div>
        </div>
        }
        
    
    </>
  )
}

export default UpdateProfile