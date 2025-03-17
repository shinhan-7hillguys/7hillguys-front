// src/pages/CardIntroPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/card/card.css"
function CardIntroPage() {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate("/card/terms");
  };

  return (
    <div className="card_intro">
      <h1>피치 카멜레온 카드</h1>
      <div>
        <p>내 마음대로</p>
        <p>디자인과 혜택을 적용</p>
      </div>

      <div className="intro_card"></div>
      <button onClick={handleApplyClick}>카드 신청하기</button>
    </div>
  );
}

export default CardIntroPage;
