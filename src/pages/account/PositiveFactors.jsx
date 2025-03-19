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

function PositiveFactors2() {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState("");

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
    const languageObj = JSON.parse(profileData.languageScore);

    // 차트 데이터
    const chartData = [
        {
            name: "학점",
            value: parseFloat(gradeObj.gpa),
            max: parseFloat(gradeObj.maxGpa) || 4.5,
            avg: 3.2, // 더미
        },
        {
            name: "어학",
            value: parseFloat(languageObj.score),
            max: 990,
            avg: 700, // 더미
        },
        {
            name: "인턴",
            value: 1,
            max: 5,
            avg: 2, // 더미
        },
        {
            name: "자격증",
            value: 1,
            max: 10,
            avg: 3, // 더미
        },
    ];

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>직군 비교</h1>

            {chartData.map((item) => (
                <div key={item.name} style={styles.chartBox}>
                    <div style={styles.labelTop}>
                        <span style={styles.itemTitle}>{item.name}</span>
                        <span style={styles.itemScore}>
              내 점수 : {item.value} / 평균 : {item.avg}
                            {(item.name === '학점' || item.name === '어학') && ` / 만점 : ${item.max}`}
            </span>
                    </div>

                    <div style={{ width: 300, height: 60 }}>
                        <ResponsiveContainer>
                            <BarChart
                                layout="vertical"
                                data={[{ category: item.name, score: item.value, avg: item.avg }]}
                                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
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
                                    fill="url(#barColor)"
                                    barSize={20}
                                    radius={[10, 10, 10, 10]}
                                />
                                <Bar
                                    dataKey="avg"
                                    fill="#8884d8"
                                    barSize={20}
                                    radius={[10, 10, 10, 10]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            ))}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: 400,
        margin: "0 auto",
        padding: "20px",
        fontFamily: "'Noto Sans KR', sans-serif",
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

export default PositiveFactors2;
