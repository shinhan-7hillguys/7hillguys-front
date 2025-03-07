import React, {useState, useEffect} from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import styled from 'styled-components';
import axios from 'axios';

// Styled Components 정의
const Container = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: auto;
`;

const Header = styled.h1`
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-align: center;
`;

const InfoText = styled.p`
    font-size: 16px;
    color: #555;
    margin-bottom: 10px;
`;

const HighlightText = styled.span`
    font-weight: bold;
    color: var(--color-red);
`;

const Button = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: var(--color-blue);
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: var(--color-blue980);
        transition: background-color 0.3s ease-in-out;
    }
`;

const ChartContainer = styled.div`
    margin-top: 20px;
`;

const InvestmentTempAllowance = () => {
    const [data, setData] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvestmentDetails = async () => {
            try {
                const responseDetails = await axios.get('http://localhost:8080/api/investment/tempallowance/6');
                const investmentData = responseDetails.data;
                setData(investmentData);

                if (investmentData.incomes && investmentData.incomes.length > 0) {
                    const incomeObject = investmentData.incomes[0];
                    const expectedIncomeJson = JSON.parse(incomeObject.expectedIncome);

                    const graphData = Object.keys(expectedIncomeJson).map((year) => ({
                        name: `${year}세`,
                        예상소득: expectedIncomeJson[year] / 10000,
                        예상소득표시: `${(expectedIncomeJson[year] / 10000).toLocaleString()} 만원`,
                        환급금액: (expectedIncomeJson[year] * (investmentData.refundRate / 100)) / 10000,
                        환급금액표시: `${((expectedIncomeJson[year] * (investmentData.refundRate / 100)) / 10000).toLocaleString()} 만원`
                    }));

                    setChartData(graphData);
                }
                setLoading(false);
            } catch (err) {
                console.error('데이터를 가져오는 중 에러 발생:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchInvestmentDetails();
    }, []);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>에러가 발생했습니다. 다시 시도해주세요.</p>;

    return (
        <Container>
            <Header>이용 한도 조회/관리</Header>
            <InfoText>
                현재 지원 가능 금액:<HighlightText> {Math.round(data.availableAmount / 10000)} 만원</HighlightText>
            </InfoText>
            <InfoText>
                총 지원 금액:<HighlightText> {Math.round(data.investValue / 10000)} 만원</HighlightText>
            </InfoText>
            <InfoText>
                예상 생애 총소득 합계:
                <HighlightText>
                    {chartData.reduce((a, b) => a + b.예상소득, 0).toLocaleString()} 만원
                </HighlightText>
            </InfoText>
            <InfoText>
                투자 진행률:<HighlightText> {(data.progress * 100).toFixed(2)}%</HighlightText>
            </InfoText>
            <InfoText>
                환급 비율:<HighlightText> {(data.refundRate).toFixed(2)}%</HighlightText>
            </InfoText>

            <ChartContainer>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis domain={[0, Math.max(...chartData.map((d) => d.예상소득)) * 1.1]}/>
                        <Tooltip formatter={(value) => `${Number(value).toLocaleString()} 만원`}/>
                        <Area type="monotone" dataKey="예상소득" stroke="var(--color-blue)" fill="var(--color-blue60)"
                              dot={{r: 1.5}} name="예상 소득 (만원)"/>
                        <Area type="monotone" dataKey="환급금액" stroke="var(--color-red)" fill="var(--color-red100)"
                              dot={{r: 1.5}} name="환급 금액 (만원)"/>
                    </AreaChart>
                </ResponsiveContainer>
            </ChartContainer>

            <Button>한도 재선정 신청</Button>
        </Container>
    );
};

export default InvestmentTempAllowance;
