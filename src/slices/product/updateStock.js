import {   createSlice } from "@reduxjs/toolkit";
import axios from "axios"


const initialState={
    loading:false,
    error:null,
    success:false
}

 const updateProductStockSlice=createSlice({
    name:"updateProductStock",
    initialState,
    reducers:{
        UpdateProductStockRequest:(state)=>{
                state.loading=true;
    
        },
        UpdateProductStockSuccess:(state,action)=>{
            state.loading=false;
        },
        UpdateProductStockFail:(state,action)=>{
          state.loading=false;
          state.error=action.payload
        },
        ClearErrors:(state)=>{
    
             state={...state};
             state.error=null
            }
        },
})

export const{UpdateProductStockFail,UpdateProductStockRequest,UpdateProductStockSuccess,ClearErrors}=updateProductStockSlice.actions;
export const productsSelector = (state) => state.products;

export const updateProductStock=(id,stock)=> async(dispatch)=>{


  try {
    dispatch({
      type:UpdateProductStockRequest
    })

    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    console.log(id)
    console.log(stock)
    const {data} = await axios.put(`https://jalveryshopapi.onrender.com/api/v1/product/stock/${id}`,stock,config)
    
    dispatch({
      type:UpdateProductStockSuccess
    })
  } catch (error) {
      dispatch({
          type:UpdateProductStockFail,
          payload:error.response ? error.response.data.errMessage : error.message
      
      })
  }
}

//Clear Errors
export const clearErrors=()=>async(dispatch)=>{
    dispatch({
        type:ClearErrors 
    })
}




export default updateProductStockSlice.reducer;