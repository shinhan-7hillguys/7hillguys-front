// src/pages/CardIntroPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBenefits } from "../../features/benefitSlice";
import "../../styles/card/card.css";
import { fetchUserCardInfo } from "features/cardApplicationSlice";
import {
  CardFront,

  Chip,
  CardLogo,
  NumberLabel,
  NameLabel,
  ExpiryLabel,

} from "./CardStyles";
import styled from "styled-components";



const layoutPresets = {
  "1": {
    number: { bottom: "60px", left: "20px", fontSize: "20px", letterSpacing: "2px", position: "absolute" },
    chip: { top: "30px", left: "20px", width: "50px", height: "40px", position: "absolute" },
    logo: { top: "20px", right: "20px", width: "60px", position: "absolute" },
    name: { bottom: "20px", left: "20px", fontSize: "16px", position: "absolute" },
    expiry: { bottom: "20px", right: "20px", fontSize: "16px", position: "absolute" },
    signature: { bottom: "120px", left: "20px", fontSize: "14px", position: "absolute" },
    signatureLine: { bottom: "90px", left: "20px", width: "50%", height: "2px", backgroundColor: "lightgray", position: "absolute" },
    cvc: { bottom: "20px", right: "20px", fontSize: "16px", position: "absolute" },
  },

};

function CardIntroPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // benefit state에서 카드 정보를 가져옵니다.
  const { cardRegistered, investRegistered} = useSelector((state) => state.cardApplication);

  useEffect(() => {
    // 컴포넌트 마운트 시 한 번만 호출
    dispatch(fetchUserCardInfo());
  }, [dispatch, investRegistered]);
  const handleApplyClick = () => {
    // 등록된 카드가 있으면 /benefit, 없으면 /card/terms로 이동합니다.
    console.log(cardRegistered)
    if(!investRegistered){
      return alert("투자 신청 후 이용 부탁드립니다.");
    } else if (cardRegistered) {
      return alert("카드 신청이 완료된 상태입니다.");
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
      {/* <div className="intro_card">    
          <img src="../chip.png" alt="" width={50} height={50}/>
      </div> */}
      <CardFront style={{ background:"#f98ac7 url(/camel.png) no-repeat center center/ cover", width: "310px", height:"200px", position: "relative" }}
       $cardFrontColor="#000">
        <Chip style={{ top: "30px", left: "20px", width: "50px", height: "40px", position: "absolute" }}>
          <svg role="img" viewBox="0 0 100 100" aria-label="Chip">
            <use href="#chip-lines" />
          </svg>
        </Chip>
        <CardLogo
          src="https://simey-credit-card.netlify.app/img/logos/master.svg"
          alt="card logo"
          style={{ top: "20px", right: "20px", width: "60px", position: "absolute" }}
          $logoGrayscale={layoutPresets["1"].logoGrayscale}
        />
       
          <>
            {/* <NumberLabel style={layoutPresets["1"].number}> 2341-2355-5654-1277</NumberLabel> */}
            <NameLabel style={layoutPresets["1"].name}>HAN</NameLabel>
            <ExpiryLabel style={layoutPresets["1"].expiry}>25/03</ExpiryLabel>
          </>
        
      </CardFront>
      <button onClick={handleApplyClick}>카드 신청하기</button>
    </div>
  );
}

export default CardIntroPage;
