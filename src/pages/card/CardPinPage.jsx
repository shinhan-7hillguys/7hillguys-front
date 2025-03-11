// src/pages/CardPinPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCardPin } from "../../features/cardApplicationSlice";

function CardPinPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cardPin } = useSelector((state) => state.cardApplication);

  const [pin, setPin] = useState(cardPin);
  const [confirmPin, setConfirmPin] = useState("");

  const handleNextClick = () => {
    if (!pin || pin.length < 4) {
      alert("4자리 이상의 비밀번호를 입력하세요.");
      return;
    }
    if (pin !== confirmPin) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    dispatch(setCardPin(pin));
    navigate("/card/final");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>카드 비밀번호 설정</h2>
      <input
        type="password"
        placeholder="비밀번호"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPin}
        onChange={(e) => setConfirmPin(e.target.value)}
      />
      <br />
      <button onClick={handleNextClick}>다음 단계</button>
    </div>
  );
}

export default CardPinPage;
