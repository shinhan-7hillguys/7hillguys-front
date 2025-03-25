import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import AccordionMenu from './AccordionMenu';  
import { menuData } from './menuData';         
import { HiX } from "react-icons/hi";
import axiosInstance from 'api';

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 9999; 
  overflow-y: auto;
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 16px;
  left: 16px;
  background: transparent; 
  font-size: 16px;
  cursor: pointer;
  color: #444;
  font-weight: bold;
  margin : auto;  
  padding: 4px 8px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-decoration: none; 
  &:hover {
    background: #e08490;
    color: #fff;
  }
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

const RecentMenuHeader = styled.div`
  padding: 8px 16px;
  font-weight: bold;
  color: #444;
`;

const RecentMenuContainer = styled.div`
  padding: 8px 16px;
  background: #f5f5f5;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const RecentMenuItem = styled(Link)`
  padding: 4px 8px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-decoration: none;
  color: #444;
  font-size: 14px;
  &:hover {
    background: #e08490;
    color: #fff;
  }
`;

const TwoColumnContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 150px);
  border-top: 1px solid #ddd;
`;

const LeftColumn = styled.div`
  width: 30%;
  border-right: 1px solid #ddd;
  padding: 16px;
  padding-top: 32px;
`;

const RightColumn = styled.div`
  width: 70%;
  padding: 16px;
  overflow-y: auto;
  padding-top: 32px;
  animation: fadeIn 0.5s ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const FirstLevelItem = styled.div`
  padding: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  font-weight: 600;
  color: ${({ selected }) => (selected ? '#e08490' : '#444')};
  border-bottom: 1px solid #ddd;
  transition: color 0.3s ease;
  &:hover {
    color: #e08490;
  }
  white-space: nowrap;
`;

const Sidebar = ({ toggleSidebar }) => {
  const [userName, setUserName] = useState('');
  const [selectedFirst, setSelectedFirst] = useState(
    menuData.find(menu => menu.label === 'Peoch')
  );
  const [recentMenus, setRecentMenus] = useState([]);
  const navigate = useNavigate();

  const prevUserNameRef = useRef('');

  useEffect(() => {
    const storedRecent = localStorage.getItem('recentMenus');
    if (storedRecent) {
      setRecentMenus(JSON.parse(storedRecent));
    }
  }, []);

  useEffect(() => {
    axiosInstance
      .get('/api/auth/userId', { withCredentials: true })
      .then((response) => {
        setUserName(response.data.name);
      })
      .catch((error) => {
        console.error('사용자 정보를 가져오는데 실패:', error);
      });
  }, []);
 
  useEffect(() => {
    if (prevUserNameRef.current && prevUserNameRef.current !== userName) {
      setRecentMenus([]);
      localStorage.removeItem('recentMenus');
    }
    prevUserNameRef.current = userName;
  }, [userName]);
 
  const handleFirstLevelClick = (menu) => {
    setSelectedFirst(menu);
  };

  const updateRecentMenus = (menu) => {
    let updatedRecent = [menu, ...recentMenus.filter(m => m.label !== menu.label)];
    if (updatedRecent.length > 3) {
      updatedRecent = updatedRecent.slice(0, 3);
    }
    setRecentMenus(updatedRecent);
    localStorage.setItem('recentMenus', JSON.stringify(updatedRecent));
  };

  const handleRightMenuClick = (menu) => {
    updateRecentMenus(menu);
    toggleSidebar();
  };

  const handleLogout = () => {
    axiosInstance
      .post('/api/auth/logout', {}, { withCredentials: true })
      .then((response) => { 
        navigate('/');
      })
      .catch((error) => {
        console.error('로그아웃 실패:', error);
      });
  };

  return (
    <SidebarContainer>
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      <HiX style = {{fontSize : "35px", marginLeft:"auto", marginRight:"10px", marginTop:"15px"}} onClick={toggleSidebar}></HiX>
      <LogoContainer>
        <LogoIcon />
        <LogoText to="/" onClick={toggleSidebar}>
          Peoch
        </LogoText>
      </LogoContainer>
      {userName && <WelcomeMessage>{userName}님 환영합니다</WelcomeMessage>}
      
      {recentMenus.length > 0 && (
        <>
          <RecentMenuHeader>최근 방문 메뉴</RecentMenuHeader>
          <RecentMenuContainer>
            {recentMenus.map((menu, idx) => (
              <RecentMenuItem key={idx} to={menu.to} onClick={toggleSidebar}>
                {menu.label}
              </RecentMenuItem>
            ))}
          </RecentMenuContainer>
        </>
      )}

      <TwoColumnContainer>
        <LeftColumn>
          {menuData.map((menu, index) => (
            <FirstLevelItem
              key={index}
              onClick={() => handleFirstLevelClick(menu)}
              selected={menu === selectedFirst}
            >
              {menu.label}
            </FirstLevelItem>
          ))}
        </LeftColumn>
        <RightColumn key={selectedFirst ? selectedFirst.label : 'default'}>
          {selectedFirst && selectedFirst.children ? (
            <AccordionMenu menuData={selectedFirst.children} onMenuItemClick={handleRightMenuClick} />
          ) : (
            <div>하위 메뉴가 없습니다.</div>
          )}
        </RightColumn>
      </TwoColumnContainer>
    </SidebarContainer>
  );
};

export default Sidebar;