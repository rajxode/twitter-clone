import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../../utils/axios';
import { getAllPostThunk } from "./postReducer";

const initialState = { isLoading:false,
                        loggedInUser:{},
                        allUsers:[],
                        follows:[],
                    };

export const toggelFollowThunk = createAsyncThunk(
    'auth/toggleFollow',
    async ({id,userId},thunkAPI) => {
        try {
            const response = await axiosInstance.put(`/user/${id}/follow?userId=${userId}`);
            thunkAPI.dispatch(setLoggedInUser(response.data.userOne));
            thunkAPI.dispatch(getIFollowThunk(response.data.userOne._id));
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
)


export const getAllUserThunk = createAsyncThunk(
    'auth/getalluser',
    async (args,thunkAPI) => {
        try {
            const response = await axiosInstance.get('/user/alluser');
            thunkAPI.dispatch(setAllUsers(response.data.users));
        } catch (error) {
            return error.response.data;
        }
    }
)


export const signUpThunk = createAsyncThunk(
    'auth/signup',
    async (data,thunkAPI) => {
        try {
            const response = await axiosInstance.post('/user/signup',data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
)

export const signInThunk = createAsyncThunk(
    'auth/signin',
    async (data,thunkAPI) => {
        try{
            const response = await axiosInstance.post('/user/signin',data);
            localStorage.setItem('user',JSON.stringify(response.data.user));
            thunkAPI.dispatch(setLoggedInUser(response.data.user))
            return response.data;
        }catch(error){
            return error.response.data;
        }
    }
)

export const signOutThunk = createAsyncThunk(
    'auth/signout',
    async (args,thunkAPI) => {
        try{
            localStorage.removeItem('user');
            thunkAPI.dispatch(setLoggedInUser(null));
            const response = await axiosInstance.get('/user/signout');
            return response.data;
        }catch(err){
            return err.response.data;
        }
    }
)

export const getLoggedInUserThunk = createAsyncThunk(
    'auth/getLoggedInUser',
    async (args,thunkAPI) => {
        const isUserLoggedIn = localStorage.getItem('user');
        if(isUserLoggedIn){
            const user = JSON.parse(isUserLoggedIn);
            thunkAPI.dispatch(setLoggedInUser(user));
            thunkAPI.dispatch(getAllPostThunk(user._id));
            thunkAPI.dispatch(getIFollowThunk(user._id));
            thunkAPI.dispatch(getAllUserThunk());
            return true;
        }
        return false;
    }
)

export const getIFollowThunk = createAsyncThunk(
    'auth/getIFollow',
    async (id,thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/user/ifollow/${id}`);
            thunkAPI.dispatch(setFollows(response.data.follows))
        } catch (error) {
            console.log(error);
        }
    }
)

export const updateInfoThunk = createAsyncThunk(
    'auth/updateInfo',
    async({id,data},thunkAPI) => {
        try {
            const response = await axiosInstance.put(`/user/updateinfo/${id}`,data);
            localStorage.setItem('user',JSON.stringify(response.data.user));
            thunkAPI.dispatch(setLoggedInUser(response.data.user));
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const updatePasswordThunk = createAsyncThunk(
    'auth/updatePassword',
    async({id,data},thunkAPI) => {
        try {
            const response = await axiosInstance.put(`/user/updatepassword/${id}`,data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)


export const deleteAccountThunk = createAsyncThunk(
    'auth/deleteAccount',
    async({id,data},thunkAPI) => {
        try {
            const response = await axiosInstance.put(`/user/deleteaccount/${id}`,data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)


const authSlice = createSlice({
    name:'authentication',
    initialState,
    reducers:{
        setLoggedInUser:(state,action) => {
            state.loggedInUser = action.payload;
            return;
        },
        setAllUsers:(state,action) => {
            state.allUsers = [...action.payload];
            return;
        },
        setFollows:(state,action) => {
            state.follows = action.payload;
            return;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(signUpThunk.pending,(state,action) => {
            state.isLoading = true;
        })
        .addCase(signUpThunk.fulfilled, (state,action) => {
            state.isLoading = false;
        })
        .addCase(signInThunk.pending,(state,action) => {
            state.isLoading = true;
        })
        .addCase(signInThunk.fulfilled, (state,action) => {
            state.isLoading = false;
        })
        .addCase(signOutThunk.pending,(state,action) => {
            state.isLoading = true;
        })
        .addCase(signOutThunk.fulfilled, (state,action) => {
            state.isLoading = false;
        })
        .addCase(getLoggedInUserThunk.pending,(state,action) => {
            state.isLoading = true;
        })
        .addCase(getLoggedInUserThunk.fulfilled,(state,action) => {
            state.isLoading = false;
        })
        
    }
})

export const authReducer = authSlice.reducer;

export const { setLoggedInUser, setAllUsers, setFollows } = authSlice.actions;

export const authSelector = (state) => state.authReducer;