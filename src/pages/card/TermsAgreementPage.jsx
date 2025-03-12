// src/pages/TermsAgreementPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTermsAgreed } from "../../features/cardApplicationSlice";
import NavigationHeader from "components/common/NavigationHeader";

function TermsAgreementPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const termsAgreed = useSelector((state) => state.cardApplication.termsAgreed);

  const handleAgreeChange = (e) => {
    dispatch(setTermsAgreed(e.target.checked));
  };

  const handleNextClick = () => {
    if (!termsAgreed) {
      alert("약관에 동의해야 진행할 수 있습니다.");
      return;
    }
    navigate("/card/design");
  };

  return (
    <div className="card_agree">
      <NavigationHeader  />
      <h2>카드에 꼭 필요한 설명서와<br/>동의만 모았어요</h2>
      
      <div>
      <p>약관 내용... (여기에 자세한 약관 텍스트를 표시)</p>
      <label>
        <input
          type="checkbox"
          checked={termsAgreed}
          onChange={handleAgreeChange}
        />
        약관에 동의합니다.
      </label>
      </div>
     
     
      <br />
      <button className="card_btn" onClick={handleNextClick}>다음 단계</button>
    </div>
  );
}

export default TermsAgreementPage;
