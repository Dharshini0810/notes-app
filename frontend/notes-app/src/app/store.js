import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import signUpReducer from '../features/auth/signUpSlice'
import notesReducer from '../features/notes/notesSlice'

export const store = configureStore({
    reducer : {
        auth : authReducer,
        signup : signUpReducer,
        notes : notesReducer
    }
})