import React, {useState, useEffect} from "react";
import axios from "axios";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";
import styled from "styled-components";

// 슬라이더 스타일 정의
const StyledSlider = styled.input`
    -webkit-appearance: none; /* 기본 브라우저 스타일 제거 */
    width: 100%; /* 슬라이더 전체 너비 */
    height: 8px; /* 슬라이더 높이 */
    background: linear-gradient(to right, #4f46e5, #818cf8); /* 슬라이더 배경 그라데이션 */
    border-radius: 5px; /* 둥근 모서리 */
    outline: none;
    transition: background 0.3s ease;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px; /* 슬라이더 핸들 너비 */
        height: 20px; /* 슬라이더 핸들 높이 */
        background: #10b981; /* 핸들 색상 */
        border-radius: 50%; /* 핸들 둥글게 */
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 핸들 그림자 */
    }

    &::-moz-range-thumb {
        width: 20px;
        height: 20px;
        background: #10b981;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    &::-ms-thumb {
        width: 20px;
        height: 20px;
        background: #10b981;
        border-radius: 50%;
        cursor: pointer;
    }
`;

const SliderLabel = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem; /* 글씨 크기 */
    margin-bottom: 10px; /* 글씨와 슬라이더 간격 */
`;

const SliderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Container = styled.div`
    padding: 20px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 1200px;
    margin: 20px auto;
`;

const SliderContainer = styled.div`
    margin: 20px 0;
`;

const InvestmentSimulator = () => {
    const [monthlySupport, setMonthlySupport] = useState(50);
    const [supportPeriod, setSupportPeriod] = useState(5);
    const [refundRate, setRefundRate] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [expectedIncomes, setExpectedIncomes] = useState([]);
    const [inflationRates, setInflationRates] = useState({});
    const [maxInvestment, setMaxInvestment] = useState(0);
// 초기 데이터 로드
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get('http://localhost:8080/api/investment/tempallowance/6', {
                    headers: {
                        Authorization: `Bearer ${token}` // Bearer Token 추가
                    }
                });
                console.log(response);
                const parsedIncomes = Object.entries(JSON.parse(response.data.incomes[0].expectedIncome))
                    .map(([age, income]) => ({age: parseInt(age), income}));
                console.log(parsedIncomes);
                setExpectedIncomes(parsedIncomes);
                console.log(response.data.inflationRate);
                setInflationRates(JSON.parse(response.data.inflationRate));
                setMaxInvestment(response.data.maxInvestment);

                // 초기 차트 데이터 설정 (환급 비율이 없으므로 refund 값은 0)
                const initialChartData = parsedIncomes.map(({age, income}) => ({
                    age,
                    expected: income,
                    refund: 0, // 초기 환급 금액은 0
                }));
                setChartData(initialChartData); // 초기 차트 데이터 설정
            } catch (error) {
                console.error("초기 데이터 로드 실패:", error);
            }
        };
        fetchInitialData();
    }, []);
    // // 초기 데이터 로드
    // useEffect(() => {
    //     const fetchInitialData = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:8080/api/investment/setamount/6");
    //             const parsedIncomes = Object.entries(JSON.parse(response.data.expectedIncomes))
    //                 .map(([age, income]) => ({age: parseInt(age), income}));
    //
    //             setExpectedIncomes(parsedIncomes);
    //             setInflationRates(JSON.parse(response.data.inflationRate));
    //             setMaxInvestment(response.data.maxInvestment);
    //         } catch (error) {
    //             console.error("초기 데이터 로드 실패:", error);
    //         }
    //     };
    //     fetchInitialData();
    // }, []);

    // 환급 비율 받아오기
    const fetchRefundRate = async () => {
        const totalInvestment = monthlySupport * supportPeriod * 12 * 10000;
        if (totalInvestment > 0) {
            try {
                const response = await axios.post("http://localhost:8080/api/investment/refund-rate", {
                    userId: 6,
                    investAmount: totalInvestment,
                });
                console.log(response);
                setRefundRate(response.data);
            } catch (error) {
                console.error("환급 비율 조회 실패:", error);
            }
        }
    };

    // 슬라이더 최대값 만들기
    const maxMonthlySupport = Math.floor(maxInvestment / (supportPeriod * 12 * 10000)) || 1;
    const maxSupportPeriod = Math.min(10, Math.floor(maxInvestment / (monthlySupport * 12 * 10000)) || 1);
    const totalRefundAmount = chartData.reduce((acc, item) => acc + item.refund, 0);
    console.log("총 환급 금액:", totalRefundAmount.toLocaleString());

    // // 슬라이더 핸들러
    // const handleMonthlySupportChange = (value) => {
    //     const newValue = Math.min(value, maxMonthlySupport);
    //     setMonthlySupport(newValue);
    // };
    // const handleSupportPeriodChange = (value) => {
    //     const newValue = Math.min(value, maxSupportPeriod);
    //     setSupportPeriod(newValue);
    // };

    // 물가상승률 계산 로직
    const getInflationRate = (period, rates) => {
        const periods = Object.keys(rates).map(Number).sort((a, b) => a - b);
        const validPeriods = periods.filter(p => p <= period);
        return validPeriods.length > 0
            ? rates[Math.max(...validPeriods)]
            : rates[Math.max(...periods)];
    };


    // 차트 데이터 생성 (물가상승률 반영)
    useEffect(() => {
        if (expectedIncomes.length > 0 && refundRate > 0) {
            const newChartData = expectedIncomes.map(({age, income}) => ({
                age,
                expected: income,
                refund: Math.round(income * refundRate / 100), // 예상 소득에 환급률 직접 적용
                refundPercentage: (refundRate).toFixed(1) + "%" // 환급률 표시
            }));
            setChartData(newChartData);
        }
    }, [expectedIncomes, refundRate, monthlySupport, supportPeriod]);

    return (
        <Container>
            <h2>생애주기 투자 시뮬레이션</h2>

            <SliderContainer>
                <SliderWrapper>
                    <SliderLabel>
                        월 지원금: {monthlySupport}만원 (최대 {maxMonthlySupport}만원)
                    </SliderLabel>
                    <StyledSlider
                        type="range"
                        min="10"
                        max={maxMonthlySupport}
                        value={monthlySupport}
                        onChange={(e) => setMonthlySupport(Number(e.target.value))}
                        onMouseUp={fetchRefundRate}
                    />
                </SliderWrapper>
            </SliderContainer>

            {/* 지원 기간 슬라이더 */}
            <SliderContainer>
                <SliderWrapper>
                    <SliderLabel>
                        지원 기간: {supportPeriod}년 (최대 {maxSupportPeriod}년)
                    </SliderLabel>
                    <StyledSlider
                        type="range"
                        min="1"
                        max={maxSupportPeriod > 10 ? 10 : maxSupportPeriod}
                        value={supportPeriod}
                        onChange={(e) => setSupportPeriod(Number(e.target.value))}
                        onMouseUp={fetchRefundRate}
                    />
                </SliderWrapper>
            </SliderContainer>

            <div style={{height: "500px"}}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="age" label={{value: "나이", position: "bottom"}}/>
                        <YAxis
                            label={{value: "금액 (만 원)", angle: -90, position: "insideLeft"}}
                            tickFormatter={(value) => `${Math.round(value / 10000)}`}
                        />
                        <Tooltip
                            formatter={(value) => `${value.toLocaleString()}원`}
                            contentStyle={{backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}
                        />
                        <Area
                            type="monotone"
                            dataKey="expected"
                            name="예상 소득"
                            stroke="#4f46e5"
                            fill="#818cf8"
                            fillOpacity={0.2}
                        />
                        <Area
                            type="monotone"
                            dataKey="refund"
                            name="환급 금액"
                            stroke="#10b981"
                            fill="#34d399"
                            fillOpacity={0.2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div style={{marginTop: "20px", padding: "0px 20px"}}>
                <h3>투자 정보</h3>
                <p>총 투자금: {(monthlySupport * supportPeriod * 12 * 10000).toLocaleString()}원</p>
                <p>환급 비율: {(refundRate).toFixed(1)}%</p>
                <p>적용 물가 상승률: {getInflationRate(supportPeriod, inflationRates)}%</p>
            </div>
        </Container>
    );
};

export default InvestmentSimulator;
