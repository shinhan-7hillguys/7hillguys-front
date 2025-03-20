import React, {useEffect} from "react";
import "styles/investReview/Step6Submit.css";
import {useNavigate} from "react-router-dom";

const Step6Submit = ({ formData, handleSubmit, handleBack }) => {

    useEffect(() => {
        console.log("Step6Submit.jsx에서 받은 formData:", formData);
    }, [formData]);
    return (
        <div className="submit-container">
            <div className="submit-box">
                <h2 className="submit-title">최종 확인 및 제출</h2>
                <p className="submit-text">
                    입력하신 정보를 최종 확인하신 뒤 제출해 주세요.
                </p>

                {/* 사용자 입력 데이터 확인 */}
                <p><strong>대학교 이름:</strong> {formData.universityInfo?.universityName || "없음"}</p>
                <p><strong>전공:</strong> {formData.universityInfo?.major || "없음"}</p>
                <p><strong>학점:</strong> {formData.studentCard?.highscoolGPA || "없음"}</p>
                <p><strong>성별:</strong> {formData.gender ? "남성" : "여성"}</p>
                <p><strong>결혼 여부:</strong> {formData.familyStatus?.married ? "기혼" : "미혼"}</p>
                <p><strong>자녀 수:</strong> {formData.familyStatus?.children || "없음"}</p>
                <p><strong>자격증:</strong> {formData.certification.length > 0 ? formData.certification.join(", ") : "없음"}</p>

                <div className="submit-button-container">
                    <button onClick={handleBack} className="submit-prev-button">이전</button>
                    <button onClick={handleSubmit} className="submit-next-button">제출</button>
                </div>
            </div>
        </div>
    );
};

export default Step6Submit;