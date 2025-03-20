import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend} from 'recharts';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
import "styles/peoch/InvestmentExit.css";


const InvestmentExit = () => {
    const navigate = useNavigate();
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchExpectedIncome = async () => {
            try {
                const response = await axios.get('/api/investment/exit', {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const incomeData = response.data;
                //반대로 오는데 꼬인거 같음 여기서 그냥 처리
                const firstExpectedIncome = JSON.parse(incomeData.lastExpectedIncome);
                const lastExpectedIncome = JSON.parse(incomeData.firstExpectedIncome);

                // 두 데이터를 병합하여 그래프 데이터 생성
                const formattedData = Object.entries(firstExpectedIncome).map(([year, income]) => ({
                    year: `${year}살`,
                    firstIncome: Number((income / 10000).toFixed(0)),  // 숫자로 변환
                    lastIncome: lastExpectedIncome[year] ? Number((lastExpectedIncome[year] / 10000).toFixed(0)) : null
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

    if (loading) return (
        <div className="loading-dots-exit">
            <p className="loading-text">잠시만 기다려 주세요...</p>
            <div className="dots-container">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        </div>);
    if (error) return <p>예상 소득금액 산출중입니다. 최대 3분정도 소요될 수 있습니다.</p>;
    // (1) 버튼 클릭 시 alert를 띄우는 핸들러
    const handleSadAlert = () => {
        if (window.confirm("😢 그래도 해지하시겠어요?")) {
            navigate("/investmentReallyExit");
        }
    };

    const totalFirstIncome = chartData.reduce((sum, item) => sum + (item.firstIncome || 0), 0);
    const totalLastIncome = chartData.reduce((sum, item) => sum + (item.lastIncome || 0), 0);

    return (
        <Container>
            <Title>조기상환</Title>

            <div style={{height: '400px', marginBottom: '20px'}}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{top: 10, right: 20, left: 5, bottom: 0}}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="year"/>
                        <YAxis tickFormatter={(value) => value.toLocaleString()}
                               label={{
                                   value: "금액(만 원)",
                                   angle: 0,          // 0이면 가로 표시, -90이면 세로 표시
                                   position: "top",   // 라벨을 Y축 상단에
                                   offset: 25,        // 라벨 위치 미세 조정
                                   fill: "#666",
                                   fontWeight: "bold",
                               }}
                        />
                        <Tooltip formatter={(value) => value.toLocaleString()}/>
                        <Legend verticalAlign="top" align="right" wrapperStyle={{ marginRight: -12 }} />
                        <Legend/>
                        <Area
                            type="monotone"
                            dataKey="firstIncome"
                            // name="서비스 시작일의 예상 소득(만 원)"
                            name = "시작일 예상 소득(만 원)"
                            stroke="#ff89a3"
                            fill="#ff89a3"
                            fillOpacity={0.5}
                        />
                        <Area
                            type="monotone"
                            dataKey="lastIncome"
                            name="최신 예상 소득(만 원)"
                            stroke="#c9e8ff"
                            fill="#c9e8ff"
                            fillOpacity={0.6}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div >
                <Title>이때까지 저희와 함께하시면서</Title>
                <Title>{(((totalLastIncome / totalFirstIncome - 1) * 100).toFixed(2))}%의 소득성장을 이루었습니다.</Title>
            </div>
            {/* 새로운 컴포넌트 추가 */}
            {/*<InvestmentExitUI/>*/}
            <Title>카멜레온 카드으로 절약한 금액</Title>
            <MembershipInfo>
                <Amount>61,000원</Amount>
                <BenefitsList>
                    <BenefitItem>혜택1 - 3,000원</BenefitItem>
                    <BenefitItem>혜택2 - 40,000원</BenefitItem>
                    <BenefitItem>혜택3 - 18,000원</BenefitItem>
                </BenefitsList>
            </MembershipInfo>
            <ButtonsContainer>
                <Button onClick={() => navigate("/user/dashboard")}>내가 받고 있는 혜택 유지하기</Button>
            </ButtonsContainer>
            {/*<SadIcon>😢</SadIcon>*/}
            {/*<p>그래도 해지하시겠어요?</p>*/}

            <ButtonsContainer>
                <button onClick={handleSadAlert} style={{marginLeft:'5px', marginTop: '10px', padding: '10px 82px', borderRadius: '5px', border: 'none', backgroundColor: '#c9e8ff', color: '#000', cursor: 'pointer' }}>
                    내가 받고 있는 혜택 포기하기
                </button>
            </ButtonsContainer>

        </Container>
    );
};

export default InvestmentExit;

// 기존 스타일 정의
const Container = styled.div`
    padding: 20px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 1200px;
    margin: 20px auto;
    text-align: center;
`;

// 새로운 스타일 정의
const NewContainer = styled.div`
    padding: 20px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 20px auto;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 20px;
    color: #333;
    text-align: center;
    
`;

const MembershipInfo = styled.div`
    //background-color: #f9f9f9;
    border-radius: 10px;
    padding: 20px;
    margin-top: 5px;
    text-align: center;

`;

const Amount = styled.p`
    font-size: 36px;
    font-weight: bold;
    color: #ff99aa; /* 핑크색 */
    text-align: center;
    margin-top: -15px;

`;

const BenefitsList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const BenefitItem = styled.li`
    font-size: 16px;
    margin-bottom: 10px;
`;

const SadIcon = styled.div`
    font-size: 48px;
    color: #E91E63; /* 핑크색 */
    margin-top: 5px;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 0px;
`;

const Button = styled.button`
    flex-grow: 1;
    margin: 0 5px;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;

    font-size: 16px;

    &:nth-child(1) {
        background-color: #ff99aa; /* 핑크색 */
        color: white;

        //&:hover {
        //    background-color: #C2185B; /* 어두운 핑크 */
        //}
    }

    &:nth-child(2) {
        background-color: #F48FB1; /* 연한 핑크색 */
        color: black;

        &:hover {
            background-color: #F06292; /* 중간 핑크 */
        }
    }
`;
