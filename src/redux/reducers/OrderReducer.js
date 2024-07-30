import {createSlice} from "@reduxjs/toolkit";
import {add, getAll} from "../services/OrderService";

const initialState = {
    list:[]
}

const orderSlice = createSlice({
    name:'orders',
    initialState,
    extraReducers:builder =>{
        builder.addCase(getAll.fulfilled,(state, {payload})=>{
            state.list =payload;
        })
        builder.addCase(add.fulfilled,(state, {payload})=>{
            state.list.push(payload)
        })
    }
})

export default orderSlice.reducer;