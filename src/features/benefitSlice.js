// src/features/benefitSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 1. 내 카드에 대한 혜택 데이터 가져오기
export const fetchBenefits = createAsyncThunk(
  "benefit/fetchBenefits",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/benefit/card`);
      console.log(response)
      return response.data; // { availableBenefits, appliedBenefits }
    } catch (error) {
      return rejectWithValue(error.response?.data || "혜택 데이터를 가져오지 못했습니다.");
    }
  }
);
// src/features/benefitSlice.js
export const deleteBenefit = createAsyncThunk(
  "benefit/deleteBenefit",
  async ({ benefitId, cardId }, { rejectWithValue }) => {
    try {
      // 카드 정보가 필요하다면, 쿼리 파라미터로 전달하거나 요청 본문에 포함할 수 있습니다.
      // HTTP DELETE 요청은 본문 전달을 지원하지 않는 경우도 있으므로, 여기서는 쿼리 파라미터 사용 예시:
      const response = await axios.delete(`http://localhost:8080/benefit/${benefitId}?cardId=${cardId}`);
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
        "http://localhost:8080/benefit/apply",
        { cardId, benefitIds },
      );
      console.log(response)
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
  card: null,
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
    // fetchBenefits 처리: 카드 정보와 혜택 데이터를 저장
    .addCase(fetchBenefits.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(fetchBenefits.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.availableBenefits = action.payload.availableBenefits;
      state.appliedBenefits = action.payload.appliedBenefits;
      state.card = action.payload.card; // 카드 전체 정보 저장
    })
    .addCase(fetchBenefits.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })
    // deleteBenefit 처리
    .addCase(deleteBenefit.fulfilled, (state, action) => {
      console.log(state, action)
      state.appliedBenefits = state.appliedBenefits.filter(
        (b) => b.myBenefitId.benefitId !== action.payload
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
      // 새로운 데이터가 평탄한 구조라면, UI에서 기대하는 중첩 구조로 변환
      const transformed = state.addedBenefits.map(item => ({
        benefit: {
          benefitId: item.benefitId,
          name: item.name,
          description: item.description,
          fee: item.fee,
          discountRate: item.discountRate,
        },
        myBenefitId:{
          benefitId:item.benefitId,
        },
        // 필요하다면 myBenefitId나 card 등 다른 정보도 추가합니다.
        status: item.status,
        usedCount: item.usedCount
      }));
      state.appliedBenefits = state.appliedBenefits.concat(transformed);
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
