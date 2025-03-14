import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
} from "recharts";

// 회사 데이터 예시 (5개)
const companyList = [
  {
    id: 1,
    name: "쿠팡",
    closingDate: "2023.12.31",
    recruit: "프론트엔드 개발자",
    averageData: [7, 5, 4, 6, 5],
  },
  {
    id: 2,
    name: "네이버",
    closingDate: "2023.11.15",
    recruit: "AI 연구원",
    averageData: [8, 7, 5, 7, 6],
  },
  {
    id: 3,
    name: "카카오",
    closingDate: "2023.12.01",
    recruit: "백엔드 엔지니어",
    averageData: [6, 6, 6, 6, 6],
  },
  {
    id: 4,
    name: "토스",
    closingDate: "2023.10.30",
    recruit: "안드로이드 개발자",
    averageData: [7, 6, 5, 5, 7],
  },
  {
    id: 5,
    name: "배달의민족",
    closingDate: "2023.09.20",
    recruit: "UI/UX 디자이너",
    averageData: [5, 6, 7, 4, 6],
  },
];

// 밑줄 표시를 위한 커스텀 Tick 컴포넌트
const CustomUnderlinedTick = ({ x, y, payload, textAnchor }) => {
  return (
      <text
          x={x}
          y={y}
          textAnchor={textAnchor}
          fill="#000"
          fontSize={14}
          fontWeight="bold"
          style={{ textDecoration: "underline" }}
          dy={5}
      >
        {payload.value}
      </text>
  );
};

// 회사 카드 컴포넌트 (onMouseEnter, onMouseLeave, onClick 추가)
const CompanyCard = ({ company, onMouseEnter, onMouseLeave, onClick }) => {
  return (
      <div
          style={companyCardStyle}
          onMouseEnter={() => onMouseEnter(company)}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
      >
        <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "bold" }}>
          {company.name}
        </h3>
        <p style={{ margin: 0, fontSize: "12px" }}>
          마감일: {company.closingDate}
        </p>
        <p style={{ margin: "4px 0 10px", fontSize: "12px" }}>
          모집공고: {company.recruit}
        </p>
      </div>
  );
};

const Education = () => {
  const navigate = useNavigate();

  // 사용자 능력치 (순서: ["어학점수", "자소서", "자격증", "인턴경험", "학점"])
  const userData = [2, 6, 2, 2, 8];

  // 호버 중인 회사 정보 (없으면 null)
  const [hoveredCompany, setHoveredCompany] = useState(null);

  // 차트 라벨
  const subjects = ["어학점수", "자소서", "자격증", "인턴경험", "학점"];

  // hoveredCompany가 있으면 그 회사 평균 능력치, 없으면 0
  const chartData = subjects.map((subject, i) => ({
    subject,
    user: userData[i],
    company: hoveredCompany ? hoveredCompany.averageData[i] : 0,
  }));

  // 편집 버튼 (기존)
  const handleResumeUpdate = () => {
    navigate("/ResumeEdit");
  };

  // 회사 카드 클릭 시 SalaryComparisonChart 페이지로 이동
  const handleCompanyClick = () => {
    navigate("/SalaryComparisonChart");
  };

  // 슬라이드 설정 (한 화면에 2장씩)
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
  };

  return (
      <div style={pageWrapperStyle}>
        {/* Pretendard 폰트 CDN (비권장 방식) */}
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />

        {/* (1) 상단: 차트 박스 */}
        <div style={boxWrapperStyle}>
          <div style={topContainerStyle}>
            {/* 왼쪽: 레이더 차트 */}
            <div style={chartWrapperStyle}>
              <RadarChart
                  cx="50%"
                  cy="55%"
                  outerRadius="90%"
                  width={300}
                  height={270}
                  data={chartData}
              >
                <PolarGrid />
                <PolarAngleAxis
                    dataKey="subject"
                    tick={<CustomUnderlinedTick />}
                />
                <PolarRadiusAxis angle={50} domain={[0, 10]} />

                {/* 사용자 능력치 */}
                <Radar
                    name="내 능력치"
                    dataKey="user"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                    strokeWidth={2}
                />

                {/* 회사 평균 능력치 (hoveredCompany가 있으면) */}
                {hoveredCompany && (
                    <Radar
                        name={`${hoveredCompany.name} 평균`}
                        dataKey="company"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        fillOpacity={0.6}
                        strokeWidth={2}
                    />
                )}

                <Legend verticalAlign="top" align="left" />
              </RadarChart>
            </div>

            {/* 오른쪽: 내 능력치 목록 + 편집 버튼 */}
            <div style={infoWrapperStyle}>
              <div style={abilityInfoStyle}>
                <ul style={listStyle}>
                  <li style={listItemStyle}>
                    <span style={{ ...bulletStyle, backgroundColor: "#66ccff" }}></span>
                    자소서: 2개
                  </li>
                  <li style={listItemStyle}>
                    <span style={{ ...bulletStyle, backgroundColor: "#df6e99" }}></span>
                    학점: 3.5
                  </li>
                  <li style={listItemStyle}>
                    <span style={{ ...bulletStyle, backgroundColor: "#ffcc00" }}></span>
                    자격증: 2개
                  </li>
                  <li style={listItemStyle}>
                    <span style={{ ...bulletStyle, backgroundColor: "#5fbf92" }}></span>
                    인턴경험: 2
                  </li>
                  <li style={listItemStyle}>
                    <span style={{ ...bulletStyle, backgroundColor: "#9966ff" }}></span>
                    어학점수: lh1
                  </li>
                </ul>
              </div>
              <button style={updateButtonStyle} onClick={handleResumeUpdate}>
                편집
              </button>
            </div>
          </div>
        </div>

        {/* (2) 하단: 추천 회사 카드 슬라이드 (5개) */}
        <div style={companySectionStyle}>
          <h3 style={companySectionTitleStyle}>추천 회사</h3>
          <div className="my-slider-container" style={sliderContainerStyle}>
            <Slider {...sliderSettings}>
              {companyList.map((company) => (
                  <div key={company.id} style={slideItemStyle}>
                    <CompanyCard
                        company={company}
                        onMouseEnter={(c) => setHoveredCompany(c)}
                        onMouseLeave={() => setHoveredCompany(null)}
                        onClick={handleCompanyClick}
                    />
                  </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* 슬라이드 화살표 위치 오버라이드 (JSX 내부 style 태그 사용) */}
        <style>
          {`
          .my-slider-container .slick-prev {
            left: 0px !important;
            z-index: 2;
          }
          .my-slider-container .slick-next {
            right: 10px !important;
            z-index: 2;
          }
        `}
        </style>
      </div>
  );
};

export default Education;

/* 🔹 스타일 정의 */
const pageWrapperStyle = {
  width: "100%",
  margin: 0,
  padding: "10px",
  boxSizing: "border-box",
  fontFamily: "Pretendard, sans-serif",
};

const boxWrapperStyle = {
  background:
      "linear-gradient(191deg, rgb(255 247 252 / 70%) 0%, rgba(235, 217, 238, 0.3) 100%)",
  borderRadius: "8px",
  padding: "16px",
};

const topContainerStyle = {
  display: "flex",
  flexDirection: "row",
  gap: "16px",
  justifyContent: "space-between",
  alignItems: "flex-start",
};

const chartWrapperStyle = {
  flex: 9,
  minWidth: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
};

const infoWrapperStyle = {
  flex: 4,
  minWidth: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginLeft: "auto",
};

const abilityInfoStyle = {
  fontSize: "14px",
  color: "#444",
  width: "100%",
};

const listStyle = {
  margin: 0,
  padding: 10,
  listStyle: "none",
  fontSize: "12px",
};

const listItemStyle = {
  display: "flex",
  alignItems: "center",
  padding: "14px 0",
  borderBottom: "2px solid #8884d8",
};

const bulletStyle = {
  display: "inline-block",
  width: "8px",
  height: "8px",
  marginRight: "8px",
};

const updateButtonStyle = {
  padding: "8px 12px",
  fontSize: "13px",
  backgroundColor: "#df6e99",
  color: "#fff",
  border: "none",
  borderRadius: "16px",
  cursor: "pointer",
  width: "60%",
  alignSelf: "flex-end",
};

const companySectionStyle = {
  marginTop: "20px",
};

const companySectionTitleStyle = {
  fontSize: "1.2rem",
  marginBottom: "8px",
  fontWeight: "bold",
};

const sliderContainerStyle = {
  width: "100%",
  marginTop: "20px",
};

const slideItemStyle = {
  padding: "0 8px",
  boxSizing: "border-box",
};

const companyCardStyle = {
  background:
      "linear-gradient(191deg, rgb(255 247 252 / 70%) 0%, rgba(235, 217, 238, 0.3) 100%)",
  borderRadius: "15px",
  padding: "20px",
  width: "180px",
  margin: "0 auto",
  position: "relative",
  cursor: "pointer",
};