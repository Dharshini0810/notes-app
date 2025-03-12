import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const BACKEND_URL =  import.meta.env.VITE_BACKEND_URL;


export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/user/login`, userData);
      const token = response.data.accessToken;
      localStorage.setItem('authToken',token)
      return response.data
    } catch (error) {
        console.log(error.response.data)
        return rejectWithValue(error.response.data.message)
    }
  }
);


const authSlice = createSlice({
    name : 'auth',
    initialState : {
        user:null,
        token:null,
        isAuthenticated:null,
        loading:false,
        authError:null
    },
    reducers:{
        logout: (state) =>{
            state.user= null;
            state.token=null;
            state.isAuthenticated=false;
        }
    },
    extraReducers : (builder) =>{
        builder
        .addCase(login.pending, (state) =>{
            state.loading=true;
            state.authError=null
        })
        .addCase(login.fulfilled,(state,action) =>{
            console.log("Fullfilled")
            state.loading=false;
            state.user=action.payload.user;
            state.token=action.payload.accessToken;
            state.isAuthenticated = true;
        })
        .addCase(login.rejected,(state,action) =>{
            console.log("Rejected")
            state.loading=false;
            state.authError=action.payload
        })
    }
});

export const {logout} = authSlice.actions;
export default authSlice.reducer
