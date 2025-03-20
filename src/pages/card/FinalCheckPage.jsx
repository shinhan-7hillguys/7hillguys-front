// src/pages/FinalCheckPage.jsx
import React, { useEffect } from "react";
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
    userInfo
  } = useSelector((state) => state.cardApplication);

  useEffect(() => {
    if (!termsAgreed) {
      navigate("/card/terms");
    } else if (!englishName || !englishName.firstName || !englishName.lastName) {
      navigate("/card/english-name");
    } else if (!cardPin) {
      navigate("/card/pin");
    }
    // 이 조건들이 모두 만족하면 현재 페이지(FinalCheckPage)를 렌더링
  }, [termsAgreed, englishName, cardPin, navigate]);


  const handleSubmit = () => {
    // if (!termsAgreed || !identityVerified || !cardPin) {
    if (!termsAgreed || !cardPin) {
      alert("모든 절차가 완료되지 않았습니다.");
      return;
    }
    // console.log(bgFile)
    try {
      dispatch(submitCardApplication(bgFile));
      alert("카드 신청이 완료되었습니다.")
    } catch (error) {
      alert("카드 신청 중 문제 발생 ")
    }
    navigate("/card");
  };

  return (
    <>
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
            <label>지원 종료 일:</label>
            <input type="text" value={userInfo.endDate ? userInfo.endDate: ""} readOnly />
          </div>
          <div className="form-group">
            <label>총 금액:</label>

            <input type="text" value={userInfo.maxInvestment ? userInfo.maxInvestment.toLocaleString("ko-KR") + "원" : ""} readOnly />
          </div>
          <div className="form-group">
            <label>월 지원금:</label>
            <input type="text" value={userInfo.monthlyAllowance ? userInfo.monthlyAllowance.toLocaleString("ko-KR") + "원" : ""} readOnly />

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
