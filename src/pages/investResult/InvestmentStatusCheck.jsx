import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const InvestmentStatusCheck = () => {
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const token = localStorage.getItem("token"); // JWT 가져오기
                console.log("✅ [프론트] 저장된 JWT 토큰:", token);

                if (!token) {
                    console.error("❌ [프론트] 토큰이 없습니다.");
                    return;
                }

                const response = await fetch("http://localhost:8080/api/investment/status", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`서버 요청 실패: ${response.status}`);
                }

                const result = await response.text(); // 🔍 백엔드 응답을 텍스트로 받음
                console.log("✅ [프론트] 서버 응답 값:", result);

                setStatus(result.trim() === "승인" || result.trim() === "거절" ? result.trim() : "대기");

            } catch (error) {
                console.error("❌ [프론트] 심사 상태 조회 오류:", error);
            }
        };

        checkStatus();
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>투자 심사 결과</h2>

            {status === "승인" && (
                <div>
                    <p style={{ color: "green", fontSize: "18px", fontWeight: "bold" }}>
                        ✅ 승인됨! 다음 페이지로 이동합니다...
                    </p>
                    <button
                        onClick={() => navigate("/next-page")}
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            backgroundColor: "green",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            borderRadius: "5px",
                            marginTop: "10px"
                        }}
                    >
                        다음 단계로 이동
                    </button>
                </div>
            )}

            {status === "거절" && (
                <div>
                    <p style={{ color: "red", fontSize: "18px", fontWeight: "bold" }}>
                        ❌ 승인이 거절되었습니다. 다시 재심사 신청해주세요!
                    </p>
                </div>
            )}

            {status === "대기" && (
                <div>
                    <p style={{ color: "blue", fontSize: "18px", fontWeight: "bold" }}>
                        ⏳ 승인 대기중입니다...
                    </p>
                </div>
            )}

            {!status && <p>🔍 심사 결과를 가져오는 중...</p>}
        </div>
    );
};

export default InvestmentStatusCheck;