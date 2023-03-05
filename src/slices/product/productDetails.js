import {   createSlice } from "@reduxjs/toolkit";
import axios from "axios"


const initialState={
    loading:false,
    error:null,
    product:{},
    success:null
    
}

 const productDetailSlice=createSlice({
    name:"productDetail",
    initialState,
    reducers:{
        ProductDetailsRequest:(state)=>{
                state.loading= true;
    
        },
        NewReviewRequest:(state)=>{
            state.loading= true;

        },
        ProductDetailsSuccess:(state,action)=>{
                state.loading=false;
                state.product=action.payload;
           
        },
        NewReviewSuccess:(state,action)=>{
            state.loading=false;
            state.success=action.payload;
       
        },
        ProductDetailsFail:(state,action)=>{
                state.loading=false;
                state.error=action.payload

        },
        NewReviewFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        NewReviewReset:(state,action)=>{
            state.loading=false;
            state.success=false
        },
        ClearErrors:(state)=>{
    
             state={...state};
             state.error=null
            }
        },
})

export const{ NewReviewFail,NewReviewRequest,NewReviewReset,NewReviewSuccess,ProductDetailsRequest, ProductDetailsFail, ProductDetailsSuccess , ClearErrors}=productDetailSlice.actions;

export const productDetailsSelector = (state) => state.product;

export const getProductDetails=(id)=> async(dispatch)=>{

    try {
      dispatch({
        type:ProductDetailsRequest
      })
      const {data} = await axios.get(`https://jalveryshopapi.onrender.com/api/v1/product/${id}`)
      
      dispatch({
        type:ProductDetailsSuccess,
        payload:data.product
      })
    } catch (error) {
        dispatch({
            type:ProductDetailsFail,
            payload:error.response ? error.response.data.errMessage:error.message
        
        })
    }
}

//New Review
export const newReview=(reviewData)=> async(dispatch)=>{

    try {
      dispatch({
        type:NewReviewRequest
      })

      const config={
        headers:{
            "Content-Type":"application/json"
        }
      }
      const {data} = await axios.put(`https://jalveryshopapi.onrender.com/api/v1/review`,reviewData,config)
      
      dispatch({
        type:NewReviewSuccess,
        payload:data.success
      })
    } catch (error) {
        dispatch({
            type:ProductDetailsFail,
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



export default productDetailSlice.reducer;