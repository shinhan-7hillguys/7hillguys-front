// src/features/paymentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios"; // API 연동 시 사용할 라이브러리

// 초기 상태
const initialState = {
  payments: [],
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
};

// 🟢 Thunk: 비동기 요청으로 거래 내역 가져오기
export const fetchPayments = createAsyncThunk(
  "payment/fetchPayments",
  async (month, { rejectWithValue }) => {
    try {
      // 실제 API 요청 (현재는 더미 데이터 사용)
      // const response = await axios.get(`/api/transactions?month=${month}`);
      // return response.data;
      
      // 1초 딜레이 후 더미 데이터 반환 (실제 API 요청으로 대체 가능)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return [
        { paymentId: 1, storeId: 1, category: "Food", originalAmount: 5000, finalAmount: 4500, discountAmount: 500 },
        { paymentId: 2, storeId: 2, category: "Shopping", originalAmount: 10000, finalAmount: 9000, discountAmount: 1000 },
        { paymentId: 3, storeId: 1, category: "Food", originalAmount: 7000, finalAmount: 6300, discountAmount: 700 },
        { paymentId: 4, storeId: 3, category: "Entertainment", originalAmount: 3000, finalAmount: 2700, discountAmount: 300 },
        { paymentId: 5, storeId: 1, category: "Food", originalAmount: 6000, finalAmount: 5400, discountAmount: 600 },
        { paymentId: 6, storeId: 2, category: "Shopping", originalAmount: 8000, finalAmount: 7200, discountAmount: 800 },
        { paymentId: 7, storeId: 4, category: "Travel", originalAmount: 4000, finalAmount: 3800, discountAmount: 200 },
        { paymentId: 8, storeId: 3, category: "Entertainment", originalAmount: 3500, finalAmount: 3150, discountAmount: 350 },
      ];
    } catch (error) {
      return rejectWithValue(error.response?.data || "데이터를 불러오지 못했습니다.");
    }
  }
);

// 🟡 Redux Slice 생성
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    // 🟢 결제 내역 수동 설정 (서버에서 데이터를 받아 Redux 스토어 업데이트)
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
    // 🟢 새로운 결제 내역 추가 (새로운 거래를 수동으로 등록)
    addPayment: (state, action) => {
      state.payments.push(action.payload);
    },
    // 🟢 결제 내역 초기화
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

// 액션 내보내기
export const { setPayments, addPayment, clearPayments } = paymentSlice.actions;
export default paymentSlice.reducer;
