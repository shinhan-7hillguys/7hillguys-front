import React, {useEffect, useState} from "react";
import "styles/investReview/Step2Personal.css";

const Step2Personal = ({ formData, setFormData, handleFileChange, handleNext, handleBack }) => {
    const [familyCertificateFile, setFamilyCertificateFile] = useState("선택된 파일 없음");
    const [criminalRecordFile, setCriminalRecordFile] = useState("선택된 파일 없음");

    useEffect(() => {
        // 다음 주소 API 스크립트 동적 로드
        const script = document.createElement("script");
        script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleSearchAddress = () => {
        const container = document.getElementById("postcode-container");
        container.style.display = "block"; // iframe을 보이도록 설정

        const postcode = new window.daum.Postcode({
            oncomplete: function (data) {
                let fullAddress = data.address;
                if (data.addressType === "R") {
                    if (data.bname) fullAddress += ` (${data.bname})`;
                }
                setFormData((prev) => ({ ...prev, address: fullAddress }));

                container.style.display = "none"; // 주소 선택 후 iframe 숨김
            },
            width: "100%", // iframe 가로 크기 설정
            height: "400px", // iframe 세로 크기 설정
        });

        postcode.embed(container); // 기존 open() 대신 embed() 사용하여 iframe으로 렌더링
    };

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

                {/*<input
                    type="text"
                    name="address"
                    placeholder="주소"
                    value={formData.address || ""}
                    onChange={handleChange}
                    className="input-field"
                />*/}

                {/* 주소 입력 필드 */}
                <div className="address-input-group">
                    <input
                        type="text"
                        name="address"
                        placeholder="주소를 검색하세요"
                        value={formData.address || ""}
                        readOnly
                        className="input-field"
                    />
                    <button onClick={handleSearchAddress} className="address-search-btn">
                        주소 검색
                    </button>
                </div>

                {/* Daum 주소 API가 삽입될 div */}
                <div id="postcode-container" style={{ width: "100%", height: "400px", display: "none" }}></div>
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
                    <p>결혼 여부:</p>
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

                {/* 해외여행 출국 가능 여부 체크박스 */}
                <div className="personal-checkbox-group">
                    <p>해외여행 출국:</p>
                    <input
                        type="checkbox"
                        name="criminalRecord"
                        checked={formData.criminalRecord || false}
                        onChange={handleChange}
                    />
                    <span className="personal-checkbox-label-text">
                        {formData.criminalRecord ? "가능" : "불가능"}
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

                {/* 해외여행 출국 여부 증명서 업로드 */}
                <div className="file-upload-wrapper">
                    <label className="file-upload-label">출국 가능 여부 증명서</label>
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