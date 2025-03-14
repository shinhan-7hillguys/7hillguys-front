import React from "react";
import "styles/investReview/Step5Mental.css";

const Step5Mental = ({ mentalQuestions, radioOptions, handleRadioChange, handleNext, handleBack }) => {
    return (
        <div className="mental-container">
            <div className="mental-box">
                <h2 className="mental-title">정신 건강 및 성실도 평가</h2>
                {mentalQuestions.map((q) => (
                    <div key={q.id} className="mental-question">
                        <h3>{q.text}</h3>
                        <div className="radio-group">
                            {radioOptions.map((option) => (
                                <label key={option.value} className="radio-label">
                                    <input
                                        type="radio"
                                        name={q.id}
                                        value={option.value}
                                        onChange={() => handleRadioChange("mental", q.id, option.value)}
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="mental-button-container">
                    <button onClick={handleBack} className="mental-prev-button">이전</button>
                    <button onClick={handleNext} className="mental-next-button">다음</button>
                </div>
            </div>
        </div>
    );
};

export default Step5Mental;