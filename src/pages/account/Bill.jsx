import React, {useState} from 'react';
import "../../style/Bill.css";

function Bill() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bill-container">
            <h2>청구서</h2>
            <p><strong>홍길동</strong> 님의 <strong>12월</strong> 청구 금액은 다음과 같습니다.</p>

            <div className="amount-box">
                <span className="amount">500,000원</span>
                <button className="question-btn" onClick={() => setIsModalOpen(true)}>?</button>
            </div>

            <div className="details">
                <p>납부일 <span>2025.01.01</span></p>
                <p>처리 방식 <span>자동 이체</span></p>
                <p>납부 계좌 <span>농협 24*****- ******* </span></p>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>산정 방식</h3>
                        <p><strong>투자 받으신 금액:</strong> 300,000,000원</p>
                        <p><strong>상환 비율:</strong> 1.67%</p>
                        <p><strong>PEOCH의 기본 계산식:</strong> XXXXXXXXXX(식)</p>
                        <button className="close-modal" onClick={() => setIsModalOpen(false)}>닫기</button>
                    </div>
                </div>
            )}

            <div className="button-container">
                <button className="month-select">월 선택</button>
                <button className="close">닫기</button>
            </div>
        </div>
    );
}

export default Bill;