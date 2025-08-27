import { combineReducers, configureStore } from '@reduxjs/toolkit';

import productSlice from './features/product-slice';
import cartSlice from './features/cart-slice';
import  wishlistSlice from './features/wishlist-slice';



const rootReducer = combineReducers({
  products:productSlice,
  cart:cartSlice,
  wishlist:wishlistSlice,
})


export const store = configureStore({
  reducer: rootReducer,
})