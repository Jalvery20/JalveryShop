import React from 'react'
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

const Profile = () => {
    const { user , loading }=useSelector(state=>state.auth)

    return (
    <>
    
        {loading ? <Loader />:
        (
            <>
                <MetaData title={"Your Profile"} />
                <h2 className="mt-5 ml-5">My Profile</h2>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <figure className='avatar text-center avatar-profile'>
                                <img className=" img-fluid" src={user.avatar?user.avatar.url : "/img/default_user.png"} alt={user.name} />
                            </figure>
                            <Link to="/me/update" id="edit_profile" className="btn btn-warning btn-block my-5  ">
                                <span className='h5 text-uppercase text-dark px-2 ml-n1'>
                                Edit Profile
                                
                                </span> 
                            </Link>
                        </div>
     
                        <div className="col-12 col-md-5">
                            <h4>Full Name</h4>
                            <p>{user.name}</p>
        
                            <h4>Email Address</h4>
                            <p>{user.email}</p>

                            <h4>Joined On</h4>
                            <p>{String(user.createdAt).substring(0,10) }</p>
                            {user.role!== "admin" &&(
                                <Link to="/orders/me" className="btn btn-warning btn-block mt-5">
                                   <span className='h5 text-uppercase  text-dark px-2 ml-n1'>
                                   My Orders
                                   </span> 
                                   
                                    
                                </Link>
                            )}
                            

                            <Link to="/password/update" className="btn btn-warning btn-block mt-3">
                            <span className='h5 text-uppercase text-dark px-2 ml-n1'>
                                Change Password
                            </span> 
                            </Link>
                        </div>
                    </div>
            </>
        )}
    </>
  )
}

export default Profile