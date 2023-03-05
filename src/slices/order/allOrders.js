import {   createSlice } from "@reduxjs/toolkit";
import axios from "axios"


const initialState={
    loading:false,
    orders:[],
    totalAmount:0,
    error:null,
    isUpdated:false,
    isDeleted:false
}


 const allOrdersSlice=createSlice({
    name:"allOrders",
    initialState,
    reducers:{
        AllOrdersRequest:(state)=>{
                state.loading=true
        },
        UpdateOrderRequest:(state)=>{
            state.loading=true
        },
        DeleteOrderRequest:(state)=>{
            state.loading=true
        },
        AllOrdersSuccess:(state,action)=>{
            state.loading=false;
            state.orders=action.payload.orders
            state.totalAmount=action.payload.totalAmount
        },
        UpdateOrderSuccess:(state,action)=>{
            state.loading=false;
            state.isUpdated=action.payload
        },
        DeleteOrderSuccess:(state,action)=>{
            state.loading=false;
            state.isDeleted=action.payload
        },
        AllOrdersFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        UpdateOrderFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        DeleteOrderFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        UpdateOrderReset:(state,action)=>{
            state.isUpdated=false
        },
        DeleteOrderReset:(state,action)=>{
            state.isDeleted=false
        },
        ClearErrors:(state)=>{
         state.error=null
        }
    },
 })

 



//Get all orders ADMIN
export const allOrders=()=>async(dispatch)=>{
    try {
        dispatch({
            type:AllOrdersRequest
        })

        const {data}=await axios.get(`https://jalveryshopapi.onrender.com/api/v1/admin/orders`)
        
        dispatch({
            type:AllOrdersSuccess,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:AllOrdersFail,
            payload:error.response ? error.response.data.errMessage:error.message
        })
    }

}

//Update order
export const updateOrder=(id,orderData)=>async(dispatch)=>{
    
    try {

        dispatch({type:UpdateOrderRequest})

        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }

        const {data} = await axios.put(`https://jalveryshopapi.onrender.com/api/v1/admin/order/${id}`,orderData,config)
        dispatch({
            type:UpdateOrderSuccess, 
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type:UpdateOrderFail,
            payload:error.response ? error.response.data.errMessage:error.message
        })
    }
    
}

//Delete order
export const deleteOrder=(id)=>async(dispatch)=>{
    
    try {

        dispatch({type:DeleteOrderRequest})

    
        const {data} = await axios.delete(`https://jalveryshopapi.onrender.com/api/v1/admin/order/${id}`)
      
        dispatch({
            type:DeleteOrderSuccess, 
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type:DeleteOrderFail,
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
 export const{DeleteOrderFail,DeleteOrderRequest,DeleteOrderReset,DeleteOrderSuccess,UpdateOrderFail,UpdateOrderRequest,UpdateOrderReset,UpdateOrderSuccess,AllOrdersFail,AllOrdersRequest,AllOrdersSuccess,ClearErrors}=allOrdersSlice.actions;
 
 export default allOrdersSlice.reducer;