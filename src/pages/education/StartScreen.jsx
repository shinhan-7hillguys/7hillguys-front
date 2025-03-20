import React from "react";
import { useNavigate } from "react-router-dom";

const InitialScreen = () => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate("/education/ResumeEdit");
    };

    return (
        <div style={pageWrapperStyle}>
            {/* Pretendard 폰트 CDN */}
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
            />
            <div style={initialContainerStyle}>
                <h1 style={mainTitleStyle}>커리어 파트너</h1>
                <h2 style={initialTitleStyle}>이 서비스를 시작하시겠습니까?</h2>
                <p style={initialSubTextStyle}>
                    내 이력서를 등록하면 맞춤형 추천 서비스를 경험하실 수 있습니다.
                </p>

                <div style={featureBoxStyle}>
                    <h3 style={featureTitleStyle}>서비스 특징</h3>
                    <ul style={featureListStyle}>
                        <li>맞춤형 직무/회사 추천</li>
                        <li>나와 관련된 직군 평균 제공</li>
                        <li>직군에 맞는 회사의 자기소개서 제공</li>
                        <li>그래프 비교로 시각적 효과 제공</li>
                        <li>회사 평균과 나 비교 제공</li>
                    </ul>
                </div>

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
    padding: 0,
    boxSizing: "border-box",
    fontFamily: "Pretendard, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const initialContainerStyle = {
    textAlign: "center",
    maxWidth: "360px",
    height: "100vh",
    width: "85%",
    margin: "20px",
};

const mainTitleStyle = {
    marginTop: "20px",
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#333",
    textAlign: "center",
};

const initialTitleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
};

const initialSubTextStyle = {
    fontSize: "17px",
    marginBottom: "16px",
    color: "#666",
    lineHeight: "1.4",
};

const featureBoxStyle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "16px",
    marginTop: "50px",
    marginBottom: "38px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    textAlign: "left",
};

const featureTitleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#ff7fae",
};

const featureListStyle = {
    listStyleType: "disc",
    paddingLeft: "18px",
    margin: 0,
    color: "#555",
    fontSize: "14px",
    lineHeight: "1.6",
};

const registerButtonStyle = {
    marginTop: "16px",
    padding: "15px 30px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#ff99aa",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    outline: "none",
    transition: "all 0.3s ease",
};
