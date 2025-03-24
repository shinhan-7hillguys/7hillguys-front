import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from 'api';

const InvestmentReallyExit = () => {
    const [chartData, setChartData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [adjustedAmount, setAdjustedAmount] = useState(0);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get('/api/investment/reallyexit', {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                // 응답 데이터 설정
                if (res.data && res.data.monthlyPayments) {
                    // (1) 월별 데이터를 분기별로 묶어서 평균값(소수점 제거) 계산
                    const groupedData = {};

                    res.data.monthlyPayments.forEach((item) => {
                        // 예: item.month === "2023-01"
                        const [yearStr, monthStr] = item.month.split('-');
                        const year = parseInt(yearStr, 10);
                        const month = parseInt(monthStr, 10);

                        // 분기 계산 (1~3월: Q1, 4~6월: Q2, 7~9월: Q3, 10~12월: Q4)
                        const quarter = Math.ceil(month / 3);

                        // 그룹화 키 예: "2023-1Q"
                        const key = `${year}-${quarter}Q`;

                        if (!groupedData[key]) {
                            groupedData[key] = { sum: 0, count: 0 };
                        }
                        groupedData[key].sum += item.totalAmount;
                        groupedData[key].count += 1;
                    });

                    // (2) 객체 -> 배열 변환 + 평균 계산
                    const quarterData = Object.keys(groupedData).map((key) => {
                        const { sum, count } = groupedData[key];
                        // 평균 구하고 소수점은 내림 처리
                        const avg = Math.floor(sum / count);

                        return {
                            name: key,       // "2023-1Q" 형태
                            투자금액: avg,
                        };
                    });

                    // (3) 분기 순서대로 정렬 (연도 순, 분기 순)
                    quarterData.sort((a, b) => {
                        const [aYear, aQuarter] = a.name.split('-');
                        const [bYear, bQuarter] = b.name.split('-');
                        // aQuarter에서 "1Q" -> 1 로 추출
                        const aQ = parseInt(aQuarter, 10);
                        const bQ = parseInt(bQuarter, 10);
                        if (aYear === bYear) {
                            return aQ - bQ;
                        }
                        return parseInt(aYear, 10) - parseInt(bYear, 10);
                    });

                    setChartData(quarterData);
                }

                setStartDate(res.data.startDate);
                setEndDate(res.data.endDate);
                setTotalAmount(res.data.totalAmount);
                setAdjustedAmount(res.data.adjustedAmount);
            } catch (err) {
                console.error('데이터를 가져오는 중 에러 발생:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // 함수 호출
    }, [token]);

    // 서비스 해지 처리
    const handleExit = () => {
        if (window.confirm('정말로 서비스를 해지하시겠습니까?')) {
            axiosInstance
                .post(
                    '/api/investment/reallyexit',
                    {},
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                )
                .then((response) => {
                    if (response.data && response.data.success) {
                        alert('서비스가 성공적으로 해지되었습니다.');
                        navigate('/dashboard');
                    } else {
                        alert('서비스 해지에 실패했습니다: ' + (response.data.message || '알 수 없는 오류'));
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('등록된 통장의 잔고가 부족합니다.');
                });
        }
    };

    return (
        <PageContainer>
            {/* 차트 */}
            <ChartContainer>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={loading ? [] : chartData}
                        margin={{ top: 30, right: 10, left: -10, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis
                            label={{
                                value: '금액(만 원)',
                                angle: 0,
                                position: 'top',
                                offset: 15,
                                dx: 30,
                                fill: '#666',
                                fontWeight: 'bold',
                            }}
                            ticks={[0, 150000, 300000, 450000, 600000]}
                            tickFormatter={(value) => (value / 10000).toLocaleString()} // 만 원 단위로 표시
                            domain={[0, 600000]}
                        />
                        <Tooltip />
                        <Bar dataKey="투자금액" fill="#ff89a3" fontWeight="bold" />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>

            {/* 정보 텍스트 */}
            <InfoText>
                이때까지{' '}
                <HighlightText>
                    {startDate || '로딩 중...'} ~ {endDate || '로딩 중...'}
                </HighlightText>{' '}
                기간 동안
                <br />
                <HighlightText>
                    {totalAmount?.toLocaleString() || '0'}
                </HighlightText>
                원을 투자 받으셨습니다.
                <br />
                {totalAmount?.toLocaleString() || '0'}원 + 해지 수수료 ={' '}
                <HighlightText>
                    {adjustedAmount?.toLocaleString() || '0'}
                </HighlightText>
                원
                <br />
                서비스를 중단하시기 위해서는
                <br />
                <HighlightText>
                    {adjustedAmount?.toLocaleString() || '0'}
                </HighlightText>
                원을 환급해주시기 바랍니다.
            </InfoText>

            {/* 추가 설명 */}
            <FooterText>
                서비스 해지 시 환급금은 총 지원 금액에서
                <br />
                이용 기간과 상태 내역을 반영하여 산정됩니다.
                <br />
                해지 후 미납된 상환 금액이 있을 경우,
                <br />
                연체 이자가 부과되며 신용 점수에 영향을 미칠 수 있습니다.
            </FooterText>

            {/* 버튼 */}
            <Button onClick={handleExit}>서비스 해지하기</Button>
        </PageContainer>
    );
};

export default InvestmentReallyExit;

// 스타일 정의
const PageContainer = styled.div`
    padding: 20px;
    background-color: #fff; /* 연한 핑크 배경 */
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
`;

const ChartContainer = styled.div`
    background-color: #fff;
    border-radius: 15px;
    padding: 20px;
    margin-top: 20px;
    margin-left: -30px;
`;

const InfoText = styled.p`
    font-size: 16px;
    color: #333;
    line-height: 1.5;
    text-align: center;
`;

const HighlightText = styled.span`
    font-weight: bold;
    color: #ff99aa; /* 핑크색 */
`;

const FooterText = styled.p`
    font-size: 12px;
    color: #666;
    text-align: center;
    margin-top: 10px;
    font-weight: bold;
`;

const Button = styled.button`
    display: block;
    width: calc(100% - 40px);
    max-width: 400px;
    margin: 20px auto;
    padding: 15px 20px;
    background-color: #ff99aa; /* 핑크색 */
    color: white;
    border-radius: 30px;
    border: none;
    font-size: 16px;
    cursor: pointer;
`;