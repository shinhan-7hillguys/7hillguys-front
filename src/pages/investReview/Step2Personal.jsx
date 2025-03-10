import React, { useState } from "react";
import "styles/investReview/Step2Personal.css";

const Step2Personal = ({ formData, setFormData, handleFileChange, handleNext, handleBack }) => {
    const [familyCertificateFile, setFamilyCertificateFile] = useState("선택된 파일 없음");
    const [criminalRecordFile, setCriminalRecordFile] = useState("선택된 파일 없음");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = type === "checkbox" ? checked : value;

        // 성별(gender) 라디오 버튼 선택 시 boolean 값으로 변환
        if (name === "gender") {
            newValue = value === "true";
        }

        if (name.includes(".")) {
            const [parentKey, childKey] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                [parentKey]: {
                    ...prev[parentKey],
                    [childKey]: newValue,
                },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: newValue }));
        }
    };

    const handleFileSelect = (event, setFileName, fieldName) => {
        const file = event.target.files[0];

        if (file) {
            setFileName(file.name);  // UI에 표시할 파일명 업데이트
            setFormData((prev) => ({
                ...prev,
                [fieldName]: file,  // formData에 파일 저장
            }));
        } else {
            setFileName("선택된 파일 없음");
            setFormData((prev) => ({
                ...prev,
                [fieldName]: null,
            }));
        }
        handleFileChange(event);
    };


    return (
        <div className="personal-container">
            <div className="personal-box">
                <h2 className="personal-title">개인 및 기타 정보 입력</h2>

                {/* 성별 */}
                <div className="personal-radio-group">
                    <span className="personal-radio-label">성별:</span>
                    <div className="personal-radio-options">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="true"
                                checked={formData.gender === true}
                                onChange={handleChange}
                            /> 남성
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="false"
                                checked={formData.gender === false}
                                onChange={handleChange}
                            /> 여성
                        </label>
                    </div>
                </div>

                <input
                    type="text"
                    name="address"
                    placeholder="주소"
                    value={formData.address || ""}
                    onChange={handleChange}
                    className="input-field"
                />
                <input
                    type="number"
                    name="assets"
                    placeholder="자산"
                    value={formData.assets || ""}
                    onChange={handleChange}
                    className="input-field"
                />

                {/* 결혼 여부 체크박스 */}
                <div className="personal-checkbox-group">
                    <p>결혼여부:</p>
                    <input
                        type="checkbox"
                        name="familyStatus.married"
                        checked={formData.familyStatus.married || false}
                        onChange={handleChange}
                    />
                    <span className="personal-checkbox-label-text">
                        {formData.familyStatus.married ? "기혼" : "미혼"}
                    </span>
                </div>

                <input
                    type="number"
                    name="familyStatus.children"
                    placeholder="자녀 수"
                    value={formData.familyStatus.children || ""}
                    onChange={handleChange}
                    className="input-field"
                />

                {/* 범죄 기록 체크박스 */}
                <div className="personal-checkbox-group">
                    <p>범죄여부:</p>
                    <input
                        type="checkbox"
                        name="criminalRecord"
                        checked={formData.criminalRecord || false}
                        onChange={handleChange}
                    />
                    <span className="personal-checkbox-label-text">
                        {formData.criminalRecord ? "있음" : "없음"}
                    </span>
                </div>

                {/* 가족관계 증명서 업로드 */}
                <div className="file-upload-wrapper">
                    <label className="file-upload-label">가족관계 증명서</label>
                    <label className="custom-file-upload">
                        파일 선택
                        <input type="file" name="familyCertificate" onChange={(e) => handleFileSelect(e, setFamilyCertificateFile)} className="file-upload" />
                    </label>
                    <span className="file-name">{familyCertificateFile}</span>
                </div>

                {/* 범죄 기록 증명서 업로드 */}
                <div className="file-upload-wrapper">
                    <label className="file-upload-label">범죄 기록 증명서</label>
                    <label className="custom-file-upload">
                        파일 선택
                        <input type="file" name="criminalRecordFile" onChange={(e) => handleFileSelect(e, setCriminalRecordFile)} className="file-upload" />
                    </label>
                    <span className="file-name">{criminalRecordFile}</span>
                </div>

                <div className="personal-button-container">
                    <button onClick={handleBack} className="personal-prev-button">
                        이전
                    </button>
                    <button onClick={handleNext} className="personal-next-button">
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Step2Personal;