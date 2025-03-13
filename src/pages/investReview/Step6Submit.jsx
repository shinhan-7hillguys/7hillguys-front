import React from "react";
import "styles/investReview/Step6Submit.css";

const Step6Submit = ({ handleSubmit, handleBack }) => {
    return (
        <div className="submit-container">
            <div className="submit-box">
                <h2 className="submit-title">최종 확인 및 제출</h2>
                <p className="submit-text">
                    입력하신 정보를 최종 확인하신 뒤 제출해 주세요.
                </p>
                <div className="submit-button-container">
                    <button onClick={handleBack} className="submit-prev-button">이전</button>
                    <button onClick={handleSubmit} className="submit-next-button">제출</button>
                </div>
            </div>
        </div>
    );
};

export default Step6Submit;