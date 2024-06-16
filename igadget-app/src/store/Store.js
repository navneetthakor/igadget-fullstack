import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./CartSlice";
import favoriteSlice from "./FavoriteSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        fav: favoriteSlice
    }
})

export default store;