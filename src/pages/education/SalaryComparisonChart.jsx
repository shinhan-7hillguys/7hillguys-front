import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

// Chart.js 모듈 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalaryComparisonChart = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Education 페이지에서 선택한 회사 정보 (router state)
    const selectedCompany = location.state?.company;
    // 선택된 회사가 있으면 해당 회사의 정보 사용, 없으면 기본값 네이버 사용
    const companyName = selectedCompany ? selectedCompany.name : "네이버";
    const companySalary = selectedCompany ? selectedCompany.salary : 5500;

    // 고정 값: 내 연봉, 개발자 평균 연봉
    const mySalary = 3500;
    const devSalary = 4000;

    // 차트 데이터: 라벨에 선택된 회사 이름 포함
    const data = {
        labels: ["내 연봉", "개발자 평균 연봉", `${companyName} 평균 연봉`],
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

    // 더미 자소서 데이터 (각 회사별로 2개씩)
    const resumeList = [
        // 쿠팡 자소서
        {
            id: 1,
            applyDate: "2022 상반기",
            company: "쿠팡",
            position: "프론트엔드 개발자",
            type: "신입",
            content: "서울 소재 4년제 / 컴퓨터공학과 / 학점 3.7/4.5",
            detail:
                "쿠팡 합격 자소서:\n저는 쿠팡의 혁신적인 물류 시스템과 빠른 실행력에 큰 매력을 느껴 지원하였습니다. 대학 시절 다양한 프론트엔드 프로젝트를 진행하며 React와 Redux를 활용한 경험을 쌓았고, 사용자의 경험을 최우선으로 고려한 UI 개선에 주력하였습니다. 또한, 문제 해결과 팀워크 능력을 통해 어려운 문제도 효과적으로 해결할 수 있었습니다. 포트폴리오를 통해 구체적인 프로젝트 경험을 확인해 주십시오.",
        },
        {
            id: 2,
            applyDate: "2023 하반기",
            company: "쿠팡",
            position: "프론트엔드 개발자",
            type: "경력",
            content: "서울 소재 / IT학과 / 5년 경력 / 포트폴리오 우수",
            detail:
                "쿠팡 합격 자소서:\n5년간의 프론트엔드 개발 경험을 바탕으로 대규모 서비스에서도 안정적이며, 사용자 중심의 UI를 구현해왔습니다. 특히, 다양한 팀 프로젝트에서 리더십을 발휘하며 코드 최적화와 성능 개선을 이끌었습니다. 쿠팡의 혁신적인 환경에 기여하고자 합니다.",
        },
        // 네이버 자소서
        {
            id: 3,
            applyDate: "2022 상반기",
            company: "네이버",
            position: "AI 연구원",
            type: "신입",
            content: "부산 소재 4년제 / 전산학과 / 학점 4.0/4.5",
            detail:
                "네이버 합격 자소서:\nAI 기술에 대한 깊은 열정과 연구 경험을 바탕으로, 네이버의 혁신적인 서비스 개발에 참여하고자 지원하였습니다. 대학에서 진행한 머신러닝 및 딥러닝 프로젝트 경험이 있으며, 데이터 분석 및 모델링에 자신이 있습니다. 네이버의 AI 기술 발전에 기여할 수 있다고 확신합니다.",
        },
        {
            id: 4,
            applyDate: "2023 상반기",
            company: "네이버",
            position: "데이터 사이언티스트",
            type: "경력",
            content: "부산 소재 / 통계학과 / 3년 경력",
            detail:
                "네이버 합격 자소서:\n3년간의 데이터 분석 경험과 통계 모델링 능력을 바탕으로, 네이버의 데이터 기반 의사결정에 기여하고자 합니다. 복잡한 데이터를 효과적으로 처리하며 비즈니스 인사이트를 도출한 경험을 살려, 네이버의 지속적인 성장에 이바지할 수 있다고 생각합니다.",
        },
        // 카카오 자소서
        {
            id: 5,
            applyDate: "2020 상반기",
            company: "카카오",
            position: "백엔드 엔지니어",
            type: "인턴",
            content: "대구 소재 3년제 / 소프트웨어학과 / 학점 3.5/4.5",
            detail:
                "카카오 인턴 자소서:\n인턴 기간 동안 분산 시스템과 클라우드 인프라에 대해 배우며, 실제 서비스 운영의 안정성을 높이기 위한 프로젝트에 참여하였습니다. 새로운 기술을 적극적으로 습득하고, 문제 해결에 도전했던 경험이 있습니다.",
        },
        {
            id: 6,
            applyDate: "2021 상반기",
            company: "카카오",
            position: "백엔드 엔지니어",
            type: "신입",
            content: "대구 소재 4년제 / 전산학과 / 학점 3.8/4.5",
            detail:
                "카카오 합격 자소서:\n백엔드 개발자로서 높은 트래픽 환경에서도 안정적인 시스템을 구축하기 위해 노력하였습니다. RESTful API 설계 및 마이크로서비스 아키텍처 경험을 토대로, 서비스의 확장성과 유지보수성을 개선하였습니다. 팀원들과의 협업을 통해 문제를 해결한 경험이 돋보입니다.",
        },
        // 토스 자소서
        {
            id: 7,
            applyDate: "2021 하반기",
            company: "토스",
            position: "안드로이드 개발자",
            type: "신입",
            content: "광주 소재 4년제 / 모바일컴퓨터공학과 / 학점 3.8/4.5",
            detail:
                "토스 합격 자소서:\n모바일 애플리케이션 개발에 열정을 가지고 사용자 친화적인 금융 서비스를 구현하기 위해 지원하였습니다. UI/UX 최적화 및 앱 성능 개선 프로젝트를 통해 실제 사용자 피드백을 반영한 경험이 있으며, 이를 토대로 토스의 서비스 경쟁력을 높이고자 합니다.",
        },
        {
            id: 8,
            applyDate: "2022 하반기",
            company: "토스",
            position: "안드로이드 개발자",
            type: "경력",
            content: "광주 소재 / IT학과 / 2년 경력",
            detail:
                "토스 합격 자소서:\n2년간의 안드로이드 앱 개발 경험을 바탕으로, 토스의 금융 서비스에 적합한 모바일 솔루션을 제공하였습니다. 사용자의 경험을 최우선으로 고려하여 앱의 성능과 디자인 개선에 주력한 결과, 서비스 경쟁력이 크게 향상되었습니다.",
        },
        // 배달의민족 자소서
        {
            id: 9,
            applyDate: "2020 하반기",
            company: "배달의민족",
            position: "UI/UX 디자이너",
            type: "신입",
            content: "서울 소재 4년제 / 디자인학과 / 포트폴리오 우수",
            detail:
                "배달의민족 합격 자소서:\n창의적 디자인과 사용자 경험을 중시하는 배달의민족의 철학에 공감하여 지원하였습니다. 다양한 디자인 프로젝트를 통해 팀워크와 문제 해결 능력을 쌓았으며, 고객의 요구에 맞는 혁신적인 디자인을 제시할 자신이 있습니다.",
        },
        {
            id: 10,
            applyDate: "2021 상반기",
            company: "배달의민족",
            position: "UI/UX 디자이너",
            type: "경력",
            content: "서울 소재 / 디자인 전공 / 3년 경력",
            detail:
                "배달의민족 합격 자소서:\n3년간의 경력을 통해 사용자 인터페이스 개선 및 디자인 혁신을 주도해왔습니다. 섬세한 디자인 분석과 시장 트렌드를 반영한 결과, 실제 서비스에 기여한 경험이 있으며, 이를 바탕으로 배달의민족의 경쟁력을 강화하고자 합니다.",
        },
    ];

    // 선택된 회사가 있으면 해당 회사 자소서만 필터링, 없으면 전체 자소서 목록
    const filteredResumeList = selectedCompany
        ? resumeList.filter((resume) => resume.company === selectedCompany.name)
        : resumeList;

    // 자소서 항목 클릭 시 상세보기 페이지로 이동
    const handleResumeClick = (resume) => {
        navigate(`/education/resume-detail/${resume.id}`, { state: resume });
    };

    return (
        <div style={pageContainerStyle}>
            {/* (A) 연봉 비교 차트 영역 */}
            <div style={chartContainerStyle}>
                <h3 style={chartTitleStyle}>연봉 비교</h3>
                <p style={chartSubTextStyle}>
                    내 연봉, 개발자 평균 연봉, {selectedCompany ? selectedCompany.name : "네이버"} 평균 연봉 비교
                </p>
                <Bar data={data} options={options} />
                <button onClick={() => navigate(-1)} style={backButtonStyle}>
                    뒤로가기
                </button>
            </div>

            {/* (B) 자소서 리스트 테이블 영역 */}
            <div style={resumeTableContainerStyle}>
                <h3 style={resumeTableTitleStyle}>
                    검색결과 {filteredResumeList.length}건
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
                    {filteredResumeList.map((resume) => (
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

// ==================== 스타일 정의 ====================

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

const backButtonStyle = {
    padding: "8px 12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#df6e99",
    color: "#fff",
    cursor: "pointer",
    marginTop: "20px",
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