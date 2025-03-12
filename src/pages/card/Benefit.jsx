// src/pages/Benefit.jsx
import React, { useState, useEffect } from "react";
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

const Benefit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { availableBenefits, appliedBenefits, addedBenefits, status, error } = useSelector(
    (state) => state.benefit
  );
  
  // 예시로, 카드 ID는 고정 (실제 프로젝트에서는 JWT 또는 다른 방식으로 결정)
  const cardId = 16;

  const [checkedBenefits, setCheckedBenefits] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);

  // 페이지 로드시 내 카드의 혜택 정보를 백엔드에서 가져옵니다.
  useEffect(() => {
    dispatch(fetchBenefits(cardId));
  }, [dispatch, cardId]);

  const handleCheckboxChange = (benefitId, e) => {
    if (e.target.checked) {
      setCheckedBenefits((prev) => [...prev, benefitId]);
    } else {
      setCheckedBenefits((prev) => prev.filter((id) => id !== benefitId));
    }
  };

  const handleAdd = () => {
    if (checkedBenefits.length === 0) {
      alert("추가할 혜택을 선택하세요.");
      return;
    }
    // availableBenefits에서 체크된 혜택을 찾아 추가 혜택으로 dispatch
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
    const benefitNames = addedBenefits.map((b) => b.name).join(", ");
    const confirmed = window.confirm(`다음 혜택들로 결제하시겠습니까?\n${benefitNames}`);
    if (confirmed) {
      // 결제 시, 백엔드에 적용할 혜택 정보를 전송합니다.
      dispatch(applyBenefits({ cardId, benefitIds: addedBenefits.map(b => b.benefitId) }));
      alert("결제가 진행됩니다.");
    }
  };

  // 기존 혜택 삭제 (적용된 혜택)
  const handleDeleteSelected = (benefitId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(deleteBenefit(benefitId));
    }
  };

  // My 혜택 모달 (카드 뒷면)
  const MyBenefitsModal = () => (
    <div className="card my-benefits">
      <div className="benefits-section">
        <h3>적용된 혜택</h3>
        {appliedBenefits && appliedBenefits.length > 0 ? (
          <ul>
            {appliedBenefits.map((b) => (
              <li key={b.benefitId} className="benefit-item">
                <div className="benefit-info">
                  <strong>{b.name}</strong>: {b.description} (할인율: {b.discountRate}%)
                </div>
                <button className="delete-btn" onClick={() => handleDeleteSelected(b.benefitId)}>
                  삭제
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>적용된 혜택이 없습니다.</p>
        )}
      </div>
      <div className="benefits-section">
        <h3>추가된 혜택</h3>
        {addedBenefits && addedBenefits.length > 0 ? (
          <ul>
            {addedBenefits.map((b) => (
              <li key={b.benefitId} className="benefit-item">
                <div className="benefit-info">
                  <strong>{b.name}</strong>: {b.description} (할인율: {b.discountRate}%)
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>추가된 혜택이 없습니다.</p>
        )}
      </div>
      <button className="back-btn" onClick={() => setIsFlipped(false)}>
        뒤로가기
      </button>
    </div>
  );

  return (
    <>
      <section className="card_benefit_sec1">
        <div className={`flip-container ${isFlipped ? "flipped" : ""}`}>
          <div className="flipper">
            {/* Front: 혜택 선택 영역 */}
            <div className="front">
              <div className="card">
                <p className="card-title">Card (체크하여 혜택 선택)</p>
                <button className="my-benefit-btn" onClick={() => setIsFlipped(true)}>
                  My 혜택
                </button>
              </div>
            </div>
            {/* Back: 적용된 혜택과 추가 혜택 모달 */}
            <div className="back">
              <MyBenefitsModal />
            </div>
          </div>
        </div>
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
          <span>결제</span>
        </div>
      </section>

      <section
        className="card_benefit_sec3"
        onClick={() => navigate("/benefit/compare")}
        style={{ cursor: "pointer" }}
      >
        할인내역 비교
      </section>

      <section className="card_benefit_sec4">
        <ul className="benefits-list">
          {availableBenefits && availableBenefits.map((b) => (
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
                <p>{b.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Benefit;
