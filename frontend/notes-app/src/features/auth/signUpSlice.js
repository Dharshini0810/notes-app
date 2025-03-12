import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const BACKEND_URL =  import.meta.env.VITE_BACKEND_URL;

export const signup = createAsyncThunk(
    "auth/signup",
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${BACKEND_URL}/api/user/signup`, userData);
        return response.data; 
      } catch (error) {
        return rejectWithValue(error.response.data.message); 
      }
    }
  );

const signUpSlice = createSlice({
    name : 'signup',
    initialState : {
        user: null,
        loading: false,
        signupError : null,
        success: false
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(signup.pending,(state) =>{
            state.loading = true;
            state.signupError = null;
            state.success = false;
        })
        .addCase(signup.fulfilled,(state,action) =>{
            state.loading = false;
            state.success = true;
            state.user = action.payload;
        })
        .addCase(signup.rejected, (state, action) => {
            console.log("SignupError")
            state.loading = false;
            state.signupError = action.payload;
            state.success = false;
          });
    }

})

export default signUpSlice.reducer