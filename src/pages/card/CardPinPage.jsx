// src/pages/CardPinPage.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCardPin } from "../../features/cardApplicationSlice";
import NavigationHeader from "components/common/NavigationHeader";

function CardPinPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 'enter': 최초 PIN 입력, 'confirm': PIN 확인 입력 단계
  const [stage, setStage] = useState("enter");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");

  // 숨겨진 input에 포커스
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, [stage]);

  // 숫자만 허용하며 최대 4자리까지 입력 처리
  const handleChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    if (stage === "enter") {
      setPin(value);
      if (value.length === 4) {
        // 4자리 입력 완료 후 잠시 후 확인 단계로 전환
        setTimeout(() => setStage("confirm"), 300);
      }
    } else if (stage === "confirm") {
      setConfirmPin(value);
    }
  };

  const handleNextClick = () => {
    if (confirmPin.length !== 4) {
      setError("4자리 PIN을 모두 입력해 주세요.");
      return;
    }
    if (pin !== confirmPin) {
      setError("일치하지 않습니다.");
      setConfirmPin("");
      inputRef.current.focus();
      return;
    }
    // PIN이 일치하면 리덕스에 저장 후 다음 단계로 이동
    dispatch(setCardPin(pin));
    navigate("/card/design");
  };

  // 4개의 동그라미 렌더링 (입력된 자릿수에 따라 'filled' 클래스 적용)
  const renderCircles = (value) => {
    const circles = [];
    for (let i = 0; i < 4; i++) {
      circles.push(
        <div key={i} className={`circle ${i < value.length ? "filled" : ""}`}></div>
      );
    }
    return circles;
  };

  return (
    <div className="card_pin">
      <NavigationHeader />
      <h2>{stage === "enter" ? "카드 비밀번호" : "비밀번호 확인"}</h2>
      <p style={{ color: stage === "confirm" && error ? "red" : "inherit" }}>
        {stage === "enter"
          ? "4자리 숫자를 입력해 주세요."
          : error
          ? "비밀번호가 일치하지 않습니다."
          : "비밀번호를 다시 입력해 주세요."}
      </p>
      <div
        className="pin-input-container"
        onClick={() => inputRef.current.focus()}
      >
        {stage === "enter" ? renderCircles(pin) : renderCircles(confirmPin)}
      </div>
      {/* 숨겨진 input 태그 */}
      <input
        type="tel"
        ref={inputRef}
        value={stage === "enter" ? pin : confirmPin}
        onChange={handleChange}
        maxLength="4"
        className="hidden-input"
      />
      {stage === "confirm" && (
        <button className="card_btn" onClick={handleNextClick}>
          다음 단계
        </button>
      )}
    </div>
  );
}

export default CardPinPage;
