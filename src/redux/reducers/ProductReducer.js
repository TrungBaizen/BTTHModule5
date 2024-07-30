import {createSlice} from "@reduxjs/toolkit";
import {getAll} from "../services/ProductService";
import {add} from "../services/OrderService";

const initialState = {
    list: []
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAll.fulfilled, (state, {payload}) => {
            state.list = payload;
        })
    }
})

export default productSlice.reducer;