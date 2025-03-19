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
    navigate("/card/personal-info");
  };

  return (
    <div className="card_agree">
      <h2>카드에 꼭 필요한 설명서와<br/>동의만 모았어요</h2>
      
      <div className="card_agree_section">
      <h2>필수 동의 사항</h2>
  <ol>
    <li>
      <strong>개인정보 수집 및 이용 동의</strong>
      <p>
        카드 가입 및 심사를 위해 본인의 개인정보(이름, 주민등록번호, 연락처, 주소, 금융정보 등)를 수집·이용하는 것에 동의합니다. 수집된 개인정보는 카드 발급, 관리, 부정 이용 방지, 고객 서비스 제공 및 관련 법령에 따른 목적으로 사용됩니다.
      </p>
    </li>
    <li>
      <strong>개인정보 제공 및 위탁 동의</strong>
      <p>
        카드 발급 및 심사를 위해 외부 신용평가 기관, 금융정보 제공 기관 등 제3자에게 본인의 개인정보를 제공하는 것에 동의합니다. 또한, 카드 운영 및 관리, 마케팅 등 일부 업무를 외부 전문기관에 위탁할 수 있으며, 이에 따른 개인정보 처리 위탁에 동의합니다.
      </p>
    </li>
    <li>
      <strong>신용정보 조회 및 이용 동의</strong>
      <p>
        카드 가입 심사 및 신용평가를 위해 본인의 신용정보(신용점수, 대출 및 연체 정보 등)를 조회·이용하는 것에 동의합니다. 조회된 신용정보는 카드 심사 및 관리 목적으로만 활용됩니다.
      </p>
    </li>
    <li>
      <strong>전자금융거래 이용 동의</strong>
      <p>
        카드 이용 시 전자금융거래 서비스(온라인 결제, 자동 이체, 모바일 앱 등)를 이용할 수 있으며, 이에 따른 약관 및 이용 조건에 동의합니다.
      </p>
    </li>
    <li>
      <strong>마케팅 정보 수신 동의 (선택)</strong>
      <p>
        카드 관련 이벤트, 혜택, 금융상품 등 마케팅 정보를 SMS, 이메일, 앱 푸시 등으로 수신하는 데 동의합니다. 단, 마케팅 정보 수신은 선택 사항이며, 동의하지 않더라도 카드 발급 및 이용에는 지장이 없습니다.
      </p>
    </li>
    <li>
      <strong>전자서명 및 본인인증 동의</strong>
      <p>
        카드 가입 절차 및 본인 확인을 위해 전자서명 및 본인인증 절차를 진행하는 것에 동의합니다.
      </p>
    </li>
  </ol>
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
