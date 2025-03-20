import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const ResumeDetail = () => {
    const { id } = useParams(); // id는 URL 파라미터로 받아옴
    const location = useLocation();
    const navigate = useNavigate();

    // SalaryComparisonChart에서 state로 전달한 자소서 객체
    const resume = location.state;

    if (!resume) {
        return (
            <div style={detailContainerStyle}>
                <h2>자소서 정보를 찾을 수 없습니다.</h2>
                <button onClick={() => navigate(-1)} style={backButtonStyle}>
                    뒤로가기
                </button>
            </div>
        );
    }

    return (
        <div style={detailContainerStyle}>
            <h2 style={detailTitleStyle}>
                {resume.company} / {resume.position} / {resume.applyDate}
            </h2>
            {/*<p style={detailSubTitleStyle}>{resume.type}</p>*/}
            <hr />
            <p style={detailTextStyle}>{resume.detail}</p>
            {/*<button onClick={() => navigate(-1)} style={backButtonStyle}>*/}
            {/*    뒤로가기*/}
            {/*</button>*/}
        </div>
    );
};

export default ResumeDetail;

/* ==================== 스타일 정의 ==================== */
const detailContainerStyle = {
    width: "90%",
    maxWidth: "700px",
    margin: "20px auto",
    padding: "20px",
    // background:
    //     "linear-gradient(191deg, rgba(255,247,252,0.7) 0%, rgba(235,217,238,0.3) 100%)",
    borderRadius: "10px",
    // boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
    fontFamily: "Pretendard, sans-serif",
};

const detailTitleStyle = {
    fontSize: "1.4rem",
    fontWeight: "bold",
    marginBottom: "10px",
};

const detailSubTitleStyle = {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#666",
    marginBottom: "8px",
};

const detailTextStyle = {
    fontSize: "0.95rem",
    lineHeight: "1.6",
    color: "#333",
    marginBottom: "20px",
};

const backButtonStyle = {
    padding: "8px 12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#df6e99",
    color: "#fff",
    cursor: "pointer",
};