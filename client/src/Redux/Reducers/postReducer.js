import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../../utils/axios';

const initialState = {};


export const addPostThunk = createAsyncThunk(
    'post/addPost',
    async (data,thunkAPI) => {
        try {
            const response = await axiosInstance.post('/post/addpost',data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

const postSlice = createSlice({
    name:'Posts',
    initialState,
    reducers:{

    }
})


export const postReducer = postSlice.reducer;

export const postSelector = (state) => state.postReducer;