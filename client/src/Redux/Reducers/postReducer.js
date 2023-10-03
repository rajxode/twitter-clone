import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../../utils/axios';

const initialState = {
                        userPosts:[] 
                        };

export const getAllPostThunk = createAsyncThunk(
    'post/getAllPost',
    async(id,thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/post/getposts/${id}`);
            thunkAPI.dispatch(setUserPost(response.data));
        } catch (error) {
            console.log(error);
        }
    }
)

export const addPostThunk = createAsyncThunk(
    'post/addPost',
    async (data,thunkAPI) => {
        try {
            const response = await axiosInstance.post('/post/addpost',data);
            thunkAPI.dispatch(getAllPostThunk(data.userId));
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
        setUserPost:(state,action) => {
            // console.log(action.payload.posts);
            state.userPosts = [...action.payload.posts];
        }
    }
})


export const postReducer = postSlice.reducer;

export const  { setUserPost } = postSlice.actions;

export const postSelector = (state) => state.postReducer;