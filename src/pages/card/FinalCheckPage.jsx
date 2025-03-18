// src/pages/FinalCheckPage.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitCardApplication } from "../../features/cardApplicationSlice";
import NavigationHeader from "components/common/NavigationHeader";
import { useLocation, useNavigate } from "react-router-dom";

function FinalCheckPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { bgFile } = location.state || {};

  const {
    termsAgreed,
    englishName,
    cardPin,
    supportPeriod,
    totalAmount,
    monthlyAmount,
    submitStatus,
    error,
  } = useSelector((state) => state.cardApplication);

  const handleSubmit = () => {
    // if (!termsAgreed || !identityVerified || !cardPin) {
    if (!termsAgreed || !cardPin) {
      alert("모든 절차가 완료되지 않았습니다.");
      return;
    }
    // console.log(bgFile)
    dispatch(submitCardApplication(bgFile));
    navigate("/user/dashboard");
  };

  return (
    <>
      <NavigationHeader />
      <div className="final-check-container">
        <h2>최종 정보 확인</h2>
        <div className="final-info-form">
          {/* <div className="form-group">
            <label>디자인:</label>
            <input type="text" value={cardDesign || ""} readOnly />
          </div> */}
          {/* <div className="form-group">  
            <label>사용자명:</label>
            <input type="text" value={userInfo.name || ""} readOnly />
          </div> */}
          <div className="form-group">
            <label>영문명:</label>
            <input
              type="text"
              value={`${englishName.lastName || ""} ${englishName.firstName || ""}`}
              readOnly
            />
          </div>
          {/* <div className="form-group">
            <label>전화번호:</label>
            <input type="text" value={userInfo.phone || ""} readOnly />
          </div>
          <div className="form-group">
            <label>이메일:</label>
            <input type="text" value={userInfo.email || ""} readOnly />
          </div>
          <div className="form-group">
            <label>주소:</label>
            <input type="text" value={userInfo.address || ""} readOnly />
          </div> */}
          <div className="form-group">
            <label>지원기간:</label>
            <input type="text" value={supportPeriod || ""} readOnly />
          </div>
          <div className="form-group">
            <label>총 금액:</label>
            <input type="text" value={totalAmount ? totalAmount + "원" : ""} readOnly />
          </div>
          <div className="form-group">
            <label>월 지원금:</label>
            <input type="text" value={monthlyAmount ? monthlyAmount + "원" : ""} readOnly />
          </div>
        </div>
        <br />
        {submitStatus === "loading" && <p>카드 신청 중입니다...</p>}
        {submitStatus === "failed" && <p style={{ color: "red" }}>에러: {error}</p>}
        {submitStatus === "succeeded" && (
          <p style={{ color: "green" }}>카드 신청이 완료되었습니다!</p>
        )}
        <div className="btn_box">
        <button className="card_btn" disabled={submitStatus === "loading"} onClick={handleSubmit}>
          카드 신청하기
        </button>
        </div>
       
      </div>
    </>
  );
}

export default FinalCheckPage;
