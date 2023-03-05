import {   createSlice } from "@reduxjs/toolkit";
import axios from "axios"


const initialState={
    loading:false,
    order:{},
    orders:[],
    error:null,
    isCreated:false
}


 const orderSlice=createSlice({
    name:"order",
    initialState,
    reducers:{
        CreateOrderRequest:(state)=>{
            state.loading=true
        },
        MyOrderRequest:(state)=>{
            state.loading=true
        },
        OrderDetailsRequest:(state)=>{
            state.loading=true
        },
        OrderDetailsSuccess:(state,action)=>{
            state.loading=false;
            state.order=action.payload
        },
        CreateOrderSuccess:(state,action)=>{
            state.loading=false;
            state.isCreated=action.payload.success,
            state.orders=[...state.orders,action.payload.order]
        },
        MyOrderSuccess:(state,action)=>{
            state.loading=false;
            state.orders=action.payload
        },
        CreateOrderFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        CreateOrderReset:(state)=>{
            state.isCreated=false
        },
        OrderDetailsFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        MyOrderFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        ClearErrors:(state)=>{
         state.error=null
        }
    },
 })

 

export const createOrder=(order)=>async(dispatch)=>{
    
    try {

        dispatch({type:CreateOrderRequest})

        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }

        const {data} = await axios.post("https://jalveryshopapi.onrender.com/api/v1/order/new",order,config)
         
        dispatch({
            type:CreateOrderSuccess, 
            payload:data
        })
    } catch (error) {
        dispatch({
            type:CreateOrderFail,
            payload:error.response ? error.response.data.message:error.message
        })
    }
    
}


//Get currently logged in user orders
export const MyOrders=()=>async(dispatch)=>{
    try {
        dispatch({
            type:MyOrderRequest
        })

        const {data}=await axios.get("https://jalveryshopapi.onrender.com/api/v1/orders/me")
        
        dispatch({
            type:MyOrderSuccess,
            payload:data.orders
        })
    } catch (error) {
        dispatch({
            type:MyOrderFail,
            payload:error.response ? error.response.data.errMessage:error.message
        })
    }
}

//Get order details
export const getOrderDetails=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:OrderDetailsRequest
        })

        const {data}=await axios.get(`https://jalveryshopapi.onrender.com/api/v1/order/${id}`)
        
        dispatch({
            type:OrderDetailsSuccess,
            payload:data.order
        })
    } catch (error) {
        dispatch({
            type:MyOrderFail,
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
 export const{CreateOrderReset,OrderDetailsFail,OrderDetailsRequest,OrderDetailsSuccess,CreateOrderFail,CreateOrderRequest,CreateOrderSuccess,MyOrderFail,MyOrderRequest,MyOrderSuccess,ClearErrors}=orderSlice.actions;
 
 export default orderSlice.reducer;