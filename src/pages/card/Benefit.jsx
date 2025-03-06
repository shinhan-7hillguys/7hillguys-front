import { ArrowDownOutlined, ArrowUpOutlined, BarcodeOutlined } from "@ant-design/icons";
import { useState } from "react";
import React from "react";

const Benefit = () => {
  const [benefits, setBenefits] = useState([
    { id: 1, name: "혜택1", description: "설명1" },
    { id: 2, name: "혜택2", description: "설명2" },
    { id: 3, name: "혜택3", description: "설명3" },
    { id: 4, name: "혜택4", description: "설명4" },
  ]);

  const [selectedBenefits, setSelectedBenefits] = useState([]);

  // 3. 모달 열림 여부
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragStart = (e, benefit) => {
    e.dataTransfer.setData("text/plain", benefit.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropOnCard = (e) => {
    e.preventDefault();
    const benefitId = parseInt(e.dataTransfer.getData("text/plain"), 10);

    // benefits 배열에서 찾아 selectedBenefits로 이동
    setBenefits((prev) => {
      const benefit = prev.find((b) => b.id === benefitId);
      if (!benefit) return prev; // 이미 선택된 혜택이거나 없으면 무시
      // selectedBenefits에 추가
      setSelectedBenefits((prevSel) => {
        const alreadySelected = prevSel.some((b) => b.id === benefit.id);
        if (!alreadySelected) {
          return [...prevSel, benefit];
        }
        return prevSel;
      });
      // 기존 목록에서 제거
      return prev.filter((b) => b.id !== benefitId);
    });
  };

  function Modal({ selectedBenefits, onClose }) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content"
          onClick={(e) => {
            // 모달 내부 클릭 시 모달이 닫히지 않도록 전파 중지
            e.stopPropagation();
          }}
        >
          <h2>적용된 혜택 목록</h2>
          {selectedBenefits.length > 0 ? (
            <ul>
              {selectedBenefits.map((benefit) => (
                <li key={benefit.id}>
                  <strong>{benefit.name}</strong>: {benefit.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>적용된 혜택이 없습니다.</p>
          )}
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="card_benefit_sec1">
        <div
          className="card"
          onDragOver={handleDragOver}
          onDrop={handleDropOnCard}
        >
          <p>Card (드래그로 혜택을 추가하세요)</p>
        </div>
      </section>
      <section className="card_benefit_sec2">
        <div>
           <ArrowUpOutlined style={{ fontSize: '30px' }} />
          <span>add</span>
        </div>
        <div>
        <ArrowDownOutlined style={{ fontSize: '30px' }} />
          <span>clear</span>
        </div>
        <div>
        <BarcodeOutlined style={{ fontSize: '30px' }}  />
          <span>결제</span>
        </div>
        {/* <div
          className="applied-benefits"
          onClick={() => setIsModalOpen((prev) => !prev)}
        >
          <div>★</div>
          <span>my</span>
        </div> */}
      </section>
      <section className="card_benefit_sec3">
          <div className="card_benefit_sec3_left">
            <p>총 할인 받은 금액</p>
            <span>42,200</span>
          </div>
          <div className="card_benefit_sec3_right">그래프</div>
      </section>
      <section className="card_benefit_sec4">
        {benefits.map((benefit) => (
          <li
            key={benefit.id}
            draggable
            onDragStart={(e) => handleDragStart(e, benefit)}
            className="benefit-item"
          >
            <div>
              <p>자격증 시험 응시료 10% 할인</p>
              <p>국가공인 자격증 시험만 가능</p>
            </div>
            <div><p>$350</p></div>
           
          </li>
        ))}
      </section>

      {/* 모달: 적용된 혜택 목록을 보여줌 */}
      {isModalOpen && (
        <Modal
          selectedBenefits={selectedBenefits}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Benefit;
