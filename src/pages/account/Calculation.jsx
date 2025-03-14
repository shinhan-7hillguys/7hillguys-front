import React from 'react';
import "../../style/Calculation.css";
import { useNavigate } from "react-router-dom";

function Calculation() {
    const navigate = useNavigate();

    const handleCalculation = () => {
        // 여기서 필요한 로직이 있다면 처리
        // 예: 서버에 계산 요청 -> 응답 받기 등
        // 그리고 이동
        navigate("/account/calculationResult");
    };
    return (
        <div className="calculation-container">
            <div className="content">
                <h1 className="title">납부 금액 산정</h1>

                <div className="amount-box">
                    <span className="amount">30,000,000원</span>
                </div>

                <p className="description">홍길동 님의 투자 받으신 금액은 다음과 같습니다.</p>

                <div className="details">
                    <p>투자 시작일 <span className="date">2020.03.02</span></p>
                    <p>투자 종료일 <span className="date">2024.03.02</span></p>
                    <p>총 투자 기간 <span className="date">4년 0개월 0일</span></p>
                </div>

                <button className="calculate-btn" onClick={handleCalculation}>
                    산정하기
                </button>
            </div>
        </div>
    );
}

export default Calculation;