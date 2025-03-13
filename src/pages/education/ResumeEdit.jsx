// 예시: ResumeEdit.jsx

import React, { useState } from "react";

const ResumeEdit = () => {
    const [questions, setQuestions] = useState({
        1: "본인의 강점과 경험을 바탕으로 우리 회사에 기여할 수 있는 점은?",
        2: "과거 프로젝트 또는 업무에서 어려움을 극복했던 경험을 설명하세요.",
        3: "장기적인 커리어 목표와 그것을 이루기 위한 계획을 설명하세요.",
        4: "이 회사에 들어오기 위해 준비한 것을 설명하세요",
        5: "지원동기와 포부",
    });
    const [selectedQuestion, setSelectedQuestion] = useState(1);
    const [answers, setAnswers] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "" });
    const [languageTests, setLanguageTests] = useState([
        { id: 1, exam: "", score: "" },
    ]);
    const [certificates, setCertificates] = useState([
        { id: 1, name: "", date: "", issuer: "" },
    ]);
    const [internships, setInternships] = useState([
        { id: 1, category: "", place: "", start: "", end: "", details: "" },
    ]);
    const maxCharacters = 500;

    // 자기소개서 입력 핸들러
    const handleTextChange = (event) => {
        if (event.target.value.length <= maxCharacters) {
            setAnswers({ ...answers, [selectedQuestion]: event.target.value });
        }
    };

    // 저장하기 버튼 핸들러 (예제)
    const handleSave = () => {
        alert("모든 내용이 저장되었습니다.");
    };

    return (
        <div style={containerStyle}>
            {/* 🔹 자기소개서 */}
            <div style={sectionStyle}>
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
            </div>

            {/* 🔹 어학시험 */}
            <div style={sectionStyle}>
                <h3 style={sectionTitle}>어학시험</h3>
                {languageTests.map((test) => (
                    <div key={test.id} style={rowContainer}>
                        <select style={dropdown}>
                            <option>시험 선택</option>
                            <option>TOEIC</option>
                            <option>OPIC</option>
                            <option>TOEFL</option>
                        </select>
                        <input type="text" placeholder="점수" style={inputSmall} />
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
                        + 추가
                    </button>
                    <button
                        onClick={() => setLanguageTests(languageTests.slice(0, -1))}
                        style={halfButton}
                    >
                        - 삭제
                    </button>
                </div>
            </div>

            {/* 🔹 자격증 */}
            <div style={sectionStyle}>
                <h3 style={sectionTitle}>자격증</h3>
                {certificates.map((cert) => (
                    <div key={cert.id} style={rowContainer}>
                        <input type="text" placeholder="자격증명" style={inputLarge} />
                        <input type="text" placeholder="취득년월" style={inputSmall} />
                        <input type="text" placeholder="발급기관" style={inputLarge} />
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
                        + 추가
                    </button>
                    <button
                        onClick={() => setCertificates(certificates.slice(0, -1))}
                        style={halfButton}
                    >
                        - 삭제
                    </button>
                </div>
            </div>

            {/* 🔹 인턴·교육·대외활동 */}
            <div style={sectionStyle}>
                <h3 style={sectionTitle}>인턴·교육·대외활동</h3>
                {internships.map((intern) => (
                    <div key={intern.id} style={{ marginBottom: "4%" }}>
                        <div style={rowContainer}>
                            <select style={dropdown}>
                                <option>구분</option>
                                <option>인턴</option>
                                <option>교육</option>
                                <option>대외활동</option>
                            </select>
                            <input type="text" placeholder="기관/장소" style={inputFullWidth} />
                        </div>
                        <div style={rowContainer}>
                            <input type="text" placeholder="시작년월" style={inputSmall} />
                            <input type="text" placeholder="종료년월" style={inputSmall} />
                        </div>
                        <textarea
                            placeholder="수행한 역할과 성과를 입력하세요."
                            rows={4}
                            style={textArea}
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
                        + 추가
                    </button>
                    <button
                        onClick={() => setInternships(internships.slice(0, -1))}
                        style={halfButton}
                    >
                        - 삭제
                    </button>
                </div>
            </div>

            {/* 🔹 저장하기 버튼 - 스크롤 맨 밑에 위치하도록 */}
            <button onClick={handleSave} style={saveButton}>
                저장하기
            </button>
        </div>
    );
};

export default ResumeEdit;

/* 🔹 스타일 정의 */
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
    marginBottom: "3%"
};

const sectionTitle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1%"
};

const buttonContainer = {
    display: "flex",
    gap: "3%",
    marginBottom: "2%"
};

const buttonStyle = {
    width: "12%",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#f0f0f0",
    color: "#333",
    border: "none",
    cursor: "pointer"
};

const activeButton = {
    ...buttonStyle,
    backgroundColor: "#d9534f",
    color: "#fff"
};

const questionText = {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#555",
    marginBottom: "2%"
};

const textArea = {
    width: "100%",
    height: "20vh",
    padding: "2%",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
    lineHeight: "1.6",
    resize: "vertical"
};

const charCount = {
    fontSize: "0.9rem",
    textAlign: "right",
    color: "#666"
};

const rowContainer = {
    display: "flex",
    gap: "3%",
    marginBottom: "3%",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between"
};

const inputFullWidth = {
    width: "100%",
    padding: "2%",
    border: "1px solid #ccc",
    borderRadius: "5px"
};

const inputLarge = {
    flex: "60%",
    padding: "2%",
    border: "1px solid #ccc",
    borderRadius: "5px"
};

const inputSmall = {
    flex: "30%",
    padding: "2%",
    border: "1px solid #ccc",
    borderRadius: "5px"
};

const dropdown = {
    flex: "40%",
    padding: "2%",
    border: "1px solid #ccc",
    borderRadius: "5px"
};

const controlRow = {
    display: "flex",
    gap: "3%",
    marginTop: "2%"
};

const halfButton = {
    width: "48%",
    padding: "2%",
    backgroundColor: "#ccc",
    border: "none",
    cursor: "pointer",
    textAlign: "center"
};

const saveButton = {
    // position, bottom, etc. 제거 → 기본 위치로
    width: "100%",
    padding: "3%",
    backgroundColor: "#df6e99",
    color: "white",
    fontSize: "1.2rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "3%"
};