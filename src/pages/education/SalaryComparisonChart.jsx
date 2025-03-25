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
                "1.지원동기-귀하께서 회사를 선택하는 기준은 무엇인가요? 우리 회사를 선택한 이유와 입사 후 꿈에 대해 말씀해주세요.\n" +
                "저는 회사를 선택할 때 혁신성, 성장 가능성, 그리고 사회적 책임을 가장 중요하게 생각합니다. 신한카드는 금융업계의 선두주자로서 최신 IT 기술과 고객 중심 서비스를 바탕으로 시장을 선도하고 있습니다. 입사 후에는 회사의 비전을 실현하며, 지속 가능한 금융 생태계 구축과 글로벌 경쟁력 향상에 기여하는 전문가로 성장하고자 합니다."+
                "\n2. 귀하께서는 희망하는 직무에 지원하기 위해 어떠한 노력을 하고 계시나요? 사례와 경험을 통해 구체적으로 말씀해주세요 \n" +
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
                "1.지원동기-귀하께서 회사를 선택하는 기준은 무엇인가요? 우리 회사를 선택한 이유와 입사 후 꿈에 대해 말씀해주세요.\n" +
                "저는 회사를 선택할 때 혁신성, 성장 가능성, 사회적 책임을 중시합니다. 신한DS의 첨단 금융 기술과 고객중심 서비스에 매료되어 지원하였으며, 입사 후 글로벌 리더로 도약하며 전문성을 키우고자 합니다. 또한, 회사의 지속적인 연구개발 투자와 혁신 문화를 통해 미래 금융 시장을 선도하는 데 기여하고 싶습니다."+
                "\n2. 귀하께서는 희망하는 직무에 지원하기 위해 어떠한 노력을 하고 계시나요? 사례와 경험을 통해 구체적으로 말씀해주세요 \n" +
                "희망 직무를 위해 대학 시절부터 데이터 분석과 프로그래밍 실습에 매진하였으며, 인턴십을 통해 실무 문제 해결 능력을 배양했습니다. 이를 바탕으로 지속적인 자기계발로 전문 인재로 성장하고 있습니다.또한, 다양한 프로젝트와 팀워크 경험을 통해 협업 능력을 강화하여 현장 적용력을 높이고, 실제 업무에서 즉각적으로 활용할 수 있는 기술을 습득해왔습니다."
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
                "1. 신한카드를 선택한 이유와 그에 따라 기대하고 있는 10년 뒤 본인과 신한카드의 모습은?\n" +
                "연구원에서 인턴으로 일하며 질병관리청의 코로나19 방역정책 수립을 위한 카드 매출 데이터를 분석에 참여해 데이터의 전처리부터 모델링의 전반을 경험했습니다. 방역 규제에 따라 매출에 민감한 반응을 보이는 업종을 보고 이를 실시간으로 분석해 유동적인 카드 혜택을 제공하면 좋겠다는 생각을 했습니다. 업계 최초 美 데이터 시장 진출로 새로운 수익구조를 창출하고 있는 신한카드는 10년 후 국 내/외에서 데이터를 활용해 너 넓은 고객층과 수익기반을 다질 것입니다. 이를 위해서는 업무 추진에 필요한 분석 결과를 빠르게 도출하고 새로운 관점으로 데이터를 바라보고 모델링할 수 있는 직원이 필요합니다. 인턴을 하며 머릿속으로 구상 했던 분석을 경험 부족으로 구현하지 못해 아쉬웠던 경험이 있습니다. 카드사에서의 데이터 분석은 매출과 직접적으로 연관된 흥미로운 분야라고 생각합니다. 필드에서의 경험에 끝없는 학습을 더해 인턴에서 느낀 답답함을 해소해주는 신한카드의 시니어 데이터 분석가가 될 것입니다.\n" +
                "\n2. 지원 분야와 관련하여 본인이 충분한 역량 또는 잠재력을 갖고 있다고 어필할 수 있는 근거를 경험(인턴, 아르바이트, 수행과제 등) 또는 사례와 함께 이야기 해 주세요" +
                "[계획적 사고를 통한 효율적 업무 처리]" +
                "과제 수행시 항상 더 효율적인 방법을 고민합니다. 서울기술연구원에서 인턴으로 근무할 때 4,000여 개의 주소 데이터를 수집해야 했습니다. 단순 작업을 더 효율적으로 하고 싶었던 저는 주소 수집에 걸리는 시간을 계산하고 자동 수집 코드를 짜는데 이틀을 투자할 수 있겠다는 결론을 내렸습니다. 수집 목적에 들어맞는 오픈 코드가 없어 쉽지 않았지만 데드라인을 정해 두었고, 코드를 한 번 짜 둔다면 며칠에 걸려 처리할 업무를 단 한 시간만에 쉽게 처리할 수 있다는 생각에 퇴근 후에도 코드 작성에 몰두했습니다. 결국 수요일 저녁에 원하는 코드를 완성했고 상사분께서는 나중에 활용 하고 싶다고 코드를 정리해서 남겨주면 좋겠다고 말씀하셨습니다. 데이터 분석 업무는 다양한 관점에서 다양한 시도를 할 때 새로운 인사이트를 얻을 수 있다고 생각합니다. 데드라인을 지킬 수 있는 ‘대책'을 세우고 그 안에서 더 효율적인 방법을 찾아내는 역량은 이에 필수요소입니다."
        },
        {
            id: 4,
            applyDate: "2023 하반기",
            company: "신한카드",
            position: "ICT 개발",
            type: "신입",
            content: "서울과학기술대학교 / 산업공학 / 학점 3.9",
            detail:
                "1. 신한카드를 선택한 이유와 그에 따라 기대하고 있는 10년 뒤 본인과 신한카드의 모습은?\n" +
                "1000" +
                "COVID19 이후로 금융시장에서 디지털 혁신[Digital Transformation] 필요성은 더욱 대두되고 있습니다. 이제는 대부분의 금융 거래는 디지털 기록을 남기며 그것은 하나의 데이터가 됩니다. 하지만 카드시장의 성장은 핀테크 기업으로 인해 정체되고 있습니다. 이런 상황 속에서 신한카드는 차별화된 상품?서비스 역량뿐만 아니라 DT을 통한 고객 관리 역량이 필요하다고 생각합니다. 그 중심에는 데이터를 기반으로 고객 인사이트를 도출하는 데이터 분석 직무가 중요하다고 판단했고, 금융 빅데이터 분석과 비즈니스 상황에 맞는 전략을 수립하고자 지원하였습니다." +
                "신한카드는 신한금융지주 자회사로 대외적으로 국내 금융회사 브랜드 1위 자리를 굳건하게 유지하고 있습니다. 하지만 앞으로 10년 동안 금융시장에서는 많은 변화가 있을 것이며, 그 변화는 마이데이터 사업으로 이미 시작되었다고 생각합니다. 신한카드는 고객 데이터와 가맹점 데이터를 활용하여 마이데이터 시대를 돌파하면 독보적 클래스의 멀티 파이낸스 기업으로 자리 잡을 것이며, 데이터 분석 직무에서 저는 데이터 스페셜리스트로 자리 잡아 그 변화를 이끄는 사람이 되겠습니다." +
                "\n2.지원 분야와 관련하여 본인이 충분한 역량 또는 잠재력을 갖고 있다고 어필할 수 있는 근거를 경험 (인턴, 아르바이트, 수행과제 등) 또는 사례와 함께 이야기해 주세요\n" +
                "신한카드 데이터 분석 직무에 무엇보다 필요한 역량은 데이터를 기반으로 새로운 인사이트를 도출하는 능력이라고 생각합니다. 저는 사회문제를 해결하고자 공공데이터를 활용한 프로젝트로 능력을 증명한 경험이 있습니다.\n" +
                "참전용사분들의 국가유공자 승인과정에서 보증의 어려움에 관한 기사를 접하고 작은 기여를 할 수 있는 방법을 모색했습니다. 이를 해결하고자 국가 공공데이터 포털에 공개된 한국전쟁 데이터에 Link Prediction을 적용하여 인우보증의 가능성이 높은 참전용사를 추천하는 시스템을 설계했습니다. 혁신성을 인정받아 교내 사회혁신 우수사례로 뽑히게 되었습니다. 덕분에 데이터 마이닝 전문가신 손소영 교수님 지도하에서 학부연구생 기회를 얻었습니다.\n" +
                "방법론적으로 Graph Neural Network까지 확장하기 위해 논문을 읽으며 밤을 새우기 일쑤였지만, 모르는 것을 알아가며 모델의 성능을 높일 때 희열을 느낄 수 있었습니다. 결과적으로 보다 정밀한 시스템을 설계했으며, 이를 교수님 지도를 받으며 친구와 함께 공동저자로 논문을 작성했습니다.\n" +
                "이 같은 경험을 바탕으로 신한카드에서 데이터 애널리스트로서 유감없이 발휘될 것입니다."

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