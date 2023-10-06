import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../../utils/axios';

const initialState = {
                        userPosts:[],
                        loading:false 
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
            thunkAPI.dispatch( await getAllPostThunk(data.userId));
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)


export const deletePostThunk = createAsyncThunk(
    'post/deletePost',
    async ({_id,userId},thunkAPI) => {
        try {
            console.log(_id);
            const response = await axiosInstance.put(`/post/deletepost/${_id}`);
            thunkAPI.dispatch( await getAllPostThunk(userId));
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)



export const likePostThunk = createAsyncThunk(
    'post/likePost',
    async ({userId,postId},thunkAPI) => {
        try {
            const response = await axiosInstance.put(`/post/togglelike/${postId}?userId=${userId}`);
            thunkAPI.dispatch(getAllPostThunk(userId));
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const addCommentThunk = createAsyncThunk(
    'post/addComment',
    async({content,userId,postId}, thunkAPI) => {
        try {
            const response = await axiosInstance.put(`/post/addcomment/${postId}?userId=${userId}`,{content});
            thunkAPI.dispatch(getAllPostThunk(userId));
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const deleteCommentThunk = createAsyncThunk(
    'post/deleteComment',
    async({id,userId},thunkAPI) => {
        try{
            const response = await axiosInstance.put(`/post/deletecomment/${id}`);
            thunkAPI.dispatch(getAllPostThunk(userId));
            return response.data;
        } catch(error){
            console.log(error);
        }
    }
)

const postSlice = createSlice({
    name:'Posts',
    initialState,
    reducers:{
        setUserPost:(state,action) => {
            state.userPosts = action.payload.posts;
            return;
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(addPostThunk.pending,(state,action) => {
            state.loading = true;
        })
        .addCase(addPostThunk.fulfilled || addPostThunk.rejected,(state,action) => {
            state.loading = false;
        })
        .addCase(deletePostThunk.pending,(state,action) => {
            state.loading = true;
        })
        .addCase(deletePostThunk.fulfilled || addPostThunk.rejected,(state,action) => {
            state.loading = false;
        })
    }
})


export const postReducer = postSlice.reducer;

export const  { setUserPost } = postSlice.actions;

export const postSelector = (state) => state.postReducer;