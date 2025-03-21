import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import styled from "styled-components";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

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

    .rc-slider-rail {
        height: 8px;
        background-color: #ddd;
    }

    .rc-slider-track {
        height: 8px;
        background: #e9c0c9;
    }

    .rc-slider-handle {
        width: 20px;
        height: 20px;
        margin-top: -6px;
        border: 2px solid #cdcaf8;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .rc-slider-handle:hover {
        border-color: #cdcaf8;
    }

    .rc-slider-handle:active {
        border-color: #cdcaf8;
        box-shadow: 0 0 5px #cdcaf8;
    }
`;

const SliderValue = styled.div`
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #555;
`;

const SliderLabel = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 14px;
    color: #555;
`;

const SubmitButton = styled.button`
    display: block;
    margin: 30px auto;
    padding: 15px 120px;
    background-color: #FEA1B8;
    color: white;
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.3s;
`;

const featureBoxStyle = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
    textAlign: "left",
};

const infoTitleStyle = {
    textAlign: "center",
    fontSize: "16px",
    marginBottom: "12px",
    color: "#333",
    fontWeight: "bold",
};

const infoTextStyle = {
    fontSize: "16px",
    margin: "6px 0",
    color: "#555",
    lineHeight: "1.4",
};

const InvestmentSimulator = () => {
    const navigate = useNavigate();
    const [monthlySupport, setMonthlySupport] = useState(50);
    const [supportPeriod, setSupportPeriod] = useState(3);
    const [refundRate, setRefundRate] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [expectedIncomes, setExpectedIncomes] = useState([]);
    const [inflationRates, setInflationRates] = useState({});
    const [maxInvestment, setMaxInvestment] = useState(0);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await axios.get("/api/investment/setamount", {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const parsedIncomes = Object.entries(JSON.parse(response.data.expectedIncomes)).map(
                    ([age, income]) => ({ age: parseInt(age), income })
                );
                setExpectedIncomes(parsedIncomes);
                setInflationRates(JSON.parse(response.data.inflationRate));
                setMaxInvestment(response.data.maxInvestment);
                console.log(response.data.maxInvestment);

                const initialChartData = parsedIncomes.map(({ age, income }) => ({
                    age,
                    expected: income,
                    refund: 0,
                }));
                setChartData(initialChartData);

                const initialTotalInvestment = monthlySupport * supportPeriod * 12 * 10000;
                if (initialTotalInvestment > 0) {
                    const refundResponse = await axios.post(
                        "/api/investment/refund-rate",
                        { investAmount: initialTotalInvestment },
                        {
                            withCredentials: true,
                            headers: {
                                "Content-Type": "application/json",
                            },
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
                    "/api/investment/refund-rate",
                    { investAmount: totalInvestment },
                    {
                        withCredentials: true,
                        headers: { "Content-Type": "application/json" },
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

    // 투자 신청
    const handleSubmit = async () => {
        try {
            const totalInvestment = monthlySupport * supportPeriod * 12 * 10000;
            await axios.post(
                "/api/investment/setamount",
                {
                    monthlyAmount: monthlySupport * 10000,
                    period: supportPeriod,
                    totalAmount: totalInvestment,
                    refundRate: refundRate,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            navigate("/contract");
        } catch (error) {
            console.error("투자 신청 실패:", error);
            alert("투자 신청에 실패했습니다. 다시 시도해주세요.");
        }
    };

    // 슬라이더 최대값 계산
    const maxMonthlySupport = Math.min(
        100,
        Math.floor(maxInvestment / (supportPeriod * 12 * 10000)) || 100
    );
    const maxSupportPeriod = Math.min(
        8,
        Math.floor(maxInvestment / (monthlySupport * 12 * 10000)) || 8
    );

    // 차트 데이터 생성
    useEffect(() => {
        if (expectedIncomes.length > 0 && refundRate > 0) {
            const newChartData = expectedIncomes.map(({ age, income }) => ({
                age,
                expected: income,
                refund: Math.round((income * refundRate) / 100),
                refundPercentage: refundRate.toFixed(1) + "%",
            }));
            setChartData(newChartData);
        }
    }, [expectedIncomes, refundRate, monthlySupport, supportPeriod]);

    return (
        <Container>
            <h2 style={{ textAlign: "center", marginBottom: "30px", fontSize: "24px", color: "#333" }}>
                미래 소득 투자 시뮬레이션
            </h2>

            {/* 차트 영역 */}
            <div style={{ height: "400px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 40, right: 30, left: 30, bottom: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />

                        <XAxis
                            dataKey="age"
                            label={{ value: "나이", position: "bottom", fontSize: 14, fill: "#666" }}
                            tick={{ fontSize: 13, fill: "#666" }}
                        />
                        <YAxis
                            label={{
                                value: "금액 (만 원)",
                                angle: 0,
                                position: "top",
                                dy: -10,
                                fontSize: 14,
                                fill: "#666",
                            }}
                            tick={{ fontSize: 13, fill: "#666" }}
                            tickFormatter={(value) => `${Math.round(value / 10000).toLocaleString()}`}
                        />

                        <Tooltip
                            formatter={(value) => `${value.toLocaleString()}원`}
                            contentStyle={{
                                backgroundColor: "#fff",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                borderRadius: "8px",
                                border: "none",
                            }}
                            labelStyle={{ fontSize: 13, color: "#666" }}
                            itemStyle={{ fontSize: 13, color: "#333" }}
                        />
                        <Legend
                            verticalAlign="top"
                            align="right"
                            wrapperStyle={{ fontSize: 13, color: "#666", marginTop: -10 }}
                        />

                        {/*<defs>*/}
                        {/*    <linearGradient id="colorExpected" x1="0" y1="0" x2="0" y2="1">*/}
                        {/*        <stop offset="5%" stopColor="#fea1b8" stopOpacity={0.4} />*/}
                        {/*        <stop offset="95%" stopColor="#fea1b8" stopOpacity={0} />*/}
                        {/*    </linearGradient>*/}
                        {/*    <linearGradient id="colorRefund" x1="0" y1="0" x2="0" y2="1">*/}
                        {/*        <stop offset="5%" stopColor="#c9e8ff" stopOpacity={0.4} />*/}
                        {/*        <stop offset="95%" stopColor="#c9e8ff" stopOpacity={0} />*/}
                        {/*    </linearGradient>*/}
                        {/*</defs>*/}

                        <Area
                            type="monotone"
                            dataKey="expected"
                            name="예상 소득"
                            stroke="#fea1b8"
                            fill = "#fea1b8"
                            // fill="url(#colorExpected)"
                            strokeWidth={2}
                        />

                        <Area
                            type="monotone"
                            dataKey="refund"
                            name="환급 금액"
                            stroke="#0095D9"
                            fill="#0095D9"
                            //fill="url(#colorRefund)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

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
                    max={maxSupportPeriod > 8 ? 8 : maxSupportPeriod}
                    value={supportPeriod}
                    onChange={setSupportPeriod}
                    onAfterChange={handleSliderAfterChange}
                />
                <SliderLabel>
                    <span>1년</span>
                    <span>{maxSupportPeriod > 8 ? 8 : maxSupportPeriod}년</span>
                </SliderLabel>
            </SliderContainer>

            <div style={featureBoxStyle}>
                <h3 style={infoTitleStyle}>투자 정보</h3>
                <p style={infoTextStyle}>
                    총 지원금: {(monthlySupport * supportPeriod * 12 * 10000).toLocaleString()}원
                </p>
                <p style={infoTextStyle}>
                    환급 비율: {refundRate.toFixed(1)}%
                </p>
            </div>

            <SubmitButton onClick={handleSubmit}>신청하기</SubmitButton>
        </Container>
    );
};

export default InvestmentSimulator;
