// src/pages/EnglishNamePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEnglishName } from "../../features/cardApplicationSlice";
import NavigationHeader from "components/common/NavigationHeader";

function EnglishNamePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { englishName } = useSelector((state) => state.cardApplication);
  const [firstName, setFirstName] = useState(englishName.firstName);
  const [lastName, setLastName] = useState(englishName.lastName);
  const [error, setError] = useState("");
const {
    termsAgreed,
  } = useSelector((state) => state.cardApplication);

  useEffect(() => {
    // 컴포넌트가 마운트되면 사용자 정보를 서버에서 가져옴
    if (!termsAgreed) {
      navigate("/card/terms");
    } 
    
  }, [termsAgreed, navigate]);
  // 정규표현식: 오직 A-Z, a-z 만 허용
  const validateName = (name) => /^[A-Za-z]+$/.test(name);

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    if (value && !validateName(value)) {
      setError("영문 알파벳만 입력해야 합니다.");
    } else {
      setError("");
    }
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
    if (value && !validateName(value)) {
      setError("영문 알파벳만 입력해야 합니다.");
    } else {
      setError("");
    }
  };

  const handleNextClick = () => {
    if (!firstName || !lastName) {
      alert("영문 성/이름을 모두 입력해주세요.");
      return;
    }
    if (!validateName(firstName) || !validateName(lastName)) {
      setError("영문 알파벳만 입력해야 합니다.");
      return;
    }
    dispatch(setEnglishName({ firstName, lastName }));
    navigate("/card/pin");
  };

  return (
    <>
     <div style={{ padding: 20 }} className="card_english">
      <h2>영문 이름을 입력해 주세요.</h2>
      {/* <p style={{ fontStyle: "italic", color: "#555" }}>
        영문으로 입력해 주세요. 예시: 성 (Last Name): Doe, 이름 (First Name): John
      </p> */}
      <div>
        <label>성 (Last Name): </label>
        <input
          type="text"
          placeholder="ex) Hong"
          value={lastName}
          onChange={handleLastNameChange}
        />
        <br />
        <label>이름 (First Name): </label>
        <input
          type="text"
          placeholder="ex) Gildong"
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </div>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      <div className="btn_box" style={{ marginTop: "20px" }}>
        <button className="card_btn" onClick={handleNextClick}>
          다음 단계
        </button>
      </div>
    </div>
    </>
   
  );
}

export default EnglishNamePage;
