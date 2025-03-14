import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';

const data = [
    { name: '학점', myScore: 3.2, avgScore: 3.0 },
    { name: '어학', myScore: 750, avgScore: 700 },
    { name: '인턴', myScore: 1, avgScore: 1.5 },
    { name: '자격증', myScore: 2, avgScore: 3 },
];

function PositiveFactors() {
    return (
        <div style={{ padding: '20px' }}>
            <h1>나 vs 전공 평균</h1>
            <BarChart
                width={1000}         // 차트 너비
                height={500}        // 차트 높이
                data={data}         // 데이터
                layout="vertical"   // 가로 막대차트 설정
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar
                    dataKey="myScore"
                    fill="#8884d8"
                    animationDuration={50}
                    animationEasing="ease-out"
                />
                <Bar
                    dataKey="avgScore"
                    fill="#82ca9d"
                    animationDuration={30}
                    animationEasing="ease-out"
                />
            </BarChart>
        </div>
    );
}

export default PositiveFactors;
