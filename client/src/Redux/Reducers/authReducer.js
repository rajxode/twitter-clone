import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../../utils/axios';

const initialState = { isLoading:false,
                        loggedInUser:null};

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
            thunkAPI.dispatch(setLoggedInUser(response.data.user))
            return response.data;
        }catch(error){
            return error.response.data;
        }
    }
)

// export const signOutThunk = createAsyncThunk(
//     'auth/signout',
//     async () => {
//         try{
//             console.log(process.env.REACT_APP_BASE_URL);
//             const response = await axiosInstance.get('/signout');
//             console.log(response);
//         }catch(err){
//             console.log(err);
//         }
//     }
// )

const authSlice = createSlice({
    name:'authentication',
    initialState,
    reducers:{
        setLoggedInUser:(state,action) => {
            window.localStorage.setItem('user',JSON.stringify(action.payload));
            state.loggedInUser = action.payload;
            return;
        }
    },
    extraReducers: (builder) => {
        builder
        // .addCase(signUpThunk.pending,(state,action) => {
        //     state.isLoading = true;
        // })
        .addCase(signUpThunk.fulfilled, (state,action) => {
            return action.payload;
        })
        .addCase(signUpThunk.rejected,(state,action) => {
            console.log('rejected');
        })
    }
})

export const authReducer = authSlice.reducer;

export const { setLoggedInUser } = authSlice.actions;

export const authSelector = (state) => state.authReducer;