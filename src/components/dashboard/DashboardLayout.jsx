import React from 'react';
import styled from 'styled-components';
import Sidebar from './sidebar';
import Topbar from './topbar';
import { Outlet } from 'react-router-dom';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh; 
  background-color: #fbeaec;
`;

const SidebarWrapper = styled.div`
  width: 240px; 
  flex-shrink: 0; 
`;

const MainWrapper = styled.div`
  flex: 1; 
  display: flex;
  flex-direction: column; 
`;

const TopbarWrapper = styled.div`
  height: 64px;  
  flex-shrink: 0;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow: auto; 
  
`;

export default function Layout({ children }) {
  return (
    <LayoutContainer> 
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
 
      <MainWrapper> 
        <TopbarWrapper>
          <Topbar />
        </TopbarWrapper>
 
        <ContentWrapper>
        <Outlet />
        </ContentWrapper>
      </MainWrapper>
    </LayoutContainer>
  );
}