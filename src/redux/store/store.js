import {configureStore} from "@reduxjs/toolkit";
import orderReducer from "../reducers/OrderReducer";
import productReducer from "../reducers/ProductReducer";

const store = configureStore({
    reducer:{
        orders: orderReducer,
        products:productReducer
    }
})

export default store;