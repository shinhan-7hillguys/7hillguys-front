// src/pages/CardIntroPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBenefits } from "../../features/benefitSlice";
import "../../styles/card/card.css";
import { fetchUserCardInfo } from "features/cardApplicationSlice";

function CardIntroPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // benefit state에서 카드 정보를 가져옵니다.
  const { cardRegistered } = useSelector((state) => state.cardApplication);

  useEffect(() => {
    // 컴포넌트 마운트 시 한 번만 호출
    dispatch(fetchUserCardInfo());
  }, [dispatch]);
  const handleApplyClick = () => {
    // 등록된 카드가 있으면 /benefit, 없으면 /card/terms로 이동합니다.
    console.log(cardRegistered)
    if (cardRegistered) {
      alert("카드 신청이 완료된 상태입니다.");
      navigate("/user/dashboard");
    } else {
      navigate("/card/terms");
    }
  };

  return (
    <div className="card_intro">
      <h1>피치 카멜레온 카드</h1>
      <div>
        <p>내 마음대로</p>
        <p>디자인과 혜택을 적용</p>
      </div>
      <div className="intro_card">    
          {/* <img src="../chip.png" alt="" width={50} height={50}/> */}
      </div>
      <button onClick={handleApplyClick}>카드 신청하기</button>
    </div>
  );
}

export default CardIntroPage;
