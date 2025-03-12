import React from 'react';
import styled from 'styled-components';

// 스타일 정의
const Container = styled.div`
    padding: 20px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 20px auto;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 24px;
    color: #333;
`;

const MembershipInfo = styled.div`
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
`;

const Amount = styled.p`
    font-size: 36px;
    font-weight: bold;
    color: #E91E63; /* 핑크색 */
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
    margin-top: 20px;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
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
        background-color: #E91E63; /* 핑크색 */
        color: white;

        &:hover {
            background-color: #C2185B; /* 어두운 핑크 */
        }
    }

    &:nth-child(2) {
        background-color: #F48FB1; /* 연한 핑크색 */
        color: black;

        &:hover {
            background-color: #F06292; /* 중간 핑크 */
        }
    }
`;

// React 컴포넌트
const InvestmentExitUI = () => {
    return (
        <Container>
            <Title>카멜레온 카드으로 절약한 금액</Title>
            <MembershipInfo>
                <Amount>61,000원</Amount>
                <BenefitsList>
                    <BenefitItem>혜택1 - 3,000원</BenefitItem>
                    <BenefitItem>혜택2 - 40,000원</BenefitItem>
                    <BenefitItem>혜택3 - 18,000원</BenefitItem>
                </BenefitsList>
            </MembershipInfo>

            <SadIcon>😢</SadIcon>
            <p>그래도 해지하시겠어요?</p>

            <ButtonsContainer>
                <Button>내가 받고 있는 혜택 유지하기</Button>
                <Button>내가 받고 있는 혜택 포기하기</Button>
            </ButtonsContainer>
        </Container>
    );
};

export default InvestmentExitUI;
