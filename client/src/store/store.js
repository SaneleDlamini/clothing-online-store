import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';
import CartSlice from './CartSlice';

export const store = configureStore({
    reducer : {
        auth : AuthSlice,
        cart : CartSlice
    }
})