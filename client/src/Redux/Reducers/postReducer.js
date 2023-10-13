
// reducer for all post related operations 

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../../utils/axios';

// toast notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {  
                        allPosts:[],
                        followPosts:[],
                        userPosts:[],
                        loading:false 
                        };

// get all the post of logged in user
export const getMyPostThunk = createAsyncThunk(
    'post/getMyPost',
    async(id,thunkAPI) => {
        try {
            const isToken = localStorage.getItem('token');
            const token = JSON.parse(isToken);
            const response = await axiosInstance.get(`/post/getmyposts/${id}`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            thunkAPI.dispatch(setUserPost(response.data));
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }
)

// get all the post in database
export const getAllPostsThunk = createAsyncThunk(
    'post/getAllPost',
    async(args,thunkAPI) => {
        try {
            const isToken = localStorage.getItem('token');
            const token = JSON.parse(isToken);
            const response = await axiosInstance.get('/post/getallposts',{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            thunkAPI.dispatch(setAllPosts(response.data));
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }
)


// get all the post of people user follows
export const getFollowPostThunk = createAsyncThunk(
    'post/getFollowPost',
    async(id,thunkAPI) => {
        try {
            const isToken = localStorage.getItem('token');
            const token = JSON.parse(isToken);
            const response = await axiosInstance.get(`/post/getfollowsposts/${id}`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            thunkAPI.dispatch(setFollowPosts(response.data));
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }
)


// for adding a new post
export const addPostThunk = createAsyncThunk(
    'post/addPost',
    async (data,thunkAPI) => {
        try {
            const isToken = localStorage.getItem('token');
            const token = JSON.parse(isToken);
            const response = await axiosInstance.post('/post/addpost',data,{
                headers: { 'Content-type': 'multipart/form-data' ,
                    'Authorization':`Bearer ${token}` },
            });;
            thunkAPI.dispatch(getMyPostThunk(data.userId));
            thunkAPI.dispatch(getFollowPostThunk(data.userId));
            thunkAPI.dispatch(getAllPostsThunk());
            return response.data;
        } catch (error) {
            return {
                success:false,
                message:error.response.data.error
            }
        }
    }
)

// for deleting a post
export const deletePostThunk = createAsyncThunk(
    'post/deletePost',
    async ({_id,userId},thunkAPI) => {
        try {
            const isToken = localStorage.getItem('token');
            const token = JSON.parse(isToken);
            const response = await axiosInstance.put(`/post/deletepost/${_id}`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            thunkAPI.dispatch(getMyPostThunk(userId));
            thunkAPI.dispatch(getFollowPostThunk(userId));
            thunkAPI.dispatch(getAllPostsThunk());
            return response.data;
        } catch (error) {
            return {
                success:false,
                message:error.response.data.error
            }
        }
    }
)

// for liking a post
export const likePostThunk = createAsyncThunk(
    'post/likePost',
    async ({userId,postId},thunkAPI) => {
        try {
            const isToken = localStorage.getItem('token');
            const token = JSON.parse(isToken);
            const response = await axiosInstance.put(`/post/togglelike/${postId}?userId=${userId}`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            thunkAPI.dispatch(getMyPostThunk(userId));
            thunkAPI.dispatch(getFollowPostThunk(userId));
            thunkAPI.dispatch(getAllPostsThunk());
            return response.data;
        } catch (error) {
            return {
                success:false,
                message:error.response.data.error
            }
        }
    }
)


// for addding comments on a post
export const addCommentThunk = createAsyncThunk(
    'post/addComment',
    async({content,userId,postId}, thunkAPI) => {
        try {
            const isToken = localStorage.getItem('token');
            const token = JSON.parse(isToken);
            const response = await axiosInstance.put(`/post/addcomment/${postId}?userId=${userId}`,{content},{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            thunkAPI.dispatch(getMyPostThunk(userId));
            thunkAPI.dispatch(getFollowPostThunk(userId));
            thunkAPI.dispatch(getAllPostsThunk());
            return response.data;
        } catch (error) {
            return {
                success:false,
                message:error.response.data.error
            }
        }
    }
)

// for delete the comment
export const deleteCommentThunk = createAsyncThunk(
    'post/deleteComment',
    async({id,userId},thunkAPI) => {
        try{
            const isToken = localStorage.getItem('token');
            const token = JSON.parse(isToken);
            const response = await axiosInstance.put(`/post/deletecomment/${id}`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            thunkAPI.dispatch(getMyPostThunk(userId));
            thunkAPI.dispatch(getFollowPostThunk(userId));
            thunkAPI.dispatch(getAllPostsThunk());
            return response.data;
        } catch (error) {
            return {
                success:false,
                message:error.response.data.error
            }
        }
    }
)



// reducers
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