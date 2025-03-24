import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import config from 'config';
import axiosInstance from 'api';

const PageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 24px;
  background-color: #f5f5f5;
  min-height: 100vh;
`; 
const ContentArea = styled.div`
  flex: 1;
  padding: 24px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const UserList = styled.ul`
  margin-top: 32px;
  list-style: none;
  padding: 0;
`;

const UserItem = styled.li`
  display: flex;
  align-items: center;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 16px;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;
 
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const UserLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
  &:hover {
    text-decoration: underline;
  }
`;

const UserDetailText = styled.p`
  margin: 4px 0;
  font-size: 14px;
  color: #666;
`;

const NoResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  text-align: center;
  color: #666;
`;

const NoResultsImage = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 16px;
`;

 

const FilterLabel = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 32px;
  color: #555;
  margin-bottom: 32px;
`;
 

const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return ""; 
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
};


const UserSearchPage = () => {
  const { query } = useParams();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(query || '');
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (location.state && location.state.searchResults) {
      setFilteredUsers(location.state.searchResults);
    }
  }, [location.state]);

  useEffect(() => {
    setSearchQuery(query || '');
  }, [query]);

  const handleFilterSearch = () => {
    const params = {};
    if (name.trim()) params.name = name;
    if (gender) params.gender = gender;
    if (birthYear) { 
      params.startDate = `${birthYear}-01-01`;
      params.endDate = `${birthYear}-12-31`;
    }

    axiosInstance.get(`${config.apiBaseUrl}/api/usersearch/search/advanced`, { params })
      .then(response => {
        setFilteredUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching filtered users:', error);
      });
  };

  return (
    <PageContainer>
 
      <ContentArea>
        <FilterLabel>검색 결과</FilterLabel>
        {filteredUsers.length === 0 ? (
          <NoResultsContainer>
            <NoResultsImage src="https://cdn-icons-png.flaticon.com/512/15/15457.png" alt="검색 결과 없음" />
            <p>검색 결과가 없습니다.</p>
          </NoResultsContainer>
        ) : (
          <UserList>
            {filteredUsers.map(user => (
              <UserItem key={user.userId}> 
                <UserInfo>
                  <UserLink to={`/admin/user/detail/${user.userId}`}>{user.name}</UserLink>
                  <UserDetailText>생년월일: {user.birthdate}</UserDetailText>
                  <UserDetailText>핸드폰: {formatPhoneNumber(user.phone)}</UserDetailText>
                  <UserDetailText>e-mail: {user.email}</UserDetailText>
                </UserInfo>
              </UserItem>
            ))}
          </UserList>
        )}
      </ContentArea>
    </PageContainer>
  );
};

export default UserSearchPage;
