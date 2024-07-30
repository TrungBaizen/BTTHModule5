import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getAll = createAsyncThunk(
    'orders/getAll',
    async () => {
        let res = await axios.get('http://localhost:3000/orders?_embed=product')
        const sortedProducts = res.data.sort((a, b) => a.product.price - b.product.price);
        return sortedProducts;
    }
)

export const add = createAsyncThunk(
    'orders/add',
    async (newOrder)=>{
        let res=await axios.post('http://localhost:3000/orders',newOrder)
        return res.data;
    }
)