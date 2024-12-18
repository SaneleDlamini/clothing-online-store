import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalAmount: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === newItem.id);
            state.totalQuantity++;
            if (!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    title: newItem.title,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    image : newItem.image,
                    onSale : newItem.onSale,
                    salePrice : newItem.salePrice
                });
                state.totalAmount += newItem.price;
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
                state.totalAmount += newItem.price;
            }
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => id === item.id);
            if (existingItem.quantity === 1) {
                state.cartItems = state.cartItems.filter(item => item.id !== id);
            } else {
                existingItem.quantity--
            }
            state.totalQuantity--;
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
            state.totalQuantity = 0
        },
        incrementQuantity : (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => id === item.id);
            if(existingItem.quantity >= 1){
                existingItem.quantity++;
                state.totalQuantity++;
            }  
        },
        decrementQuantity : (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => id === item.id);
            if(existingItem.quantity > 1){
                existingItem.quantity--;
                state.totalQuantity--;
            } 
        }
    }
})

export const { addToCart, removeFromCart, clearCartItems, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;


