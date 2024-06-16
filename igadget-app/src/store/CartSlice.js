import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add(state, action){
            state.push(action.payload);
        },
        remove(state, action){
            return state.filter((iteam) => iteam.prod._id !== action.payload)
        },
        setCart(state, action){
            return [...action.payload]
        }
    }
});

export const {add,remove, setCart} = cartSlice.actions;
export default cartSlice.reducer;