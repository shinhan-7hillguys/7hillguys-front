import React, {useEffect, useState} from 'react';
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
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

// 스타일 정의
const PageContainer = styled.div`
    padding: 20px;
    background-color: #fce4ec; /* 연한 핑크 배경 */
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
`;

const ChartContainer = styled.div`
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-top: 20px;
`;

const InfoText = styled.p`
    font-size: 16px;
    color: #333;
    line-height: 1.5;
    text-align: center;
`;

const HighlightText = styled.span`
    font-weight: bold;
    color: #e91e63; /* 핑크색 */
`;

const FooterText = styled.p`
    font-size: 12px;
    color: #666;
    text-align: center;
    margin-top: 10px;
`;


const Button = styled.button`
    display: block;
    width: calc(100% - 40px);
    max-width: 400px;
    margin: 20px auto;
    padding: 15px 20px;
    background-color: #e91e63; /* 핑크색 */
    color: white;
    border-radius: 30px;
    border: none;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #c2185b; /* 어두운 핑크 */
        transition: background-color 0.3s ease-in-out;
    }
`;

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
                const res = await axios.get(
                    `http://localhost:8080/api/investment/reallyexit`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                // 응답 데이터 설정
                if (res.data && res.data.monthlyPayments) {
                    setChartData(
                        res.data.monthlyPayments.map((item) => ({
                            name: item.month,
                            투자금액: item.totalAmount,
                        }))
                    );
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
            alert('서비스가 해지되었습니다.');
            navigate('/dashboard');
        }
    };

    return (
        <PageContainer>
            {/* 차트 */}
            <ChartContainer>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={loading ? [] : chartData}
                        margin={{top: 10, right: 30, left: -10, bottom: 0}}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Bar dataKey="투자금액" fill="#FFAB91"/>
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>

            {/* 정보 텍스트 */}
            <InfoText>
                이때까지{' '}
                <HighlightText>
                    {startDate || '로딩 중...'} ~ {endDate || '로딩 중...'}
                </HighlightText>{' '}
                기간 동안<br/>
                <HighlightText>
                    {totalAmount?.toLocaleString() || '0'}원
                </HighlightText>
                을 투자 받으셨습니다.
                <br/>
                {totalAmount?.toLocaleString() || '0'}원 + 각종 비용 ={' '}
                <HighlightText>
                    {adjustedAmount?.toLocaleString() || '0'}원
                </HighlightText>
                입니다.
                <br/>
                서비스를 중단하시기 위해서는<br/>
                <HighlightText>
                    {adjustedAmount?.toLocaleString() || '0'}원
                </HighlightText>
                을 환급해주시기 바랍니다.
            </InfoText>

            {/* 추가 설명 */}
            <FooterText>
                서비스 해지 시 환급금은 총 지원 금액에서 <br/>
                이용 기간과 상태 내역을 반영하여 산정됩니다.
                <br/>
                해지 후 미납된 상환 금액이 있을 경우,
                <br/> 연체 이자가 부과되며 신용 점수에 영향을 미칠 수 있습니다.
            </FooterText>

            {/* 버튼 */}
            <Button onClick={handleExit}>서비스 해지하기</Button>
        </PageContainer>
    );
};

export default InvestmentReallyExit;
