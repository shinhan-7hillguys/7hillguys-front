import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "api";

const ResumeEdit = () => {
    const navigate = useNavigate();

    const [questions] = useState({
        1: "본인의 강점과 경험을 바탕으로 우리 회사에 기여할 수 있는 점은?",
        2: "과거 프로젝트 또는 업무에서 어려움을 극복했던 경험을 설명하세요.",
        3: "장기적인 커리어 목표와 그것을 이루기 위한 계획을 설명하세요.",
        4: "이 회사에 들어오기 지원한 직무에 대해서 준비한 것을 설명하세요",
        5: "지원동기에 대해서 설명하세요",
    });

    const [answers, setAnswers] = useState({
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
    });
    const [selectedQuestion, setSelectedQuestion] = useState(1);

    const [languageTests, setLanguageTests] = useState([
        { id: 1, exam: "", score: "" },
    ]);
    const [certificates, setCertificates] = useState([
        { id: 1, name: "", date: "", issuer: "" },
    ]);
    const [internships, setInternships] = useState([
        { id: 1, category: "", place: "", start: "", end: "", details: "" },
    ]);
    const [grade, setGrade] = useState("");

    const maxCharacters = 500;

    // 페이지 마운트 시 기존 데이터 로드 (GET /api/myspecs/2)
    useEffect(() => {
        axiosInstance
            .get("/api/myspecs")
            .then((res) => {
                const data = res.data;
                if (data) {
                    if (data.letter) {
                        try {
                            setAnswers(JSON.parse(data.letter));
                        } catch (e) {
                            console.error("letter 파싱 에러:", e);
                        }
                    }
                    if (data.languageScore) {
                        try {
                            setLanguageTests(JSON.parse(data.languageScore));
                        } catch (e) {
                            console.error("languageScore 파싱 에러:", e);
                        }
                    }
                    if (data.certification) {
                        try {
                            setCertificates(JSON.parse(data.certification));
                        } catch (e) {
                            console.error("certification 파싱 에러:", e);
                        }
                    }
                    if (data.internship) {
                        try {
                            const parsedIntern = JSON.parse(data.internship);
                            setInternships(Array.isArray(parsedIntern) ? parsedIntern : [parsedIntern]);
                        } catch (e) {
                            console.error("internship 파싱 에러:", e);
                        }
                    }
                    if (data.grade) {
                        try {
                            const gradeObj = JSON.parse(data.grade);
                            if (gradeObj.gpa) setGrade(gradeObj.gpa);
                        } catch (e) {
                            console.error("grade 파싱 에러:", e);
                        }
                    }
                }
            })
            .catch((err) => console.error("프로필 불러오기 에러:", err));
    }, []);

    const handleTextChange = (e) => {
        if (e.target.value.length <= maxCharacters) {
            setAnswers({ ...answers, [selectedQuestion]: e.target.value });
        }
    };

    // 저장하기 버튼: PUT 요청으로 update 처리 (DB에 update 쿼리 실행)
    const handleSave = async () => {
        try {
            const requestData = {
                userId: 2,
                letter: JSON.stringify(answers),
                languageScore: JSON.stringify(languageTests),
                certification: JSON.stringify(certificates),
                internship: JSON.stringify(internships),
                grade: JSON.stringify({ gpa: grade, maxGpa: "4.5" }),
            };
            await axiosInstance.put("/api/myspecs", requestData);
            alert("모든 내용이 저장되었습니다.");
            navigate("/education/myeducation");
        } catch (error) {
            console.error("이력서 저장 오류:", error);
            alert("이력서 저장 중 오류가 발생했습니다.");
        }
    };

    return (
        <div style={containerStyle}>
            <h3 style={sectionTitle}>자기소개서</h3>
            <div style={buttonContainer}>
                {Object.keys(questions).map((num) => (
                    <button
                        key={num}
                        onClick={() => setSelectedQuestion(Number(num))}
                        style={
                            selectedQuestion === Number(num) ? activeButton : buttonStyle
                        }
                    >
                        {num}
                    </button>
                ))}
            </div>
            <p style={questionText}>{questions[selectedQuestion]}</p>
            <textarea
                value={answers[selectedQuestion]}
                onChange={handleTextChange}
                style={textArea}
                rows={12}
            />
            <p style={charCount}>
                {answers[selectedQuestion].length}/{maxCharacters}자
            </p>


            {/* 어학시험 섹션 */}
            <div style={sectionStyle}>
                <h3 style={sectionTitle}>어학시험</h3>
                {languageTests.map((test, idx) => (
                    <div key={test.id} style={rowContainer}>
                        <select
                            style={dropdown}
                            value={test.exam}
                            onChange={(e) => {
                                const newArr = [...languageTests];
                                newArr[idx].exam = e.target.value;
                                setLanguageTests(newArr);
                            }}
                        >
                            <option value="">시험 선택</option>
                            <option value="TOEIC">TOEIC</option>
                            <option value="OPIC">OPIC</option>
                            <option value="TOEFL">TOEFL</option>
                        </select>
                        <input
                            type="text"
                            placeholder="점수"
                            style={inputSmall}
                            value={test.score}
                            onChange={(e) => {
                                const newArr = [...languageTests];
                                newArr[idx].score = e.target.value;
                                setLanguageTests(newArr);
                            }}
                        />
                    </div>
                ))}
                <div style={controlRow}>
                    <button
                        onClick={() =>
                            setLanguageTests([
                                ...languageTests,
                                { id: Date.now(), exam: "", score: "" },
                            ])
                        }
                        style={halfButton}
                    >
                        추가
                    </button>
                    <button
                        onClick={() =>
                            setLanguageTests(languageTests.slice(0, -1))
                        }
                        style={halfButton}
                    >
                        삭제
                    </button>
                </div>
            </div>

            {/* 자격증 섹션 */}
            <div style={sectionStyle}>
                <h3 style={sectionTitle}>자격증</h3>
                {certificates.map((cert, idx) => (
                    <div key={cert.id} style={rowContainer}>
                        <input
                            type="text"
                            placeholder="자격증명"
                            style={inputLarge}
                            value={cert.name}
                            onChange={(e) => {
                                const newArr = [...certificates];
                                newArr[idx].name = e.target.value;
                                setCertificates(newArr);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="취득년월"
                            style={inputSmall}
                            value={cert.date}
                            onChange={(e) => {
                                const newArr = [...certificates];
                                newArr[idx].date = e.target.value;
                                setCertificates(newArr);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="발급기관"
                            style={inputLarge}
                            value={cert.issuer}
                            onChange={(e) => {
                                const newArr = [...certificates];
                                newArr[idx].issuer = e.target.value;
                                setCertificates(newArr);
                            }}
                        />
                    </div>
                ))}
                <div style={controlRow}>
                    <button
                        onClick={() =>
                            setCertificates([
                                ...certificates,
                                { id: Date.now(), name: "", date: "", issuer: "" },
                            ])
                        }
                        style={halfButton}
                    >
                        추가
                    </button>
                    <button
                        onClick={() => setCertificates(certificates.slice(0, -1))}
                        style={halfButton}
                    >
                        삭제
                    </button>
                </div>
            </div>

            {/* 인턴·교육·대외활동 섹션 */}
            <div style={sectionStyle}>
                <h3 style={sectionTitle}>인턴·교육·대외활동</h3>
                {internships.map((intern, idx) => (
                    <div key={intern.id} style={{ marginBottom: "4%" }}>
                        <div style={rowContainer}>
                            <select
                                style={dropdown}
                                value={intern.category}
                                onChange={(e) => {
                                    const newArr = [...internships];
                                    newArr[idx].category = e.target.value;
                                    setInternships(newArr);
                                }}
                            >
                                <option value="">구분</option>
                                <option value="인턴">인턴</option>
                                <option value="교육">교육</option>
                                <option value="대외활동">대외활동</option>
                            </select>
                            <input
                                type="text"
                                placeholder="기관/장소"
                                style={inputFullWidth}
                                value={intern.place}
                                onChange={(e) => {
                                    const newArr = [...internships];
                                    newArr[idx].place = e.target.value;
                                    setInternships(newArr);
                                }}
                            />
                        </div>
                        <div style={rowContainer}>
                            <input
                                type="text"
                                placeholder="시작년월"
                                style={inputSmall}
                                value={intern.start}
                                onChange={(e) => {
                                    const newArr = [...internships];
                                    newArr[idx].start = e.target.value;
                                    setInternships(newArr);
                                }}
                            />
                            <input
                                type="text"
                                placeholder="종료년월"
                                style={inputSmall}
                                value={intern.end}
                                onChange={(e) => {
                                    const newArr = [...internships];
                                    newArr[idx].end = e.target.value;
                                    setInternships(newArr);
                                }}
                            />
                        </div>
                        <textarea
                            placeholder="수행한 역할과 성과를 입력하세요."
                            rows={4}
                            style={textArea}
                            value={intern.details}
                            onChange={(e) => {
                                const newArr = [...internships];
                                newArr[idx].details = e.target.value;
                                setInternships(newArr);
                            }}
                        ></textarea>
                    </div>
                ))}
                <div style={controlRow}>
                    <button
                        onClick={() =>
                            setInternships([
                                ...internships,
                                {
                                    id: Date.now(),
                                    category: "",
                                    place: "",
                                    start: "",
                                    end: "",
                                    details: "",
                                },
                            ])
                        }
                        style={halfButton}
                    >
                        추가
                    </button>
                    <button
                        onClick={() => setInternships(internships.slice(0, -1))}
                        style={halfButton}
                    >
                        삭제
                    </button>
                </div>
            </div>

            {/* 학점 입력 섹션 */}
            <div style={sectionStyle}>
                <h3 style={sectionTitle}>학점</h3>
                <input
                    type="text"
                    placeholder="학점을 입력하세요"
                    style={inputFullWidth}
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                />
            </div>

            {/* 저장하기 버튼 */}
            <button onClick={handleSave} style={saveButton}>
                저장하기
            </button>
        </div>
    );
};

export default ResumeEdit;

/* ── 스타일 정의 ── */
const containerStyle = {
    padding: "5%",
    maxWidth: "700px",
    margin: "0 auto",
    fontFamily: "Pretendard, sans-serif",
    overflowY: "auto",
    height: "100vh",
    paddingBottom: "95px",
};

const sectionStyle = {
    borderBottom: "2px solid #ddd",
    paddingBottom: "3%",
    marginBottom: "3%",
};

const sectionTitle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1%",
};

const buttonContainer = {
    display: "flex",
    gap: "3%",
    marginBottom: "2%",
};

const buttonStyle = {
    width: "12%",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#f0f0f0",
    color: "#ff99aa",
    border: "none",
    cursor: "pointer",
};

const activeButton = {
    ...buttonStyle,
    backgroundColor: "#d9534f",
    color: "#fff",
};

const questionText = {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#555",
    marginBottom: "2%",
};

const textArea = {
    width: "100%",
    height: "20vh",
    padding: "2%",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
    lineHeight: "1.6",
    resize: "vertical",
};

const charCount = {
    fontSize: "0.9rem",
    textAlign: "right",
    color: "#666",
};

const rowContainer = {
    display: "flex",
    gap: "3%",
    marginBottom: "3%",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
};

const inputFullWidth = {
    width: "100%",
    padding: "2%",
    border: "1px solid #ccc",
    borderRadius: "5px",
};

const inputLarge = {
    flex: "60%",
    padding: "2%",
    border: "1px solid #ccc",
    borderRadius: "5px",
};

const inputSmall = {
    flex: "30%",
    padding: "2%",
    border: "1px solid #ccc",
    borderRadius: "5px",
};

const dropdown = {
    flex: "40%",
    padding: "2%",
    border: "1px solid #ccc",
    borderRadius: "5px",
};

const controlRow = {
    display: "flex",
    gap: "3%",
    marginTop: "2%",
};

const halfButton = {
    width: "48%",
    padding: "2%",
    backgroundColor: "#ff99aa",
    color: "white",
    border: "none",
    cursor: "pointer",
    textAlign: "center",
    borderRadius: "5px",
};

const saveButton = {
    width: "100%",
    padding: "3%",
    backgroundColor: "#ff99aa",
    color: "white",
    fontSize: "1.2rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "3%",
};