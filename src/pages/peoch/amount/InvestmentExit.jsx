import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend} from 'recharts';
import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 1200px;
    margin: 20px auto;
`;

const InvestmentExit = () => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchExpectedIncome = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/investment/exit/6', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                const incomeData = response.data;
                console.log(incomeData);
                console.log(response);
                const firstExpectedIncome = JSON.parse(incomeData.firstExpectedIncome);
                const lastExpectedIncome = JSON.parse(incomeData.lastExpectedIncome);

                // 두 데이터를 병합하여 그래프 데이터 생성
                const formattedData = Object.entries(firstExpectedIncome).map(([year, income]) => ({
                    year: `${year}년`,
                    firstIncome: income / 10000,
                    lastIncome: lastExpectedIncome[year] ? lastExpectedIncome[year] / 10000 : null
                }));

                setChartData(formattedData);
                setLoading(false);
            } catch (err) {
                console.error('데이터를 가져오는 중 에러 발생:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchExpectedIncome();
    }, []);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>에러가 발생했습니다. 다시 시도해주세요.</p>;

    const totalFirstIncome = chartData.reduce((sum, item) => sum + (item.firstIncome || 0), 0);
    const totalLastIncome = chartData.reduce((sum, item) => sum + (item.lastIncome || 0), 0);

    return (
        <Container>
            <h1>투자 지원 금액 변경</h1>

            <div style={{height: '400px', marginBottom: '20px'}}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{top: 10, right: 30, left: 0, bottom: 0}}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="year"/>
                        <YAxis tickFormatter={(value) => value.toLocaleString()}/>
                        <Tooltip formatter={(value) => value.toLocaleString()}/>
                        <Legend/>
                        <Area
                            type="monotone"
                            dataKey="firstIncome"
                            name="첫 번째 예상 소득(만 원)"
                            stroke="#E91E63"
                            fill="#F48FB1"
                            fillOpacity={0.5}
                        />
                        <Area
                            type="monotone"
                            dataKey="lastIncome"
                            name="마지막 예상 소득(만 원)"
                            stroke="#3F51B5"
                            fill="#9FA8DA"
                            fillOpacity={0.5}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div>
                <h2>결과 정보</h2>
                <p>첫 번째 총 예상 소득 합계: {(totalFirstIncome * 10000).toLocaleString()} 원</p>
                <p>마지막 총 예상 소득 합계: {(totalLastIncome * 10000).toLocaleString()} 원</p>
            </div>
        </Container>
    );
};

export default InvestmentExit;
