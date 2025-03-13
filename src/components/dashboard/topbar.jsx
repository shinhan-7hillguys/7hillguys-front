import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
 
const TopbarContainer = styled.div`
  width: 100%;
  height: 64px;
  background-color: #ffffff;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
`;

const SearchContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin-right: 24px;
`;

const SearchInput = styled.input`
  width: 33%;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid black;
  border-radius: 4px;
  outline: none;
  &:focus {
    border-color: #e08490;
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 8px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  &:hover {
    color: #e08490;
  }
`;

const SearchIcon = styled.img`
  width: 35px;
  height: 35x;
  border: 1px solid black;
  padding: 7.5px;
  border-radius: 8px;
  background-color: #ffffff;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const UserName = styled.span`
  margin-right: 8px;
  transition: color 0.2s;
    &:hover {
    color: #e08490;
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e08490;
`;

const LogoutButton = styled.button`
  margin-left: 16px;
  padding: 6px 12px;
  background-color: #e08490;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Topbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
 
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchValue.trim()) {
      navigate(`/admin/search/${searchValue}`);
    }
  };

  // 엔터 키 감지
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <TopbarContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="사용자 검색..."
          value={searchValue}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}  
        />
        <SearchButton onClick={handleSearchClick}>
          <SearchIcon
            src="https://cdn-icons-png.flaticon.com/128/54/54481.png"
            alt="Search"
          />
        </SearchButton>
      </SearchContainer>
    {/*   <UserProfile>
        {user ? (
          <>
            <UserName>{user.name}</UserName>
            <UserAvatar />
            <LogoutButton onClick={logout}>로그아웃</LogoutButton>
          </>
        ) : (
          <UserName onClick={() => navigate('/login')}>로그인</UserName>
        )}
      </UserProfile> */}
    </TopbarContainer>
  );
};

export default Topbar;