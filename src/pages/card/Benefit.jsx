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
import { ArrowDownOutlined, ArrowUpOutlined, BarcodeOutlined } from "@ant-design/icons";
import "styles/card/benefit.css";
import CardPreview from "./CardPreview";

const Benefit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { availableBenefits, appliedBenefits, addedBenefits,  status, error, card } = useSelector(
    (state) => state.benefit
  );
  
  // 더 이상 고정된 cardId 사용하지 않고, Redux에 저장된 카드 정보를 사용합니다.
  // card가 아직 null일 수 있으므로 안전하게 처리합니다.
  const cardId = card ? card.cardId : null;

  const [checkedBenefits, setCheckedBenefits] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);



  // 페이지 로드시, 내 카드에 대한 혜택 및 카드 정보를 백엔드에서 가져옵니다.
  useEffect(() => {
    dispatch(fetchBenefits());
  }, [dispatch]);

  const handleCheckboxChange = (benefitId, e) => {
    if (e.target.checked) {
      setCheckedBenefits((prev) => [...prev, benefitId]);
    } else {
      setCheckedBenefits((prev) => prev.filter((id) => id !== benefitId));
    }
  };

  const handleAdd = () => {
    console.log(addedBenefits.length, appliedBenefits.length )
    if(addedBenefits.length + 1 + appliedBenefits.length > 3) return alert("최대 3개 초과");
    if (checkedBenefits.length === 0) {
      alert("추가할 혜택을 선택하세요.");
      return;
    }
    // availableBenefits에서 체크된 혜택들을 찾아 추가 혜택으로 dispatch
    const benefitsToAdd = availableBenefits.filter((b) =>
      checkedBenefits.includes(b.benefitId)
    );
    if (benefitsToAdd.length === 0) return;
    benefitsToAdd.forEach((benefit) => {
      dispatch(addBenefit(benefit));
    });
    setCheckedBenefits([]);
  };

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
      alert("결제가 진행됩니다.");
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

  return (
    <>
      <section className="card_benefit_sec1">
        <div></div>
      </section>

      <section className="card_benefit_sec2">
        <div className="action-btn" onClick={handleAdd}>
          <ArrowUpOutlined style={{ fontSize: "30px" }} />
          <span>add</span>
        </div>
        <div className="action-btn" onClick={handleClear}>
          <ArrowDownOutlined style={{ fontSize: "30px" }} />
          <span>clear</span>
        </div>
        <div className="action-btn" onClick={handlePayment}>
          <BarcodeOutlined style={{ fontSize: "30px" }} />
          <span>구독</span>
        </div>
        <div className="action-btn" onClick={() => navigate("/benefit/compare")}>
          <BarcodeOutlined style={{ fontSize: "30px" }} />
          <span>비교</span>
        </div>
      </section>

      <section
        className="card_benefit_sec3"
        
        style={{ cursor: "pointer" }}
      >
        <div className="my-benefits">
          <div className="benefits-section">
            <h3>기존 혜택</h3>
            {appliedBenefits && appliedBenefits.length > 0 ? (
              <ul>
                {appliedBenefits.map((b) => (
                  <li key={b.benefit.benefitId} className="benefit-item">
                    <div className="benefit-info">
                      <strong>{b.benefit.name}</strong>: {b.benefit.discountRate}% 
                    </div>
                    <button className="benefit_remove_btn" onClick={() => handleDeleteSelected(b.benefit.benefitId)}>
                      취소
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>혜택이 없습니다.</p>
            )}
          </div>
          <div className="benefits-section">
            <h3>추가 혜택</h3>
            {addedBenefits && addedBenefits.length > 0 ? (
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
            )}
          </div>
        </div>
      </section>

      <section className="card_benefit_sec4">
  <ul className="benefits-list">
    {filteredAvailableBenefits && filteredAvailableBenefits.map((b) => (
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
          <p className="benefit-name">{b.name}</p>
          <p className="benefit-desc">{b.description}</p>
        </div>
        <div className="benefit-price">
          <p>{b.fee}</p>
        </div>
      </li>
    ))}
  </ul>
</section>
    </>
  );
};

export default Benefit;
