import React from "react";
import "styles/investReview/Step4Health.css";

const Step4Health = ({ healthQuestions, radioOptions, handleRadioChange, handleNext, handleBack }) => {
    return (
        <div className="health-container">
            <div className="health-box">
                <h2 className="health-title">건강 상태 평가</h2>
                {healthQuestions.map((q) => (
                    <div key={q.id} className="health-question">
                        <h3>{q.text}</h3>
                        <div className="radio-group">
                            {radioOptions.map((option) => (
                                <label key={option.value} className="radio-label">
                                    <input
                                        type="radio"
                                        name={q.id}
                                        value={option.value}
                                        onChange={() => handleRadioChange("health", q.id, option.value)}
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="health-button-container">
                    <button onClick={handleBack} className="health-prev-button">이전</button>
                    <button onClick={handleNext} className="health-next-button">다음</button>
                </div>
            </div>
        </div>
    );
};

export default Step4Health;