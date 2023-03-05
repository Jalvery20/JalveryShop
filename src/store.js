import {configureStore} from "@reduxjs/toolkit"

import productsSlice from "./slices/product/products"
import productDetailsSlice from "./slices/product/productDetails"
import authSlice from "./slices/user/user"
import cartSlice from "./slices/cart/cart"
import orderSlice from "./slices/order/order"
import newProductSlice from "./slices/product/newProduct"
import allOrdersSlice from "./slices/order/allOrders"
import allUsersSlice from "./slices/user/allUsers"

export const store= configureStore({
    reducer:{
        products:productsSlice,
        productDetails:productDetailsSlice,
        auth:authSlice,
        cart:cartSlice,
        order:orderSlice,
        newProduct:newProductSlice,
        allOrders:allOrdersSlice,
        allUsers:allUsersSlice
    }
}) 