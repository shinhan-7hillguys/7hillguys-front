// src/features/benefitSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 1. 내 카드에 대한 혜택 데이터 가져오기
export const fetchBenefits = createAsyncThunk(
  "benefit/fetchBenefits",
  async (cardId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/benefit/card`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response)
      return response.data; // { availableBenefits, appliedBenefits }
    } catch (error) {
      return rejectWithValue(error.response?.data || "혜택 데이터를 가져오지 못했습니다.");
    }
  }
);

// 2. 적용된 혜택 삭제
export const deleteBenefit = createAsyncThunk(
  "benefit/deleteBenefit",
  async (benefitId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`http://localhost:8080/benefit/${benefitId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return benefitId; // 삭제된 혜택 ID 반환
    } catch (error) {
      return rejectWithValue(error.response?.data || "혜택 삭제에 실패했습니다.");
    }
  }
);

// 3. 결제 시 혜택 적용 (insert)
export const applyBenefits = createAsyncThunk(
  "benefit/applyBenefits",
  async ({ cardId, benefitIds }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/card/benefits",
        { cardId, benefitIds },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "혜택 적용에 실패했습니다.");
    }
  }
);

const initialState = {
  availableBenefits: [],
  appliedBenefits: [],
  addedBenefits: [],
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
};

const benefitSlice = createSlice({
  name: "benefit",
  initialState,
  reducers: {
    // 기존 더미 관련 리듀서는 제거하거나 유지 가능
    addBenefit: (state, action) => {
      // 예시: addBenefit 로직
      state.addedBenefits.push(action.payload);
      state.availableBenefits = state.availableBenefits.filter(
        (benefit) => benefit.benefitId !== action.payload.benefitId
      );
    },
    clearAddedBenefits: (state) => {
      state.availableBenefits = state.availableBenefits.concat(state.addedBenefits);
      state.addedBenefits = [];
    },
    mergeBenefits: (state) => {
      state.appliedBenefits = state.appliedBenefits.concat(state.addedBenefits);
      state.addedBenefits = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchBenefits 처리
      .addCase(fetchBenefits.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBenefits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.availableBenefits = action.payload.availableBenefits;
        state.appliedBenefits = action.payload.appliedBenefits;
      })
      .addCase(fetchBenefits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // deleteBenefit 처리
      .addCase(deleteBenefit.fulfilled, (state, action) => {
        // action.payload는 삭제된 benefitId
        state.appliedBenefits = state.appliedBenefits.filter(
          (b) => b.benefitId !== action.payload
        );
      })
      .addCase(deleteBenefit.rejected, (state, action) => {
        state.error = action.payload;
      })
      // applyBenefits 처리
      .addCase(applyBenefits.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(applyBenefits.fulfilled, (state, action) => {
        state.status = "succeeded";
        // 실제 적용 후 서버에서 반환한 결과에 따라 처리 (예: 새롭게 적용된 혜택 목록 업데이트)
        // 여기서는 단순히 merge로 처리
        state.appliedBenefits = state.appliedBenefits.concat(state.addedBenefits);
        state.addedBenefits = [];
      })
      .addCase(applyBenefits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addBenefit, clearAddedBenefits, mergeBenefits } = benefitSlice.actions;
export default benefitSlice.reducer;
