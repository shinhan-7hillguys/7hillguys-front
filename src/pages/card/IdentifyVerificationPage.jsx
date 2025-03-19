// src/pages/IdentityVerificationPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIdentityVerified } from "../../features/cardApplicationSlice";
import NavigationHeader from "components/common/NavigationHeader";

function IdentityVerificationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const identityVerified = useSelector(
    (state) => state.cardApplication.identityVerified
  );
  const [code, setCode] = useState("");

  const handleVerifyClick = () => {
    // 실제로는 서버 검증 로직을 거쳐야 함
    if (code === "1234") {
      dispatch(setIdentityVerified(true));
      alert("본인 인증 성공!");
      navigate("/card/personal-info");
    } else {
      alert("인증 코드가 올바르지 않습니다.");
      dispatch(setIdentityVerified(false));
    }
  };

  return (
    <>
    <div style={{ padding: 20 }}>
      <h2>본인 인증</h2>
      <p>휴대폰 번호로 전송된 인증 코드를 입력하세요. (예시: 1234)</p>
      <input
        type="text"
        placeholder="인증 코드"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleVerifyClick}>인증하기</button>
      {identityVerified && <p>이미 인증되었습니다. 다음 단계로 진행하세요.</p>}
    </div>
    </>
   
  );
}

export default IdentityVerificationPage;
