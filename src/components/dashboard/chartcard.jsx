import React from 'react';
import styled from 'styled-components';
 

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const CardContainer = styled.div`
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 16px;
  flex: 1; 
  margin: 8px;
  font-family: 'Pretendard', sans-serif;
`;

const CardTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  font-family: 'Pretendard', sans-serif;
`;

const ChartCard = ({ data, name }) => {
  return (
    <CardContainer>
      <CardTitle>{name}</CardTitle>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => value.toLocaleString()} />
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Bar dataKey="usage" fill="#e08490" maxBarSize={40} radius={[0,0,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
    </CardContainer>
  );
};

export default ChartCard;