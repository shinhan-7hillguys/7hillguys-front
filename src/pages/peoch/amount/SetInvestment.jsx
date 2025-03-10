import React, {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const Container = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h1`
    font-size: 24px;
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

const InvestmentTempAllowance = () => {
    const [monthlySupport, setMonthlySupport] = useState(50); // 월 지원 금액 (단위 만원)
    const [supportPeriod, setSupportPeriod] = useState(5); // 지원 기간 (단위 년)
    const [inflationRate] = useState(2); // 물가 상승률 (%)
    const [maxInvestment, setMaxInvestment] = useState(0); // 지원 가능 금액
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchMaxInvestment = async () => {
            try {
                const response = await axios.get(
                    `/api/investment/max-investment/1?monthlySupport=${monthlySupport}&supportPeriod=${supportPeriod}&inflationRate=${inflationRate}`
                );
                setMaxInvestment(response.data);
            } catch (error) {
                console.error("지원 가능 금액을 가져오는 중 오류 발생:", error);
            }
        };

        fetchMaxInvestment();
    }, [monthlySupport, supportPeriod, inflationRate]);

    const calculateChartData = () => {
        let currentIncome = maxInvestment;
        const data = [];
        for (let i = 1; i <= supportPeriod * 12; i++) {
            currentIncome *= (1 + inflationRate / (100 * 12));
            data.push({
                name: `${i}개월`,
                예상소득: Math.round(currentIncome),
            });
        }
        setChartData(data);
    };

    useEffect(() => {
        calculateChartData();
    }, [maxInvestment]);

    return (
        <Container>
            <Header>투자 지원 금액 변경</Header>
            <SliderContainer>
                <Label>월 지원 금액 (만원): {monthlySupport}</Label>
                <Slider
                    type="range"
                    min="10"
                    max="100"
                    value={monthlySupport}
                    onChange={(e) => setMonthlySupport(Number(e.target.value))}
                />
            </SliderContainer>
            <SliderContainer>
                <Label>지원 기간 (년): {supportPeriod}</Label>
                <Slider
                    type="range"
                    min="1"
                    max="10"
                    value={supportPeriod}
                    onChange={(e) => setSupportPeriod(Number(e.target.value))}
                />
            </SliderContainer>
            <ChartContainer>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type="monotone" dataKey="예상소득" stroke="#8884d8" fill="#8884d8"/>
                    </AreaChart>
                </ResponsiveContainer>
            </ChartContainer>
            <p>지원 가능 금액: {maxInvestment.toLocaleString()} 원</p>
        </Container>
    );
};

export default InvestmentTempAllowance;
