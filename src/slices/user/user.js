import {   createSlice } from "@reduxjs/toolkit";
import axios from "axios"


const initialState={
    loading:false,
    isAuthenticated:false,
    user:{},
    error:null,
    message:"",
    isUpdated:false,
    success:false
}


 const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        LoginRequest:(state)=>{
            state.loading=true;
            state.isAuthenticated=false

        },
        LoadUserRequest:(state)=>{
            state.loading=true;
            state.isAuthenticated=false;

        },
        RegisterUserRequest:(state)=>{
            state.loading=true;
            state.isAuthenticated=false;

        },
        ForgotPasswordRequest:(state)=>{
            state.loading=true;
            state.error=null;

        },
        NewPasswordRequest:(state)=>{
            state.loading=true;
            state.error=null;

        },
        LoginSuccess:(state,action)=>{  
            state.loading=false;
            state.isAuthenticated=true;
            state.user=action.payload
        },
        LoadUserSuccess:(state,action)=>{  
            state.loading=false;
            state.isAuthenticated=true;
            state.user=action.payload
        },
        RegisterUserSuccess:(state,action)=>{  
            state.loading=false;
            state.isAuthenticated=true;
            state.user=action.payload
        },
        ForgotPasswordSuccess:(state,action)=>{  
            state.message=action.payload;
            state.loading=false
        },
        NewPasswordSuccess:(state,action)=>{  
            state.success=action.payload;
            state.loading=false
        },
        ForgotPasswordFail:(state,action)=>{  
            state.error=action.payload;
            state.loading=false;
        },
        LoginFail:(state,action)=>{
            state.loading=false;
            state.isAuthenticated=false;
            state.user=null,
            state.error=action.payload
        },
        RegisterUserFail:(state,action)=>{
            state.loading=false;
            state.isAuthenticated=false;
            state.user=null,
            state.error=action.payload
        },
        LoadUserFail:(state,action)=>{
            state.loading=false;
            state.isAuthenticated=false;
            state.user=null,
            state.error=action.payload
        },
        NewPasswordFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        LogoutFail:(state,action)=>{
            state.loading=false;
            state.isAuthenticated=false;
            state.user=null,
            state.error=action.payload
        },
        LogoutSuccess:(state)=>{
            state.loading=false;
            state.isAuthenticated=false;
            state.user=null
        },
        UpdateProfileRequest:(state)=>{
            state.loading=true;
        },
        
        UpdateProfileSuccess:(state,action)=>{
            state.loading=false;
            state.isUpdated=action.payload
        },
        UpdateProfileFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        UpdateProfileReset:(state)=>{
            state.isUpdated=false;
        },
        UpdatePasswordRequest:(state)=>{
            state.loading=true;
        },
        
        UpdatePasswordSuccess:(state,action)=>{
            state.loading=false;
            state.isUpdated=action.payload
        },
        UpdatePasswordReset:(state,action)=>{
            state.loading=false;
            state.isUpdated=action.payload
        },
        UpdatePasswordFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        ClearErrors:(state)=>{
         state.error=null
        }
    },
 })

 

 //Login
 export const login=(email, password)=>async(dispatch)=> {
    try {
        dispatch({type: LoginRequest})

        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const {data}=await axios.post(`https://jalveryshopapi.onrender.com/api/v1/login`,{email,password},config)
        dispatch({
            type:LoginSuccess,
            payload:data.user
        })
      
        
    
    } catch (error) {
        dispatch({
            type:LoginFail,
            payload:error.response ? error.response.data.errMessage:error.message
        })
        
    }
 }


 //Register User
 export const register=(userData)=>async(dispatch)=> {
    try {
        dispatch({type: RegisterUserRequest})

        const config={
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
        const {data}=await axios.post(`https://jalveryshopapi.onrender.com/api/v1/register`,userData,config)
        console.log(data);
        dispatch({
            type:RegisterUserSuccess,
            payload:data.user
        })
    
    } catch (error) {
        dispatch({
            type:RegisterUserFail,
            payload:error.response ? error.response.data.errMessage:error.message
        })
        
    }
 }


 //Load user
 export const loadUser=()=>async(dispatch)=> {
    try {
        dispatch({type: LoadUserRequest})
        const {data}=await axios.get(`https://jalveryshopapi.onrender.com/api/v1/me`)  

        dispatch({
            type:LoadUserSuccess,
            payload:data.user
        })
        
    
    } catch (error) {
        dispatch({
            type:LoadUserFail
        })
        
    }
 }

 //Logout user
 export const logout=()=>async(dispatch)=> {
    try {
        const {data}=await axios.get(`https://jalveryshopapi.onrender.com/api/v1/logout`)    
        
        dispatch({
            type:LogoutSuccess
        })
        
    
    } catch (error) {
        dispatch({
            type:LogoutFail,
            payload:error.response ? error.response.data.errMessage:error.message
        })
        
    }
 }

  //Update Profile
  export const updateProfile=(userData)=>async(dispatch)=> {
    try {
        dispatch({type: UpdateProfileRequest})
        
        const config={
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
        const {data}=await axios.put(`https://jalveryshopapi.onrender.com/api/v1/me/update`,userData,config)
        
        dispatch({
            type:UpdateProfileSuccess,
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type:UpdateProfileFail,
            payload:error.response?(error.response.data.error.codeName==="DuplicateKey"&& error.response.data.error.keyPattern.email)? "This email address is already taken": error.response.data.errMessage:error.message
        })
        
    }
 }

 //Update Password
 export const updatePassword=(passwords)=>async(dispatch)=> {
    try {
        dispatch({type: UpdatePasswordRequest})

        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const {data}=await axios.put(`https://jalveryshopapi.onrender.com/api/v1/password/update`,passwords,config)
        
        dispatch({
            type:UpdatePasswordSuccess,
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type:UpdatePasswordFail,
            payload:error.response ? error.response.data.errMessage:error.message
        })
        
    }
 }


 //Forgot Password
 export const forgotPassword=(email)=>async(dispatch)=> {
    try {
        dispatch({type: ForgotPasswordRequest})

        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const {data}=await axios.post(`https://jalveryshopapi.onrender.com/api/v1/password/forgot`,email,config)
        
        dispatch({
            type:ForgotPasswordSuccess,
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:ForgotPasswordFail,
            payload:error.response ? error.response.data.errMessage:error.message
        })
        
    }
 }

 //Reset Password
 export const resetPassword=(token, passwords)=>async(dispatch)=> {
    try {
        dispatch({type: NewPasswordRequest})

        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const {data}=await axios.put(`https://jalveryshopapi.onrender.com/api/v1/password/reset/${token}`,passwords,config)
        
        dispatch({
            type:NewPasswordSuccess,
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:NewPasswordFail,
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
 export const{NewPasswordRequest,NewPasswordSuccess,ForgotPasswordFail,ForgotPasswordRequest,ForgotPasswordSuccess,UpdatePasswordReset,UpdatePasswordFail,UpdatePasswordRequest,UpdatePasswordSuccess,UpdateProfileFail,UpdateProfileRequest,UpdateProfileReset,UpdateProfileSuccess,ClearErrors,LoginFail,LoginRequest,LoginSuccess,RegisterUserFail,RegisterUserRequest,RegisterUserSuccess,LoadUserFail,LoadUserRequest,LoadUserSuccess,LogoutFail,LogoutSuccess}=authSlice.actions;
 
 export default authSlice.reducer;