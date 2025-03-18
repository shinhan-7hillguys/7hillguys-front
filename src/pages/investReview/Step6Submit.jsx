import React from "react";
import "styles/investReview/Step6Submit.css";
import {useNavigate} from "react-router-dom";

const Step6Submit = ({ handleSubmit, handleBack }) => {
    const navigate = useNavigate();

    const handleSubmitAndNavigate = async () => {
        try {
            console.log("[프론트] 데이터 제출 중...");
            await handleSubmit(); // handleSubmit 실행 후

            console.log("[프론트] 제출 성공! 페이지 이동...");
            navigate("/investment/status"); // 제출 후 이동

        } catch (error) {
            console.error("[프론트] 제출 오류:", error);
            alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };


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