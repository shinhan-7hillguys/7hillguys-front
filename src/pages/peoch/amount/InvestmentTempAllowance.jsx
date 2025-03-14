import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import styled from 'styled-components';
import axios from 'axios';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

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
    text-align: center;
`;

const HighlightText = styled.span`
    font-weight: bold;
    color: #FF4170;
`;

const Button = styled.button`
    display: block;
    margin: 20px auto 0;
    padding: 10px 20px;
    background-color: #FF4170;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #FF4170;
        transition: background-color 0.3s ease-in-out;
    }
`;

const ChartContainer = styled.div`
    margin-top: 20px;
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
        background: linear-gradient(to right, #FFF5F0, #FF4170);
    }

    .rc-slider-handle {
        width: 20px;
        height: 20px;
        margin-top: -6px;
        border: 2px solid #FF4170;
        background-color: white;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }

    .rc-slider-handle:hover {
        border-color: #FF4170;
    }

    .rc-slider-handle:active {
        border-color: #FF4170;
        box-shadow: 0 0 5px #FF4170;
    }
`;

const SliderValue = styled.div`
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #FF4170;
`;

const SliderLabel = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 14px;
    color: #555;
`;

const InvestmentTempAllowance = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sliderValue, setSliderValue] = useState(0);
    const [maxSliderValue, setMaxSliderValue] = useState(0);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchInvestmentDetails = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/investment/tempallowance', {
                    headers: {Authorization: `Bearer ${token}`}
                });
                const investmentData = response.data;
                setData(investmentData);

                const maxValue = Math.max(0, investmentData.availableAmount - investmentData.investValue);
                setMaxSliderValue(maxValue);

                if (investmentData.incomes && investmentData.incomes.length > 0) {
                    const incomeObject = investmentData.incomes[0];
                    const expectedIncomeJson = JSON.parse(incomeObject.expectedIncome);

                    const graphData = Object.keys(expectedIncomeJson).map((year) => ({
                        name: `${year}세`,
                        예상소득: expectedIncomeJson[year] / 10000,
                        환급금액: (expectedIncomeJson[year] * (investmentData.refundRate / 100)) / 10000
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
            <InfoText>현재 지원 가능
                금액: <HighlightText>{Math.round(data.availableAmount / 10000)} 만원</HighlightText></InfoText>
            <InfoText>총 지원 금액: <HighlightText>{Math.round(data.investValue / 10000)} 만원</HighlightText></InfoText>

            <ChartContainer>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis domain={[0, Math.max(...chartData.map((d) => d.예상소득)) * 1.1]}/>
                        <Tooltip formatter={(value) => `${Number(value).toLocaleString()} 만원`}/>
                        <Area type="monotone" dataKey="예상소득" stroke="#007BFF" fill="#A5D8FF"/>
                        <Area type="monotone" dataKey="환급금액" stroke="#FF4170" fill="#FFA5A5"/>
                    </AreaChart>
                </ResponsiveContainer>
            </ChartContainer>

            <SliderContainer>
                <SliderValue>임시 한도 신청 금액: {Math.round(sliderValue / 10000).toLocaleString()} 만원</SliderValue>
                <Slider
                    min={0}
                    max={maxSliderValue}
                    value={sliderValue}
                    onChange={setSliderValue}
                />
                <SliderLabel>
                    <span>0 원</span>
                    <span>{Math.round(maxSliderValue / 10000).toLocaleString()} 만원</span>
                </SliderLabel>
            </SliderContainer>

            <Button onClick={() => axios.post("http://localhost:8080/api/investment/applytempallowance",
                {amount: sliderValue},
                {headers: {Authorization: `Bearer ${token}`}}
            )
                .then(response => {
                    console.log(response.data);
                    navigate('/'); // 성공 시 메인 페이지로 이동
                })
                .catch(error => {
                    console.error('Error:', error.response ? error.response.data : 'Network error');
                })
            }>임시 한도 신청</Button>

        </Container>
    );
};

export default InvestmentTempAllowance;
