import {   createSlice } from "@reduxjs/toolkit";
import axios from "axios"


const initialState={
    loading:false,
    error:null,
    products:[],
    productsCount:0,
    resPerPage:8,
    filteredProductsCount:0
}

 const productsSlice=createSlice({
    name:"products",
    initialState,
    reducers:{
        AllProductsRequest:(state)=>{
                state.loading= true;
                state.products=[]
    
        },
        AdminProductsRequest:(state)=>{
          state.loading= true;
          state.products=[]
        },
        AdminProductSuccess:(state,action)=>{
          state.loading=false;
          state.products=action.payload;
        },
        AllProductsSuccess:(state,action)=>{
                state.loading=false;
                state.products=action.payload.products;
                state.productsCount=action.payload.productsCount
                state.resPerPage=action.payload.resPerPage
                state.filteredProductsCount=action.payload.filteredProductsCount
           
        },
        AdminProductsFail:(state,action)=>{
          state.loading=false;
          state.error=action.payload
        },
        AllProductsFail:(state,action)=>{
                state.loading=false;
                state.error=action.payload

        },
        ClearErrors:(state)=>{
    
             state={...state};
             state.error=null
            }
        },
})

export const{AdminProductSuccess,AdminProductsFail,AdminProductsRequest,ClearErrors,AllProductsFail,AllProductsRequest,AllProductsSuccess}=productsSlice.actions;
export const productsSelector = (state) => state.products;

export const getProducts=( keyword="", currentPage=1,price,category,order="")=> async(dispatch)=>{

    try {
      dispatch({
        type:AllProductsRequest
      })
      let link=`https://jalveryshopapi.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&sort=${order}`
      
      if(category){
        link=`https://jalveryshopapi.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&sort=${order}`
      }
      const {data} = await axios.get(link)
   
      dispatch({
        type:AllProductsSuccess,
        payload:data
      })
    } catch (error) {
      console.log(error)
        dispatch({
            type:AllProductsFail,
            payload:error.response &&error.response.data? error.response.data.errMessage : error.message
        
        })
    }
}

export const getAdminProducts=()=> async(dispatch)=>{
  try {
    dispatch({
      type:AdminProductsRequest
    })
    const {data} = await axios.get("https://jalveryshopapi.onrender.com/api/v1/admin/products")
    
    dispatch({
      type:AdminProductSuccess,
      payload:data.products
    })
  } catch (error) {
      dispatch({
          type:AdminProductsFail,
          payload:error.response  &&error.response.data? error.response.data.errMessage : error.message
      
      })
  }
}

//Clear Errors
export const clearErrors=()=>async(dispatch)=>{
    dispatch({
        type:ClearErrors 
    })
}




export default productsSlice.reducer;