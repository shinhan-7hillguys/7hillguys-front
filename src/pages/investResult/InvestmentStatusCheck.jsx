import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* CSS 스타일 */
import "styles/investResult/InvestmentStatusCheck.css";

const InvestmentStatusCheck = () => {
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkStatus = async () => {
            try {
                console.log("[프론트] 투자 심사 상태 조회 요청");

                const response = await fetch("/api/investment/status", {
                    method: "GET",
                    credentials: "include", // 쿠키 자동 포함
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`서버 요청 실패: ${response.status}`);
                }

                const result = await response.text();
                console.log("[프론트] 서버 응답 값:", result);

                setStatus(result.trim() === "승인" || result.trim() === "거절" ? result.trim() : "대기");

            } catch (error) {
                console.error("[프론트] 심사 상태 조회 오류:", error);
            }
        };

        checkStatus();
    }, []);

    return (
        <div className="investment-status-container">
            <h2>투자 심사 결과</h2>

            {status === "승인" && (
                <div className="status-box">
                    <p className="approved"><span className="highlight">승인</span>되었습니다!<br/>
                        버튼을 클릭해<br/>
                        다음 페이지로 이동해주세요.</p>
                    <button
                        onClick={() => navigate("/SetInvestment")} className="next-button">
                        다음 단계로 이동
                    </button>
                </div>
            )}

            {status === "거절" && (
                <div className="status-box">
                    <p className="rejected">승인이 <span className="highlight">거절</span>되었습니다. 다시 <span className="highlight">재심사</span> 신청해주세요!</p>
                </div>
            )}

            {status === "대기" && (
                <div className="status-box">
                    <p className="pending"><span className="highlight">잠시 후</span>다시 이용해주세요.</p>
                    <div className="loading-dots">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
            )}

            {!status &&
                <div className="loading-dots">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>}
        </div>
    );
};

export default InvestmentStatusCheck;