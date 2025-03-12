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
                const response = await axios.get('http://localhost:8080/api/expectedincome/2', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const incomeData = response.data[0];
                const expectedIncome = JSON.parse(incomeData.expectedIncome);

                const formattedData = Object.entries(expectedIncome).map(([year, income]) => ({
                    year: `${year}년`,
                    income: income / 10000
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

    const totalIncome = chartData.reduce((sum, item) => sum + item.income, 0);

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
                            dataKey="income"
                            name="예상 소득(만 원)"
                            stroke="#E91E63"  // 진한 핑크색
                            fill="#F48FB1"    // 연한 핑크색
                            fillOpacity={0.5}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div>
                <h2>결과 정보</h2>
                <p>총 예상 소득 합계: {(totalIncome * 10000).toLocaleString()} 원</p>
            </div>
        </Container>
    );
};

export default InvestmentExit;
