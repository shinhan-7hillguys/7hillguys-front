import React from 'react';
import "../../style/Calculation.css";
import { useLocation, useNavigate } from "react-router-dom";

function CalculationResult() {
    const location = useLocation();
    const navigate = useNavigate();
    const { calculatedAmount } = location.state || {};

    if (calculatedAmount === undefined) {
        return (
            <div className="calculation-container">
                <h1>납부 금액 산정 결과</h1>
                <p>계산된 결과가 없습니다. 다시 시도해 주세요.</p>
                <button className="close-btn" onClick={() => navigate(-1)}>뒤로가기</button>
            </div>
        );
    }

    return (
        <div className="calculation-container">
            <h1>납부 금액 산정 결과</h1>
            <p>산정된 납부 금액은 다음과 같습니다.</p>
            <div className="amount-box">
                <h2>{calculatedAmount.toLocaleString()}원</h2>
            </div>

            <div className="details">
                <p>납부일: 매 달 1일</p>
                <p>처리 방식: 자동 이체</p>
                <p>납부 예정 계좌: 농협 24***** - *******</p>
            </div>

            <p className="notice">
                일괄 납부가 가능하며, 일괄 납부 시 계약이 종료됩니다.
            </p>

            <button className="close-btn" onClick={() => navigate("/")}>닫기</button>
        </div>
    );
}

export default CalculationResult;
