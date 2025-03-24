// Review.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Step1University from "pages/investReview/Step1University";
import Step2Personal from "pages/investReview/Step2Personal";
import Step3Certification from "pages/investReview/Step3Certification";
import Step4Health from "pages/investReview/Step4Health";
import Step5Mental from "pages/investReview/Step5Mental";
import Step6Submit from "pages/investReview/Step6Submit";
import {resolve} from "chart.js/helpers";

// 심리/인성 검사 문항
const mentalQuestions = [
    { id: "M1", text: "1. 나는 예상치 못한 문제나 위기 상황에서도 침착하게 대응할 수 있다." },
    { id: "M2", text: "2. 나는 재정적인 결정을 내릴 때 신중하게 고려하는 편이다." },
    { id: "M3", text: "3. 나는 장기적인 목표를 세우고 꾸준히 실천하는 편이다." },
    { id: "M4", text: "4. 나는 돈을 빌리거나 사용할 때 감정에 휘둘리지 않고 합리적으로 판단한다." },
    { id: "M5", text: "5. 나는 불확실한 상황에서도 긍정적인 태도를 유지한다." },
];

// 건강 상태 검사 문항
const healthQuestions = [
    { id: "H1", text: "1. 나는 하루 평균 7시간 이상의 충분한 수면을 취한다." },
    { id: "H2", text: "2. 나는 규칙적으로 운동을 하고 있으며, 건강을 위해 신경 쓰는 편이다." },
    { id: "H3", text: "3. 나는 최근 6개월 이내에 건강 문제로 인해 병원 진료(입원 포함)를 받은 적이 없다." },
    { id: "H4", text: "4. 나는 최근 1년 동안 심한 피로감이나 만성적인 스트레스를 거의 느끼지 않았다." },
    { id: "H5", text: "5. 나는 건강한 식습관을 유지하며, 패스트푸드나 야식 섭취를 최소화하고 있다." },
];

const radioOptions = [
    { label: " 나쁨", value: 1 },
    { label: " 보통", value: 3 },
    { label: " 좋음", value: 5 },
];

const Review = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        userId: "",
        universityInfo: { universityName: "홍익대학교", major: "컴퓨터공학과" },
        studentCard: { highscool: "마포고등학교", highscoolGPA: "4.0" },
        certification: [], // 인증은 배열로 관리 (입력 시)
        familyStatus: { married: false, children: "0" },
        assets: "8000000",
        criminalRecord: false,
        healthStatus: "",
        gender: false,
        address: "",
        mentalStatus: "",
    });

    const [files, setFiles] = useState({
        universityCertificate: null,
        studentCardFile: null,
        certificationFiles: [],
        familyCertificate: null,
        criminalRecordFile: null,
    });

    const [mentalScores, setMentalScores] = useState({});
    const [healthScores, setHealthScores] = useState({});

    // 인증 관련 함수 (배열 상태 유지)
    const addCertification = () => {
        setFormData((prev) => ({
            ...prev,
            certification: [...prev.certification, ""],
        }));
    };

    const removeCertification = (index) => {
        setFormData((prev) => ({
            ...prev,
            certification: prev.certification.filter((_, i) => i !== index),
        }));
    };

    const handleCertificationChange = (e, index) => {
        const { value } = e.target;
        setFormData((prev) => {
            const newCertifications = [...prev.certification];
            newCertifications[index] = value;
            return { ...prev, certification: newCertifications };
        });
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        const filesArr = Array.from(e.target.files);
        if (filesArr.length === 0) {
            console.warn(`파일이 선택되지 않았음: ${name}`);
            return;
        }
        console.log(`선택된 파일 (${name}):`, filesArr.map((f) => f.name));
        setFiles((prev) => {
            if (name === "certificationFiles") {
                return {
                    ...prev,
                    certificationFiles: [...prev.certificationFiles, ...filesArr],
                };
            }
            return { ...prev, [name]: filesArr[0] };
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue;
        if (type === "checkbox") {
            newValue = checked;
        } else if (
            name === "gender" ||
            name === "criminalRecord" ||
            name === "familyStatus.married"
        ) {
            newValue = value === "true";
        } else {
            newValue = value;
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

    const handleRadioChange = (category, name, value) => {
        const numericValue = Number(value);
        if (category === "mental") {
            setMentalScores((prev) => ({ ...prev, [name]: numericValue }));
        } else if (category === "health") {
            setHealthScores((prev) => ({ ...prev, [name]: numericValue }));
        }
    };

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            mentalStatus:
                Object.values(mentalScores).reduce((acc, val) => acc + val, 0) || 0,
        }));
    }, [mentalScores]);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            healthStatus:
                Object.values(healthScores).reduce((acc, val) => acc + val, 0) || 0,
        }));
    }, [healthScores]);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log(token);
                const response = await fetch("http://192.168.0.172:31001/api/auth/user", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) throw new Error("사용자 정보를 가져오지 못했습니다.");
                const data = await response.json();
                if (!data.userId) throw new Error("userId를 가져오지 못했습니다.");
                console.log("가져온 userId: ", data.userId);
                setFormData((prev) => ({ ...prev, userId: data.userId }));
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserId();
    }, []);

    useEffect(() => {
        console.log("✅ 현재 formData:", formData);
    }, [formData]);

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    const handleSubmit = async () => {
        console.log("제출 전 formData:", formData);
        // 비동기 업데이트를 고려해 약간의 지연 후 제출
        setTimeout(async () => {
            try {
                console.log("계산된 mentalTotal:", formData.mentalStatus);
                console.log("계산된 healthTotal:", formData.healthStatus);

                // formData.certification 배열을 객체(Map) 형태로 변환
                const certificationMap = {};
                if (formData.certification.length > 0) {
                    formData.certification.forEach((cert, index) => {
                        certificationMap[String(index)] = cert;
                    });
                } else {
                    certificationMap["default"] = "없음";
                }

                // familyStatus는 JSON으로 저장할 데이터(예: 결혼여부, 자녀수)
                const updatedFamilyStatus = {
                    ...formData.familyStatus,
                    children:
                        formData.familyStatus.children === "" ? "0" : formData.familyStatus.children,
                };

                const updatedFormData = {
                    ...formData,
                    assets: Number(formData.assets) || 0,
                    familyStatus: updatedFamilyStatus,
                    certification: certificationMap, // Map 형태로 전달
                    healthStatus: Number(formData.healthStatus) || 0,
                    mentalStatus: Number(formData.mentalStatus) || 0,
                };

                const textResponse = await fetch("http://192.168.0.172:31001/api/review/save", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(updatedFormData),
                });
                if (!textResponse.ok) throw new Error("데이터 저장 실패");

                const fileFormData = new FormData();
                Object.entries(files).forEach(([key, value]) => {
                    if (key === "certificationFiles" && Array.isArray(value)) {
                        value.forEach((file, index) => {
                            console.log(`FormData 추가: certificationFiles[${index}] -> ${file.name}`);
                            fileFormData.append("certificationFiles", file);
                        });
                    } else if (value && value instanceof File) {
                        console.log(`FormData 추가: ${key} -> ${value.name}`);
                        fileFormData.append(key, value);
                    } else {
                        console.warn(`파일이 없음 (제외됨): ${key}`);
                    }
                });
                console.log("업로드될 FormData내용: ", [...fileFormData.entries()]);
                const fileResponse = await fetch("http://192.168.0.172:31001/api/review/file", {
                    method: "POST",
                    credentials: "include",
                    body: fileFormData,
                });
                if (!fileResponse.ok) throw new Error("파일 업로드 실패");

                alert("제출이 완료되었습니다!");
                navigate("/investment/status");

                setFormData({
                    userId: "",
                    universityInfo: { universityName: "", major: "" },
                    studentCard: { highscool: "", highscoolGPA: "" },
                    certification: [],
                    familyStatus: { married: false, children: "" },
                    assets: "",
                    criminalRecord: false,
                    healthStatus: "",
                    gender: false,
                    address: "",
                    mentalStatus: "",
                });
                setFiles({
                    universityCertificate: null,
                    studentCardFile: null,
                    certificationFiles: [],
                    familyCertificate: null,
                    criminalRecordFile: null,
                });
            } catch (error) {
                console.error(error);
                alert("제출 중 오류 발생");
            }
        }, 100);
    };

    return (
        <div className="investReview-container">
            {step === 1 && (
                <Step1University
                    formData={formData}
                    setFormData={setFormData}
                    handleChange={handleChange}
                    handleFileChange={handleFileChange}
                    handleNext={handleNext}
                />
            )}
            {step === 2 && (
                <Step2Personal
                    formData={formData}
                    setFormData={setFormData}
                    handleChange={handleChange}
                    handleFileChange={handleFileChange}
                    handleNext={handleNext}
                    handleBack={handleBack}
                />
            )}
            {step === 3 && (
                <Step3Certification
                    formData={formData}
                    setFormData={setFormData}
                    addCertification={addCertification}
                    removeCertification={removeCertification}
                    handleCertificationChange={handleCertificationChange}
                    handleFileChange={handleFileChange}
                    handleNext={handleNext}
                    handleBack={handleBack}
                />
            )}
            {step === 4 && (
                <Step4Health
                    healthQuestions={healthQuestions}
                    radioOptions={radioOptions}
                    handleRadioChange={handleRadioChange}
                    handleNext={handleNext}
                    handleBack={handleBack}
                />
            )}
            {step === 5 && (
                <Step5Mental
                    mentalQuestions={mentalQuestions}
                    radioOptions={radioOptions}
                    handleRadioChange={handleRadioChange}
                    handleNext={handleNext}
                    handleBack={handleBack}
                />
            )}
            {step === 6 && <Step6Submit formData={formData} handleSubmit={handleSubmit} handleBack={handleBack} />}
        </div>
    );
};

export default Review;