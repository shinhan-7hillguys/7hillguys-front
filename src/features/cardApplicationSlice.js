// src/features/cardApplicationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// (선택) 최종 제출 시 서버에 카드 신청 요청하는 Thunk 예시
export const submitCardApplication = createAsyncThunk(
  "cardApplication/submitCardApplication",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState().cardApplication;
      // 여기서 서버에 API 요청하는 로직을 작성 (예: axios.post('/api/card/apply', state))
      // // 실제로는 아래처럼 더미로 처리
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      const requestData = {
        englishName: `${state.englishName.lastName} ${state.englishName.firstName}`,
        pin: state.cardPin,
        cardDesign: state.cardDesign,
      };

      const response = await axios.post("http://localhost:8080/card", requestData);
      console.log(response)
      // 성공 시 서버 응답을 return
      return response.data;

    } catch (error) {
      return rejectWithValue(error.response?.data || "카드 신청 중 에러가 발생했습니다.");
    }
  }
);

const initialState = {
  // 1) 카드 소개 페이지는 단순 안내용이므로 별도 상태 X
  // 2) 약관 동의
  termsAgreed: false,

  // 3) 카드 디자인 선택
  cardDesign: null, // 예: 'pink', 'blue', 'chameleon' 등

  // 4) 본인 인증
  identityVerified: false,
  // 인증 과정에서 필요하다면 인증 토큰, 인증번호, 인증 시간 등 저장 가능

  // 5) 기존 사용자 정보 (읽기 전용)
  userInfo: {
    name: "홍길동",
    phone: "010-1234-5678",
    email: "test@example.com",
    address: "서울특별시 어딘가 123",
  },

  // 6) 영문 이름 입력
  englishName: {
    firstName: "",
    lastName: "",
  },

  // 7) 카드 비밀번호
  cardPin: "",

  // 8) 최종 정보 확인 (지원기간, 총 금액, 매달 지원금액 등) - 여기서는 간단히 샘플
  supportPeriod: "2년",
  totalAmount: 240000, // 예: 24만원
  monthlyAmount: 10000, // 예: 월 1만원

  // 요청 상태
  submitStatus: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
};

const cardApplicationSlice = createSlice({
  name: "cardApplication",
  initialState,
  reducers: {
    // 약관 동의
    setTermsAgreed(state, action) {
      state.termsAgreed = action.payload; // true/false
    },
    // 카드 디자인 선택
    setCardDesign(state, action) {
      state.cardDesign = action.payload; // e.g. 'pink', 'blue', ...
    },
    // 본인 인증 성공/실패
    setIdentityVerified(state, action) {
      state.identityVerified = action.payload; // true/false
    },
    // (기존 사용자 정보는 서버에서 가져온다고 가정하면, setUserInfo로 업데이트 가능)
    setEnglishName(state, action) {
      state.englishName = action.payload; // { firstName, lastName }
    },
    setCardPin(state, action) {
      state.cardPin = action.payload;
    },
    // 필요하면 지원기간, 총 금액, 월 지원금 등도 수정 가능
    setSupportInfo(state, action) {
      const { supportPeriod, totalAmount, monthlyAmount } = action.payload;
      state.supportPeriod = supportPeriod;
      state.totalAmount = totalAmount;
      state.monthlyAmount = monthlyAmount;
    },
    // etc...
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCardApplication.pending, (state) => {
        state.submitStatus = "loading";
        state.error = null;
      })
      .addCase(submitCardApplication.fulfilled, (state, action) => {
        state.submitStatus = "succeeded";
        // action.payload => { success: true, message: "카드 신청 완료!" }
      })
      .addCase(submitCardApplication.rejected, (state, action) => {
        state.submitStatus = "failed";
        state.error = action.payload; // "카드 신청 중 에러가 발생했습니다."
      });
  },
});

export const {
  setTermsAgreed,
  setCardDesign,
  setIdentityVerified,
  setEnglishName,
  setCardPin,
  setSupportInfo,
} = cardApplicationSlice.actions;

export default cardApplicationSlice.reducer;
