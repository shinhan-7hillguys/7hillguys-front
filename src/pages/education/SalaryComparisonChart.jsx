import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalaryComparisonChart = () => {
    // 예시 데이터 (단위: 천원)
    const mySalary = 3500;      // 내 연봉
    const devSalary = 4000;     // 개발자 평균 연봉
    const companySalary = 5500; // 이 회사 연봉

    const data = {
        labels: ["내 연봉", "개발자 평균 연봉", "네이버 평균 연봉"],
        datasets: [
            {
                label: "연봉 (단위: 천원)",
                data: [mySalary, devSalary, companySalary],
                backgroundColor: [
                    "#4A7856", // 내 연봉
                    "#8884d8", // 개발자 연봉
                    "#df6e99", // 이 회사 연봉
                ],
                borderWidth: 2,
                borderRadius: 18,
            },
        ],
    };

    const options = {
        indexAxis: "y",
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => `₩${context.raw.toLocaleString()}`,
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `₩${value.toLocaleString()}`,
                },
            },
        },
    };

    return (
        <div style={chartContainerStyle}>
            <h3 style={chartTitleStyle}>연봉 비교</h3>
            <p style={chartSubTextStyle}>내 연봉, 개발자 평균 연봉, 이 회사 연봉 비교</p>
            <Bar data={data} options={options} />
        </div>
    );
};

const chartContainerStyle = {
    width: "100%",
    maxWidth: "700px",
    margin: "0 auto",
    padding: "20px",
    background: "linear-gradient(191deg, rgb(255 247 252 / 70%) 0%, rgba(235, 217, 238, 0.3) 100%)",
    borderRadius: "40px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
};

const chartTitleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
};

const chartSubTextStyle = {
    fontSize: "12px",
    color: "#555",
    marginBottom: "20px",
};

export default SalaryComparisonChart;