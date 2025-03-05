import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { dummyUsers } from '../dummyData';

 
const PageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 24px; 
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  padding: 24px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  margin-right: 24px; 
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 24px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterLabel = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
`;

const FilterSelect = styled.select`
  margin-bottom: 16px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const FilterInput = styled.input`
  margin-bottom: 16px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

 

const UserList = styled.ul`
  list-style: none;
  padding: 0;
`;

const UserItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  margin-bottom: 12px;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #f8f8f8;
  }
`;

const UserPhoto = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 16px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 18px;
  font-weight: bold;
`;

const UserDetailText = styled.p`
  margin: 4px 0;
  font-size: 14px;
  color: #666;
`;

const UserSearchPage = () => {
  const { query } = useParams();
  const [searchQuery, setSearchQuery] = useState(query || '');
  const [gender, setGender] = useState('');
  const [occupation, setOccupation] = useState('');
  const [salary, setSalary] = useState(0);

  // dummyUsers를 사용하여 검색
  const filteredUsers = dummyUsers.filter(user => {
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (gender ? user.gender === gender : true) &&
      (occupation ? user.occupation === occupation : true) &&
      user.salary >= salary
    );
  });

  useEffect(() => {
    setSearchQuery(query || '');
  }, [query]);

  return (
    <PageContainer>
      <Sidebar>
        <FilterContainer>
          <FilterLabel>성별</FilterLabel>
          <FilterSelect value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">모두</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </FilterSelect>

          <FilterLabel>직업</FilterLabel>
          <FilterSelect value={occupation} onChange={(e) => setOccupation(e.target.value)}>
            <option value="">모두</option>
            <option value="developer">개발자</option>
            <option value="designer">디자이너</option>
            <option value="manager">매니저</option>
          </FilterSelect>

          <FilterLabel>연봉</FilterLabel>
          <FilterInput
            type="range" 
 
            min="0"
            max="10000"
            step="1000"
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
          />
          <div>연봉: {salary}만원 이상</div>
        </FilterContainer>
      </Sidebar>
      <ContentArea>
        <h2>검색 결과</h2>
        {filteredUsers.length === 0 ? (
          <p>검색 조건에 맞는 사용자가 없습니다.</p>
        ) : (
          <UserList>
            {filteredUsers.map(user => (
              <UserItem key={user.id}>
                <UserPhoto src={user.photo} alt={user.name} />
                <UserInfo>
                  <UserLink to={`/user/${user.id}`}>{user.name}</UserLink>
                  <UserDetailText>생년월일: {user.birth_date}</UserDetailText>
                  <UserDetailText>직업: {user.occupation}</UserDetailText>
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
