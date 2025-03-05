import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../image/peach.jpg';

const SidebarContainer = styled.div`
  width: 240px; 
  background-color: #f9f4f5; 
  border-right: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  padding: 24px;
  font-family: 'Noto Sans KR', sans-serif;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
  margin-bottom: 30px;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: url(${logo}) no-repeat center/cover; 
  margin-bottom : 20px;
`;

const LogoText = styled(Link)`
  font-size: 40px;
  font-weight: 700;
  color: #e08490;
  text-decoration: none; 
  margin-left : 10px;
`;

const SectionTitle = styled.div`
  margin-top: 16px;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #888;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  color: ${({ isSelected }) => (isSelected ? '#E5A0A0' : '#444')};
  background-color: ${({ isSelected }) => (isSelected ? '#2C0202' : 'transparent')};
  transition: color 0.2s, background-color 0.5s;
  cursor: pointer;
  font-size: 24px;
  &:hover {
    color: #e08490;
  }
  font-family: 'Pretendard', sans-serif;
`;

const MenuIcon = styled.span`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
   
`;

const MenuLabel = styled.span`
  flex: 1;
`;

const SubMenuContainer = styled.div`
  margin-left: 32px;
  margin-top: 4px;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`;

const SubMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 8px 0 10px 24px;
  color: ${({ isSelected }) => (isSelected ? '#E5A0A0' : '#444')};
  background-color: ${({ isSelected }) => (isSelected ? '#2C0202' : 'transparent')};
  transition: color 0.2s, background-color 0.5s;
  cursor: pointer;

  font-size: 15px;
  &:hover {
    color: #e08490;
  }
`;

const Chevron = styled.span`
  margin-left: auto;
  font-size: 14px;
  transition: transform 0.2s;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};

  &::before {
    content: '▼';
    display: inline-block;
  }
`;

const Sidebar = () => { 
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const toggleDashboard = () => {
    setDashboardOpen(prev => !prev);
  };

  return (
    <SidebarContainer> 
      <LogoContainer>
        <LogoIcon />
        <LogoText to="/">Peoch</LogoText>
      </LogoContainer>
 
      <SectionTitle>Menu</SectionTitle>
            <MenuItem onClick={toggleDashboard}>
        <MenuIcon src="https://png.pngtree.com/png-vector/20230302/ourmid/pngtree-dashboard-line-icon-vector-png-image_6626604.png" />
        <MenuLabel>대시보드</MenuLabel> 
        <Chevron $isOpen={dashboardOpen} />
      </MenuItem>
      <SubMenuContainer $isOpen={dashboardOpen}>
        <SubMenuItem to="/">종합</SubMenuItem>
        <SubMenuItem to="/dashboard/support">지원율</SubMenuItem>
        <SubMenuItem to="/dashboard/payment">납부율</SubMenuItem>
        <SubMenuItem to="/dashboard/group">그룹 통계</SubMenuItem>
      </SubMenuContainer>

    
    </SidebarContainer>
  );
};

export default Sidebar;