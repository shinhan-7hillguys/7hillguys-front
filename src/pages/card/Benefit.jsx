// src/pages/Benefit.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBenefit, removeBenefit, clearAddedBenefits, mergeBenefits } from "../../features/benefitSlice";
import { useNavigate } from "react-router-dom";
import { ArrowDownOutlined, ArrowUpOutlined, BarcodeOutlined } from "@ant-design/icons";
import "styles/card/benefit.css";

const Benefit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state: available, selected, and added 혜택을 가져옵니다.
  const { availableBenefits, selectedBenefits, addedBenefits } = useSelector(
    (state) => state.benefit
  );

  // 로컬 상태: 체크박스에서 선택한 혜택 ID들을 관리합니다.
  const [checkedBenefits, setCheckedBenefits] = useState([]);
  // 카드 앞/뒷면 전환 상태 (My 혜택 모달을 열기 위한 상태)
  const [isFlipped, setIsFlipped] = useState(false);

  // 체크박스 선택/해제 핸들러
  const handleCheckboxChange = (benefitId, e) => {
    if (e.target.checked) {
      setCheckedBenefits((prev) => [...prev, benefitId]);
    } else {
      setCheckedBenefits((prev) => prev.filter((id) => id !== benefitId));
    }
  };

  // add 버튼 클릭: 체크한 혜택을 availableBenefits에서 찾아 임시 추가 혜택(addedBenefits)에 추가하고, availableBenefits에서 제거합니다.
  const handleAdd = () => {
    if (checkedBenefits.length === 0) {
      alert("추가할 혜택을 선택하세요.");
      return;
    }
    const currentTotal = selectedBenefits.length + addedBenefits.length;
    // availableBenefits에서 체크된 항목들 찾기
    const benefitsToAdd = availableBenefits.filter((b) =>
      checkedBenefits.includes(b.benefitId)
    );
    if (currentTotal + benefitsToAdd.length > 3) {
      alert("최대 3개의 혜택만 적용할 수 있습니다.");
      return;
    }
    if (benefitsToAdd.length === 0) return;
    // 각 혜택을 Redux store에 추가
    benefitsToAdd.forEach((benefit) => {
      dispatch(addBenefit(benefit));
    });
    // 체크된 혜택 ID 초기화
    setCheckedBenefits([]);
  };

  // clear 버튼 클릭: 임시 추가된 혜택을 모두 제거하고 availableBenefits로 복원
  const handleClear = () => {
    if (addedBenefits.length === 0) return;
    dispatch(clearAddedBenefits());
    setCheckedBenefits([]);
  };

  // 결제 버튼 클릭: 임시 추가 혜택을 기존 혜택에 병합 (결제 진행)
  const handlePayment = () => {
    if (addedBenefits.length === 0) {
      alert("결제할 혜택이 없습니다.");
      return;
    }
    const benefitNames = addedBenefits.map((b) => b.name).join(", ");
    const confirmed = window.confirm(`다음 혜택들로 결제하시겠습니까?\n${benefitNames}`);
    if (confirmed) {
      alert("결제 진행합니다.");
      dispatch(mergeBenefits());
    }
  };

  // 기존 혜택 삭제 (선택된 혜택 제거)
  const handleDeleteSelected = (benefitId) => {
    if (window.confirm("정말 삭제 하시겠습니까?")) {
      dispatch(removeBenefit({ benefitId, type: "selected" }));
    }
  };

  // 추가 혜택 삭제 (임시 추가 혜택 제거)
  const handleDeleteAdded = (benefitId) => {
    if (window.confirm("정말 삭제 하시겠습니까?")) {
      dispatch(removeBenefit({ benefitId, type: "added" }));
    }
  };

  // My 혜택 모달: 카드 뒷면에 기존 혜택과 임시 추가 혜택을 보여줍니다.
  const MyBenefitsModal = () => (
    <div className="card my-benefits">
      <div className="benefits-section">
        <h3>적용된 혜택</h3>
        {selectedBenefits.length > 0 ? (
          <ul>
            {selectedBenefits.map((b) => (
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
        {addedBenefits.length > 0 ? (
          <ul>
            {addedBenefits.map((b) => (
              <li key={b.benefitId} className="benefit-item">
                <div className="benefit-info">
                  <strong>{b.name}</strong>: {b.description} (할인율: {b.discountRate}%)
                </div>
                <button className="delete-btn" onClick={() => handleDeleteAdded(b.benefitId)}>
                  삭제
                </button>
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

      {/* 혜택 비교 페이지로 이동하는 섹션 */}
      <section
        className="card_benefit_sec3"
        onClick={() => navigate("/benefit/compare")}
        style={{ cursor: "pointer" }}
      >
        할인내역 비교
      </section>

      {/* 사용 가능한 혜택 목록 */}
      <section className="card_benefit_sec4">
        <ul className="benefits-list">
          {availableBenefits.map((b) => (
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
