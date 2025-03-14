import React from 'react';
import "../../style/Calculation.css";

function CalculationResult() {
    return (
        <div className="calculation-container">
            <h1>납부 금액 산정 결과</h1>
            <p>홍길동 님의 산정 금액은 다음과 같습니다.</p>
            <div className="amount-box">
                <h2>50,000,000원</h2>
            </div>

            <div className="details">
                <p>납부일: 매 달 1일</p>
                <p>처리 방식: 자동 이체</p>
                <p>납부 예정 계좌: 농협 24***** - *******</p>
            </div>

            <p className="notice">
                일괄 납부가 가능하며, 일괄 납부를 할 경우 계약은 종료됩니다.
            </p>

            <button className="close-btn">닫기</button>
        </div>
    );
}

export default CalculationResult;
