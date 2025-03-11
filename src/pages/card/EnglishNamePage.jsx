// src/pages/EnglishNamePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEnglishName } from "../../features/cardApplicationSlice";

function EnglishNamePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { englishName } = useSelector((state) => state.cardApplication);
  const [firstName, setFirstName] = useState(englishName.firstName);
  const [lastName, setLastName] = useState(englishName.lastName);

  const handleNextClick = () => {
    if (!firstName || !lastName) {
      alert("영문 성/이름을 모두 입력해주세요.");
      return;
    }
    dispatch(setEnglishName({ firstName, lastName }));
    navigate("/card/pin");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>영문 이름 입력</h2>
      <label>성 (Last Name): </label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <br />
      <label>이름 (First Name): </label>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br />
      <button onClick={handleNextClick}>다음 단계</button>
    </div>
  );
}

export default EnglishNamePage;
