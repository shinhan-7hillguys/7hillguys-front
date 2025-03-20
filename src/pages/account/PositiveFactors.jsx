import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer
} from 'recharts';

axios.defaults.withCredentials = true;

function PositiveFactors() {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get("/api/userprofiles2", {
            withCredentials: true, // 쿠키 포함
        })
            .then((res) => {
                console.log("profileData:", res.data);
                setProfileData(res.data);
            })
            .catch((err) => {
                console.error(err);
                setError("user_profiles2 데이터를 불러올 수 없습니다.");
            });
    }, []);

    if (error) {
        return <div style={styles.error}>{error}</div>;
    }
    if (!profileData) {
        return <div style={styles.loading}>로딩 중...</div>;
    }

    // JSON 파싱
    const gradeObj = JSON.parse(profileData.grade);
    const languageArray = JSON.parse(profileData.languageScore);
    const certificationObj = JSON.parse(profileData.certification);

    function mapOpicLevelToNumber(level) {
        const upper = level.toUpperCase();

        if (upper === "AL") return 10;
        if (upper === "IH") return 8;
        if (upper.startsWith("IM")) return 6;
        if (upper === "IL") return 4;
        if (upper === "NH") return 2;
        return 0;
    }
    const userLetter = languageArray[0].score;
    const userNumeric = mapOpicLevelToNumber(userLetter);
    const avgLetter = "IM3";
    const avgNumeric = mapOpicLevelToNumber(avgLetter);


    function handleCertificateClick() {
        setIsModalOpen(true);
    }
    function closeModal() {
        setIsModalOpen(false);
    }

    // 차트 데이터 구성 (어학 항목에는 숫자와 문자 모두 포함)
    const chartData = [
        {
            name: "학점",
            value: parseFloat(gradeObj.gpa),
            max: parseFloat(gradeObj.maxGpa) || 4.5,
            avg: 3.6, // 더미 평균
        },
        {
            name: "자격증 (자격증 보기)",
            value: certificationObj.length,
            max: 5,
            avg: 2, // 더미 평균
        },
        {
            name: "어학",
            value: userNumeric,
            letter: userLetter,

            avg: avgNumeric,
            avgLetter: avgLetter,

            max: 10,
            maxLetter: "AL"
        },

        {
            name: "인턴",
            value: 1,
            max: 5,
            avg: 2 // 더미
        }
    ];
    const renderCustomBarLabel = (labelText) => (props) => {
        const { x, y, width, height } = props;

        return (
            <text
                x={x - 30}
                y={y + height / 2}
                fill="#000"
                alignmentBaseline="middle"
                fontSize={14}
            >
                {labelText}
            </text>
        );
    };



    return (
        <div style={styles.container}>
            <h1 style={styles.title}>직군 비교</h1>
            <p> 내 직군 : 컴퓨터공학</p>

            {chartData.map((item) => (
                <div key={item.name} style={styles.chartBox}
                     onClick={() => {
                         if (item.name === "자격증 (평균 자격증 보기)") {
                             handleCertificateClick();
                         }
                     }}>
                    <div style={styles.labelTop}>
                        <span style={styles.itemTitle}>{item.name}</span>
                        <span style={styles.itemScore}>
                            내 점수:{" "}
                            {item.name === "어학" ? item.letter : item.value}
                            {" / 평균: "}
                            {item.name === "어학" ? item.avgLetter : item.avg}
                            {(item.name === '학점' || item.name === '어학') &&
                                ` / 만점: ${item.name === "어학" ? item.maxLetter : item.max}`
                            }
                        </span>
                    </div>
                    <div style={{ width: 300, height: 60 }}>
                        <ResponsiveContainer>
                            <BarChart
                                layout="vertical"
                                data={[{ category: item.name, score: item.value, avg: item.avg }]}
                                margin={{ top: 5, right: 20, left: 50, bottom: 5 }}
                            >
                                <XAxis type="number" hide domain={[0, item.max]} />
                                <YAxis dataKey="category" type="category" hide />

                                <defs>
                                    <linearGradient id="barColor" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#82ca9d" />
                                        <stop offset="100%" stopColor="#a0e4b6" />
                                    </linearGradient>
                                </defs>

                                <Bar
                                    dataKey="score"
                                    fill="#8884d8"
                                    barSize={20}
                                    radius={[10, 10, 10, 10]}
                                    label={renderCustomBarLabel("나")}
                                />
                                <Bar
                                    dataKey="avg"
                                    fill="url(#barColor)"
                                    barSize={20}
                                    radius={[10, 10, 10, 10]}
                                    label={renderCustomBarLabel("평균")}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            ))}
            {isModalOpen && (
                <div className="modal-overlay" style={styles.modalOverlay} onClick={closeModal}>
                    <div className="modal-content" style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2 style={{ textAlign: "center" }}>평균 보유 자격증</h2>
                        <p>1. 정보처리기사 (46%)</p>
                        <p>2. SQLD (21%)</p>
                        <p>3. ADsP (10%)</p>
                        <button  style={{
                            backgroundColor: "#ffb8d2",
                            border: "none",
                            borderRadius: "8px",
                            padding: "8px 16px",
                            color: "#fff",
                            cursor: "pointer",
                            fontWeight: "bold",
                            marginTop: "16px"
                        }}
                                 onClick={closeModal}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "12px",
        maxWidth: "400px",
        width: "80%",
        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        border: "2px solid #ffd1e8",
        textAlign: "center",
        fontFamily: "'Noto Sans KR', sans-serif",
    },
    container: {
        maxWidth: 400,
        margin: "0 auto",
        padding: "20px",
        color: "#333",
    },
    title: {
        fontSize: "22px",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "30px",
    },
    chartBox: {
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    labelTop: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "5px",
    },
    itemTitle: {
        fontSize: "16px",
        fontWeight: "bold",
    },
    itemScore: {
        fontSize: "14px",
        color: "#666",
    },
    error: {
        color: "red",
        padding: "20px",
    },
    loading: {
        padding: "20px",
    },
};

export default PositiveFactors;
