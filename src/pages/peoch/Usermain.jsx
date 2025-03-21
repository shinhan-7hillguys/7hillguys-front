import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  padding: 16px;
  background: #f9f9f9;
  font-family: 'Pretendard', sans-serif;
  border-radius: 64px;
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
  white-space: nowrap;
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
  white-space: nowrap;
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

const InactiveContainer = styled(PageContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Message = styled.p`
  font-size: 20px;
  color: #666;
  margin-bottom: 16px;
`;

const ActionButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  background: #f95f89;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export default function MainPage() {
  // 상태들
  const [timeFilter, setTimeFilter] = useState("월"); 
  const [typeFilter, setTypeFilter] = useState("나");  
  const [selectedStat, setSelectedStat] = useState("사용액");  
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [usage, setUsage] = useState(0);
  const [chartData, setChartData] = useState({
    "납부율": { percentageDiff: 0, dailyUsage: {} },
    "예상소득": { percentageDiff: 0, dailyUsage: {} },
  });
  const [dashboardData, setDashboardData] = useState(null);
  const [rawGraphData, setRawGraphData] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const [investmentStatus, setInvestmentStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [age, setAge] = useState(null);  

  const navigate = useNavigate();
 
  const getUserAge = async () => {
    const response = await axios.get("/api/user/age", {
      withCredentials: true,
    });
    console.log("사용자 나이:", response.data);
    setAge(response.data);
  };

  const getInvestmentStatus = async () => {
    const response = await axios.get("/api/investment/status", {
      withCredentials: true,
    });
    console.log(response);
    setInvestmentStatus(response.data);
    console.log(1);
    console.log(investmentStatus);
  };

  const getUserName = async () => {
    const response = await axios.get("/api/auth/userId", {
      withCredentials: true,
    });
    console.log("사용자 이름:", response.data.name);
    setUserName(response.data.name);
  };

  const getUserId = async () => {
    const response = await axios.get("/api/auth/user", {
      withCredentials: true,
    });
    console.log("사용자 ID:", response.data.userId);
    setUserId(response.data.userId);
  };

  const getDashboardData = async () => {
    const today = new Date().toISOString().split("T")[0];
    const response = await axios.get("/card/cardDataTotal", {
      params: { date: today },
      withCredentials: true,
    });
    console.log("대시보드 데이터:", response.data);
    setDashboardData(response.data);
  };
 
  useEffect(() => {
    if (selectedStat === "예상소득") {
      axios
        .get(`/api/user/expectedincome`, { withCredentials: true })
        .then((response) => {
          const expectedIncome = response.data;
          console.log("예측소득 데이터:", expectedIncome);
          const newGraphData = Object.keys(expectedIncome).map((key) => ({
            day: key,
            current: expectedIncome[key],
            previous: 0,  
          }));
          setGraphData(newGraphData);
        })
        .catch((error) => {
          console.error("예상소득 데이터 호출 중 오류 발생:", error);
        });
    }
  }, [selectedStat]);

  const getGraphData = async () => {
    const today = new Date().toISOString().split("T")[0];
    const response = await axios.get("/card/cardDataMap", {
      params: { date: today },
      withCredentials: true,
    });
    console.log("그래프 데이터:", response.data);
    setRawGraphData(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getInvestmentStatus();
        const invStatus = investmentStatus;
        console.log("투자 심사 상태:", invStatus);
        if (invStatus !== "승인") {
          setIsLoading(false);
          return;
        }
        await getUserName();
        await getUserId();
        await getDashboardData();
        await getGraphData();
        await getUserAge();
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [investmentStatus]);

  useEffect(() => { 
    if (!rawGraphData || selectedStat === "예상소득") return;

    let currentMap = {};
    let previousMap = {};

    if (timeFilter === "주") {
      if (typeFilter === "나") {
        currentMap = rawGraphData.weeklyCurrentMap;
        previousMap = rawGraphData.weeklyPreviousMap;
      } else {
        currentMap = rawGraphData.weeklyCurrentAverageMap;
        previousMap = rawGraphData.weeklyPreviousAverageMap;
      }
    } else if (timeFilter === "월") {
      if (typeFilter === "나") {
        currentMap = rawGraphData.monthlyCurrentMap;
        previousMap = rawGraphData.monthlyPreviousMap;
      } else {
        currentMap = rawGraphData.monthlyCurrentAverageMap;
        previousMap = rawGraphData.monthlyPreviousAverageMap;
      }
    } else if (timeFilter === "연") {
      if (typeFilter === "나") {
        currentMap = rawGraphData.yearlyCurrentMap;
        previousMap = rawGraphData.yearlyPreviousMap;
      } else {
        currentMap = rawGraphData.yearlyCurrentAverageMap;
        previousMap = rawGraphData.yearlyPreviousAverageMap;
      }
    }

    const newGraphData = Object.keys(currentMap).map((key) => ({
      day: key,
      current: currentMap[key],
      previous: previousMap[key] || 0,
    }));
    setGraphData(newGraphData);
  }, [rawGraphData, timeFilter, typeFilter, selectedStat]);

  // if (isLoading) {
  //   return <PageContainer>로딩 중...</PageContainer>;
  // }
  if (isLoading)
    return (
        <div className="loading-dots-exit">
          <p className="loading-text">잠시만 기다려 주세요...</p>
          <div className="dots-container">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
    );

  if (investmentStatus !== "승인") {
    return (
      <InactiveContainer>
        <Message>투자 심사 완료 후 사용 가능 합니다.</Message>
        <ActionButton onClick={() => navigate("/investReview")}>
          심사 신청하기
        </ActionButton>
      </InactiveContainer>
    );
  }

  const getCurrentUsage = () => {
    if (!dashboardData) return { current: 0, previous: 0 };

    if (typeFilter === "나") {
      if (timeFilter === "주") {
        return {
          current: dashboardData.weekCurrentTotal,
          previous: dashboardData.weekPreviousTotal,
        };
      } else if (timeFilter === "월") {
        return {
          current: dashboardData.monthCurrentTotal,
          previous: dashboardData.monthPreviousTotal,
        };
      } else if (timeFilter === "연") {
        return {
          current: dashboardData.yearCurrentTotal,
          previous: dashboardData.yearPreviousTotal,
        };
      }
    } else if (typeFilter === "평균") {
      if (timeFilter === "주") {
        return {
          current: dashboardData.avgWeekCurrentTotal,
          previous: dashboardData.avgWeekPreviousTotal,
        };
      } else if (timeFilter === "월") {
        return {
          current: dashboardData.avgMonthCurrentTotal,
          previous: dashboardData.avgMonthPreviousTotal,
        };
      } else if (timeFilter === "연") {
        return {
          current: dashboardData.avgYearCurrentTotal,
          previous: dashboardData.avgYearPreviousTotal,
        };
      }
    }
    return { current: 0, previous: 0 };
  };

  const getUsageDiff = () => {
    const { current, previous } = getCurrentUsage();
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  };

  const getUsageTitle = () => {
    if (timeFilter === "월") return "이번 달 이용액";
    if (timeFilter === "주") return "이번 주 이용액";
    if (timeFilter === "연") return "이번 연 이용액";
    return "이용액";
  };
 
  const getExpectedIncomeForAge = () => {
    if (!graphData || age == null) return 0; 
    const dataForAge = graphData.find((d) => String(d.day) === String(age));
    return dataForAge ? dataForAge.current : 0;
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
        previousUsage = dashboardData.weekPreviousTotal;
      } else if (timeFilter === "월") {
        periodLabel = `지난 달 ${new Date().getDate()}일 기준으로`;
        previousPeriodLabel = "지난 달";
        previousUsage = dashboardData.monthPreviousTotal;
      } else if (timeFilter === "연") {
        periodLabel = "지난 해 기준으로";
        previousPeriodLabel = "지난 해";
        previousUsage = dashboardData.yearPreviousTotal;
      }
      return (
        <>
          <p>
            {periodLabel}{" "}
            <span
              style={{
                color: diff < 0 ? "#3d8bfd" : "#f95f89",
                fontWeight: "bold",
              }}
            >
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
        previousUsage = dashboardData.avgWeekPreviousTotal;
      } else if (timeFilter === "월") {
        periodLabel = `지난 달 ${new Date().getDate()}일 기준으로`;
        previousPeriodLabel = "지난 달";
        previousUsage = dashboardData.avgMonthPreviousTotal;
      } else if (timeFilter === "연") {
        periodLabel = "지난 해 기준으로";
        previousPeriodLabel = "지난 해";
        previousUsage = dashboardData.avgYearPreviousTotal;
      }
      return (
        <p>
          그룹 평균 대비 내 사용액은{" "}
          <strong style={{ fontWeight: "bold", color: "#f95f89" }}>
            {previousUsage.toLocaleString()}
          </strong>{" "}
          원이며,{" "}
          <span
            style={{
              color: diff < 0 ? "#3d8bfd" : "#f95f89",
              fontWeight: "bold",
            }}
          >
            {`${diff.toFixed(1)}%`}
          </span>{" "}
          차이가 있습니다.
        </p>
      );
    }
  };

  const getArrowIcon = (diff, isSelected) => {
    if (diff > 0)
      return (
        <ArrowIcon isUp isSelected={isSelected}>
          <FaArrowUp />
        </ArrowIcon>
      );
    if (diff < 0)
      return (
        <ArrowIcon isSelected={isSelected}>
          <FaArrowDown />
        </ArrowIcon>
      );
    return null;
  };

  const renderStatBox = (title) => { 
    if (title === "예상소득") {
      const incomeValue = getExpectedIncomeForAge();
      return (
        <StatBox
          highlight={selectedStat === title}
          onClick={() => setSelectedStat(title)}
        >
          <StatTitle>{title}</StatTitle>
          <StatValueRow>
            <StatValue style={{ color: "#f95f89" }}>
              {incomeValue.toLocaleString()} 원
            </StatValue>
          </StatValueRow>
        </StatBox>
      );
    } else {
      let diff = 0;
      if (title === "사용액") {
        diff = getUsageDiff();
      } else {
        const chartKey = title === "월 소득" ? "월소득" : title;
        diff = chartData[chartKey]?.percentageDiff || 0;
      }
      const statValueColor = diff < 0 ? "#3d8bfd" : "#f95f89";

      return (
        <StatBox
          highlight={selectedStat === title}
          onClick={() => setSelectedStat(title)}
        >
          <StatTitle>{title}</StatTitle>
          <StatValueRow>
            {getArrowIcon(diff, selectedStat === title)}
            <StatValue style={{ color: statValueColor }}>
              {Math.abs(diff).toFixed(1)}%
            </StatValue>
          </StatValueRow>
        </StatBox>
      );
    }
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
        {renderStatBox("예상소득")}
        {renderStatBox("사용액")}
      </StatContainer>

      <InfoCard>{getInfoText()}</InfoCard>

      <ChartCard>
        <h4 style={{ marginBottom: "8px" }}>{selectedStat}</h4>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={graphData}
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" opacity={0.5} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip /> 
            {selectedStat === "예상소득" && age != null && (
              <ReferenceLine
                x={String(age)}
                stroke="red"
                strokeWidth={2}
                label={{ value: "", position: "insideTop" }}
              />
            )}
            <Bar
              dataKey="current"
              fill="#f4a9c0"
              animationDuration={1000}  
              label={selectedStat !== "예상소득" ? { position: "top", fill: "#f4a9c0", fontSize: 12 } : undefined}
            />
            {selectedStat !== "예상소득" && (
              <Bar
                dataKey="previous"
                fill="#3d8bfd"
                animationDuration={1000}  
                label={{ position: "top", fill: "#3d8bfd", fontSize: 12 }}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </PageContainer>
  );
}
