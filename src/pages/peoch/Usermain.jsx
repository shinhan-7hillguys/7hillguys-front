import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

/* --- styled-components --- */
const PageContainer = styled.div`
  padding: 16px;
  background: #f9f9f9;
  font-family: 'Pretendard', sans-serif;
`;

const HeaderRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

const SquareUsageCard = styled.div`
  flex: 1;
  aspect-ratio: auto;
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserInfo = styled.div`
  text-align: center;
`;

const Username = styled.h2`
  font-size: 24px;
  margin: 0;
`;

const Greeting = styled.p`
  margin: 0;
  color: gray;
`;

const UsageTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #888;
`;

const UsageAmount = styled.p`
  margin: 8px 0 0;
  font-size: 28px;
  font-weight: bold;
  white-space : nowrap;
`;

const FilterRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 16px;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 8px;
  background-color: #ffffff;
  border-radius: 9999px;
  padding: 4px 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  background: none;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 9999px;
  color: ${(props) => (props.active ? "#f95f89" : "#666")};
  transition: color 0.3s ease;
`;

const StatContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

const StatBox = styled.div`
  flex: 1;
  background: #ffffff;
  text-align: center;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: color 0.3s ease;
  border: ${(props) => (props.highlight ? "2px solid #f95f89" : "none")};
  color: ${(props) => (props.highlight ? "#f95f89" : "#333")};
`;

const StatTitle = styled.p`
  margin: 0;
  font-size: 14px;
`;

const StatValueRow = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const StatValue = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const ArrowIcon = styled.span`
  color: ${(props) => {
    if (!props.isSelected) return "#000000";
    return props.isUp ? "#f95f89" : "#3d8bfd";
  }};
  font-size: 18px;
`;


const InfoCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ChartCard = styled(InfoCard)`
  height: 300px;
`;

export default function MainPage() { 
  // 필터 상태
  const [timeFilter, setTimeFilter] = useState("월"); // "주", "월", "연"
  const [typeFilter, setTypeFilter] = useState("나"); // "나" 또는 "평균"
  const [selectedStat, setSelectedStat] = useState("사용액"); // "납부율", "지원금", "사용액" 중 하나

  const [userId, setUserId] = useState(null);

  // 기존 상태들 (예: 차트 데이터 등)
  const [usage, setUsage] = useState(0);
  const [lastMonthUsage, setLastMonthUsage] = useState(0);
  const [comparison, setComparison] = useState(0);
  const [chartData, setChartData] = useState({
    "납부율": { percentageDiff: 0, dailyUsage: {} },
    "지원금": { percentageDiff: 0, dailyUsage: {} },
    "월소득": { percentageDiff: 0, dailyUsage: {} },
  });
  const [graphData, setGraphData] = useState([]);

  // 사용자 정보 (여기서는 userName, 실제로 userId도 필요하면 별도 관리)
  const [userName, setUserName] = useState("");

  const getUserName = async () => {
    try {
      const response = await axios.get("/api/auth/userId", {
        withCredentials: true,
      }); 
      setUserName(response.data.name); 
    } catch (error) {
      console.error("사용자 정보를 불러오는데 실패했습니다.", error);
    }
  };
  const getUserId = async () =>{
    try{
      const response = await axios.get("/api/auth/user",{
        withCredentials : true,
      });
      setUserId(response.data.userId); 
    }catch (error){
      console.error("사용자 정보를 불러오는데 실패했습니다.", error);
    } 
  }

  useEffect(() => {
    getUserName();
    getUserId();
  }, []);
 
  const [dashboardData, setDashboardData] = useState(null);

  const getDashboardData = async () => {
    try {  
      const today = new Date().toISOString().split("T")[0];
      const response = await axios.get(`/card/cardData`, {
        params: { date: today },
        withCredentials: true,
      });
      console.log(response.data);
      setDashboardData(response.data); 
    } catch (error) {
      console.error("대시보드 데이터를 불러오는데 실패했습니다.", error);
    }
  };
  
  useEffect(() => {
    if (userName) {
      getDashboardData();
    }
  }, [userName]);

  // 선택된 필터(기간, 그룹)에 따라 현재 사용액과 이전 사용액을 반환하는 함수
  const getCurrentUsage = () => {
    if (!dashboardData) return { current: 0, previous: 0 };

    if (typeFilter === "나") {
      if (timeFilter === "주") {
        return { current: dashboardData.weekCurrent, previous: dashboardData.weekPrevious };
      } else if (timeFilter === "월") {
        return { current: dashboardData.monthCurrent, previous: dashboardData.monthPrevious };
      } else if (timeFilter === "연") {
        return { current: dashboardData.yearCurrent, previous: dashboardData.yearPrevious };
      }
    } else if (typeFilter === "평균") {
      if (timeFilter === "주") {
        return { current: dashboardData.avgWeekCurrent, previous: dashboardData.avgWeekPrevious };
      } else if (timeFilter === "월") {
        return { current: dashboardData.avgMonthCurrent, previous: dashboardData.avgMonthPrevious };
      } else if (timeFilter === "연") {
        return { current: dashboardData.avgYearCurrent, previous: dashboardData.avgYearPrevious };
      }
    }
    return { current: 0, previous: 0 };
  };

  // 사용액 비교 % 계산 함수
  const getUsageDiff = () => {
    const { current, previous } = getCurrentUsage();
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };
 
  const getUsageTitle = () => {
    if (timeFilter === "월") return "이번 달 이용액";
    if (timeFilter === "주") return "이번 주 이용액";
    if (timeFilter === "연") return "이번 연 이용액";
    return "이용액";
  };
 
 const getInfoText = () => {
  if (!dashboardData) return <p>로딩 중...</p>;

  const diff = getUsageDiff();
  let periodLabel = "";
  let previousPeriodLabel = "";
  let previousUsage = 0;

  if (typeFilter === "나") {
    if (timeFilter === "주") {
      periodLabel = "지난 주 기준으로";
      previousPeriodLabel = "지난 주";
      previousUsage = dashboardData.weekPrevious;
    } else if (timeFilter === "월") {
      periodLabel = `지난 달 ${new Date().getDate()}일 기준으로`;
      previousPeriodLabel = "지난 달";
      previousUsage = dashboardData.monthPrevious;
    } else if (timeFilter === "연") {
      periodLabel = "지난 해 기준으로";
      previousPeriodLabel = "지난 해";
      previousUsage = dashboardData.yearPrevious;
    }
    return (
      <>
        <p>
          {periodLabel}{" "}
          <span style={{ color: diff < 0 ? "#3d8bfd" : "#f95f89", fontWeight: "bold" }}>
            {diff > 0 ? `+${diff.toFixed(1)}%` : `${diff.toFixed(1)}%`}
          </span>{" "}
          {diff > 0 ? "더 많이" : "덜"} 사용했어요.
        </p>
        <p>
          {previousPeriodLabel} 사용액:{" "}
          <strong style={{ fontWeight: "bold", color: "#f95f89" }}>
            {previousUsage.toLocaleString()}
          </strong>{" "}
          원
        </p>
      </>
    );
  } else {
    if (timeFilter === "주") {
      periodLabel = "지난 주 기준으로";
      previousPeriodLabel = "지난 주";
      previousUsage = dashboardData.avgWeekPrevious;
    } else if (timeFilter === "월") {
      periodLabel = `지난 달 ${new Date().getDate()}일 기준으로`;
      previousPeriodLabel = "지난 달";
      previousUsage = dashboardData.avgMonthPrevious;
    } else if (timeFilter === "연") {
      periodLabel = "지난 해 기준으로";
      previousPeriodLabel = "지난 해";
      previousUsage = dashboardData.avgYearPrevious;
    }
    return (
      <p>
        그룹 평균 대비 내 사용액은{" "}
        <strong style={{ fontWeight: "bold", color: "#f95f89" }}>
          {previousUsage.toLocaleString()}
        </strong>{" "}
        원이며,{" "}
        <span style={{ color: diff < 0 ? "#3d8bfd" : "#f95f89", fontWeight: "bold" }}>
          {diff.toFixed(1)}%
        </span>{" "}
        차이가 있습니다.
      </p>
    );
  }
};
  
  
 
  const getArrowIcon = (diff, isSelected) => {
    if (diff > 0) return <ArrowIcon isUp isSelected={isSelected}>{<FaArrowUp />}</ArrowIcon>;
    if (diff < 0) return <ArrowIcon isSelected={isSelected}>{<FaArrowDown />}</ArrowIcon>;
    return null;
  };
   
  const renderStatBox = (title) => {
    let diff = 0;
    if (title === "사용액") {
      diff = getUsageDiff();
    } else {
      const chartKey = title === "월 소득" ? "월소득" : title;
      diff = chartData[chartKey]?.percentageDiff || 0;
    } 
    const statValueColor = diff < 0 ? "#3d8bfd" : "#f95f89";
  
    return (
      <StatBox highlight={selectedStat === title} onClick={() => setSelectedStat(title)}>
        <StatTitle>{title}</StatTitle>
        <StatValueRow>
          {getArrowIcon(diff, selectedStat === title)}
          <StatValue style={{ color: statValueColor }}>{`${Math.abs(diff).toFixed(1)}%`}</StatValue>
        </StatValueRow>
      </StatBox>
    );
  };
  
  
  
  return (
    <PageContainer>
      <HeaderRow>
        <SquareUsageCard>
          <UserInfo>
            <Username>{userName} 님</Username>
            <Greeting>안녕하세요!</Greeting>
          </UserInfo>
        </SquareUsageCard>
        <SquareUsageCard>
          <UsageTitle>{getUsageTitle()}</UsageTitle>
          {/* selectedStat이 "사용액"이면 dashboardData의 현재 사용액을, 아니라면 기존 usage 값을 표시 */}
          <UsageAmount>
            {selectedStat === "사용액"
              ? dashboardData
                ? getCurrentUsage().current.toLocaleString()
                : "로딩 중..."
              : usage.toLocaleString()}{" "}
            원
          </UsageAmount>
        </SquareUsageCard>
      </HeaderRow>

      <FilterRow>
        <FilterGroup>
          <FilterButton
            active={timeFilter === "주"}
            onClick={() => setTimeFilter("주")}
          >
            주
          </FilterButton>
          <FilterButton
            active={timeFilter === "월"}
            onClick={() => setTimeFilter("월")}
          >
            월
          </FilterButton>
          <FilterButton
            active={timeFilter === "연"}
            onClick={() => setTimeFilter("연")}
          >
            연
          </FilterButton>
        </FilterGroup>
        <FilterGroup>
          <FilterButton
            active={typeFilter === "나"}
            onClick={() => setTypeFilter("나")}
          >
            나
          </FilterButton>
          <FilterButton
            active={typeFilter === "평균"}
            onClick={() => setTypeFilter("평균")}
          >
            평균
          </FilterButton>
        </FilterGroup>
      </FilterRow>

      <StatContainer>
        {renderStatBox("납부율")}
        {renderStatBox("지원금")}
        {renderStatBox("사용액")}
      </StatContainer>

      <InfoCard>{getInfoText()}</InfoCard>

      <ChartCard>
        <h4 style={{ marginBottom: "8px" }}>{selectedStat}</h4>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={graphData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" opacity={0.5} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#f4a9c0"
              strokeWidth={3}
              dot={{ r: 5, strokeWidth: 1, fill: "#f4a9c0" }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </PageContainer>
  );
}
