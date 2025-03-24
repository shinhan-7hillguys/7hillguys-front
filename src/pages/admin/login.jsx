// src/pages/login.js
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import axiosInstance from 'api';
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 전체 화면 높이 중앙 정렬 */
  background-color: #f5f5f5;
`;

const LoginBox = styled.div`
  width: 360px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 32px;
`;

const Title = styled.h2`
  margin: 0 0 24px;
  font-size: 24px;
  text-align: center;
  color: #333;
`;

const SubTitle = styled.p`
  margin: 0 0 24px;
  font-size: 14px;
  text-align: center;
  color: #666;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #333;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  &:focus {
    border-color: #e08490;
    outline: none;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  background-color: #e08490;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 16px;
  padding: 14px 0;
  cursor: pointer;
  margin-top: 16px;
  transition: background-color 0.2s;
  &:hover {
    background-color: #d76a80;
  }
`;

const BottomLinks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  font-size: 14px;
  color: #666;
`;

const LinkButton = styled.span`
  cursor: pointer;
  color: #e08490;
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
       const path = process.env.REACT_APP_API_URL; 
       const response = await axiosInstance.post(path+ '/api/login', { userId, password });
       login(response.data.user, response.data.token);
       localStorage.setItem('accessToken', response.data.token);
 
      if (userId === 'admin' && password === '1234') {
        const dummyUserData = { name: '관리자' };
        const dummyToken = 'FAKE_JWT_TOKEN';
        login(dummyUserData, dummyToken);
        localStorage.setItem('accessToken', dummyToken);
        navigate('/');
      } else {
        alert('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Title>로그인</Title>
        <SubTitle>아이디와 비밀번호를 입력해주세요</SubTitle>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>아이디</Label>
            <Input
              type="text"
              placeholder="아이디"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>비밀번호</Label>
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <LoginButton type="submit">로그인</LoginButton>
        </form>
        <BottomLinks>
          <LinkButton>아이디 찾기</LinkButton>
          <LinkButton>비밀번호 찾기</LinkButton>
        </BottomLinks>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
