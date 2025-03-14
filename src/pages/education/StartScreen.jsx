import React from "react";
import { useNavigate } from "react-router-dom";

const InitialScreen = () => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        // 이력서 등록 페이지(ResumeEdit)로 이동
        navigate("/education/ResumeEdit");
    };

    return (
        <div style={pageWrapperStyle}>
            {/* Pretendard 폰트 CDN (각 JSX 파일 내에 직접 삽입 - 권장되진 않지만 요청대로) */}
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
            />
            <div style={initialContainerStyle}>
                <h2 style={initialTitleStyle}>이 서비스를 시작하시겠습니까?</h2>
                <p style={initialSubTextStyle}>
                    내 이력서를 등록하면 맞춤형 추천 서비스를 경험하실 수 있습니다.
                </p>
                <button style={registerButtonStyle} onClick={handleRegisterClick}>
                    내 이력서 등록하러가기
                </button>
            </div>
        </div>
    );
};

export default InitialScreen;

/* ====================== 스타일 정의 ====================== */
const pageWrapperStyle = {
    minHeight: "100vh",
    width: "100%",
    margin: 0,
    padding: "20px",
    boxSizing: "border-box",
    fontFamily: "Pretendard, sans-serif",
    // Education의 그라데이션 배경과 동일하게 설정
    background:
        "linear-gradient(191deg, rgb(255 247 252 / 70%) 0%, rgba(235, 217, 238, 0.3) 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const initialContainerStyle = {
    background: "rgba(255,255,255,0.6)", // 반투명 흰색 배경
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
};

const initialTitleStyle = {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px",
};

const initialSubTextStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "30px",
};

const registerButtonStyle = {
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#df6e99",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
};