  import React, { useState, useEffect } from 'react';
  import styled from 'styled-components';
  import ChartCard from 'components/dashboard/chartcard';
  import PieChartCard from 'components/dashboard/piechart';
  import Badge from 'components/dashboard/Badge';
  import UserListCard from 'components/dashboard/UserListCard';
  import dummyDataMap from 'dummyData';

  const DashboardContainer = styled.div`
    flex: 1;
    padding: 24px;
    overflow-y: auto;
    @media (max-width: 768px) {
      padding: 16px;
    }
  `;

  const StatsContainer = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;  
    font-family: 'Pretendard', sans-serif;
  `;

  const StatBox = styled.div`
    flex: 1;
    min-width: 220px; 
    background-color: ${({ isSelected }) => (isSelected ? '#ffe9ec' : '#fff')};
    border: 2px solid ${({ isSelected }) => (isSelected ? '#260086' : 'gray')};
    border-radius: 8px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    
    &:hover {
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
      background-color: ${({ isSelected }) => (isSelected ? '#ffe9ec' : '#f8f8f8')};
    }
    font-family: 'Pretendard', sans-serif;
  `;

  const StatNumber = styled.p`
    font-size: clamp(15px, 4vw, 20px);
    font-weight: bold;
    margin: 0;
    white-space: nowrap;
  `;
  
  const ComparisonText = styled.p`
    font-size: clamp(10px, 2vw, 12px);
    margin: 0;
    white-space: nowrap;
    margin-left: 8px;
  `;

  const RowContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 24px;

    & > * {
      flex: 1;
      min-width: 300px;
    }
  `;

  const PeriodContainer = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
    font-family: 'Pretendard', sans-serif;
  `;

  const PeriodButton = styled.button`
    padding: 8px 16px;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    background-color: ${({ isSelected }) => (isSelected ? '#e08490' : '#fff')};
    color: ${({ isSelected }) => (isSelected ? '#fff' : '#444')};
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
    &:hover {
      background-color: ${({ isSelected }) => (isSelected ? '#d76a80' : '#f0f0f0')};
    }
    font-family: 'Pretendard', sans-serif;
  `; 

  const ChartsContainer = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap; 
    border-radius: 16px;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover {
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 3px 5px 5px rgba(0,0,0,0.22);
    }
    & > :first-child {
      flex: 2;
      min-width: 300px;
    }
    & > :last-child {
      flex: 1;
      min-width: 200px;
    }
  `;

  const Dashboard = () => {
    const [selectedStat, setSelectedStat] = useState('userCount');
    const [selectedPeriod, setSelectedPeriod] = useState('week');
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleStatClick = (statKey) => {
      setSelectedStat(statKey);
    };

    const handlePeriodClick = (periodKey) => {
      setSelectedPeriod(periodKey);
    };

    const periodComparisonLabel = {
      week: '지난 주 대비',
      month: '지난 달 대비',
      '6months': '지난 반기 대비',
      year: '작년 대비',
    }[selectedPeriod];

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          setDashboardData(dummyDataMap[selectedStat][selectedPeriod]);
        } catch (err) {
          setError('데이터를 불러오는 데 실패했습니다.');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [selectedStat, selectedPeriod]);

    if (loading) return <DashboardContainer>로딩중...</DashboardContainer>;
    if (error) return <DashboardContainer>{error}</DashboardContainer>;

    const currentData = dashboardData;

    return (
      <DashboardContainer> 
        <breadcrumbMaintitle>서비스 현황</breadcrumbMaintitle>
        <StatsContainer>
          <StatBox
            onClick={() => handleStatClick('userCount')}
            isSelected={selectedStat === 'userCount'}
            categoryName="사용자 수"
          >
            <h3>사용자 수</h3>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <StatNumber>6,212,541 명</StatNumber>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                <Badge change={3.2} />
                <ComparisonText>{periodComparisonLabel}</ComparisonText>
              </div>
            </div>
          </StatBox>
      
          <StatBox
            onClick={() => handleStatClick('totalSignups')}
            isSelected={selectedStat === 'totalSignups'}
            categoryName="총 가입 수치"
          >
            <h3>총 가입 수치</h3>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <StatNumber>14,141,141 명</StatNumber>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                <Badge change={-2.8} />
                <ComparisonText>{periodComparisonLabel}</ComparisonText>
              </div>
            </div>
          </StatBox>

          <StatBox
            onClick={() => handleStatClick('totalAmount')}
            isSelected={selectedStat === 'totalAmount'}
            categoryName="총 거래 액"
          >
            <h3>총 거래 액</h3>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <StatNumber>34,615,527 원</StatNumber>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                <Badge change={14.4} />
                <ComparisonText>{periodComparisonLabel}</ComparisonText>
              </div>
            </div>
          </StatBox>

          <StatBox
            onClick={() => handleStatClick('revenue')}
            isSelected={selectedStat === 'revenue'}
            categoryName="매출"
          >
            <h3>매출</h3>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <StatNumber>7,917,508 원</StatNumber>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                <Badge change={3.2} />
                <ComparisonText>{periodComparisonLabel}</ComparisonText>
              </div>
            </div>
          </StatBox>
        </StatsContainer>

        <PeriodContainer>
          <PeriodButton
            onClick={() => handlePeriodClick('week')}
            isSelected={selectedPeriod === 'week'}
          >
            주
          </PeriodButton>
          <PeriodButton
            onClick={() => handlePeriodClick('month')}
            isSelected={selectedPeriod === 'month'}
          >
            월
          </PeriodButton>
          <PeriodButton
            onClick={() => handlePeriodClick('6months')}
            isSelected={selectedPeriod === '6months'}
          >
            6개월
          </PeriodButton>
          <PeriodButton
            onClick={() => handlePeriodClick('year')}
            isSelected={selectedPeriod === 'year'}
          >
            연
          </PeriodButton>
        </PeriodContainer>
  
        <ChartsContainer>
          <ChartCard data={currentData.barData} name={selectedStat} />
        </ChartsContainer> 

        <RowContainer>
          <ChartsContainer>
            <PieChartCard data={currentData.pieData} />
          </ChartsContainer>
          <ChartsContainer>
            <UserListCard />
          </ChartsContainer>
        </RowContainer>
      
      </DashboardContainer>
    );
  };

  export default Dashboard;