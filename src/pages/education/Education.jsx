import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

// CompanyCard 컴포넌트 (onMouseEnter/Leave 사용)
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
        <p style={{ margin: 0, fontSize: "12px" }}>마감일: {company.closingDate}</p>
        <p style={{ margin: "4px 0 10px", fontSize: "12px" }}>
          모집공고: {company.recruit}
        </p>
      </div>
  );
};

const Education = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [hoveredCompany, setHoveredCompany] = useState(null);

  // 추천 회사 데이터 (salary 필드 추가)
  const companyList = [
    {
      id: 1,
      name: "쿠팡",
      closingDate: "2023.12.31",
      recruit: "프론트엔드 개발자",
      salary: 5200, // 쿠팡 평균 연봉(천원)
      averageData: [7, 5, 4, 6, 5],
    },
    {
      id: 2,
      name: "네이버",
      closingDate: "2023.11.15",
      recruit: "AI 연구원",
      salary: 5500, // 네이버 평균 연봉(천원)
      averageData: [8, 7, 5, 7, 6],
    },
    {
      id: 3,
      name: "카카오",
      closingDate: "2023.12.01",
      recruit: "백엔드 엔지니어",
      salary: 5300, // 카카오 평균 연봉(천원)
      averageData: [6, 6, 6, 6, 6],
    },
    {
      id: 4,
      name: "토스",
      closingDate: "2023.10.30",
      recruit: "안드로이드 개발자",
      salary: 5000, // 토스 평균 연봉(천원)
      averageData: [7, 6, 5, 5, 7],
    },
    {
      id: 5,
      name: "배달의민족",
      closingDate: "2023.09.20",
      recruit: "UI/UX 디자이너",
      salary: 4800, // 배달의민족 평균 연봉(천원)
      averageData: [5, 6, 7, 4, 6],
    },
  ];

  // userProfile 데이터 GET
  useEffect(() => {
    axios
        .get("/api/myspecs")
        .then((res) => setUserProfile(res.data))
        .catch((err) => console.error("Error fetching user profile:", err));
  }, []);

  // ResumeEdit에서 저장한 모든 질문의 답변은 객체 형태로 저장됨
  const answersObj =
      userProfile && userProfile.letter ? JSON.parse(userProfile.letter) : {};

  // 각 답변의 길이가 350자 이상일 때만 카운트하여 자소서 점수를 계산
  const answeredCount = Object.values(answersObj).filter(
      (ans) => ans && ans.trim().length >= 350
  ).length;
  const letterScore = Math.min(answeredCount * 2, 10);

  // 어학점수: 배열로 저장되었다고 가정 (첫 번째 항목 사용)
  const languageArr =
      userProfile && userProfile.languageScore
          ? JSON.parse(userProfile.languageScore)
          : [];
  const languageObj = languageArr.length > 0 ? languageArr[0] : {};
  let langScore = 0;
  if (languageObj.score) {
    if (languageObj.exam === "TOEIC") {
      const score = parseInt(languageObj.score);
      if (score >= 900) langScore = 10;
      else if (score >= 850) langScore = 8;
      else if (score >= 800) langScore = 6;
      else if (score >= 750) langScore = 4;
      else if (score >= 700) langScore = 2;
      else langScore = 0;
    } else if (languageObj.exam === "OPIC") {
      const opicScore = languageObj.score.toUpperCase();
      if (opicScore === "AL") langScore = 10;
      else if (opicScore === "IH") langScore = 8;
      else if (opicScore === "IM") langScore = 6;
      else if (opicScore === "IL") langScore = 4;
      else if (opicScore === "NH") langScore = 2;
      else langScore = 0;
    } else if (languageObj.exam === "TOEFL") {
      const score = parseInt(languageObj.score);
      if (score >= 117) langScore = 10;
      else if (score >= 111) langScore = 8;
      else if (score >= 98) langScore = 6;
      else if (score >= 84) langScore = 4;
      else if (score >= 79) langScore = 2;
      else langScore = 0;
    }
  }

  // 자격증: 유효한 항목만 카운트
  const certificationsRaw =
      userProfile && userProfile.certification
          ? JSON.parse(userProfile.certification)
          : [];
  const validCertifications = certificationsRaw.filter(
      (cert) => cert.name && cert.name.trim() !== ""
  );
  const certScore = Math.min(validCertifications.length * 2, 10);

  // 인턴경험: 데이터가 배열이 아닐 경우를 대비하여 처리
  let internshipsRaw = [];
  if (userProfile && userProfile.internship) {
    const parsedIntern = JSON.parse(userProfile.internship);
    internshipsRaw = Array.isArray(parsedIntern) ? parsedIntern : [parsedIntern];
  }
  const validInternships = internshipsRaw.filter((intern) => {
    if (intern.category && intern.place) {
      return intern.category.trim() !== "" && intern.place.trim() !== "";
    } else if (intern.company && intern.period) {
      return intern.company.trim() !== "" && intern.period.trim() !== "";
    }
    return false;
  });
  let internScore = 0;
  if (validInternships.length >= 5) internScore = 10;
  else if (validInternships.length === 4) internScore = 8;
  else if (validInternships.length === 3) internScore = 6;
  else if (validInternships.length === 2) internScore = 4;
  else if (validInternships.length === 1) internScore = 2;
  else internScore = 0;

  // 학점: { "gpa": "4.3", "maxGpa": "4.5" }
  const gradeObj =
      userProfile && userProfile.grade ? JSON.parse(userProfile.grade) : {};
  let gradeScore = 0;
  if (gradeObj.gpa) {
    const gpa = parseFloat(gradeObj.gpa);
    if (gpa === 4.5) gradeScore = 10;
    else if (gpa >= 4.0) gradeScore = 8;
    else if (gpa === 3.5) gradeScore = 6;
    else if (gpa >= 3.0 && gpa < 3.5) gradeScore = 4;
    else if (gpa >= 2.5) gradeScore = 2;
    else gradeScore = 0;
  }

  // RadarChart 데이터 구성 (회사 평균 데이터도 포함)
  const chartData = [
    { subject: "자소서", user: letterScore },
    { subject: "어학점수", user: langScore },
    { subject: "자격증", user: certScore },
    { subject: "인턴경험", user: internScore },
    { subject: "학점", user: gradeScore },
  ];
  const extendedChartData = chartData.map((data, idx) => ({
    ...data,
    company: hoveredCompany ? hoveredCompany.averageData[idx] : 0,
  }));

  // 추천 회사 카드 클릭 시 선택한 회사 정보를 state로 보내서 SalaryComparisonChart로 이동
  const handleCompanyClick = (company) => {
    navigate("/education/SalaryComparisonChart", { state: { company } });
  };

  // "수정" 버튼 클릭 시 ResumeEdit 페이지로 이동
  const handleResumeUpdate = () => {
    navigate("/education/ResumeEdit");
  };

  // 슬라이더 옵션
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
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
        <div style={boxWrapperStyle}>
          <div style={topContainerStyle}>
            <div style={chartWrapperStyle}>
              <RadarChart
                  cx="50%"
                  cy="55%"
                  outerRadius="100%"
                  width={350}
                  height={300}
                  data={extendedChartData}
                  margin={{ top: 10, right: 20, bottom: 20, left: 20 }}
              >
                <PolarGrid />
                <PolarAngleAxis
                    dataKey="subject"
                    tick={<CustomUnderlinedTick />}
                />
                <PolarRadiusAxis angle={50} domain={[0, 10]} />
                <Radar
                    name="내 능력치"
                    dataKey="user"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                    strokeWidth={2}
                />
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
            <div style={infoWrapperStyle}>
              <div style={abilityInfoStyle}>
                <ul style={listStyle}>
                  <li style={listItemStyle}>
                  <span
                      style={{ ...bulletStyle, backgroundColor: "#66ccff" }}
                  ></span>
                    자소서: {answeredCount}개
                  </li>
                  <li style={listItemStyle}>
                  <span
                      style={{ ...bulletStyle, backgroundColor: "#df6e99" }}
                  ></span>
                    어학점수: {languageObj.score || "없음"}
                  </li>
                  <li style={listItemStyle}>
                  <span
                      style={{ ...bulletStyle, backgroundColor: "#ffcc00" }}
                  ></span>
                    자격증: {validCertifications.length}개
                  </li>
                  <li style={listItemStyle}>
                  <span
                      style={{ ...bulletStyle, backgroundColor: "#5fbf92" }}
                  ></span>
                    인턴: {validInternships.length}회
                  </li>
                  <li style={listItemStyle}>
                  <span
                      style={{ ...bulletStyle, backgroundColor: "#9966ff" }}
                  ></span>
                    학점: {gradeObj.gpa || "N/A"}
                  </li>
                </ul>
              </div>
              <button style={updateButtonStyle} onClick={handleResumeUpdate}>
                수정
              </button>
            </div>
          </div>
        </div>

        <div style={companySectionStyle}>
          <h3 style={companySectionTitleStyle}>추천 회사</h3>
          <div className="my-slider-container" style={sliderContainerStyle}>
            <Slider {...sliderSettings}>
              {companyList.map((company) => (
                  <div
                      key={company.id}
                      style={{ ...slideItemStyle, pointerEvents: "auto" }}
                  >
                    <CompanyCard
                        company={company}
                        onMouseEnter={(c) => {
                          console.log("Hovered:", c);
                          setHoveredCompany(c);
                        }}
                        onMouseLeave={() => setHoveredCompany(null)}
                        onClick={() => handleCompanyClick(company)}
                    />
                  </div>
              ))}
            </Slider>
          </div>
        </div>

        <style>
          {`
          .slick-slide {
            pointer-events: auto !important;
          }
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

/* ── 스타일 정의 ── */
const pageWrapperStyle = {
  width: "100%",
  minHeight: "100vh",
  margin: 0,
  padding: "10px",
  boxSizing: "border-box",
  fontFamily: "Pretendard, sans-serif",
  overflowY: "auto",
};

const boxWrapperStyle = {
  background:
      "linear-gradient(191deg, rgb(255 247 252 / 70%) 0%, rgba(235,217,238,0.3) 100%)",
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
  margin: 7,
  padding: 10,
  listStyle: "none",
  fontSize: "12px",
  fontWeight: "bold",
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
  pointerEvents: "auto",
};

const companyCardStyle = {
  background:
      "linear-gradient(191deg, rgb(255 247 252 / 70%) 0%, rgba(235,217,238,0.3) 100%)",
  borderRadius: "15px",
  padding: "20px",
  width: "180px",
  margin: "0 auto",
  position: "relative",
  cursor: "pointer",
  pointerEvents: "auto",
};

const CustomUnderlinedTick = ({ x, y, payload, textAnchor }) => (
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