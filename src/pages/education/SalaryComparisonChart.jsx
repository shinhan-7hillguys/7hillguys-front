// SalaryComparisonChart.jsx
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
    // 선택된 회사가 있으면 해당 회사의 정보를 사용, 없으면 기본값 "네이버"와 5500 (만원 단위)
    const companyName = selectedCompany ? selectedCompany.name : "네이버";
    // 연봉 값이 문자열(예: "6,816")로 전달될 수 있으므로 쉼표 제거 후 숫자로 변환
    const companySalary = selectedCompany
        ? parseInt(selectedCompany.salary.replace(/,/g, ""))
        : 5500;

    // 고정 값: 내 연봉, 개발자 평균 연봉 (예시)
    const mySalary = 3500;
    const devSalary = 4036;

    // 차트 데이터: 라벨에 선택된 회사 이름 포함
    const data = {
        labels: ["내 연봉", "개발자 평균 연봉", `${companyName} 평균 연봉`],
        datasets: [
            {
                label: "연봉 (단위: 만원)",
                data: [mySalary, devSalary, companySalary],
                backgroundColor: ["#c9e8ff", "#9966ff", "#ff89a3"],
                borderWidth: 1,
                borderRadius: 15,
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
                    label: (context) => `${context.raw.toLocaleString()}만 원`,
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `${value.toLocaleString()}만 원`,
                },
            },
        },
    };

    // 더미 자소서 데이터 (각 회사별로 2개씩)
    const resumeList = [
        {
            id: 1,
            applyDate: "2023 상반기",
            company: "신한DS",
            position: "ICT 개발",
            type: "신입",
            content: "한양대학교 / 응용미술 / 학점 4.2 / 인턴 10개월(스타트업)",
            detail:
                "1.지원동기-귀하께서 회사를 선택하는 기준은 무엇인가요? 우리 회사를 선택한 이유와 입사 후 꿈에 대해 말씀해주세요." +
                "저는 회사를 선택할 때 혁신성, 성장 가능성, 그리고 사회적 책임을 가장 중요하게 생각합니다. 신한카드는 금융업계의 선두주자로서 최신 IT 기술과 고객 중심 서비스를 바탕으로 시장을 선도하고 있습니다. 입사 후에는 회사의 비전을 실현하며, 지속 가능한 금융 생태계 구축과 글로벌 경쟁력 향상에 기여하는 전문가로 성장하고자 합니다."+
                "2. 귀하께서는 희망하는 직무에 지원하기 위해 어떠한 노력을 하고 계시나요? 사례와 경험을 통해 구체적으로 말씀해주세요" +
                "희망 직무를 위해 저는 다양한 학습과 실무 경험을 쌓아왔습니다. 대학 시절 팀 프로젝트와 인턴십을 통해 데이터 분석 및 프로그래밍 역량을 키웠고, 실제 업무에서 발생하는 문제를 해결하기 위해 스스로 코드를 개발하며 효율적인 업무 프로세스를 구현했습니다. 이러한 경험을 바탕으로, 현장에서 즉시 활용 가능한 기술력을 갖추었으며, 지속적으로 자기계발에 힘쓰고 있습니다."
        },
        {
            id: 2,
            applyDate: "2023 상반기",
            company: "신한DS",
            position: "ICT 개발",
            type: "신입",
            content: "명지대학교 / 정보공학 / 학점 3.4",
            detail:
                "1.지원동기-귀하께서 회사를 선택하는 기준은 무엇인가요? 우리 회사를 선택한 이유와 입사 후 꿈에 대해 말씀해주세요." +
                "저는 회사를 선택할 때 혁신성, 성장 가능성, 그리고 사회적 책임을 가장 중요하게 생각합니다. 신한카드는 금융업계의 선두주자로서 최신 IT 기술과 고객 중심 서비스를 바탕으로 시장을 선도하고 있습니다. 입사 후에는 회사의 비전을 실현하며, 지속 가능한 금융 생태계 구축과 글로벌 경쟁력 향상에 기여하는 전문가로 성장하고자 합니다."+
                "2. 귀하께서는 희망하는 직무에 지원하기 위해 어떠한 노력을 하고 계시나요? 사례와 경험을 통해 구체적으로 말씀해주세요" +
                "희망 직무를 위해 저는 다양한 학습과 실무 경험을 쌓아왔습니다. 대학 시절 팀 프로젝트와 인턴십을 통해 데이터 분석 및 프로그래밍 역량을 키웠고, 실제 업무에서 발생하는 문제를 해결하기 위해 스스로 코드를 개발하며 효율적인 업무 프로세스를 구현했습니다. 이러한 경험을 바탕으로, 현장에서 즉시 활용 가능한 기술력을 갖추었으며, 지속적으로 자기계발에 힘쓰고 있습니다."
        },
        // 신한카드 자소서
        {
            id: 3,
            applyDate: "2023 상반기",
            company: "신한카드",
            position: "ICT 개발",
            type: "신입",
            content: "동국대학교 / 컴퓨터공학 / 학점 3.7",
            detail:
                "저는 신한카드의 데이터 기반 혁신과 고객 중심 서비스에 큰 매력을 느껴 지원하였습니다. 대학에서의 분석 및 프로그래밍 경험을 바탕으로, 신한카드의 발전에 기여할 수 있는 인재가 되고자 합니다.",
        },
        {
            id: 4,
            applyDate: "2023 하반기",
            company: "신한카드",
            position: "ICT 개발",
            type: "신입",
            content: "서울과학기술대학교 / 산업공학 / 학점 3.9",
            detail:
                "6년간의 ICT 개발 경험을 바탕으로, 신한카드의 혁신적인 금융 솔루션 개발에 기여하고자 합니다. 팀 프로젝트와 리더십 경험을 통해 기술적 문제를 해결하며, 고객 만족도를 높이는 데 중점을 두었습니다.",
        },
        // 신한은행 자소서
        {
            id: 5,
            applyDate: "2022 하반기",
            company: "신한은행",
            position: "뱅킹서비스 개발",
            type: "신입",
            content: "아주대학교 / 응용소프트웨어공학 / 학점 4.2",
            detail:
                "신한은행의 안정성과 혁신적인 뱅킹서비스에 매료되어 지원하였습니다. 대학 시절 금융 관련 과목과 프로젝트를 통해 실무 감각을 기르며, 신한은행의 고객 중심 서비스를 발전시키는 데 기여하고자 합니다.",
        },
        {
            id: 6,
            applyDate: "2021 하반기",
            company: "신한은행",
            position: "뱅킹서비스 개발",
            type: "신입",
            content: "중앙대학교 / 전산학 컴퓨터공학 / 학점 3.8",
            detail:
                "5년간의 금융 IT 업무 경험을 통해, 신한은행의 디지털 전환 및 고객 경험 개선에 기여하였습니다. 다양한 프로젝트 경험을 통해 혁신적인 솔루션을 도입할 준비가 되어 있습니다.",
        },
        // 신한저축은행 자소서
        {
            id: 7,
            applyDate: "2023 상반기",
            company: "신한저축은행",
            position: "ICT개발운영",
            type: "신입",
            content: "한국외국어대학교 / 정보 통신공학과 / 학점 3.5",
            detail:
                "신한저축은행의 고객 중심 금융 서비스와 효율적인 IT 시스템 운영에 관심을 가지고 지원하였습니다. 대학에서의 프로젝트 경험을 통해 실무 능력을 키웠으며, 회사의 발전에 기여할 수 있다고 믿습니다.",
        },
        {
            id: 8,
            applyDate: "2023 상반기",
            company: "신한저축은행",
            position: "ICT개발운영",
            type: "신입",
            content: "한성대학교 / 전산학 컴퓨터공학 / 학점 3.4",
            detail:
                "5년간의 IT 운영 경험을 바탕으로, 신한저축은행의 디지털 혁신과 시스템 최적화에 기여해왔습니다. 효율적인 업무 처리와 고객 서비스 개선에 중점을 두었습니다.",
        },
        // 신한신용정보 자소서
        {
            id: 9,
            applyDate: "2023 상반기",
            company: "신한신용정보",
            position: "IT",
            type: "신입",
            content: "명지대학교 / 응용소프트웨어공학 / 학점 3.6",
            detail:
                "신한신용정보의 혁신적인 데이터 관리와 정보보안 기술에 매료되어 지원하였습니다. 대학에서의 보안 관련 프로젝트 경험을 통해, 신한신용정보의 기술적 도전에 기여할 준비가 되어 있습니다.",
        },
        {
            id: 10,
            applyDate: "2023 하반기",
            company: "신한신용정보",
            position: "IT",
            type: "신입",
            content: "동국대학교 / 산업공학 / 학점 3.42",
            detail:
                "5년간의 정보보안 및 IT 업무 경험을 통해, 신한신용정보의 데이터 보안과 시스템 안정성에 기여해왔습니다. 팀워크와 혁신적 사고로 보안 문제를 해결한 경험이 있습니다.",
        },
        {
        id: 11,
            applyDate: "2023 상반기",
            company: "금융결제원",
            position: "전산직",
            type: "신입",
            content: "서울 소재 4년제 / 컴퓨터공학과 / 학점 3.6/4.5",
            detail:
        "금융결제원 합격 자소서:\n저는 금융결제원의 안정적인 IT 시스템과 혁신적인 서비스에 큰 관심을 가지고 지원하였습니다. 대학 시절 다양한 프로젝트를 통해 문제 해결과 팀워크 능력을 기르며 관련 기술을 습득하였고, 이를 바탕으로 회사의 IT 인프라 발전에 기여할 자신이 있습니다.",
    },
    {
        id: 12,
        applyDate: "2023 하반기",
        company: "금융결제원",
        position: "전산직",
        type: "경력",
        content: "서울 소재 / IT학과 / 5년 경력 / 우수 포트폴리오",
        detail:
        "금융결제원 합격 자소서:\n5년간의 IT 업무 경험을 바탕으로, 시스템 최적화 및 보안 강화에 기여해왔습니다. 다양한 업무 프로세스를 개선하며 효율적인 해결책을 제시한 경험이 있어 회사 경쟁력 강화에 일조할 수 있다고 확신합니다.",
    },
    // SK 하이닉스
    {
        id: 13,
        applyDate: "2023 상반기",
        company: "SK 하이닉스",
        position: "IT",
        type: "신입",
        content: "서울 소재 4년제 / 전산학과 / 학점 3.8/4.5",
        detail:
        "SK 하이닉스 합격 자소서:\n첨단 반도체 기술과 혁신적인 IT 솔루션에 매료되어 지원하였습니다. 대학 시절 다양한 실습과 프로젝트를 통해 전산 지식을 쌓았으며, 회사의 기술 발전에 기여할 열정을 가지고 있습니다.",
    },
    {
        id: 14,
        applyDate: "2023 하반기",
        company: "SK 하이닉스",
        position: "IT",
        type: "경력",
        content: "서울 소재 / 전산학과 / 4년 경력",
        detail:
        "SK 하이닉스 합격 자소서:\n4년간의 IT 관련 업무 경험을 바탕으로, 반도체 제조 공정의 효율화 및 기술 혁신에 기여한 경험이 있습니다. 팀 프로젝트를 통해 문제 해결과 협업 능력을 키웠으며, SK 하이닉스의 미래 비전에 동참하고자 합니다.",
    },
    // 롯데캐피탈
    {
        id: 15,
        applyDate: "2023 상반기",
        company: "롯데캐피탈",
        position: "IT개발/운영",
        type: "신입",
        content: "서울 소재 4년제 / 컴퓨터공학과 / 학점 3.7/4.5",
        detail:
        "롯데캐피탈 합격 자소서:\n롯데캐피탈의 IT 시스템과 금융 서비스 혁신에 매료되어 지원하였습니다. 대학 시절 프로그래밍과 시스템 운영 경험을 쌓았고, 이를 통해 회사의 운영 효율성을 높일 자신이 있습니다.",
    },
    {
        id: 16,
        applyDate: "2023 하반기",
        company: "롯데캐피탈",
        position: "IT개발/운영",
        type: "경력",
        content: "서울 소재 / 컴퓨터공학과 / 5년 경력",
        detail:
        "롯데캐피탈 합격 자소서:\n5년간의 IT 운영 경험을 통해 시스템 안정화와 효율적인 운영 전략을 수립하였으며, 회사의 금융 서비스 혁신에 기여할 준비가 되어 있습니다.",
    },
    // LG CNS
    {
        id: 17,
        applyDate: "2023 상반기",
        company: "LG CNS",
        position: "DX Engineer",
        type: "신입",
        content: "서울 소재 4년제 / IT학과 / 학점 3.9/4.5",
        detail:
        "LG CNS 합격 자소서:\nDX Engineer로서 디지털 전환에 기여하고자 지원하였습니다. 최신 IT 기술과 클라우드 솔루션에 대한 이해를 바탕으로, 회사의 혁신적인 프로젝트에 참여할 열정을 가지고 있습니다.",
    },
    {
        id: 18,
        applyDate: "2023 하반기",
        company: "LG CNS",
        position: "DX Engineer",
        type: "경력",
        content: "서울 소재 / IT학과 / 5년 경력",
        detail:
        "LG CNS 합격 자소서:\n5년간의 IT 및 디지털 전환 경험을 토대로, 혁신적인 DX 프로젝트를 주도해왔습니다. 회사의 경쟁력 강화를 위해 효과적인 전략과 솔루션을 제시할 수 있다고 자신합니다.",
    },
    // 한화시스템/ICT
    {
        id: 19,
        applyDate: "2023 상반기",
        company: "한화시스템/ICT",
        position: "서비스개발/운영",
        type: "신입",
        content: "서울 소재 4년제 / 컴퓨터공학과 / 학점 3.6/4.5",
        detail:
        "한화시스템/ICT 합격 자소서:\nIT 서비스 개발과 운영에 대한 열정을 바탕으로, 회사의 효율적 시스템 운영 및 서비스 개선에 기여하고자 지원하였습니다. 대학에서 습득한 이론과 실무 경험을 통해 실질적인 성과를 내고자 합니다.",
    },
    {
        id: 20,
        applyDate: "2023 하반기",
        company: "한화시스템/ICT",
        position: "서비스개발/운영",
        type: "경력",
        content: "서울 소재 / IT학과 / 5년 경력",
        detail:
        "한화시스템/ICT 합격 자소서:\n5년간의 서비스 운영 경험을 바탕으로, 효율적인 시스템 개선과 혁신적인 서비스 개발에 주력해왔습니다. 팀과의 협업을 통해 지속 가능한 발전을 이끌어낼 수 있다고 확신합니다.",
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
                    내 연봉, 개발자 평균 연봉, {selectedCompany ? selectedCompany.name : "네이버"} 평균 연봉 비교(만 원)
                </p>
                <Bar data={data} options={options} />
                {/*<button onClick={() => navigate(-1)} style={backButtonStyle}>*/}
                {/*    뒤로가기*/}
                {/*</button>*/}
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

/* ==================== 스타일 정의 ==================== */
const pageContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    // background:
    //     "linear-gradient(191deg, rgb(255 247 252 / 70%) 0%, rgba(235,217,238,0.3) 100%)",
    boxSizing: "border-box",
    fontFamily: "Pretendard, sans-serif",
};

const chartContainerStyle = {
    width: "100%",
    maxWidth: "700px",
    margin: "0 auto 30px",
    padding: "20px",
    // background:
    //     "linear-gradient(191deg, rgb(255 247 252 / 70%) 0%, rgba(235,217,238,0.3) 100%)",
    borderRadius: "40px",
    // boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
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