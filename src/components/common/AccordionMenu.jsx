// AccordionMenu.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AccordionContainer = styled.div`
  width: 100%;
`;

const ItemContainer = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 8px 0;
`;

const ItemLabel = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #444;
  &:hover {
    color: #e08490;
  }
`;

const ExpandIcon = styled.span`
  margin-right: 8px;
  display: inline-block;
  transition: transform 0.3s ease;
  transform: rotate(${props => (props.expanded ? '90deg' : '0deg')});
`;

const ChildContainer = styled.div`
  margin-left: 16px;
  padding: 4px 0;
  overflow: hidden;
  max-height: ${props => (props.expanded ? '500px' : '0')};
  opacity: ${props => (props.expanded ? '1' : '0')};
  transition: max-height 0.5s ease, opacity 0.5s ease;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    color: #e08490;
  }
`;

function AccordionItem({ item, onMenuItemClick }) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = (e) => {
    if (hasChildren) {
      e.preventDefault();
      setExpanded(!expanded);
    } else {
      // leaf인 경우, 현재 메뉴 아이템을 onMenuItemClick에 전달
      if (onMenuItemClick) {
        onMenuItemClick(item);
      }
    }
  };

  return (
    <ItemContainer>
      {item.to ? (
        <StyledLink to={item.to} onClick={handleClick}>
          <ItemLabel>
            {hasChildren && <ExpandIcon expanded={expanded}>▶</ExpandIcon>}
            {item.label}
          </ItemLabel>
        </StyledLink>
      ) : (
        <ItemLabel onClick={handleClick}>
          {hasChildren && <ExpandIcon expanded={expanded}>▶</ExpandIcon>}
          {item.label}
        </ItemLabel>
      )}
      {hasChildren && (
        <ChildContainer expanded={expanded}>
          {item.children.map((child, idx) => (
            <AccordionItem item={child} key={idx} onMenuItemClick={onMenuItemClick} />
          ))}
        </ChildContainer>
      )}
    </ItemContainer>
  );
}

export default function AccordionMenu({ menuData, onMenuItemClick }) {
  return (
    <AccordionContainer>
      {menuData.map((item, index) => (
        <AccordionItem item={item} key={index} onMenuItemClick={onMenuItemClick} />
      ))}
    </AccordionContainer>
  );
}
