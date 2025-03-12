import React from 'react';
import styled from 'styled-components';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import {useNavigate} from 'react-router-dom';

// 스타일 정의
const PageContainer = styled.div`
    padding: 20px;
    background-color: #FCE4EC; /* 연한 핑크 배경 */
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
`;

const Logo = styled.h1`
    font-size: 24px;
    color: #E91E63; /* 핑크색 */
`;

const MenuIcon = styled.div`
    font-size: 24px;
    cursor: pointer;
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
    color: #E91E63; /* 핑크색 */
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
    background-color: #E91E63; /* 핑크색 */
    color: white;
    border-radius: 30px;
    border: none;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #C2185B; /* 어두운 핑크 */
        transition: background-color 0.3s ease-in-out;
    }
`;

// 더미 데이터
const data = [
    {name: '2021', 투자금액1: 178, 투자금액2: 43},
    {name: '2022', 투자금액1: 154, 투자금액2: 95},
    {name: '2023', 투자금액1: 181, 투자금액2: 31},
];

const InvestmentReallyExit = () => {
    return (
        <PageContainer>
            {/* 헤더 */}
            <Header>
                <Logo>peach</Logo>
                <MenuIcon>☰</MenuIcon>
            </Header>

            {/* 차트 */}
            <ChartContainer>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} margin={{top: 10, right: 30, left: -10, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Bar dataKey="투자금액1" stackId="a" fill="#80DEEA"/>
                        <Bar dataKey="투자금액2" stackId="a" fill="#FFAB91"/>
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>

            {/* 정보 텍스트 */}
            <InfoText>
                이때까지 <HighlightText>data1 ~ date2</HighlightText> 기간 동안<br/>
                <HighlightText>N원</HighlightText>을 투자 받으셨습니다.<br/>
                N원 + 각종 비용 = <HighlightText>N2원</HighlightText>입니다.<br/>
                서비스를 중단하시기 위해서는<br/>
                <HighlightText>N2원</HighlightText>을 환급해주시기 바랍니다.
            </InfoText>

            {/* 추가 설명 */}
            <FooterText>
                서비스 해지 시 환급금은 총 지원 금액에서 이용 기간과 상태 내역을 반영하여 산정됩니다.<br/>
                해지 후 미납된 상환 금액이 있을 경우, 연체 이자가 부과되며 신용 점수에 영향을 미칠 수 있습니다.
            </FooterText>

            {/* 버튼 */}
            <Button>서비스 해지하기</Button>
        </PageContainer>
    );
};

export default InvestmentReallyExit;
