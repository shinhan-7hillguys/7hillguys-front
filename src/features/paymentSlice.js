// src/features/paymentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "api";
  
const initialState = {
  payments: [],
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
};

export const fetchPayments = createAsyncThunk(
  "payment/fetchPayments",
  async ({ cardId, month }, { rejectWithValue }) => {
    try {
      console.log(cardId)

      const response = await axiosInstance.get("/benefit/payments", {
        params: { cardId, month },
      });
      console.log(response.data)
      return response.data; // PaymentEntity 배열
    } catch (error) {
      return rejectWithValue(error.response?.data || "결제 데이터를 불러오지 못했습니다.");
    }
  }
);


const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
    addPayment: (state, action) => {
      state.payments.push(action.payload);
    },
    clearPayments: (state) => {
      state.payments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setPayments, addPayment, clearPayments } = paymentSlice.actions;
export default paymentSlice.reducer;
