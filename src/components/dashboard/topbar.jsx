import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from 'config';

const TopbarContainer = styled.div`
  width: 100%;
  height: 64px;
  background-color: #ffffff;
  border-bottom: 1px solid lightgray;
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
`;

const SearchIcon = styled.img`
  width: 35px;
  height: 35px;
  border: 1px solid black;
  padding: 7.5px;
  border-radius: 8px;
  background-color: #ffffff;
`;

const getUserIdFromToken = () => {
  const token = localStorage.getItem("token"); // JWT 가져오기
  if (!token) return null;

  try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Base64 디코딩
      return { userId: payload.userId, token }; // userId와 token 반환
  } catch (error) {
      console.error("🚨 JWT 파싱 오류:", error);
      return null;
  }
};

const Topbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = async () => {
    
    const userData = getUserIdFromToken(); 
    const token = userData?.token; 
      console.log("aa", {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    })
      if (searchValue.trim()) {
        try {
          const response = await axios.get(`${config.apiBaseUrl}/api/user/search`, {
            params: { query: searchValue},
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          }); 
          const searchResults = response.data;
          navigate(`/admin/search/${searchValue}`, { state: { searchResults } });
        } catch (error) {
          console.error('Error fetching  search results:', error);
        }
      }
    };

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
          <SearchIcon src="https://cdn-icons-png.flaticon.com/128/54/54481.png" alt="Search" />
        </SearchButton>
      </SearchContainer>
    </TopbarContainer>
  );
};

export default Topbar;