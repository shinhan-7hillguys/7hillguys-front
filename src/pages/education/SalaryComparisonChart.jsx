// SalaryComparisonChart.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
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

// Chart.js 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalaryComparisonChart = () => {
    const navigate = useNavigate();

    /* ===================== 연봉 비교 차트 데이터 ===================== */
    const mySalary = 3500;       // 내 연봉(단위: 천원)
    const devSalary = 4000;      // 개발자 평균 연봉
    const companySalary = 5500;  // 네이버 평균 연봉

    const data = {
        labels: ["내 연봉", "개발자 평균 연봉", "네이버 평균 연봉"],
        datasets: [
            {
                label: "연봉 (단위: 천원)",
                data: [mySalary, devSalary, companySalary],
                backgroundColor: ["#4A7856", "#8884d8", "#df6e99"],
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

    /* ===================== 자소서 테이블 더미 데이터 ===================== */
    // (원하는 자소서 데이터 형식에 맞게 수정)
    const resumeList = [
        {
            id: 1,
            applyDate: "2022 상반기",
            company: "카카오",
            position: "백엔드 개발자",
            type: "신입",
            content: "수도권 4년제 / 전자공학과 / 학점 3.5/4.5",
            detail: "[끊임없는 배움과 다양한 이해를 위해]" +
                "디프만 11기 프로젝트 백엔드를 완성한 후, 운영을 위해 새로운 인원들과 기존 프로젝트의 내용을 다시 파악했습니다.\n" +
                "이 때에 기존 제가 공부했던 방식과는 많이 다른 방식을 배우게 되었습니다.\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "- 연관관계의 제거\n" +
                "\n" +
                "기존의 프로젝트는 여러 데이터들이 연결될 때에 FK로 연결하였고 이들을 DB에 매번 연결하여 가져왔습니다.\n" +
                "그리고 변경된 내용에서는 FK를 제거하게 되었습니다.\n" +
                "\n",
        },
        {
            id: 2,
            applyDate: "2022 상반기",
            company: "카카오스타일",
            position: "백엔드 개발자",
            type: "신입",
            content: "한국공학대학교 / 전자공학과 / 학점 3.5/4.5",
            detail: "사용자 경험 개선을 위해 백엔드 시스템 최적화에 주력한 경험이 있습니다.",
        },
        {
            id: 3,
            applyDate: "2020 상반기",
            company: "카카오엔터프라이즈",
            position: "안드로이드 앱 개발",
            type: "인턴",
            content: "숭실대학교 / 학점 4.31 / 토익 930, 오픽 IM3, 토스LV6",
            detail: "모바일 애플리케이션 개발에 참여하여 UI/UX 개선 및 기능 추가에 기여했습니다.",
        },
    ];

    // 자소서 항목 클릭 시, 상세보기 페이지로 이동 (경로: /education/resume-detail/:id)
    const handleResumeClick = (resume) => {
        navigate(`/education/resume-detail/${resume.id}`, { state: resume });
    };

    return (
        <div style={pageContainerStyle}>
            {/* (A) 연봉 비교 차트 영역 */}
            <div style={chartContainerStyle}>
                <h3 style={chartTitleStyle}>연봉 비교</h3>
                <p style={chartSubTextStyle}>
                    내 연봉, 개발자 평균 연봉, 네이버 평균 연봉 비교
                </p>
                <Bar data={data} options={options} />
            </div>

            {/* (B) 자소서 리스트 테이블 */}
            <div style={resumeTableContainerStyle}>
                <h3 style={resumeTableTitleStyle}>
                    검색결과 {resumeList.length}건
                </h3>
                <div style={resumeTableStyle}>
                    {/* 테이블 헤더 */}
                    <div style={tableHeaderStyle}>
                        <span style={tableHeaderCellStyle}>지원시기</span>
                        <span style={tableHeaderCellStyle}>기업 / 직무</span>
                        <span style={tableHeaderCellStyle}>유형</span>
                        <span style={tableHeaderCellStyle}>합격스펙</span>
                    </div>
                    {/* 테이블 바디 */}
                    {resumeList.map((resume) => (
                        <div
                            key={resume.id}
                            style={tableRowStyle}
                            onClick={() => handleResumeClick(resume)}
                        >
                            <span style={tableRowCellStyle}>{resume.applyDate}</span>
                            <span style={tableRowCellStyle}>
                {resume.company} / {resume.position}
              </span>
                            <span style={tableRowCellStyle}>{resume.type}</span>
                            <span style={tableRowCellStyle}>{resume.content}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SalaryComparisonChart;

/* ==================== 스타일 정의 ==================== */
const pageContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    background:
        "linear-gradient(191deg, rgb(255 247 252 / 70%) 0%, rgba(235,217,238,0.3) 100%)",
    boxSizing: "border-box",
    fontFamily: "Pretendard, sans-serif",
};

const chartContainerStyle = {
    width: "100%",
    maxWidth: "700px",
    margin: "0 auto 30px",
    padding: "20px",
    background:
        "linear-gradient(191deg, rgb(255 247 252 / 70%) 0%, rgba(235,217,238,0.3) 100%)",
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
    marginBottom: "20px",
    fontWeight: "bold",
};

const resumeTableContainerStyle = {
    width: "100%",
    marginTop: "10px",
};

const resumeTableTitleStyle = {
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "12px",
};

const resumeTableStyle = {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
};

const tableHeaderStyle = {
    display: "flex",
    padding: "8px",
    backgroundColor: "#f8f8f8",
    borderBottom: "1px solid #ddd",
    fontWeight: "bold",
    fontSize: "0.8rem",
};

const tableHeaderCellStyle = {
    flex: "1",
    marginRight: "10px",
};

const tableRowStyle = {
    display: "flex",
    padding: "8px",
    borderBottom: "1px solid #ddd",
    fontSize: "0.9rem",
    cursor: "pointer",
};

const tableRowCellStyle = {
    flex: "1",
    marginRight: "10px",
};