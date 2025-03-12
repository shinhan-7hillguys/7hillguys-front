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
  color: ${(props) => (props.isUp ? "#f95f89" : "#3d8bfd")};
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

/* --- 메인 컴포넌트 --- */
export default function MainPage() {
  // 필터 상태
  const [timeFilter, setTimeFilter] = useState("월");
  const [typeFilter, setTypeFilter] = useState("나");
  const [selectedStat, setSelectedStat] = useState("납부율");

  // API를 통해 받아올 상태들
  const [usage, setUsage] = useState(0);
  const [lastMonthUsage, setLastMonthUsage] = useState(0);
  const [comparison, setComparison] = useState(0);
  const [chartData, setChartData] = useState({
    "납부율": { percentageDiff: 0, dailyUsage: {} },
    "지원금": { percentageDiff: 0, dailyUsage: {} },
    "월소득": { percentageDiff: 0, dailyUsage: {} },
  });
  const [graphData, setGraphData] = useState([]);
 
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("/dashboard", {
        params: { timeFilter, typeFilter },
      }); 
      const data = response.data;
      setUsage(data.usage);
      setLastMonthUsage(data.lastMonthUsage);
      setComparison(data.comparison);
      setChartData(data.chart);

      const currentStatKey = selectedStat === "월 소득" ? "월소득" : selectedStat;
      const currentMetric = data.chart[currentStatKey];
      if (currentMetric && currentMetric.dailyUsage) {
        const convertedGraphData = Object.entries(currentMetric.dailyUsage).map(
          ([day, amount]) => ({
            day: `${day}일`,
            amount,
          })
        );
        setGraphData(convertedGraphData);
      } else {
        setGraphData([]);
      }
    } catch (error) {
      console.error("API 데이터를 불러오는데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [timeFilter, typeFilter, selectedStat]);

  const getUsageTitle = () => {
    if (timeFilter === "월") return "이번 달 이용액";
    if (timeFilter === "주") return "이번 주 이용액";
    if (timeFilter === "연") return "이번 연 이용액";
    return "이용액";
  };

  const getInfoText = () => {
    if (typeFilter === "나") {
      return (
        <>
          <p>
            지난 달 {new Date().getDate()}일 기준으로{" "}
            <span style={{ color: "#f95f89", fontWeight: "bold" }}>
              {comparison > 0 ? `+${comparison}%` : `${comparison}%`}
            </span>{" "}
            {comparison > 0 ? "더 많이" : "덜"} 사용했어요.
          </p>
          <p>
            지난 달 사용액:{" "}
            <strong style={{ fontWeight: "bold" }}>
              {lastMonthUsage.toLocaleString()}
            </strong>{" "}
            원
          </p>
        </>
      );
    }
    return (
      <p>
        그룹 평균 대비 내 사용액은{" "}
        <strong style={{ fontWeight: "bold" }}>
          {lastMonthUsage.toLocaleString()}
        </strong>{" "}
        원이며, {comparison}% 차이가 있습니다.
      </p>
    );
  };

  const getArrowIcon = (diff) => {
    if (diff > 0) return <ArrowIcon isUp>{<FaArrowUp />}</ArrowIcon>;
    if (diff < 0) return <ArrowIcon>{<FaArrowDown />}</ArrowIcon>;
    return null;
  };

  const renderStatBox = (title) => {
    const chartKey = title === "월 소득" ? "월소득" : title;
    const diff = chartData[chartKey]?.percentageDiff || 0;
    return (
      <StatBox highlight={selectedStat === title} onClick={() => setSelectedStat(title)}>
        <StatTitle>{title}</StatTitle>
        <StatValueRow>
          {getArrowIcon(diff)}
          <StatValue>{`${Math.abs(diff)}%`}</StatValue>
        </StatValueRow>
      </StatBox>
    );
  };

  return (
    <PageContainer>
      <HeaderRow>
        <SquareUsageCard>
          <UserInfo>
            <Username>000 님</Username>
            <Greeting>안녕하세요!</Greeting>
          </UserInfo>
        </SquareUsageCard>
        <SquareUsageCard>
          <UsageTitle>{getUsageTitle()}</UsageTitle>
          <UsageAmount>{usage.toLocaleString()} 원</UsageAmount>
        </SquareUsageCard>
      </HeaderRow>

      <FilterRow>
        <FilterGroup>
          <FilterButton active={timeFilter === "일"} onClick={() => setTimeFilter("일")}>
            일
          </FilterButton>
          <FilterButton active={timeFilter === "월"} onClick={() => setTimeFilter("월")}>
            월
          </FilterButton>
          <FilterButton active={timeFilter === "연"} onClick={() => setTimeFilter("연")}>
            연
          </FilterButton>
        </FilterGroup>
        <FilterGroup>
          <FilterButton active={typeFilter === "나"} onClick={() => setTypeFilter("나")}>
            나
          </FilterButton>
          <FilterButton active={typeFilter === "평균"} onClick={() => setTypeFilter("평균")}>
            평균
          </FilterButton>
        </FilterGroup>
      </FilterRow>

      <StatContainer>
        {renderStatBox("납부율")}
        {renderStatBox("지원금")}
        {renderStatBox("월 소득")}
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
