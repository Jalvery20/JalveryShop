import {   createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState={
    cartItems:localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")):[],
    shippingInfo:localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo")):{}
}

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        AddToCart:(state,action)=>{
            const item= action.payload;
            const isItemExist= state.cartItems.find(i=>i.product===item.product)
            
            if(isItemExist) {
                return {
                    cartItems:state.cartItems.map(i=>i.product===isItemExist.product?item:i)
                }
            }else{
                return{
                    cartItems:[...state.cartItems,item]
                }
            }
        
            },
            ResetCart:(state)=>{
                 state.cartItems=[]
            },
            RemoveItemCart:(state,action)=>{
                state.cartItems=state.cartItems.filter(i=>i.product!==action.payload)
            },
            SaveShippingInfo:(state,action)=>{

                state.shippingInfo=action.payload
            },
            ClearErrors:(state)=>{
             state.error=null
            }
        },
})

export const{ResetCart,SaveShippingInfo,ClearErrors,AddToCart,RemoveItemCart}=cartSlice.actions;

export const addItemToCart=(id,quantity)=>async (dispatch,getState)=>{
    const {data}=await axios.get(`https://jalveryshopapi.onrender.com/api/v1/product/${id}`)

    dispatch({
        type:AddToCart,
        payload:{
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images[0].url,
            stock:data.product.stock,
            quantity
        }
    })

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))

}

export const saveShippingInfo=(data)=>async (dispatch)=>{
    
    dispatch({
        type:SaveShippingInfo,
        payload:data
    })
    localStorage.setItem("shippingInfo",JSON.stringify(data))

}

export const removeItemFromCart=(id)=>async (dispatch,getState)=>{
   

    dispatch({
        type:RemoveItemCart,
        payload:id
    })

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))

}

export const resetCart=()=>async (dispatch)=>{
    dispatch({
        type:ResetCart
    })

    localStorage.getItem("cartItems") && localStorage.removeItem("cartItems")

}

//Clear Errors
export const clearErrors=()=>async(dispatch)=>{
    dispatch({
        type:ClearErrors 
    })
}




export default cartSlice.reducer;