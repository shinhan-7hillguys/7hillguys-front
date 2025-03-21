// src/pages/Benefit.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  addBenefit, 
  clearAddedBenefits, 
  mergeBenefits, 
  fetchBenefits, 
  deleteBenefit, 
  applyBenefits 
} from "../../features/benefitSlice";
import { useNavigate } from "react-router-dom";
import { ArrowDownOutlined, ArrowUpOutlined, BarcodeOutlined, SwapOutlined } from "@ant-design/icons";
import "styles/card/benefit.css";
import CardPreview from "./CardPreview";
import {
  CardContainer,
  CardStyled,
  CardFront,
  CardBack,
  Chip,
  CardLogo,
  NumberLabel,
  NameLabel,
  ExpiryLabel,
  BlackStrip,
  CVCLabel,
  SignatureLabel,
  SignatureLine,
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
  "2": {
    chip: { top: "30px", left: "20px", width: "50px", height: "40px", position: "absolute" },
    logo: { top: "20px", right: "20px", width: "60px", position: "absolute" },
    numberBack: { top: "80px", left: "150px", fontSize: "20px", letterSpacing: "2px", whiteSpace: "pre-wrap", writingMode: "sideways-lr", transform: "rotate(180deg)", position: "absolute" },
    nameBack: { top: "90px", left: "100px", fontSize: "14px", writingMode: "sideways-lr", transform: "rotate(180deg)", position: "absolute" },
    expiryBack: { top: "90px", left: "305px", fontSize: "16px", writingMode: "sideways-lr", transform: "rotate(180deg)", position: "absolute" },
    signature: { top: "10px", left: "60px", fontSize: "14px", writingMode: "sideways-lr", transform: "rotate(180deg)", position: "absolute" },
    signatureLine: { top: "100px", left: "-40px", width: "35%", height: "2px", backgroundColor: "rgb(89 89 89)", writingMode: "sideways-lr", transform: "rotate(270deg)", position: "absolute" },
    cvc: { top: "120px", left: "-100px", fontSize: "16px", writingMode: "sideways-lr", transform: "rotate(180deg)", position: "absolute" },
  },
};




const Benefit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { availableBenefits, appliedBenefits, addedBenefits,  status, error, card } = useSelector(
    (state) => state.benefit
  );
  const [selectedTab, setSelectedTab] = useState("existing");

  // 더 이상 고정된 cardId 사용하지 않고, Redux에 저장된 카드 정보를 사용합니다.
  // card가 아직 null일 수 있으므로 안전하게 처리합니다.
  const cardId = card ? card.cardId : null;

  const [checkedBenefits, setCheckedBenefits] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentLayout = layoutPresets[card?.cardDesigns[0]?.layoutId] || layoutPresets["1"];


  // 페이지 로드시, 내 카드에 대한 혜택 및 카드 정보를 백엔드에서 가져옵니다.
  useEffect(() => {
   
      dispatch(fetchBenefits())
      .unwrap()
      .catch((error) => {
        alert("카드 신청 후 이용 부탁드립니다.");
        navigate("/card/intro");
      });



  }, [dispatch]);

  const handleCheckboxChange = (benefitId, e) => {
    if (e.target.checked) {
      setCheckedBenefits((prev) => [...prev, benefitId]);
    } else {
      setCheckedBenefits((prev) => prev.filter((id) => id !== benefitId));
    }
  };

  const handleAdd = () => {
  
    if (checkedBenefits.length + appliedBenefits.length > 3) {
      return alert("최대 3개 초과");
    }
    if (checkedBenefits.length === 0) {
      alert("추가할 혜택을 선택하세요.");
      return;
    }
    // availableBenefits에서 체크된 혜택들을 찾아 추가 혜택으로 dispatch
    const benefitsToAdd = availableBenefits.filter((b) =>
      checkedBenefits.includes(b.benefitId)
    );
    if (benefitsToAdd.length === 0) return;
    console.log(checkedBenefits);
    benefitsToAdd.forEach((benefit) => {
      dispatch(addBenefit(benefit));
    });
    setCheckedBenefits([]);
    setSelectedTab("added");
  };
  useEffect(() => {
    console.log("updated addedBenefits:", addedBenefits);
    console.log("appliedBenefits : ", appliedBenefits)
  }, [addedBenefits, appliedBenefits]);

  const handleClear = () => {
    if (addedBenefits.length === 0) return;
    dispatch(clearAddedBenefits());
    setCheckedBenefits([]);
  };

  const handlePayment = () => {
    if (addedBenefits.length === 0) {
      alert("결제할 혜택이 없습니다.");
      return;
    }
    if (!cardId) {
      alert("카드 정보가 없습니다.");
      return;
    }
    const benefitNames = addedBenefits.map((b) => b.name).join(", ");
    const confirmed = window.confirm(`다음 혜택들로 결제하시겠습니까?\n${benefitNames}`);
    if (confirmed) {
      // 결제 시, Redux에 저장된 cardId와 선택된 혜택 ID들을 백엔드에 전송합니다.
      dispatch(applyBenefits({ cardId, benefitIds: addedBenefits.map(b => b.benefitId) }));
      alert("구독이 완료되었습니다.");
      setSelectedTab("existing")
    }
  };
// src/pages/Benefit.jsx
const handleDeleteSelected = (benefitId) => {
  if (window.confirm("정말 삭제하시겠습니까?")) {
    // 객체로 benefitId와 cardId를 전달합니다.
    dispatch(deleteBenefit({ benefitId, cardId }));
  }
};

    
const filteredAvailableBenefits = useMemo(() => {
  console.log("filteredAvailableBenefits 재계산", appliedBenefits);

  return availableBenefits.filter(
    (benefit) =>
      !appliedBenefits.some(
        (applied) => applied.myBenefitId.benefitId === benefit.benefitId
      ) &&
      !addedBenefits.some((checked) => checked.benefitId === benefit.benefitId)
  );
}, [availableBenefits, appliedBenefits, addedBenefits]);


  // My 혜택 모달 (카드 뒷면)
  // const MyBenefitsModal = () => (
  //   <div className="card my-benefits">
  //     <div className="benefits-section">
  //       <h3>적용된 혜택</h3>
  //       {appliedBenefits && appliedBenefits.length > 0 ? (
  //         <ul>
  //           {appliedBenefits.map((b) => (
  //             <li key={b.benefitId} className="benefit-item">
  //               <div className="benefit-info">
  //                 <strong>{b.name}</strong>: {b.description} (할인율: {b.discountRate}%)
  //               </div>
  //               <button className="delete-btn" onClick={() => handleDeleteSelected(b.benefitId)}>
  //                 삭제
  //               </button>
  //             </li>
  //           ))}
  //         </ul>
  //       ) : (
  //         <p>적용된 혜택이 없습니다.</p>
  //       )}
  //     </div>
  //     <div className="benefits-section">
  //       <h3>추가된 혜택</h3>
  //       {addedBenefits && addedBenefits.length > 0 ? (
  //         <ul>
  //           {addedBenefits.map((b) => (
  //             <li key={b.benefitId} className="benefit-item">
  //               <div className="benefit-info">
  //                 <strong>{b.name}</strong>: {b.description} (할인율: {b.discountRate}%)
  //               </div>
  //             </li>
  //           ))}
  //         </ul>
  //       ) : (
  //         <p>추가된 혜택이 없습니다.</p>
  //       )}
  //     </div>
  //     <button className="back-btn" onClick={() => setIsFlipped(false)}>
  //       뒤로가기
  //     </button>
  //   </div>
  // );
console.log("card : ", checkedBenefits)
  return (
    <>
          <h2 className="sec_title">카멜레온 카드 혜택 적용</h2>
      <section className="card_benefit_sec1">
        <div>
          {/* 백컬러 프론트로 바꾸고 이미지 url */}
            <CardFront style={{ position: "relative",  }}
 $cardFrontColor={card?.cardDesigns[0]?.cardBackColor}>
                    <Chip style={card?.cardDesigns[0]?.layoutId === "2" ? currentLayout.chip : layoutPresets["1"].chip}>
                      <svg role="img" viewBox="0 0 100 100" aria-label="Chip">
                        <use href="#chip-lines" />
                      </svg>
                    </Chip>
                    <CardLogo
                      src="https://simey-credit-card.netlify.app/img/logos/master.svg"
                      alt="card logo"
                      style={card?.cardDesigns[0]?.layoutId === "2" ? currentLayout.logo : layoutPresets["1"].logo}
                      $logoGrayscale={card?.cardDesigns[0]?.logoGrayscale}
                    />
                    {card?.cardDesigns[0]?.layoutId == "1" && (
                      <>
                        <NumberLabel  style={ layoutPresets["1"].number}> {card?.cardNumber && card.cardNumber.replace(/(\d{4})(?=\d)/g, '$1-')}</NumberLabel>
                        <NameLabel style={layoutPresets["1"].name}>{card?.enName}</NameLabel>
                        <ExpiryLabel style={layoutPresets["1"].expiry}>{card?.expirationDate}</ExpiryLabel>
                      </>
                    )}
                  </CardFront>
        </div>
      </section>

      <section className="card_benefit_sec2">
      <div
  className="action-btn"
  onClick={handleAdd}
  style={{ backgroundColor: checkedBenefits.length > 0 ? "var(--box-color)" : undefined }}
>
  <ArrowUpOutlined style={{ fontSize: "30px" }} />
  <span>add</span>
</div>
<div
  className="action-btn"
  onClick={handleClear}
  style={{ backgroundColor: addedBenefits.length > 0 ? "var(--box-color)" : undefined }}
>
  <ArrowDownOutlined style={{ fontSize: "30px" }} />
  <span>clear</span>
</div>
<div
  className="action-btn"
  onClick={handlePayment}
  style={{ backgroundColor: addedBenefits.length > 0 ? "var(--box-color)" : undefined }}
>
  <BarcodeOutlined style={{ fontSize: "30px" }} />
  <span>구독</span>
</div>
        <div className="action-btn" onClick={() => navigate("/benefit/compare")}>
         <SwapOutlined style={{ fontSize: "30px" }} />
          <span>비교</span>
        </div>
      </section>

      <section
        className="card_benefit_sec3"
        
        style={{ cursor: "pointer" }}
      >
        <div className="my-benefits">
        <div className="benefits-tabs">
            <button
              className={selectedTab === "existing" ? "active" : ""}
              onClick={() => setSelectedTab("existing")}
            >
              My 혜택
            </button>
            <button
              className={selectedTab === "added" ? "active" : ""}
              onClick={() => setSelectedTab("added")}
            >
              Add 혜택
            </button>
          </div>
        {/* 선택된 탭에 따른 혜택 리스트 */}
        <div className="benefits-section">
            {selectedTab === "existing" ? (
              appliedBenefits && appliedBenefits.length > 0 ? (
                <ul>
                  {appliedBenefits.map((b) => (
                    <li key={b.benefit.benefitId} className="benefit-item">
                      <div className="benefit-info">
                        <span>{b.benefit.name} : {b.benefit.discountRate}%</span> 
                      </div>
                      <button
                        className="benefit_remove_btn"
                        onClick={() => handleDeleteSelected(b.benefit.benefitId)}
                      >
                        취소
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>혜택이 없습니다.</p>
              )
            ) : (
              addedBenefits && addedBenefits.length > 0 ? (
                <ul>
                  {addedBenefits.map((b) => (
                    <li key={b.benefitId} className="benefit-item2">
                      <div className="benefit-info2">
                        <strong>{b.name}</strong>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>혜택이 없습니다.</p>
              )
            )}
          </div>
        </div>
      </section>

      <section className="card_benefit_sec4">
  <ul className="benefits-list">
    <div className="benefits_column">
        혜택 리스트
    </div>
    {filteredAvailableBenefits && filteredAvailableBenefits.map((b, i) => (
      <li key={b.benefitId} className="benefit-item">
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={checkedBenefits.includes(b.benefitId)}
            onChange={(e) => handleCheckboxChange(b.benefitId, e)}
          />
          <span className="checkmark"></span>
        </label>
        <div className="benefit-info">
          <p className="benefit-name">{i+1}. {b.name}</p>
          <p className="benefit-desc">{b.description}</p>
        </div>
        <div className="benefit-price">
          <p>{b.fee.toLocaleString("ko-KR") + "원"}</p>
        </div>
      </li>
    ))}
  </ul>
</section>
    </>
  );
};

export default Benefit;
