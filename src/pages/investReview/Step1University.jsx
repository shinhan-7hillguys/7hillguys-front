import React, { useState } from "react";

import "styles/investReview/Step1University.css";

const Step1University = ({ formData, handleChange, handleFileChange, handleNext }) => {
    const [universityFile, setUniversityFile] = useState("선택된 파일 없음");
    const [highSchoolFile, setHighSchoolFile] = useState("선택된 파일 없음");

    // 파일 업로드 핸들러
    const handleFileSelect = (event, setFileName) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName("선택된 파일 없음");
        }
        handleFileChange(event);
    };

    return (
        <div className="university-container">
            <div className="university-box">
                <h2 className="university-title">학교 정보 입력</h2>

                <input
                    type="text"
                    name="universityInfo.universityName"
                    placeholder="대학교 이름"
                    value={formData.universityInfo.universityName || ""}
                    onChange={handleChange}
                    className="input-field"
                />
                <input
                    type="text"
                    name="universityInfo.major"
                    placeholder="학과"
                    value={formData.universityInfo.major || ""}
                    onChange={handleChange}
                    className="input-field"
                />
                <input
                    type="text"
                    name="studentCard.highscool"
                    placeholder="고등학교"
                    value={formData.studentCard.highscool || ""}
                    onChange={handleChange}
                    className="input-field"
                />
                <input
                    type="text"
                    name="studentCard.highscoolGPA"
                    placeholder="내신 성적"
                    value={formData.studentCard.highscoolGPA || ""}
                    onChange={handleChange}
                    className="input-field"
                />

                {/* 대학교 증명서 파일 업로드 */}
                <div className="file-upload-wrapper">
                    <label className="file-upload-label">대학 증명서</label>
                    <label className="custom-file-upload">
                        파일 선택
                        <input
                            type="file"
                            name="universityCertificate"
                            onChange={(e) => handleFileSelect(e, setUniversityFile)}
                            className="file-upload"
                        />
                    </label>
                    <span className="file-name">{universityFile}</span>
                </div>

                {/* 고등학교 생활기록부 파일 업로드 */}
                <div className="file-upload-wrapper">
                    <label className="file-upload-label">고등학교 생활기록부</label>
                    <label className="custom-file-upload">
                        파일 선택
                        <input
                            type="file"
                            name="studentCardFile"
                            onChange={(e) => handleFileSelect(e, setHighSchoolFile)}
                            className="file-upload"
                        />
                    </label>
                    <span className="file-name">{highSchoolFile}</span>
                </div>

                <button onClick={handleNext} className="next-button">
                    다음
                </button>
            </div>
        </div>
    );
};

export default Step1University;