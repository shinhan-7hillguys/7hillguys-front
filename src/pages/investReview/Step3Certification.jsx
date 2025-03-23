import React from "react";
import "styles/investReview/Step3Certification.css";

const Step3Certification = ({
                                formData,
                                setFormData,
                                addCertification,
                                removeCertification,
                                handleCertificationChange,
                                handleFileChange,  // handleFileChange 추가
                                handleNext,
                                handleBack,
                            }) => {

    // 개별 자격증 파일 관리 (formData와 files 상태 동기화)
    const handleFileSelectForIndex = (e, index) => {
        const { files } = e.target;
        if (files.length === 0) return;

        // formData에 파일 저장
        setFormData((prev) => {
            const updatedFiles = Array.isArray(prev.certificationFiles) ? [...prev.certificationFiles] : [];
            updatedFiles[index] = files[0];
            return { ...prev, certificationFiles: updatedFiles };
        });

        // Review.jsx의 handleFileChange 호출하여 files 상태에도 반영
        handleFileChange(e);
    };

    return (
        <div className="certification-container">
            <div className="certification-box">
                <h2 className="certification-title">자격증 정보 입력</h2>

                {formData.certification.map((cert, index) => (
                    <div key={index} className="certification-item">
                        {/* 자격증 입력 필드 */}
                        <div className="certification-input-wrapper">
                            <input
                                type="text"
                                placeholder="자격증"
                                value={cert}
                                onChange={(e) => handleCertificationChange(e, index)}
                                className="input-field"
                            />
                            <button
                                type="button"
                                onClick={() => removeCertification(index)}
                                className="delete-button"
                            >
                                ✖
                            </button>
                        </div>

                        {/* 파일 업로드 컨테이너 */}
                        <div className="file-upload-wrapper">
                            <label className="file-upload-label">자격증 파일</label>
                            <label className="custom-file-upload">
                                선택
                                <input
                                    type="file"
                                    name="certificationFiles"
                                    onChange={(e) => handleFileSelectForIndex(e, index)}
                                    className="file-upload"
                                />
                            </label>
                            <span className="file-name">
                                {formData.certificationFiles?.[index]
                                    ? formData.certificationFiles[index].name
                                    : "선택된 파일 없음"}
                            </span>
                        </div>
                    </div>
                ))}

                {/* 자격증 추가 버튼 */}
                <button type="button" onClick={addCertification} className="certification-add-button">
                    + 자격증 추가
                </button>

                {/* 이전 / 다음 버튼 */}
                <div className="certification-button-container">
                    <button onClick={handleBack} className="certification-prev-button">이전</button>
                    <button onClick={handleNext} className="certification-next-button">다음</button>
                </div>
            </div>
        </div>
    );
};

export default Step3Certification;