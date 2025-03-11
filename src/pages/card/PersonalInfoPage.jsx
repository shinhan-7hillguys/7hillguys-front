// src/pages/PersonalInfoPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PersonalInfoPage() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.cardApplication);

  const handleNextClick = () => {
    navigate("/card/english-name");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>사용자 정보 확인</h2>
      <p>이름: {userInfo.name}</p>
      <p>전화번호: {userInfo.phone}</p>
      <p>이메일: {userInfo.email}</p>
      <p>주소: {userInfo.address}</p>

      <button onClick={handleNextClick}>다음 단계</button>
    </div>
  );
}

export default PersonalInfoPage;
