import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import config from 'config';
import ChartCard from 'components/dashboard/chartcard';
import PieChartCard from 'components/dashboard/piechart';
import Badge from 'components/dashboard/Badge';
import { dummyUser, dummyUserProfile, dummyInvestment, dummyStatCategories, dummyDataMap } from 'dummyData';

const PageContainer = styled.div`
  padding: 24px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Section = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 20px;
  margin-bottom: 24px; 
`;

const SectionTitle = styled.h2`
  margin-bottom: 16px;
  font-size: 22px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
`;

const InfoContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const UserInfo = styled.div`
  flex: 2;
`;

const UserImagePlaceholder = styled.div`
  flex: 1;
  background-color: #eaeaea;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #777;
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Label = styled.div`
  flex: 0 0 150px;
  font-weight: bold;
  color: #555;
`;

const Value = styled.div`
  flex: 1;
  color: #777;
`;

const StatBoxesContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const StatBox = styled.div`
  flex: 1;
  min-width: 220px;
  background-color: ${({ isSelected }) => (isSelected ? '#ffe9ec' : '#fff')};
  border: 2px solid ${({ isSelected }) => (isSelected ? '#260086' : 'gray')};
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? '#ffe9ec' : '#f8f8f8')};
    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  }
  font-family: 'Pretendard', sans-serif;
`;

const StatTitleText = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
`;

const StatNumber = styled.p`
  font-size: clamp(20px, 4vw, 24px);
  font-weight: bold;
  margin: 0;
  white-space: nowrap;
`;

const ComparisonText = styled.p`
  font-size: clamp(12px, 2vw, 16px);
  margin: 0;
  margin-left: 8px;
`;

const ChartsContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  & > :first-child {
    flex: 2;
    min-width: 300px;
  }
  & > :last-child {
    flex: 1;
    min-width: 200px;
  }
`;

const PeriodContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;

const PeriodButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  background-color: ${({ isSelected }) => (isSelected ? '#e08490' : '#fff')};
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#444')};
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? '#d76a80' : '#f0f0f0')};
  }
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const FieldLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #555;
  margin-bottom: 6px;
`;

const FieldInput = styled.input`
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  padding: 12px;
  color: #666;
  &:read-only {
    cursor: default;
  }
`;

function ReadOnlyField({ label, value, placeholder }) {
  return (
    <FieldContainer>
      <FieldLabel>{label}</FieldLabel>
      <FieldInput type="text" value={value || ''} placeholder={placeholder} readOnly />
    </FieldContainer>
  );
}

// 모달 관련 스타일 정의
const ApprovalModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ApprovalModalContent = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  min-width: 300px;
  text-align: center;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
`;

const DetailPage = () => {
  const useDummyData = config.useDummyData;

  const [user, setUser] = useState(useDummyData ? dummyUser : {});
  const [profile, setProfile] = useState(useDummyData ? dummyUserProfile : {});
  const [investment, setInvestment] = useState(useDummyData ? dummyInvestment : {});
  const [statCategories, setStatCategories] = useState(useDummyData ? dummyStatCategories : {});
  const [dataMap, setDataMap] = useState(useDummyData ? dummyDataMap : {});
  const [currentData, setCurrentData] = useState({ barData: [], pieData: [] });
  const [selectedStat, setSelectedStat] = useState('remainingSupport');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 모달 관련 state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'approve' 또는 'reject'

  useEffect(() => {
    if (!useDummyData) {
      // API 호출 로직 구현...
    }
  }, [useDummyData]);

  useEffect(() => {
    if (dataMap[selectedStat] && dataMap[selectedStat][selectedPeriod]) {
      setCurrentData(dataMap[selectedStat][selectedPeriod]);
    }
  }, [selectedStat, selectedPeriod, dataMap]);

  const getCurrentTotalForCategory = (cat) => {
    if (dataMap[cat] && dataMap[cat][selectedPeriod]) {
      return dataMap[cat][selectedPeriod].barData.reduce((sum, item) => sum + item.usage, 0);
    }
    return 0;
  };

  const getPrevTotalForCategory = (cat) => {
    if (dataMap[cat] && dataMap[cat][selectedPeriod]) {
      return dataMap[cat][selectedPeriod].prevTotal || 0;
    }
    return 0;
  };

  const computeBadgeChangeForCategory = (cat) => {
    const currentTotal = getCurrentTotalForCategory(cat);
    const prevTotal = getPrevTotalForCategory(cat);
    if (!prevTotal) return 0;
    const change = ((currentTotal - prevTotal) / prevTotal) * 100;
    return change.toFixed(1);
  };

  const statDisplayValueForCategory = (cat) => {
    const total = getCurrentTotalForCategory(cat);
    if (cat === 'remainingSupport') {
      return total.toLocaleString() + ' 원';
    } else {
      return total.toLocaleString() + '%';
    }
  };

  const periodComparisonLabel = {
    week: '지난 주 대비',
    month: '지난 달 대비',
    '6months': '지난 반기 대비',
    year: '작년 대비',
  }[selectedPeriod];

  // 승인/거절 처리 함수 (실제 로직 구현 시 API 호출 등 추가)
  const handleConfirm = () => {
    if (modalType === 'approve') {
      console.log('사용자 승인 처리');
      // 승인 처리 로직 추가
    } else if (modalType === 'reject') {
      console.log('사용자 거절 처리');
      // 거절 처리 로직 추가
    }
    setModalOpen(false);
    setModalType(null);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setModalType(null);
  };

  return (
    <PageContainer>
      <Section>
        <SectionTitle>기본 사용자 정보</SectionTitle>
        <InfoContainer>
          <UserInfo>
            <ReadOnlyField label="이름" value={user.name} />
            <ReadOnlyField label="이메일" value={user.email} />
            <ReadOnlyField label="생년월일" value={user.birth_date} />
            <ReadOnlyField label="전화번호" value={user.phone} />
            <ReadOnlyField label="주소" value={user.address} />
            <ReadOnlyField label="역할" value={user.role} />
            <ReadOnlyField label="가입일" value={user.created_at} />
          </UserInfo>
          <UserImagePlaceholder>사용자 이미지</UserImagePlaceholder>
        </InfoContainer>
        {/* 승인 및 거절 버튼 추가 */}
        <div style={{ marginTop: '16px', display: 'flex', gap: '16px' }}>
          <PeriodButton onClick={() => { setModalType('approve'); setModalOpen(true); }}>
            심사 승인
          </PeriodButton>
          <PeriodButton onClick={() => { setModalType('reject'); setModalOpen(true); }}>
            심사 거절
          </PeriodButton>
        </div>
      </Section>

      <Section>
        <SectionTitle>통계</SectionTitle>
        <StatBoxesContainer>
          {Object.entries(statCategories).map(([key, label]) => (
            <StatBox
              key={key}
              onClick={() => setSelectedStat(key)}
              isSelected={selectedStat === key}
            >
              <StatTitleText>{label}</StatTitleText>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <StatNumber>{statDisplayValueForCategory(key)}</StatNumber>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                  <Badge change={computeBadgeChangeForCategory(key)} />
                  <ComparisonText>{periodComparisonLabel}</ComparisonText>
                </div>
              </div>
            </StatBox>
          ))}
        </StatBoxesContainer>

        <PeriodContainer>
          {selectedStat !== 'remainingSupport' && (
            <PeriodButton
              onClick={() => setSelectedPeriod('week')}
              isSelected={selectedPeriod === 'week'}
            >
              주
            </PeriodButton>
          )}
          <PeriodButton
            onClick={() => setSelectedPeriod('month')}
            isSelected={selectedPeriod === 'month'}
          >
            월
          </PeriodButton>
          <PeriodButton
            onClick={() => setSelectedPeriod('6months')}
            isSelected={selectedPeriod === '6months'}
          >
            6개월
          </PeriodButton>
          <PeriodButton
            onClick={() => setSelectedPeriod('year')}
            isSelected={selectedPeriod === 'year'}
          >
            연
          </PeriodButton>
        </PeriodContainer>

        <ChartsContainer>
          <ChartCard data={currentData.barData} name={statCategories[selectedStat]} />
          <PieChartCard data={currentData.pieData} />
        </ChartsContainer>
      </Section>

      <Section>
        <SectionTitle>사용자 프로필 정보</SectionTitle>
        <ReadOnlyField label="대학/학과" value={profile.university} />
        <ReadOnlyField label="고등학교 및 내신" value={profile.education_major} />
        <ReadOnlyField label="자격증" value={profile.certification} />
        <ReadOnlyField label="가족 상태" value={profile.family_status} />
        <ReadOnlyField label="자산" value={profile.assets?.toLocaleString() + ' 원'} />
        <ReadOnlyField label="범죄 기록" value={profile.criminal_record ? '있음' : '없음'} />
        <ReadOnlyField label="건강 상태" value={profile.health_status} />
        <ReadOnlyField label="성별" value={profile.gender ? '남성' : '여성'} />
        <ReadOnlyField label="주소" value={profile.address} />
        <ReadOnlyField label="정신 상태" value={profile.mental_status} />
        <ReadOnlyField label="프로필 생성일" value={profile.created_at} />
      </Section>

      <Section>
        <SectionTitle>투자 정보</SectionTitle>
        <ReadOnlyField label="투자 ID" value={investment.grant_id} />
        <ReadOnlyField label="예상 소득" value={investment.expected_income} />
        <ReadOnlyField label="투자 시작일" value={investment.start_date} />
        <ReadOnlyField label="투자 종료일" value={investment.end_date} />
        <ReadOnlyField label="상태" value={investment.status} />
        <ReadOnlyField label="원래 투자 금액" value={investment.original_invest_value?.toLocaleString() + ' 원'} />
        <ReadOnlyField label="월 지원금" value={investment.monthly_allowance?.toLocaleString() + ' 원'} />
        <ReadOnlyField label="상환 비율" value={investment.refund_rate + '%'} />
        <ReadOnlyField label="최대 투자 가능 금액" value={investment.max_investment?.toLocaleString() + ' 원'} />
        <ReadOnlyField label="운용 보수" value={investment.Field} placeholder="운용 보수" />
        <ReadOnlyField label="사용한 지원금" value={investment.invest_value?.toLocaleString() + ' 원'} />
        <ReadOnlyField label="임시 월 지원금" value={investment.temp_allowance?.toLocaleString() + ' 원'} />
        <ReadOnlyField label="투자 생성일" value={investment.created_at} />
      </Section>

      {/* 모달 컴포넌트 */}
      {modalOpen && (
        <ApprovalModalOverlay>
          <ApprovalModalContent>
            <h3>
              {modalType === 'approve' ? '정말 승인하시겠습니까?' : '정말 거절하시겠습니까?'}
            </h3>
            <ModalButtonContainer>
              <PeriodButton onClick={handleConfirm}>확인</PeriodButton>
              <PeriodButton onClick={handleCancel}>취소</PeriodButton>
            </ModalButtonContainer>
          </ApprovalModalContent>
        </ApprovalModalOverlay>
      )}
    </PageContainer>
  );
};

export default DetailPage;
