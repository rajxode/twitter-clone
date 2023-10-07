import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../../utils/axios';

const initialState = {  
                        allPosts:[],
                        followPosts:[],
                        userPosts:[],
                        loading:false 
                        };

export const getMyPostThunk = createAsyncThunk(
    'post/getMyPost',
    async(id,thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/post/getmyposts/${id}`);
            thunkAPI.dispatch(setUserPost(response.data));
        } catch (error) {
            console.log(error);
        }
    }
)

export const getAllPostsThunk = createAsyncThunk(
    'post/getAllPost',
    async(args,thunkAPI) => {
        try {
            const response = await axiosInstance.get('/post/getallposts');
            thunkAPI.dispatch(setAllPosts(response.data));
        } catch (error) {
            console.log(error);
        }
    }
)


export const getFollowPostThunk = createAsyncThunk(
    'post/getFollowPost',
    async(id,thunkAPI) => {
        try {
            console.log('called');
            const response = await axiosInstance.get(`/post/getfollowsposts/${id}`);
            thunkAPI.dispatch(setFollowPosts(response.data));
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
)


export const addPostThunk = createAsyncThunk(
    'post/addPost',
    async (data,thunkAPI) => {
        try {
            console.log(data);
            const response = await axiosInstance.post('/post/addpost',data,{
                headers: { 'Content-type': 'multipart/form-data' },
            });
            thunkAPI.dispatch(getMyPostThunk(data.userId));
            thunkAPI.dispatch(getFollowPostThunk(data.userId));
            thunkAPI.dispatch(getAllPostsThunk());
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
            const response = await axiosInstance.put(`/post/deletepost/${_id}`);
            thunkAPI.dispatch(getMyPostThunk(userId));
            thunkAPI.dispatch(getFollowPostThunk(userId));
            thunkAPI.dispatch(getAllPostsThunk());
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
            thunkAPI.dispatch(getMyPostThunk(userId));
            thunkAPI.dispatch(getFollowPostThunk(userId));
            thunkAPI.dispatch(getAllPostsThunk());
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
            thunkAPI.dispatch(getMyPostThunk(userId));
            thunkAPI.dispatch(getFollowPostThunk(userId));
            thunkAPI.dispatch(getAllPostsThunk());
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
            thunkAPI.dispatch(getMyPostThunk(userId));
            thunkAPI.dispatch(getFollowPostThunk(userId));
            thunkAPI.dispatch(getAllPostsThunk());
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
        },
        setAllPosts:(state,action) => {
            state.allPosts = action.payload.posts;
            return;
        },
        setFollowPosts:(state,action) => {
            state.followPosts = action.payload.posts;
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
        .addCase(deletePostThunk.fulfilled || deletePostThunk.rejected,(state,action) => {
            state.loading = false;
        })
        .addCase(getAllPostsThunk.pending,(state,action) => {
            state.loading = true;
        })
        .addCase(getAllPostsThunk.fulfilled || getAllPostsThunk.rejected,(state,action) => {
            state.loading = false;
        })
        .addCase(getFollowPostThunk.pending,(state,action) => {
            state.loading = true;
        })
        .addCase(getFollowPostThunk.fulfilled || getFollowPostThunk.rejected,(state,action) => {
            state.loading = false;
        })
    }
})


export const postReducer = postSlice.reducer;

export const  { setUserPost , setAllPosts , setFollowPosts } = postSlice.actions;

export const postSelector = (state) => state.postReducer;