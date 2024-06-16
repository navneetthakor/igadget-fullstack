import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
const favoriteSlice = createSlice({
    name: 'fav',
    initialState,
    reducers: {
        fadd(state, action){
            state.push(action.payload);
        },
        fremove(state, action){
            return state.filter((iteam) => iteam.prod._id !== action.payload)
        },
        setFav(state, action){
            return [...action.payload]
        }
    }
});

export const {fadd,fremove,setFav} = favoriteSlice.actions;
export default favoriteSlice.reducer;