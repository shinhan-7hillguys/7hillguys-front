import {useState, useEffect} from "react";

//심리/인성 검사 문항
const mentalQuestions = [
    {id: "M1", text: "나는 스트레스 상황에서 침착함을 유지한다."},
    {id: "M2", text: "새로운 환경에서도 쉽게 적응한다."},
    {id: "M3", text: "자신감 있게 결정을 내리는 편이다."},
];

//건강 상태 검사 문항
const healthQuestions = [
    {id: "H1", text: "나는 하루 7시간 이상의 수면을 취한다."},
    {id: "H2", text: "규칙적으로 운동을 한다."},
    {id: "H3", text: "식습관이 건강하다."},
];

const Review = () => {
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        userId: "",
        universityInfo: {universityName: "", major: ""},
        studentCard: {highscool: "", highscoolGPA: ""},
        certification: {},
        familyStatus: {married: false, children: ""},
        assets: "",
        criminalRecord: false,
        healthStatus: "",
        gender: false,
        address: "",
        mentalStatus: "",
    });

    // 현재 자격증 개수
    const [certCount, setCertCount] = useState(1);

    // 파일 저장 상태
    const [certFiles, setCertFiles] = useState({});

    // 자격증 추가 함수 (버튼 클릭 시 실행)
    const addCertification = () => {
        const newCertKey = `certificate${certCount + 1}`;
        setCertCount((prev) => prev + 1);
        setFormData((prev) => ({
            ...prev,
            certification: {
                ...prev.certification,
                [newCertKey]: "",  // 빈 자격증 필드 추가
            },
        }));
    };

    //자격증 삭제 함수
    const removeCertification = (certKey) => {
        const updatedCertifications = { ...formData.certification };
        delete updatedCertifications[certKey];

        const updatedFiles = { ...certFiles };
        delete updatedFiles[certKey];

        setFormData((prev) => ({
            ...prev,
            certification: updatedCertifications,
        }));
        setCertFiles(updatedFiles);
    };

    //자격증 입력 시 값 변경 처리
    const handleCertificationChange = (e, certKey) => {
        const { value } = e.target;
        setFormData((prev) => ({
            ...prev,
            certification: {
                ...prev.certification,
                [certKey]: value,
            },
        }));
    };

    const handleFileChange = (e, certKey) => {
        const file = e.target.files[0]; // 단일 파일 선택
        setCertFiles((prev) => ({
            ...prev,
            [certKey]: file,
        }));
    };


    const [files, setFiles] = useState({
        universityCertificate: null,
        studentCardFile: null,
        certificationFiles: [],
        familyCertificate: null,
        criminalRecordFile: null,
    });

    const [mentalScores, setMentalScores] = useState({});
    const [healthScores, setHealthScores] = useState({});

    const radioOptions = [
        {label: "아주나쁨", value: 1},
        {label: "나쁨", value: 2},
        {label: "보통", value: 3},
        {label: "좋음", value: 4},
        {label: "아주좋음", value: 5},
    ];

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            mentalStatus: Object.values(mentalScores).reduce((acc, val) => acc + val, 0) || 0,
        }));
    }, [mentalScores]);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            healthStatus: Object.values(healthScores).reduce((acc, val) => acc + val, 0) || 0,
        }));
    }, [healthScores]);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log(token);
                const response = await fetch("http://localhost:8080/api/auth/user", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Authorization": `Bearer ${token}`, //JWT 추가
                        "Content-Type": "application/json",
                    }
                });
                if (!response.ok) throw new Error("사용자 정보를 가져오지 못했습니다.");
                const data = await response.json();
                if (!data.userId) throw new Error("userId를 가져오지 못했습니다.");

                console.log("가져온 userId: ", data.userId);

                setFormData((prev) => ({...prev, userId: data.userId}));
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserId();
    }, []);

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        let newValue;

        //boolean 값 변환
        if (type === "checkbox") {
            newValue = checked;
        } else if (name === "gender" || name === "criminalRecord" || name === "familyStatus.married") {
            newValue = value === "true"; //문자열을 boolean으로 변환
        } else if (name === "certification") {
            // certification 입력 시 JSON 형식으로 저장
            setFormData((prev) => ({
                ...prev,
                certification: [{ certificate: value }]
            }));
            return; // certification 처리 후 나머지 값 업데이트 방지
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
            setFormData((prev) => ({...prev, [name]: newValue}));
        }
    };

    const handleRadioChange = (category, name, value) => {
        const numericValue = Number(value); //숫자로 변환

        if (category === "mental") {
            setMentalScores((prev) => {
                const updatedScores = {...prev, [name]: numericValue};
                console.log("mentalScores 업데이트됨:", updatedScores); //디버깅 로그 추가
                return updatedScores;
            });
        } else if (category === "health") {
            setHealthScores((prev) => {
                const updatedScores = {...prev, [name]: numericValue};
                console.log("healthScores 업데이트됨:", updatedScores); //디버깅 로그 추가
                return updatedScores;
            });
        }
    };

    const handleSubmit = async () => {
        console.log("제출 전 formData:", formData);

        //상태 업데이트가 비동기적으로 반영되기 때문에 약간의 지연 추가
        setTimeout(async () => {
            try {
                console.log("계산된 mentalTotal:", formData.mentalStatus);
                console.log("계산된 healthTotal:", formData.healthStatus);

                const updatedFamilyStatus = {
                    ...formData.familyStatus,
                    children: formData.familyStatus.children === "" ? "0" : formData.familyStatus.children
                };

                const updatedCertification = formData.certification.length === 0
                    ? JSON.stringify([{ certificate: "없음" }])  // 값이 없으면 기본값 저장
                    : JSON.stringify(formData.certification.map(cert => ({ certificate: cert })));

                const updatedFormData = {
                    ...formData,
                    certification: updatedCertification,
                    assets: Number(formData.assets) || 0,
                    familyStatus: updatedFamilyStatus,
                };

                //텍스트 데이터 전송
                const token = localStorage.getItem("token");
                const textResponse = await fetch("http://localhost:8080/api/review/save", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(updatedFormData),
                });

                if (!textResponse.ok) throw new Error("데이터 저장 실패");

                //파일 데이터 전송
                const fileFormData = new FormData();
                Object.entries(files).forEach(([key, value]) => {
                    if (value) fileFormData.append(key, value);
                });

                const fileResponse = await fetch("http://localhost:8080/api/review/file", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Authorization": `Bearer ${token}`, //JWT 토큰 추가
                    },
                    body: fileFormData,
                });

                if (!fileResponse.ok) throw new Error("파일 업로드 실패");

                //제출 후 UI 초기화
                alert("제출이 완료되었습니다!");
                setFormData({
                    userId: "",
                    universityInfo: {universityName: "", major: ""},
                    studentCard: {highscool: "", highscoolGPA: ""},
                    certification: [],
                    familyStatus: {married: false, children: ""},
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

                //완료 페이지 이동
                window.location.href = "/";
            } catch (error) {
                console.error(error);
                alert("제출 중 오류 발생");
            }
        }, 100); //상태가 업데이트될 시간을 확보하기 위해 약간의 지연 추가
    };

    return (
        <div className="p-6 border rounded-lg w-96 mx-auto mt-10">
            {/* ----------------- STEP 1 ----------------- */}
            {step === 1 && (
                <div>
                    <h2>학교 정보 입력</h2>
                    <input type="text" name="universityInfo.universityName" placeholder="대학교 이름" onChange={handleChange}
                           className="border p-2 w-full mt-2"/>
                    <input type="text" name="universityInfo.major" placeholder="학과" onChange={handleChange}
                           className="border p-2 w-full mt-2"/>
                    <input type="text" name="studentCard.highscool" placeholder="고등학교" onChange={handleChange}
                           className="border p-2 w-full mt-2"/>
                    <input type="text" name="studentCard.highscoolGPA" placeholder="내신 성적" onChange={handleChange}
                           className="border p-2 w-full mt-2"/>

                    {/*대학교 증명서 업로드*/}
                    <label className="block mt-2">
                        <span>대학교 증명서</span>
                        <input type="file" name="studentCardFile" onChange={handleFileChange} className="border p-2 w-full mt-2" />
                    </label>
                    {/*고등학교 생활기록부 업로드*/}
                    <label className="block mt-2">
                        <span>고등학교 생활기록부</span>
                        <input type="file" name="highscoolFile" onChange={handleFileChange} className="border p-2 w-full mt-2" />
                    </label>

                    <div className="mt-4 flex justify-end">
                        <button onClick={handleNext} className="bg-blue-500 text-white p-2 rounded">다음</button>
                    </div>
                </div>
            )}

            {/* ----------------- STEP 2 ----------------- */}
            {step === 2 && (
                <div>
                    <h2>개인 및 기타 정보 입력</h2>

                    <label>
                        성별:
                        <input type="radio" name="gender" value="true" onChange={handleChange}/> 남성
                        <input type="radio" name="gender" value="false" onChange={handleChange}/> 여성
                    </label>

                    <input type="text" name="address" placeholder="주소" onChange={handleChange}
                           className="border p-2 w-full mt-2"/>
                    <input type="number" name="assets" placeholder="자산" onChange={handleChange}
                           className="border p-2 w-full mt-2"/>

                    <label>
                        결혼 여부:
                        <input type="checkbox" name="familyStatus.married" onChange={handleChange}/> 기혼
                    </label>
                    <input type="number" name="familyStatus.children" placeholder="자녀 수" onChange={handleChange}
                           className="border p-2 w-full mt-2"/>

                    <label>
                        범죄 기록:
                        <input type="checkbox" name="criminalRecord" onChange={handleChange}/> 있음
                    </label>

                    {/*가족관계 증명서 업로드*/}
                    <label className="block mt-2">
                        <span>가족관계 증명서</span>
                        <input type="file" name="familyCertificateFile" onChange={handleFileChange} className="border p-2 w-full" />
                    </label>

                    {/*범죄기록 증명서 업로드*/}
                    <label className="block mt-2">
                        <span>범죄 기록 증명서</span>
                        <input type="file" name="criminalRecordFile" onChange={handleFileChange} className="border p-2 w-full" />
                    </label>

                    <div className="mt-4 flex justify-between">
                        <button onClick={handleBack} className="bg-gray-300 text-black p-2 rounded">이전</button>
                        <button onClick={handleNext} className="bg-blue-500 text-white p-2 rounded">다음</button>
                    </div>
                </div>
            )}

            {/* ----------------- STEP 3: 자격증 ----------------- */}
            {step === 3 && (
                <div>
                    <h2>자격증 정보 입력</h2>

                    {/* 동적으로 자격증 입력 필드 생성 */}
                    {Object.keys(formData.certification).map((key, index) => (
                        <div key={index} className="mt-2 border p-3 rounded relative">
                            <input
                                type="text"
                                placeholder={`자격증 ${index + 1}`}
                                value={formData.certification[key]}
                                onChange={(e) => handleCertificationChange(e, key)}
                                className="border p-2 w-full"
                            />

                            {/* 파일 업로드 필드 */}
                            <label className="block mt-2">
                                <span>자격증 파일 업로드:</span>
                                <input
                                    type="file"
                                    onChange={(e) => handleFileChange(e, key)}
                                    className="border p-2 w-full"
                                />
                            </label>

                            {/* 자격증 삭제 버튼 */}
                            <button
                                type="button"
                                onClick={() => removeCertification(key)}
                                className="absolute top-2 right-2 text-red-500"
                            >
                                ❌
                            </button>
                        </div>
                    ))}

                    {/* 🔹 자격증 추가 버튼 */}
                    <button
                        type="button"
                        onClick={addCertification}
                        className="bg-gray-500 text-white p-2 rounded mt-3 w-full"
                    >
                        + 자격증 추가
                    </button>

                    <div className="mt-4 flex justify-between">
                        <button onClick={handleBack} className="bg-gray-300 text-black p-2 rounded">이전</button>
                        <button onClick={handleNext} className="bg-blue-500 text-white p-2 rounded">다음</button>
                    </div>
                </div>
            )}

            {/* ----------------- STEP 4: 건강 상태 (healthStatus) ----------------- */}
            {step === 4 && (
                <div>
                    <h2>건강 상태 평가</h2>
                    {healthQuestions.map((q) => (
                        <div key={q.id} className="mt-4 border p-3">
                            <h3>{q.text}</h3>
                            <div className="flex gap-2">
                                {radioOptions.map((option) => (
                                    <label key={option.value} className="flex items-center gap-1">
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
                    <div className="mt-4 flex justify-between">
                        <button onClick={handleBack} className="bg-gray-300 text-black p-2 rounded">이전</button>
                        <button onClick={handleNext} className="bg-blue-500 text-white p-2 rounded">다음</button>
                    </div>
                </div>
            )}

            {/* ----------------- STEP 5: 정신 건강 (mentalStatus) + 성실도 ----------------- */}
            {step === 5 && (
                <div>
                    <h2>정신 건강 및 성실도 평가</h2>
                    {mentalQuestions.map((q) => (
                        <div key={q.id} className="mt-4 border p-3">
                            <h3>{q.text}</h3>
                            <div className="flex gap-2">
                                {radioOptions.map((option) => (
                                    <label key={option.value} className="flex items-center gap-1">
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
                    <div className="mt-4 flex justify-between">
                        <button onClick={handleBack} className="bg-gray-300 text-black p-2 rounded">이전</button>
                        <button onClick={handleNext} className="bg-blue-500 text-white p-2 rounded">다음</button>
                    </div>
                </div>
            )}

            {/* ----------------- STEP 6: 최종 제출 ----------------- */}
            {step === 6 && (
                <div>
                    <h2>최종 확인 및 제출</h2>
                    <p className="mt-3">입력하신 정보를 최종 확인하신 뒤 제출해 주세요.</p>

                    <div className="mt-4 flex justify-between">
                        <button onClick={handleBack} className="bg-gray-300 text-black p-2 rounded">이전</button>
                        <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded">제출</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Review;