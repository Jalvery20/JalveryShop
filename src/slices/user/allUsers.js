import {   createSlice } from "@reduxjs/toolkit";
import axios from "axios"


const initialState={
    loading:false,
    users:[],
    isUpdated:false,
    user:{},
    isDeleted:false
}


 const allUsersSlice=createSlice({
    name:"allUsers",
    initialState,
    reducers:{
        AllUsersRequest:(state)=>{
            state.loading=true;

        },
        DeleteUserRequest:(state)=>{
            state.loading=true;

        },
        UpdateUserRequest:(state)=>{
            state.loading=true;

        },
        UserDetailsRequest:(state)=>{
            state.loading=true;

        },
        
        AllUsersSuccess:(state,action)=>{ 
            state.users=action.payload,
            state.loading=false;
        },
        UpdateUserSuccess:(state,action)=>{ 
            state.isUpdated=action.payload,
            state.loading=false;
        },
        DeleteUserSuccess:(state,action)=>{ 
            state.isDeleted=action.payload,
            state.loading=false;
        },
        UserDetailsSuccess:(state,action)=>{ 
            state.loading=false,
            state.user=action.payload;
        },
        AllUsersFail:(state,action)=>{  
            state.error=action.payload;
            state.loading=false;
        },
        UpdateUserFail:(state,action)=>{  
            state.error=action.payload;
            state.loading=false;
        },
        UserDetailsFail:(state,action)=>{  
            state.error=action.payload;
            state.loading=false;
        },
        DeleteUserFail:(state,action)=>{  
            state.error=action.payload;
            state.loading=false;
        },
        UpdateUserReset:(state)=>{  
            state.isUpdated=false;
        },
        DeleteUserReset:(state)=>{  
            state.isDeleted=false;
        },
        ClearErrors:(state)=>{
         state.error=null
        }
    },
 })


 
 //All users
 export const allUsers=()=>async(dispatch)=> {
    try {
        dispatch({type: AllUsersRequest})
        const {data}=await axios.get(`https://jalveryshopapi.onrender.com/api/v1/admin/users`)  

        dispatch({
            type:AllUsersSuccess,
            payload:data.users
        })
        
    
    } catch (error) {
        dispatch({
            type:AllUsersFail,
            payload:error.response ? error.response.data.errMessage:error.message
            })
        
    }
 }
 

 //Update user ADMIN
 export const updateUser=(id,userData)=>async(dispatch)=> {
    try {
        dispatch({type: UpdateUserRequest})

        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const {data}=await axios.put(`https://jalveryshopapi.onrender.com/api/v1/admin/user/${id}`,userData,config)
        
        dispatch({
            type:UpdateUserSuccess,
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type:UpdateUserFail,
            payload:error.response ? error.response.data.errMessage:error.message
        })
        
    }
 }

 
 //Get user  details ADMIN
 export const getUserDetails=(id)=>async(dispatch)=> {
    try {
        dispatch({type: UserDetailsRequest})

        const {data}=await axios.get(`https://jalveryshopapi.onrender.com/api/v1/admin/user/${id}`)
        
        dispatch({
            type:UserDetailsSuccess,
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type:UserDetailsFail,
            payload:error.response ? error.response.data.errMessage:error.message
        })
        
    }
 }

 
 //Delete user ADMIN
 export const deleteUser=(id)=>async(dispatch)=> {
    try {
        dispatch({type: DeleteUserRequest})
        
        const {data}=await axios.delete(`https://jalveryshopapi.onrender.com/api/v1/admin/user/${id}`)

        
        dispatch({
            type:DeleteUserSuccess,
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type:DeleteUserFail,
            payload:error.response ? error.response.data.errMessage:error.message
        })
        
    }
 }


 //Clear Errors
export const clearErrors=()=>async(dispatch)=>{
    dispatch({
        type:ClearErrors 
    })
}
 export const{DeleteUserFail,DeleteUserRequest,DeleteUserReset,DeleteUserSuccess,UserDetailsFail,UserDetailsRequest,UserDetailsSuccess,UpdateUserFail,UpdateUserRequest,UpdateUserReset,UpdateUserSuccess,AllUsersFail,AllUsersRequest,AllUsersSuccess,ClearErrors}=allUsersSlice.actions;
 
 export default allUsersSlice.reducer;