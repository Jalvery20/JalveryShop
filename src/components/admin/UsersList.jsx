import React,{useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import Sidebar from "./Sidebar"
import {  toast } from 'react-toastify';
import MetaData from "../layout/MetaData"
import {Link,useNavigate} from "react-router-dom"

import {MDBDataTable} from "mdbreact"
import Loader from "../layout/Loader"

import { allUsers,clearErrors, deleteUser } from '../../slices/user/allUsers';
import { DeleteUserReset } from '../../slices/user/allUsers';


const UsersList = () => {

  const navigate=useNavigate()
  const dispatch=useDispatch();
  const {loading,error,users,isDeleted}=useSelector(state=>state.allUsers)
  
  useEffect(() => {
      dispatch(allUsers())

      if(error){
          toast.error(error,{
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
              dispatch(clearErrors())
      }
      if(isDeleted){
          toast.success("User Deleted successfully ",{
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
              navigate("/admin/users")
              dispatch(clearErrors())
              dispatch({type:DeleteUserReset})
      } 
  }, [navigate,dispatch,toast,error,isDeleted])


  const deleteUserHandler=(id)=>{
    dispatch(deleteUser(id))
  }
  const setUsers=()=>{
      const data={
          columns:[
              {
                  label:"User ID",
                  field:"id",
                  sort:"asc"
              },
              {
                  label:"Name",
                  field:"name",
                  sort:"asc"
              },
              {
                  label:"Email",
                  field:"email",
                  sort:"asc"
              },
              {
                  label:"Role",
                  field:"role",
                  sort:"asc"
              },
              {
                  label:"Actions",
                  field:"actions",
              }

          ],
          rows:[]
      }

      users.forEach(user=>{
          data.rows.push({
              id:user._id,
              name:user.name,
              email:user.email,
              role:user.role,
                 
              actions: <> 
                      <Link className='btn btn-primary py-1 px-2' to={`/admin/user/${user._id}`}>
                          <i className='fa fa-pen'></i>
                      </Link>   
                      <button onClick={()=>deleteUserHandler(user._id)} className="btn btn-danger py-1 px-2 ml-2" >
                          <i className='fa fa-trash'></i>
                      </button>  
                      </>   
          })
      })

      return data
  }

  return (
    <>
    <MetaData title={"All Users"}/>
    <div className="row">
        <div className="col-12 col-md-2">
            <Sidebar/>
        </div>

        <div className="col-12 col-md-10">
            <>
                <h1>All Users</h1>
    
                {loading? <Loader/>:
                <>
                 <MDBDataTable
                    data={setUsers()}
                    className="px-3"
                    bordered
                    striped
                    hover/>
                </>}
            </>
        </div>
    </div>
</>
  )
}

export default UsersList