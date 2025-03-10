import { useState, useEffect } from "react";
import styled from "styled-components";
 
const Container = styled.div`
  padding: 16px;
  background: #dedada;
`;

 

const UserInfo = styled.div`
  margin-top: 16px;
  background : #dedada;
`;

const Username = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const Greeting = styled.p`
  color: gray;
`;

const Card = styled.div`
  background: white;
  padding: 16px;
  margin-top: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 16px;
  background-color: #dedada;
  border-radius : 35px;
`;

const FilterGroup = styled.div`
  display: flex;
  border-radius: 24px;
  
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  background: none;        /* 배경색 제거 */
  border: none;            /* 테두리 제거 */
  font-weight: bold;
  cursor: pointer;
  color: ${(props) => (props.active ? "#f4a9c0" : "black")};
  transition: color 0.3s ease;

  &:not(:last-child) {
    border-right: none;
  }
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
  border-radius: 24px;

`;

const StatCard = styled(Card)`
  cursor: pointer;
  border: ${(props) => (props.highlight ? "2px solid red" : "none")};
  color: ${(props) => (props.highlight ? "red" : "black")};
  transition: all 0.3s ease; /* 테두리, 글자색 변경 시 부드럽게 */
`;
 

export default function MainPage() {

  const [timeFilter, setTimeFilter] = useState("월"); 
  const [typeFilter, setTypeFilter] = useState("나");

  const [selectedStat, setSelectedStat] = useState("납부율"); 

  const [usage, setUsage] = useState(382000);
  const [percentages, setPercentages] = useState({ payRate: 23, support: 63, income: 29 });
  const [lastMonthUsage, setLastMonthUsage] = useState(297000);
  const [comparison, setComparison] = useState(13);
  const [graphData, setGraphData] = useState([
    { time: "00:00", sales: 50, revenue: 40, customers: 20 },
    { time: "01:00", sales: 70, revenue: 50, customers: 30 },
    { time: "02:00", sales: 80, revenue: 60, customers: 40 },
  ]);

  useEffect(() => {
  
    if (timeFilter === "월" && typeFilter === "나" && selectedStat === "납부율") {
      setUsage(382000);
      setPercentages({ payRate: 23, support: 63, income: 29 });
      setComparison(13);
      setGraphData([
        { time: "00:00", sales: 50, revenue: 40, customers: 20 },
        { time: "01:00", sales: 70, revenue: 50, customers: 30 },
        { time: "02:00", sales: 80, revenue: 60, customers: 40 },
      ]);
    } else if (timeFilter === "월" && typeFilter === "나" && selectedStat === "지원금") {
      setUsage(400000);
      setPercentages({ payRate: 18, support: 75, income: 29 });
      setComparison(10);
      setGraphData([
        { time: "00:00", sales: 60, revenue: 50, customers: 30 },
        { time: "01:00", sales: 80, revenue: 60, customers: 40 },
        { time: "02:00", sales: 90, revenue: 70, customers: 50 },
      ]);
    } else if (timeFilter === "월" && typeFilter === "나" && selectedStat === "월 소득") {
      setUsage(420000);
      setPercentages({ payRate: 25, support: 50, income: 35 });
      setComparison(7);
      setGraphData([
        { time: "00:00", sales: 55, revenue: 45, customers: 25 },
        { time: "01:00", sales: 75, revenue: 55, customers: 35 },
        { time: "02:00", sales: 95, revenue: 65, customers: 45 },
      ]);
    } 
  }, [timeFilter, typeFilter, selectedStat]);

  return (
    <Container>

      <UserInfo>
        <Username>000 님</Username>
        <Greeting>안녕하세요!</Greeting>
      </UserInfo>

      <Card>
        <h3>이번 달 이용액</h3>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>
          {usage.toLocaleString()} 원
        </p>
      </Card>
 
      <FilterContainer>
        <FilterGroup>
          <FilterButton
            active={timeFilter === "월"}
            onClick={() => setTimeFilter("월")}
          >
            월
          </FilterButton>
          <FilterButton
            active={timeFilter === "일"}
            onClick={() => setTimeFilter("일")}
          >
            일
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
      </FilterContainer>
 
      <StatGrid>
        <StatCard
          highlight={selectedStat === "납부율"}
          onClick={() => setSelectedStat("납부율")}
        >
          <p>납부율</p>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            {percentages.payRate}%
          </p>
        </StatCard>
        <StatCard
          highlight={selectedStat === "지원금"}
          onClick={() => setSelectedStat("지원금")}
        >
          <p>지원금</p>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            {percentages.support}%
          </p>
        </StatCard>
        <StatCard
          highlight={selectedStat === "월 소득"}
          onClick={() => setSelectedStat("월 소득")}
        >
          <p>월 소득</p>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            {percentages.income}%
          </p>
        </StatCard>
      </StatGrid>

      <Card>
        <p>
          지난 달 이맘때에 비해{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>{comparison}%</span>{" "}
          더 많이 사용했어요.
        </p>
        <p>지난 달 21일까지 사용액: {lastMonthUsage.toLocaleString()} 원</p>
      </Card>

      
    </Container>
  );
}
