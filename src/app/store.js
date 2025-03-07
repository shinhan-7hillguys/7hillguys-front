// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import benefitReducer from '../features/benefitSlice';
import paymentReducer from '../features/paymentSlice';

export const store = configureStore({
  reducer: {
    benefit: benefitReducer,
    payment: paymentReducer,
  },
});

export default store;
