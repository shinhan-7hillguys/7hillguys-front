// LineChartCard.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, annotationPlugin);

const CardContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const TitleText = styled.h3`
  margin-bottom: 16px;
  font-size: 18px;
  color: #333;
`;

const LineChartCard = ({ data, name, currentAge }) => {
  // data: [{ name: "20", usage: 0 }, { name: "21", usage: 0 }, ... ]
  const labels = data.map(item => item.name);
  const dataset = data.map(item => item.usage);

  const chartData = {
    labels,
    datasets: [
      {
        label: name,
        data: dataset,
        fill: false,
        borderColor: '#e08490',
        backgroundColor: '#e08490',
        tension: 0.1,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false },
      annotation: {
        annotations: {
          verticalLine: {
            type: 'line',
            // x축 라벨과 동일한 타입(string)으로 비교하기 위해 currentAge를 toString()으로 변환합니다.
            scaleID: 'x',
            value: currentAge ? currentAge.toString() : '',
            borderColor: 'red',
            borderWidth: 2,
            borderDash: [4, 4],
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: '나이' },
      },
      y: {
        title: { display: true, text: '예상 수익' },
      },
    },
  };

  return (
    <CardContainer>
      <TitleText>{name}</TitleText>
      <Line data={chartData} options={options} />
    </CardContainer>
  );
};

export default LineChartCard;
