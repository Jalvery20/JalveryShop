import {   createSlice } from "@reduxjs/toolkit";
import axios from "axios"


const initialState={
    loading:false,
    error:null,
    product:{},
    success:null,
    isDeleted:false,
    isUpdated:false
}

 const newProductSlice=createSlice({
    name:"newProduct",
    initialState,
    reducers:{
        
        NewProductRequest:(state)=>{
          state.loading= true;
        },
        DeleteProductRequest:(state)=>{
          state.loading= true;
        },
        UpdateProductRequest:(state)=>{
          state.loading= true;
        },
        NewProductSuccess:(state,action)=>{
          state.loading=false;
          state.success=action.payload.success;
          state.product=action.payload.product
        },
        DeleteProductSuccess:(state,action)=>{
          state.loading=false;
          state.isDeleted=action.payload;
        },
        UpdateProductSuccess:(state,action)=>{
          state.loading=false;
          state.isUpdated=action.payload;
        },
        NewProductFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        DeleteProductFail:(state,action)=>{
          state.loading=false;
          state.error=action.payload;
      },
      UpdateProductFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
      },
        NewProductReset:(state,action)=>{
            state.success=false;
        },
        DeleteProductReset:(state,action)=>{
          state.isDeleted=false;
      },
      UpdateProductReset:(state,action)=>{
        state.isUpdated=false;
      },
        ClearErrors:(state)=>{
             state.error=null
            }
        },
})

export const{UpdateProductFail,UpdateProductRequest,UpdateProductReset,UpdateProductSuccess,DeleteProductFail,DeleteProductRequest,DeleteProductReset,DeleteProductSuccess,ClearErrors,NewProductReset,NewProductFail,NewProductRequest,NewProductSuccess}=newProductSlice.actions;




//New Product
export const newProduct=(productData)=> async(dispatch)=>{

    try {
      dispatch({
        type:NewProductRequest
      })

      const config={
        headers:{
            "Content-Type":"application/json"
        }
      }
      const {data} = await axios.post(`https://jalveryshopapi.onrender.com/api/v1/admin/product/new`,productData,config)
      
      dispatch({
        type:NewProductSuccess,
        payload:data
      })
    } catch (error) {
        dispatch({
            type:NewProductFail,
            payload:error.response ? error.response.data.errMessage:error.message
        
        })
    }
}

//Update Product ADMIN
export const updateProduct=(id,productData)=> async(dispatch)=>{

  try {
    dispatch({
      type:UpdateProductRequest
    })

    const config={
      headers:{
          "Content-Type":"application/json"
      }
    }
    const {data} = await axios.put(`https://jalveryshopapi.onrender.com/api/v1/admin/product/${id}`,productData,config)
    
    dispatch({
      type:UpdateProductSuccess,
      payload:data.success
    })
  } catch (error) {
      dispatch({
          type:UpdateProductFail,
          payload:error.response ? error.response.data.errMessage:error.message
      
      })
  }
}

//Delete Product (Admin)
export const deleteProduct=(id)=> async(dispatch)=>{

  try {
    dispatch({
      type:DeleteProductRequest
    })

    const {data} = await axios.delete(`https://jalveryshopapi.onrender.com/api/v1/admin/product/${id}`)
    
    dispatch({
      type:DeleteProductSuccess,
      payload:data.success
    })
  } catch (error) {
      dispatch({
          type:DeleteProductFail,
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




export default newProductSlice.reducer;