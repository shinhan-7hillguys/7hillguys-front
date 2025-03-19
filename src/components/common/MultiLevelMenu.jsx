import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 사이드바 레이아웃 (3컬럼)
const MultiLevelMenuContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

// 각각의 컬럼 스타일
const Column = styled.div`
  flex: 1;
  border-right: 1px solid #ddd;
  padding: 16px;
  &:last-child {
    border-right: none;
  }
`;

// 메뉴 항목 스타일
const MenuItem = styled.div`
  margin-bottom: 8px;
  cursor: pointer;
  color: #444;
  font-weight: 600;
  &:hover {
    color: #e08490;
  }
`;

// 실제 링크 스타일
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    color: #e08490;
  }
`;

function MultiLevelMenu({ menuData }) {
  const [selectedFirstLevel, setSelectedFirstLevel] = useState(null);
  const [selectedSecondLevel, setSelectedSecondLevel] = useState(null);

  // 1단계 메뉴 클릭 시
  const handleFirstLevelClick = (menu) => {
    setSelectedFirstLevel(menu);
    setSelectedSecondLevel(null); // 2단계 선택 해제
  };

  // 2단계 메뉴 클릭 시
  const handleSecondLevelClick = (submenu) => {
    setSelectedSecondLevel(submenu);
  };

  return (
    <MultiLevelMenuContainer>
      {/* 1단계 메뉴 (왼쪽 컬럼) */}
      <Column>
        {menuData.map((menu, idx) => (
          <MenuItem
            key={idx}
            onClick={() => handleFirstLevelClick(menu)}
            style={{
              color: menu === selectedFirstLevel ? '#e08490' : '#444',
            }}
          >
            {menu.label}
          </MenuItem>
        ))}
      </Column>

      {/* 2단계 메뉴 (가운데 컬럼) */}
      <Column>
        {selectedFirstLevel && selectedFirstLevel.children && (
          selectedFirstLevel.children.map((submenu, idx) => {
            // 하위 메뉴(3단계) 존재 여부
            const hasChildren = submenu.children && submenu.children.length > 0;

            return (
              <MenuItem
                key={idx}
                onClick={() => hasChildren ? handleSecondLevelClick(submenu) : null}
                style={{
                  color: submenu === selectedSecondLevel ? '#e08490' : '#444',
                }}
              >
                {/* 2단계 메뉴가 링크(to)가 있는 경우 */}
                {submenu.to ? (
                  <StyledLink to={submenu.to}>{submenu.label}</StyledLink>
                ) : (
                  // 하위 단계만 있는 경우(클릭 시 3단계 표시)
                  <span>{submenu.label}</span>
                )}
              </MenuItem>
            );
          })
        )}
      </Column>

      {/* 3단계 메뉴 (오른쪽 컬럼) */}
      <Column>
        {selectedSecondLevel && selectedSecondLevel.children && (
          selectedSecondLevel.children.map((thirdLevelItem, idx) => (
            <MenuItem key={idx}>
              {thirdLevelItem.to ? (
                <StyledLink to={thirdLevelItem.to}>
                  {thirdLevelItem.label}
                </StyledLink>
              ) : (
                <span>{thirdLevelItem.label}</span>
              )}
            </MenuItem>
          ))
        )}
      </Column>
    </MultiLevelMenuContainer>
  );
}

export default MultiLevelMenu;
