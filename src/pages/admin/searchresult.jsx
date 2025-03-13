import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { dummyUsers } from 'dummyData';

const PageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 24px; 
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 300px;
  padding: 24px;
  background-color: #fff;
  border: 1px solid #eaeaea; 
  margin-right: 12px; 
`;

const FilterRadioGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;
 
const CustomRadioLabel = styled.label`
  display: inline-flex;
  align-items: center;
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  font-weight: bold;
  color: black;
  user-select: none;
`;

const CustomRadioInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked + span {
    background-color: #ff7a9d;
    border-color: #ff7a9d;
  }

  &:checked + span:after {
    display: block;
  }
`;

const CustomRadioSpan = styled.span`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 20px;
  width: 20px;
  background-color: #fff;
  border: 2px solid #ff7a9d;
  border-radius: 50%;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #fff;
  }
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

const UserPhoto = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 16px;
  border: 2px solid #ddd;
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

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterLabel = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 32px;
  color: #555;
  margin-bottom: 32px;
`;

const UserSearchPage = () => {
  const { query } = useParams();
  const [searchQuery, setSearchQuery] = useState(query || '');
  const [gender, setGender] = useState('');
  const [occupation, setOccupation] = useState('');
  const [salary, setSalary] = useState(0);

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
          <FilterRadioGroup>
            <CustomRadioLabel>
              <CustomRadioInput
                type="radio"
                name="gender"
                value=""
                checked={gender === ''}
                onChange={(e) => setGender(e.target.value)}
              />
              <CustomRadioSpan />
              모두
            </CustomRadioLabel>
            <CustomRadioLabel>
              <CustomRadioInput
                type="radio"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={(e) => setGender(e.target.value)}
              />
              <CustomRadioSpan />
              남성
            </CustomRadioLabel>
            <CustomRadioLabel>
              <CustomRadioInput
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={(e) => setGender(e.target.value)}
              />
              <CustomRadioSpan />
              여성
            </CustomRadioLabel>
          </FilterRadioGroup>
        </FilterContainer>
      </Sidebar>
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
              <UserItem key={user.id}>
                <UserPhoto src={user.photo} alt={user.name} />
                <UserInfo>
                  <UserLink to={`/admin/user/detail/${user.id}`}>{user.name}</UserLink>
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
