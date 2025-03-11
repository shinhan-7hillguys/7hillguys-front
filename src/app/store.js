// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import benefitReducer from '../features/benefitSlice';
import paymentReducer from '../features/paymentSlice';
import cardApplicationReducer from '../features/cardApplicationSlice';

export const store = configureStore({
  reducer: {
    benefit: benefitReducer,
    payment: paymentReducer,
    cardApplication: cardApplicationReducer
  },
});

export default store;
