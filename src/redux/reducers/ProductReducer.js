import {createSlice} from "@reduxjs/toolkit";
import {getAll} from "../services/ProductService";

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