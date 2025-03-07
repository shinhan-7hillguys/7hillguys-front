// src/features/benefitSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // 사용 가능한 혜택 목록 (사용자가 선택할 수 있는 혜택)
  availableBenefits: [
    {
      benefitId: 1,
      name: "자격증 시험 응시료 10% 할인",
      description: "국가공인 자격증 시험만 가능",
      discountRate: 10,
      storeId: 1,
      price: "3,000"
    },
    {
      benefitId: 2,
      name: "혜택2",
      description: "설명2",
      discountRate: 15,
      storeId: 2,
      price: "3,000"
    },
    {
      benefitId: 3,
      name: "혜택3",
      description: "설명3",
      discountRate: 5,
      storeId: 3,
      price: "3,000"
    },
    {
      benefitId: 4,
      name: "혜택4",
      description: "설명4",
      discountRate: 20,
      storeId: 4,
      price: "3,000"
    },
    {
      benefitId: 5,
      name: "혜택5",
      description: "설명5",
      discountRate: 10,
      storeId: 1,
      price: "3,000"
    },
    {
      benefitId: 6,
      name: "혜택6",
      description: "설명6",
      discountRate: 25,
      storeId: 2,
      price: "3,000"
    },
    {
      benefitId: 7,
      name: "혜택7",
      description: "설명7",
      discountRate: 30,
      storeId: 3,
      price: "3,000"
    },
    {
      benefitId: 8,
      name: "혜택8",
      description: "설명8",
      discountRate: 5,
      storeId: 4,
      price: "3,000"
    },
  ],
  // 이미 적용된 혜택 (예: DB에서 받아온 데이터)
  selectedBenefits: [
    { benefitId: 101, name: "기존 혜택 1", description: "기존 혜택 설명1", discountRate: 10, storeId: 1 },
    { benefitId: 102, name: "기존 혜택 2", description: "기존 혜택 설명2", discountRate: 20, storeId: 2 },
  ],
  // 임시로 추가한 혜택 (사용자가 Benefit 페이지에서 추가)
  addedBenefits: [
    // 초기에는 빈 배열
  ],
};

const benefitSlice = createSlice({
  name: 'benefit',
  initialState,
  reducers: {
    // addBenefit: 사용자가 availableBenefits에서 혜택을 선택해 임시 추가 혜택(addedBenefits)에 추가하고, availableBenefits에서 제거합니다.
    addBenefit: (state, action) => {
      state.addedBenefits.push(action.payload);
      state.availableBenefits = state.availableBenefits.filter(
        (benefit) => benefit.benefitId !== action.payload.benefitId
      );
    },
    // removeBenefit: 임시 추가 혜택 혹은 기존 혜택에서 특정 혜택을 삭제합니다.
    // payload: { benefitId, type } 에서 type은 "added" 또는 "selected"로 구분합니다.
    removeBenefit: (state, action) => {
      const { benefitId, type } = action.payload;
      
      if (type === "added") {
        // 삭제된 혜택을 availableBenefits에 추가한 후 정렬
        const removedBenefit = state.addedBenefits.find(b => b.benefitId === benefitId);
        state.availableBenefits = [...state.availableBenefits, removedBenefit].sort((a, b) => a.benefitId - b.benefitId);
        
        // 추가된 혜택 리스트에서 제거
        state.addedBenefits = state.addedBenefits.filter(b => b.benefitId !== benefitId);
    
      } else if (type === "selected") {
        // 삭제된 혜택을 availableBenefits에 추가한 후 정렬
        const removedBenefit = state.selectedBenefits.find(b => b.benefitId === benefitId);
        state.availableBenefits = [...state.availableBenefits, removedBenefit].sort((a, b) => a.benefitId - b.benefitId);
        
        // 기존 혜택 리스트에서 제거
        state.selectedBenefits = state.selectedBenefits.filter(b => b.benefitId !== benefitId);
      }
    },
    // clearAddedBenefits: 임시 추가 혜택(addedBenefits)을 모두 제거하고, (옵션에 따라) 해당 혜택들을 availableBenefits에 복원합니다.
    clearAddedBenefits: (state) => {
      state.availableBenefits = state.availableBenefits.concat(state.addedBenefits);
      state.addedBenefits = [];
    },
    // mergeBenefits: 결제 시 임시 추가 혜택을 기존 혜택에 병합합니다.
    mergeBenefits: (state) => {
      state.selectedBenefits = state.selectedBenefits.concat(state.addedBenefits);
      state.addedBenefits = [];
    },
    // setBenefits: 서버에서 혜택 데이터를 받아와 상태를 초기화할 때 사용합니다.
    setBenefits: (state, action) => {
      state.availableBenefits = action.payload.availableBenefits;
      state.selectedBenefits = action.payload.selectedBenefits;
      state.addedBenefits = action.payload.addedBenefits;
    },
  },
});

export const { addBenefit, removeBenefit, clearAddedBenefits, mergeBenefits, setBenefits } = benefitSlice.actions;
export default benefitSlice.reducer;
