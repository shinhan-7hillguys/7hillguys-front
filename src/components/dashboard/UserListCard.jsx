import React from 'react';
import styled from 'styled-components';
 
const CardContainer = styled.div`
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
 
`;
 
const CardTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;
 
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    border-bottom: 1px solid #f0f0f0;
  }

  th, td {
    text-align: left;
    padding: 8px 0;
    font-size: 14px;
    color: #666;
  }

  td:last-child {
    text-align: right;
    font-weight: bold;
    color: #333;
  }

  tr:not(:last-child) {
    border-bottom: 1px solid #f9f9f9;
  }
`;

const userListCard = () => {
 
  const data = [
    { job: '학생', users: '4.7K' },
    { job: '사업자', users: '3.4K' },
    { job: '무직', users: '2.9K' },
    { job: '사무직', users: '1.5K' },
  ];

  return (
    <CardContainer>
      <CardTitle>직군 별 이용자 수</CardTitle>
      <Table>
        <thead>
          <tr>
            <th style = {{fontSize : 20 , fontWeight : 'bold'}}>직군</th> 
            <th style = {{textAlign: 'right', fontSize :20 , fontWeight : 'bold'}}>이용자 수</th>

          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td>{item.job}</td>
              <td>{item.users}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </CardContainer>
  );
};

export default userListCard;
