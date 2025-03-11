import React, {useState} from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import styled from 'styled-components';

// Styled Components 정의
const Container = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 800px;
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
`;

const HighlightText = styled.span`
    font-weight: bold;
    color: #007BFF;
`;

const SliderContainer = styled.div`
    margin-top: 20px;
`;

const Label = styled.label`
    font-size: 14px;
`;

const Slider = styled.input`
    width: calc(100% - 20px);
`;

const ChartContainer = styled.div`
    margin-top: 20px;
`;

const Button = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
        transition: background-color 0.3s ease-in-out;
    }
`;

const SetInvestment = () => {
    const [monthlySupport, setMonthlySupport] = useState(50); // 월 지원 금액 (단위 만원)
    const [supportPeriod, setSupportPeriod] = useState(5); // 지원 기간 (단위 년)
    const [inflationRate] = useState(2); // 물가 상승률 (%)
    const [refundRate] = useState(10); // 환급 비율 (%)
    const [incomeGrowthRate] = useState(4.5); // 연간 소득 성장률 (%)

    // 예상 소득 데이터 계산
    const calculateChartData = () => {
        const totalSupportAmount = monthlySupport * supportPeriod * 12; // 총 지원 금액
        let currentIncome = totalSupportAmount; // 초기 예상 소득

        const data = [];
        for (let i = 1; i <= supportPeriod * 12; i++) {
            currentIncome *= (1 + incomeGrowthRate / (100 * 12)); // 월별 성장률 적용
            data.push({
                name: `${i}개월`,
                예상소득: Math.round(currentIncome / supportPeriod),
                환급금액: Math.round((currentIncome * refundRate) / (100 * supportPeriod)),
            });
        }
        return data;
    };

    const chartData = calculateChartData();

    return (
        <Container>
            <Header>투자 지원 금액 변경</Header>

            <SliderContainer>
                <Label htmlFor="monthlySupport">월 지원 금액 (만원): {monthlySupport}</Label>
                <Slider
                    type="range"
                    id="monthlySupport"
                    min="10"
                    max="100"
                    value={monthlySupport}
                    onChange={(e) => setMonthlySupport(Number(e.target.value))}
                />
            </SliderContainer>

            <SliderContainer>
                <Label htmlFor="supportPeriod">지원 기간 (년): {supportPeriod}</Label>
                <Slider
                    type="range"
                    id="supportPeriod"
                    min="1"
                    max="10"
                    value={supportPeriod}
                    onChange={(e) => setSupportPeriod(Number(e.target.value))}
                />
            </SliderContainer>

            <InfoText>
                총 지원 금액:<HighlightText> {monthlySupport * supportPeriod * 12} 만원</HighlightText>
            </InfoText>
            <InfoText>
                예상 생애 총소득 합계:
                <HighlightText>
                    {chartData.reduce((a, b) => a + b.예상소득, 0).toLocaleString()} 만원
                </HighlightText>
            </InfoText>
            <InfoText>
                예상 환급 비율:<HighlightText> {refundRate}%</HighlightText>
            </InfoText>

            <ChartContainer>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis domain={[0, Math.max(...chartData.map((d) => d.예상소득)) * 1.1]}/>
                        <Tooltip formatter={(value) => `${Number(value).toLocaleString()} 만원`}/>
                        <Area type="monotone" dataKey="예상소득" stroke="#007BFF" fill="#B0E2FF" dot={{r: 1.5}}
                              name="예상 소득 (만원)"/>
                        <Area type="monotone" dataKey="환급금액" stroke="#FF4500" fill="#FFA07A" dot={{r: 1.5}}
                              name="환급 금액 (만원)"/>
                    </AreaChart>
                </ResponsiveContainer>
            </ChartContainer>

            <Button>변경하기</Button>
        </Container>
    );
};

export default SetInvestment;
