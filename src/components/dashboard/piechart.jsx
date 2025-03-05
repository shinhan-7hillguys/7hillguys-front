 import React from 'react';
import styled from 'styled-components';
 
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const CardContainer = styled.div`
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
`;

const CardTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;  
   font-family: 'Pretendard', sans-serif;
`;

const colors = ['#e08490', '#ffbb28', '#00C49F', '#0088FE'];

const PieChartCard = ({ data }) => {
  return (
    <CardContainer>
      <CardTitle>사용 비율</CardTitle>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </CardContainer>
  );
};

export default PieChartCard;
