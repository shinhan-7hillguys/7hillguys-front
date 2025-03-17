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
    const [user, setUser] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get('/api/auth/user', {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.error(err);
                setError("사용자 정보를 불러올 수 없습니다.");
            });
    }, []);

    useEffect(() => {
        if (user && user.userId) {
            axios.get(`/api/userprofiles2?userId=${user.userId}`)
                .then((res) => {
                    console.log("profileData:", res.data);
                    setProfileData(res.data);
                })
                .catch((err) => {
                    console.error(err);
                    setError("user_profiles2 데이터를 불러올 수 없습니다.");
                });
        }
    }, [user]);

    if (error) {
        return <div style={styles.error}>{error}</div>;
    }
    if (!user) {
        return <div style={styles.error}>로그인이 필요한 서비스입니다.</div>;
    }
    if (!profileData) {
        return <div style={styles.loading}>로딩 중...</div>;
    }

    const gradeObj = JSON.parse(profileData.grade);
    const languageObj = JSON.parse(profileData.languageScore);

    const chartData = [
        {
            name: "학점",
            value: parseFloat(gradeObj.gpa),
            max: parseFloat(gradeObj.maxGpa) || 4.5,
            avg: 3.2, // 더미 평균
        },
        {
            name: "어학",
            value: parseFloat(languageObj.score),
            max: 990,
            avg: 700, // 더미 평균
        },
        {
            name: "인턴",
            value: 1,
            max: 5,
            avg: 2, // 더미 평균
        },
        {
            name: "자격증",
            value: 1,
            max: 10,
            avg: 3, // 더미 평균
        },
    ];


    const renderCustomLabel = (props) => {
        const { x, y, width, value } = props;
        return (
            <text
                x={x + width + 5}
                y={y + 10}
                fill="#555"
                fontSize={14}
                fontWeight="bold"
            >
                {value}
            </text>
        );
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>긍정 요인 시각화</h1>
            <p> 내 직군 : 컴퓨터공학</p>

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
                                data={[{ category: item.name, score: item.value,  avg: item.avg  }]}
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
                                    label={renderCustomLabel}
                                />
                                <Bar
                                    dataKey="avg"
                                    fill="#8884d8"
                                    barSize={20}
                                    radius={[10, 10, 10, 10]}
                                    label={{ position: "right", fill: "#000", fontSize: 14 }}
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
