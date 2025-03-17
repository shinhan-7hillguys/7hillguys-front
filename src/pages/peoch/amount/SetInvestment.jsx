import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"; // 네비게이션 추가
import axios from "axios";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";
import styled from "styled-components";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// 스타일 컴포넌트 정의
const Container = styled.div`
    padding: 20px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 1200px;
    margin: 20px auto;
`;

const SliderContainer = styled.div`
    margin: 30px auto 20px;
    width: 90%;
    text-align: center;

    /* rc-slider 커스텀 스타일 */

    .rc-slider-rail {
        height: 8px;
        background-color: #ddd;
    }

    .rc-slider-track {
        height: 8px;
        background: linear-gradient(to right, #4f46e5, #818cf8);
    }

    .rc-slider-handle {
        width: 20px;
        height: 20px;
        margin-top: -6px;
        border: 2px solid #10b981;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .rc-slider-handle:hover {
        border-color: #10b981;
    }

    .rc-slider-handle:active {
        border-color: #10b981;
        box-shadow: 0 0 5px #10b981;
    }
`;

const SliderValue = styled.div`
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #4f46e5;
`;

const SliderLabel = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 14px;
    color: #555;
`;

// 신청 버튼 스타일 추가
const SubmitButton = styled.button`
    display: block;
    margin: 30px auto;
    padding: 15px 40px;
    background-color: #FF97B5;
    color: white;
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #FF7BA9;
    }
`;

const InvestmentSimulator = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용
    const token = localStorage.getItem("token");
    const [monthlySupport, setMonthlySupport] = useState(50);
    const [supportPeriod, setSupportPeriod] = useState(3);
    const [refundRate, setRefundRate] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [expectedIncomes, setExpectedIncomes] = useState([]);
    const [inflationRates, setInflationRates] = useState({});
    const [maxInvestment, setMaxInvestment] = useState(0);

    // 초기 데이터 로드
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/investment/setamount', {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const parsedIncomes = Object.entries(JSON.parse(response.data.expectedIncomes))
                    .map(([age, income]) => ({age: parseInt(age), income}));
                setExpectedIncomes(parsedIncomes);
                setInflationRates(JSON.parse(response.data.inflationRate));
                setMaxInvestment(response.data.maxInvestment);

                // 초기 차트 데이터 설정
                const initialChartData = parsedIncomes.map(({age, income}) => ({
                    age,
                    expected: income,
                    refund: 0,
                }));
                setChartData(initialChartData);

                // 초기 환급 비율 가져오기
                const initialTotalInvestment = monthlySupport * supportPeriod * 12 * 10000;
                if (initialTotalInvestment > 0) {
                    const refundResponse = await axios.post(
                        "http://localhost:8080/api/investment/refund-rate",
                        {
                            investAmount: initialTotalInvestment
                        },
                        {
                            withCredentials: true,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                    setRefundRate(refundResponse.data);
                }
            } catch (error) {
                console.error("초기 데이터 로드 실패:", error);
            }
        };
        fetchInitialData();
    }, []);

    // 환급 비율 받아오기
    const fetchRefundRate = async () => {
        const totalInvestment = monthlySupport * supportPeriod * 12 * 10000;
        if (totalInvestment > 0) {
            try {
                const response = await axios.post(
                    "http://localhost:8080/api/investment/refund-rate",
                    {
                        investAmount: totalInvestment
                    },
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                setRefundRate(response.data);
            } catch (error) {
                console.error("환급 비율 조회 실패:", error);
            }
        }
    };

    // 슬라이더 값 변경 후 환급 비율 업데이트
    const handleSliderAfterChange = () => {
        fetchRefundRate();
    };

    // 투자 신청 제출 함수
    const handleSubmit = async () => {
        try {
            const totalInvestment = monthlySupport * supportPeriod * 12 * 10000;

            await axios.post(
                "http://localhost:8080/api/investment/setamount",
                {
                    monthlyAmount: monthlySupport * 10000,
                    period: supportPeriod,
                    totalAmount: totalInvestment,
                    refundRate: refundRate
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // 성공 시 메인 페이지로 이동
            navigate('/');
        } catch (error) {
            console.error("투자 신청 실패:", error);
            alert("투자 신청에 실패했습니다. 다시 시도해주세요.");
        }
    };

    // 슬라이더 최대값 계산
    const maxMonthlySupport = Math.floor(maxInvestment / (supportPeriod * 12 * 10000)) || 100;
    const maxSupportPeriod = Math.min(5, Math.floor(maxInvestment / (monthlySupport * 12 * 10000)) || 5);

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
                refund: Math.round(income * refundRate / 100),
                refundPercentage: (refundRate).toFixed(1) + "%"
            }));
            setChartData(newChartData);
        }
    }, [expectedIncomes, refundRate, monthlySupport, supportPeriod]);

    return (
        <Container>
            <h2>생애주기 투자 시뮬레이션</h2>

            <SliderContainer>
                <SliderValue>월 지원금: {monthlySupport}만원</SliderValue>
                <Slider
                    min={10}
                    max={maxMonthlySupport}
                    value={monthlySupport}
                    onChange={setMonthlySupport}
                    onAfterChange={handleSliderAfterChange}
                />
                <SliderLabel>
                    <span>10만원</span>
                    <span>{maxMonthlySupport}만원</span>
                </SliderLabel>
            </SliderContainer>

            <SliderContainer>
                <SliderValue>지원 기간: {supportPeriod}년</SliderValue>
                <Slider
                    min={1}
                    max={maxSupportPeriod > 5 ? 5 : maxSupportPeriod}
                    value={supportPeriod}
                    onChange={setSupportPeriod}
                    onAfterChange={handleSliderAfterChange}
                />
                <SliderLabel>
                    <span>1년</span>
                    <span>{maxSupportPeriod > 5 ? 5 : maxSupportPeriod}년</span>
                </SliderLabel>
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

            {/* 신청하기 버튼 추가 */}
            <SubmitButton onClick={handleSubmit}>신청하기</SubmitButton>
        </Container>
    );
};

export default InvestmentSimulator;
