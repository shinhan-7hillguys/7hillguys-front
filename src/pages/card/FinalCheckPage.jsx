// src/pages/FinalCheckPage.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitCardApplication } from "../../features/cardApplicationSlice";

function FinalCheckPage() {
  const dispatch = useDispatch();
  const {
    termsAgreed,
    cardDesign,
    identityVerified,
    userInfo,
    englishName,
    cardPin,
    supportPeriod,
    totalAmount,
    monthlyAmount,
    submitStatus,
    error,
  } = useSelector((state) => state.cardApplication);

  const handleSubmit = () => {
    // 간단한 유효성 검증
    if (!termsAgreed || !identityVerified || !cardPin) {
      alert("모든 절차가 완료되지 않았습니다.");
      return;
    }
    // Redux Thunk 호출 -> 서버에 신청
    dispatch(submitCardApplication());
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>최종 정보 확인</h2>
      <div>
        <p>디자인: {cardDesign}</p>
        <p>사용자명: {userInfo.name}</p>
        <p>영문명: {englishName.lastName} {englishName.firstName}</p>
        <p>전화번호: {userInfo.phone}</p>
        <p>이메일: {userInfo.email}</p>
        <p>주소: {userInfo.address}</p>
        <p>지원기간: {supportPeriod}</p>
        <p>총 금액: {totalAmount}원</p>
        <p>월 지원금: {monthlyAmount}원</p>
      </div>
      <br />
      {submitStatus === "loading" && <p>카드 신청 중입니다...</p>}
      {submitStatus === "failed" && <p style={{ color: "red" }}>에러: {error}</p>}
      {submitStatus === "succeeded" && (
        <p style={{ color: "green" }}>카드 신청이 완료되었습니다!</p>
      )}

      <button disabled={submitStatus === "loading"} onClick={handleSubmit}>
        카드 신청하기
      </button>
    </div>
  );
}

export default FinalCheckPage;
