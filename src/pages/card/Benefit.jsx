import { ArrowDownOutlined, ArrowUpOutlined, BarcodeOutlined } from "@ant-design/icons";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import "styles/card/benefit.css";

const Benefit = () => {
  const navigate = useNavigate(); // navigate 함수 생성

  // available 혜택 (아직 선택되지 않은 혜택들)
  const [benefits, setBenefits] = useState([
    { benefitId: 1, name: "자격증 시험 응시료 10% 할인", description: "국가공인 자격증 시험만 가능", price: "3,000" },
    { benefitId: 2, name: "혜택2", description: "설명2", price: "3,000" },
    { benefitId: 3, name: "혜택3", description: "설명3", price: "3,000" },
    { benefitId: 4, name: "혜택4", description: "설명4", price: "3,000" },
    { benefitId: 5, name: "혜택5", description: "설명5", price: "3,000" },
    { benefitId: 6, name: "혜택6", description: "설명6", price: "3,000" },
    { benefitId: 7, name: "혜택7", description: "설명7", price: "3,000" },
    { benefitId: 8, name: "혜택8", description: "설명8", price: "3,000" },
  ]);

  // DB에서 받아온 초기 적용 혜택 (더미 데이터)
  const [selectedBenefits, setSelectedBenefits] = useState([
    { benefitId: 101, name: "기존 혜택 1", description: "기존 혜택 설명1", price: "5,000" },
    { benefitId: 102, name: "기존 혜택 2", description: "기존 혜택 설명2", price: "10,000" },
  ]);

  // 새로 추가한 혜택 (결제 전까지 저장)
  const [addedBenefits, setAddedBenefits] = useState([]);

  // available 혜택 리스트에서 체크한 항목의 benefitId 저장
  const [checkedBenefits, setCheckedBenefits] = useState([]);

  // 카드 앞/뒷면 전환 상태 (My 혜택 보기)
  const [isFlipped, setIsFlipped] = useState(false);

  // 체크박스 선택/해제 핸들러
  const handleCheckboxChange = (benefitId, e) => {
    if (e.target.checked) {
      setCheckedBenefits((prev) => [...prev, benefitId]);
    } else {
      setCheckedBenefits((prev) => prev.filter((id) => id !== benefitId));
    }
  };

  // add 버튼 클릭: 체크된 혜택들을 addedBenefits에 추가하고 available 리스트에서 제거  
  // 단, 기존 혜택과 추가 혜택의 총합이 3개를 넘으면 추가할 수 없음.
  const handleAdd = () => {
    if (checkedBenefits.length === 0) {
      alert("추가할 혜택을 선택하세요.");
      return;
    }
    const currentTotal = selectedBenefits.length + addedBenefits.length;
    const benefitsToAdd = benefits.filter((b) => checkedBenefits.includes(b.benefitId));
    if (currentTotal + benefitsToAdd.length > 3) {
      alert("최대 3개의 혜택만 적용할 수 있습니다.");
      return;
    }
    if (benefitsToAdd.length === 0) return;
    // addedBenefits에 추가
    setAddedBenefits((prev) => [...prev, ...benefitsToAdd]);
    // available 혜택 목록에서 제거
    setBenefits((prev) => prev.filter((b) => !checkedBenefits.includes(b.benefitId)));
    // 체크박스 상태 초기화
    setCheckedBenefits([]);
  };

  // clear 버튼 클릭: 새로 추가한 혜택 모두 제거하고 available 리스트로 복귀
  const handleClear = () => {
    if (addedBenefits.length === 0) return;
    setBenefits((prev) => [...prev, ...addedBenefits]);
    setAddedBenefits([]);
    setCheckedBenefits([]);
  };

  // 결제 버튼 클릭: 새로 추가한 혜택을 기존 혜택에 합치기  
  // (추가 혜택을 병합한 후 결제 로직 진행 및 addedBenefits 초기화)
  const handlePayment = () => {
    if (addedBenefits.length === 0) {
      alert("결제할 혜택이 없습니다.");
      return;
    }
    const benefitNames = addedBenefits.map((b) => b.name).join(", ");
    const confirmed = window.confirm(`다음 혜택들로 결제하시겠습니까?\n${benefitNames}`);
    if (confirmed) {
      alert("결제 진행합니다.");
      setSelectedBenefits((prev) => [...prev, ...addedBenefits]);
      setAddedBenefits([]);
    }
  };

  // 삭제 기능: 기존 혜택에서 삭제 (삭제 전 confirm 추가)
  const handleDeleteSelected = (benefit) => {
    if (window.confirm("정말 삭제 하시겠습니까?")) {
      setSelectedBenefits((prev) => prev.filter((b) => b.benefitId !== benefit.benefitId));
      setBenefits((prev) => [...prev, benefit]);
    }
  };

  // 삭제 기능: 추가 혜택에서 삭제
  const handleDeleteAdded = (benefit) => {
    if (window.confirm("정말 삭제 하시겠습니까?")) {
      setAddedBenefits((prev) => prev.filter((b) => b.benefitId !== benefit.benefitId));
      setBenefits((prev) => [...prev, benefit]);
    }
  };

  // My 혜택 모달 (카드 뒷면) - 기존 혜택과 추가 혜택 모두 보여주며 삭제 가능
  const MyBenefitsModal = () => (
    <div className="card my-benefits">
      <div className="benefits-section">
        <h3>적용된 혜택</h3>
        {selectedBenefits.length > 0 ? (
          <ul>
            {selectedBenefits.map((b) => (
              <li key={b.benefitId} className="benefit-item">
                <div className="benefit-info">
                  <strong>{b.name}</strong>: {b.description}
                </div>
                <button className="delete-btn" onClick={() => handleDeleteSelected(b)}>
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
                  <strong>{b.name}</strong>: {b.description}
                </div>
                <button className="delete-btn" onClick={() => handleDeleteAdded(b)}>
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
            {/* Front: 체크하여 혜택 선택 영역 */}
            <div className="front">
              <div className="card">
                <p className="card-title">Card (체크하여 혜택 선택)</p>
                <button className="my-benefit-btn" onClick={() => setIsFlipped(true)}>
                  My 혜택
                </button>
              </div>
            </div>
            {/* Back: 기존 적용 혜택과 추가 혜택 모두 표시 */}
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
      
      {/* sec3 클릭 시 할인내역 비교 페이지로 이동 */}
      <section
        className="card_benefit_sec3"
        onClick={() => navigate("/benefit/compare")}
        style={{ cursor: "pointer" }}
      >
        할인내역 비교
      </section>
      
      <section className="card_benefit_sec4">
        <ul className="benefits-list">
          {benefits.map((b) => (
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
