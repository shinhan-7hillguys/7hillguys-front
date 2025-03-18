import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SidebarContainer = styled.div`
  width: 90%;
  padding: 16px;
  background-color: #fdf0f1; /* 핑크 톤 배경 */
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  overflow-y: auto;
  font-family: 'Noto Sans KR', sans-serif;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const GridItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #444;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  transition: transform 0.2s, background-color 0.2s;
  &:hover {
    transform: scale(1.05);
    background-color: #f0f0f0;
  }
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-bottom: 8px;
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #444;
  margin-bottom: 16px;
  float: right;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
`;

const LogoIcon = styled.div`
  width: 100px;
  height: 100px;
  background: url('/logo.png') no-repeat center/contain;
  margin-bottom: 10px;
`;

const LogoText = styled(Link)`
  font-size: 40px;
  font-weight: 700;
  color: #e08490;
  text-decoration: none;
`;

const WelcomeMessage = styled.div`
  margin-top: 16px;
  margin-bottom: 24px;
  font-size: 16px;
  font-weight: bold;
  color: #444;
  text-align: center;
`;

const Sidebar = ({ toggleSidebar }) => {
  const [userName, setUserName] = useState('');
   
  useEffect(() => {
    axios
      .get('/api/auth/userid', { withCredentials: true })
      .then(response => {
        // 응답 안의 name 값을 사용
        setUserName(response.data.name);
      })
      .catch(error => {
        console.error('사용자 정보를 가져오는데 실패:', error);
      });
  }, []);

  // 메뉴 항목 배열: label, 이동 경로(to), 아이콘(icon)
  const menuItems = [
    { label: 'Home', to: '/', icon: 'https://cdn-icons-png.flaticon.com/512/1946/1946433.png' },
    { label: 'Card', to: '/card', icon: 'https://cdn-icons-png.flaticon.com/512/633/633611.png' },
    { label: 'My Page', to: '/mypage', icon: 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png' },
    { label: 'Card Intro', to: '/card/intro', icon: 'https://cdn-icons-png.flaticon.com/512/633/633611.png' },
    { label: 'education', to: '/education', icon: 'https://cdn-icons-png.flaticon.com/512/3043/3043124.png' },
    { label: 'Peoch', to: '/peoch', icon: 'https://cdn-icons-png.flaticon.com/512/25/25694.png' },
    { label: 'admin', to: '/admin', icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828490.png' },
    { label: '투자심사신청', to: '/investReview', icon: 'https://cdn-icons-png.flaticon.com/512/2885/2885337.png' },
    { label: '심사결과조회', to: '/investment/status', icon: 'https://cdn-icons-png.flaticon.com/512/190/190411.png' },
    { label: '계약서', to: '/contract', icon: 'https://cdn-icons-png.flaticon.com/512/1250/1250689.png' },
    { label: '의찬', to: '/user', icon: 'https://cdn-icons-png.flaticon.com/512/1077/1077012.png' },
    { label: '계좌목록', to: '/account', icon: 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png' },
    { label: '납부내역조회', to: '/account/check', icon: 'https://cdn-icons-png.flaticon.com/512/1041/1041912.png' },
    { label: '산정', to: '/account/calculation', icon: 'https://cdn-icons-png.flaticon.com/512/2767/2767063.png' },
    { label: '긍정효과', to: '/account/positive', icon: 'https://cdn-icons-png.flaticon.com/512/190/190411.png' },
    { label: '청구서', to: '/account/bill', icon: 'https://cdn-icons-png.flaticon.com/512/1157/1157056.png' },
    { label: '카드명세서', to: '/mypage/card/CardStatement', icon: 'https://cdn-icons-png.flaticon.com/512/633/633611.png' },
    { label: '혜택명세서', to: '/mypage/card/BenefitStatement', icon: 'https://cdn-icons-png.flaticon.com/512/1170/1170678.png' },
    { label: '전체 혜택 조회', to: '/mypage/card/AllBenefitSearch', icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828919.png' },
    { label: '카드 결제 테스트', to: '/mypage/card/PaymentTest', icon: 'https://cdn-icons-png.flaticon.com/512/148/148766.png' },
  ];

  return (
    <SidebarContainer>
      <CloseButton onClick={toggleSidebar}>x</CloseButton>
      <LogoContainer>
        <LogoIcon />
        <LogoText to="/" onClick={toggleSidebar}>Peoch</LogoText>
      </LogoContainer>
      {userName && <WelcomeMessage>{userName}님 환영합니다</WelcomeMessage>}
      <GridContainer>
        {menuItems.map((item, index) => (
          <GridItem key={index} to={item.to} onClick={toggleSidebar}>
            <Icon src={item.icon} alt={item.label} />
            <Label>{item.label}</Label>
          </GridItem>
        ))}
      </GridContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
