import React, { useEffect, useState } from "react";
import "styles/investReview/Step2Personal.css";

const Step2Personal = ({
  formData,
  setFormData,
  handleFileChange,
  handleNext,
  handleBack,
}) => {
  const [familyCertificateFile, setFamilyCertificateFile] =
    useState("선택된 파일 없음");
  const [criminalRecordFile, setCriminalRecordFile] =
    useState("선택된 파일 없음");

  const [isPostcodeVisible, setIsPostcodeVisible] = useState(false);

  useEffect(() => {
    // 다음 주소 API 스크립트 동적 로드
    const script = document.createElement("script");
    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSearchAddress = () => {
    setIsPostcodeVisible((prev) => !prev);

    if (!isPostcodeVisible) {
      setTimeout(() => {
        const postcodeContainer = document.getElementById("postcode-container");

        if (postcodeContainer) {
          postcodeContainer.style.visibility = "visible"; // display: block 대신 사용
          postcodeContainer.style.height = "400px"; // 높이를 명시적으로 설정
        }

        const postcode = new window.daum.Postcode({
          oncomplete: function (data) {
            let fullAddress = data.address;
            if (data.addressType === "R" && data.bname) {
              fullAddress += ` (${data.bname})`;
            }
            setFormData((prev) => ({ ...prev, address: fullAddress }));

            setIsPostcodeVisible(false);

            // 주소 입력 후 iframe 숨기기
            postcodeContainer.style.visibility = "hidden";
            postcodeContainer.style.height = "0px";
          },
          width: "100%",
          height: "400px",
        });

        postcode.embed(postcodeContainer);
      }, 0);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === "checkbox" ? checked : value;

    // 성별(gender) 라디오 버튼 선택 시 boolean 값으로 변환
    if (
      name === "gender" ||
      name === "familyStatus.married" ||
      name === "criminalRecord"
    ) {
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
      setFileName(file.name); // UI에 표시할 파일명 업데이트
      setFormData((prev) => ({
        ...prev,
        [fieldName]: file, // formData에 파일 저장
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
              />{" "}
              남성
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="false"
                checked={formData.gender === false}
                onChange={handleChange}
              />{" "}
              여성
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

        <label className="input-label">주소</label>
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
        <div
          id="postcode-container"
          style={{
            width: "100%",
            height: "400px",
            display: isPostcodeVisible ? "block" : "none",
          }}
        ></div>

        <label className="input-label">자산</label>
        <input
          type="number"
          name="assets"
          placeholder="자산"
          value={formData.assets || ""}
          onChange={handleChange}
          className="input-field"
        />

        {/* 결혼 여부 체크박스 */}
        {/* 결혼 여부 (라디오 버튼) */}
        <div className="personal-radio-group">
          <span className="personal-radio-label">결혼 여부:</span>
          <div className="personal-radio-options">
            <label>
              <input
                type="radio"
                name="familyStatus.married"
                value="true"
                checked={formData.familyStatus.married === true}
                onChange={handleChange}
              />{" "}
              기혼
            </label>
            <label>
              <input
                type="radio"
                name="familyStatus.married"
                value="false"
                checked={formData.familyStatus.married === false}
                onChange={handleChange}
              />{" "}
              미혼
            </label>
          </div>
        </div>

        <label className="input-label">자녀수</label>
        <input
          type="number"
          name="familyStatus.children"
          placeholder="자녀 수"
          value={formData.familyStatus.children || ""}
          onChange={handleChange}
          className="input-field"
        />

        {/* 해외여행 출국 여부 (라디오 버튼) */}
        <div className="personal-radio-group">
          <span className="personal-radio-label">해외여행 출국 가능 여부:</span>
          <div className="personal-radio-options">
            <label>
              <input
                type="radio"
                name="criminalRecord"
                value="true"
                checked={formData.criminalRecord === true}
                onChange={handleChange}
              />{" "}
              가능
            </label>
            <label>
              <input
                type="radio"
                name="criminalRecord"
                value="false"
                checked={formData.criminalRecord === false}
                onChange={handleChange}
              />{" "}
              불가능
            </label>
          </div>
        </div>

        {/* 가족관계 증명서 업로드 */}
        <div className="file-upload-wrapper">
          <label className="file-upload-label">가족관계 파일</label>
          <label className="custom-file-upload">
            파일 선택
            <input
              type="file"
              name="familyCertificate"
              onChange={(e) => handleFileSelect(e, setFamilyCertificateFile)}
              className="file-upload"
            />
          </label>
          <span className="file-name">{familyCertificateFile}</span>
        </div>

        {/* 해외여행 출국 여부 증명서 업로드 */}
        <div className="file-upload-wrapper">
          <label className="file-upload-label">출국 가능 여부</label>
          <label className="custom-file-upload">
            파일 선택
            <input
              type="file"
              name="criminalRecordFile"
              onChange={(e) => handleFileSelect(e, setCriminalRecordFile)}
              className="file-upload"
            />
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
