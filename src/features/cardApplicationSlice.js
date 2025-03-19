// src/features/cardApplicationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 사용자 정보를 가져오는 Thunk
export const fetchUserInfo = createAsyncThunk(
  "cardApplication/fetchUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/card/userInfo");

      console.log(response);
      return response.data; // 서버가 반환한 { name, phone, email, address }
    } catch (error) {
      return rejectWithValue(error.response?.data || "사용자 정보를 가져오지 못했습니다.");
    }
  }
);

export const fetchUserCardInfo = createAsyncThunk(
  "cardApplication/fetchUserCardInfo", // 고유한 타입 문자열 사용
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/card/cardInfo");
      console.log(response);
      return response.data; // 서버가 반환한 { cardRegistered: true/false }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "카드 정보를 가져오지 못했습니다."
      );
    }
  }
);


// 기존 카드 신청 Thunk (예시)
export const submitCardApplication = createAsyncThunk(
  "cardApplication/submitCardApplication",
  async (bgFile, { getState, rejectWithValue }) => {
    try {
      const state = getState().cardApplication;
      const requestData = {
        englishName: `${state.englishName.lastName} ${state.englishName.firstName}`,
        pin: state.cardPin,
        cardDesign: state.cardDesign, // 객체 형태 (예: { layoutId, username, letterColor, cardBackColor, logoGrayscale })
      };
   
      const formData = new FormData();
      // 카드 디자인 정보를 JSON으로 직렬화해서 Blob으로 변환 후 추가
      formData.append(
        "cardDesignDTO",
        new Blob([JSON.stringify(requestData.cardDesign)], { type: "application/json" })
      );

      formData.append("englishName", requestData.englishName);
      formData.append("pin", requestData.pin);
    
      if (bgFile) {
        formData.append("image", bgFile);
      }
  
      const token = localStorage.getItem("token");
      const response = await axios.post("/card/insert", formData)
      console.log("결과:", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "카드 신청 중 에러가 발생했습니다.");
    }
  }
);

const initialState = {
  // 약관 동의, 카드 디자인 등 기존 상태...
  termsAgreed: false,
  cardDesign: {
    layoutId: "", // 숫자로 전달
    username: "",
    letterColor: "",
    cardBackColor: "",
    logoGrayscale: ""
  },
  identityVerified: false,
  // 사용자 정보 (서버에서 받아올 예정)
  userInfo: {
    name: "",
    phone: "",
    email: "",
    address: "",
  },
  // 영문 이름, 카드 PIN, 지원 정보 등 기존 상태...
  englishName: { firstName: "", lastName: "" },
  cardPin: "",
  supportPeriod: "2년",
  totalAmount: 240000,
  monthlyAmount: 10000,
  // 요청 상태
  submitStatus: "idle",
  error: null,
  // 새로운 사용자 정보 요청 상태 (옵션)
  userInfoStatus: "idle", // "idle" | "loading" | "succeeded" | "failed"
  cardRegistered: false,

};

const cardApplicationSlice = createSlice({
  name: "cardApplication",
  initialState,
  reducers: {
    setTermsAgreed(state, action) {
      state.termsAgreed = action.payload;
    },
    setCardDesign(state, action) {
      console.log(state);
      console.log(action);
      state.cardDesign = action.payload;
    },
    setIdentityVerified(state, action) {
      state.identityVerified = action.payload;
    },
    setEnglishName(state, action) {
      state.englishName = action.payload;
    },
    setCardPin(state, action) {
      state.cardPin = action.payload;
    },
    setSupportInfo(state, action) {
      const { supportPeriod, totalAmount, monthlyAmount } = action.payload;
      state.supportPeriod = supportPeriod;
      state.totalAmount = totalAmount;
      state.monthlyAmount = monthlyAmount;
    },
  },
  extraReducers: (builder) => {
    builder
      // 카드 신청 관련 처리 (기존)
      .addCase(submitCardApplication.pending, (state) => {
        state.submitStatus = "loading";
        state.error = null;
      })
      .addCase(submitCardApplication.fulfilled, (state) => {
        state.submitStatus = "succeeded";
      })
      .addCase(submitCardApplication.rejected, (state, action) => {
        state.submitStatus = "failed";
        state.error = action.payload;
      })
      // 사용자 정보 가져오기 처리
      .addCase(fetchUserInfo.pending, (state) => {
        state.userInfoStatus = "loading";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.userInfoStatus = "succeeded";
        state.userInfo = action.payload; // { name, phone, email, address }
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.userInfoStatus = "failed";
        state.error = action.payload;
      })
      // 카드 등록 여부 가져오기 처리 (fetchUserCardInfo)
      .addCase(fetchUserCardInfo.pending, (state) => {
        // 필요 시 별도 상태 업데이트 (예: cardInfoStatus)
      })
      .addCase(fetchUserCardInfo.fulfilled, (state, action) => {
        // 응답으로 { cardRegistered: true/false }를 받는다고 가정
        state.cardRegistered = action.payload.cardRegistered;
      })
      .addCase(fetchUserCardInfo.rejected, (state, action) => {
        state.error = action.payload;
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
