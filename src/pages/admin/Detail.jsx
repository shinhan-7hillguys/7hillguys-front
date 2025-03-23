import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ChartCard from 'components/dashboard/chartcard';
import LineChartCard from 'components/dashboard/LineChartCard';  
import PieChartCard from 'components/dashboard/piechart';
import Badge from 'components/dashboard/Badge';
import axios from 'axios';

const PageContainer = styled.div`
  padding: 24px;
  background-color: #f5f5f5;
  min-height: 100vh;
  position: relative;
`;

const ContentWrapper = styled.div`
  position: relative;
`;

const ScrollButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: #e08490;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #d76a80;
  }
`;

const ScrollButtonUp = styled(ScrollButton)`
  bottom: 100px;
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

const StatBoxesContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const StatBox = styled.div`
  flex: 1;
  min-width: 220px;
  background-color: ${({ $isSelected }) => ($isSelected ? '#ffe9ec' : '#fff')};
  border: 2px solid ${({ $isSelected }) => ($isSelected ? '#260086' : 'gray')};
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({ $isSelected }) => ($isSelected ? '#ffe9ec' : '#f8f8f8')};
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

const ApproveButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  background-color: #eaeaea;
  color: black;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #4CAF50;
  }
`;

const RejectButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  background-color: #eaeaea;
  color: black;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #f44336;
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
  display: block;
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
      <FieldInput type="text" value={value || "없음"} placeholder={placeholder} readOnly />
    </FieldContainer>
  );
}

const formatDateTime = (dateStr) => {
  if (!dateStr) return "없음";
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
};

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

const CertificationBadge = styled.span`
  display: inline-block;
  background-color: #e08490;
  color: white;
  padding: 4px 12px;
  border-radius: 16px;
  margin-top : 10px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 14px;
`;
const DetailPage = () => {
  const { userid } = useParams(); 

  const [userInfo, setUserInfo] = useState({});
  const [statCategories, setStatCategories] = useState({});
  const [dataMap, setDataMap] = useState({});
  const [currentData, setCurrentData] = useState({ barData: [], pieData: [] });
  const [selectedStat, setSelectedStat] = useState('remainingSupport');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [resultModalMessage, setResultModalMessage] = useState("");

  const [expectedValue, setExpectedValue] = useState(null);
  const [expectedIncomes, setExpectedIncomes] = useState(null);
  const [expectedIncomeChartData, setExpectedIncomeChartData] = useState([]);

  const topSectionRef = useRef(null);
  const bottomSectionRef = useRef(null);

  const [dashboardData, setDashboardData] = useState(null);
  const [rawGraphData, setRawGraphData] = useState(null);
  const [graphData, setGraphData] = useState([]);
 
  useEffect(() => {
    if (userid) {
      axios.get(`/api/user/info?userid=${userid}`, { withCredentials: true })
        .then(response => {
          setUserInfo(response.data);
          console.log(response.data);
        })
        .catch(err => console.error("userInfo 조회 실패:", err));
    }
  }, [userid]);

  // 통계 데이터 초기화 – 실제 로직에 맞게 수정 필요
  useEffect(() => {
    setStatCategories({
      remainingSupport: "남은 지원금",
    });
    setDataMap({
      remainingSupport: {
        month: {
          barData: [
            { name: "현재", usage: 500000 },
            { name: "예상", usage: 600000 }
          ],
          pieData: [
            { name: "현재", usage: 500000 },
            { name: "예상", usage: 600000 }
          ],
          prevTotal: 450000
        }
      }
    });
  }, []);

  useEffect(() => {
    if (dataMap[selectedStat] && dataMap[selectedStat][selectedPeriod]) {
      setCurrentData(dataMap[selectedStat][selectedPeriod]);
    }
  }, [selectedStat, selectedPeriod, dataMap]);
 
  useEffect(() => {
    if (userid) {
      axios.get(`/api/expectedvalue/${userid}`, { withCredentials: true })
        .then(response => {
          setExpectedValue(response.data);
        })
        .catch(err => console.error("예상 가치 조회 실패:", err));
    }
  }, [userid]);


     useEffect(() => {
    if (userid) {
      axios.get(`/api/expectedincome/${userid}`, { withCredentials: true })
        .then(response => {
          console.log("예상 수익 응답:", response.data);
          const data = Array.isArray(response.data) ? response.data[0] : response.data;
          setExpectedIncomes(data);
        })
        .catch(err => console.error("예상 수익 조회 실패:", err));
    }
  }, [userid]);
 
  useEffect(() => {
    let incomeData = [];
    if (expectedIncomes && expectedIncomes.expectedIncome) {
      try {
        const parsedIncome = JSON.parse(expectedIncomes.expectedIncome);
        incomeData = Object.entries(parsedIncome).map(([key, value]) => ({
          name: key,      
          usage: value    
        }));
      } catch (error) {
        console.error("JSON 파싱 에러:", error);
      }
    }
    setExpectedIncomeChartData(incomeData);
  }, [expectedIncomes]);

  // 통계 관련 헬퍼 함수
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

  const calculateAge = (birthDate) => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };
   
  const currentAge = calculateAge(userInfo.birthDate);

  const handleConfirm = async () => {
    let resultMessage = "";
    if (modalType === 'approve') {
      console.log('사용자 승인 처리');
      try {
        const response = await axios.post('/api/investment/approve', {}, { withCredentials: true });
        resultMessage = "승인 처리 완료: " + (response.data.message || "처리 성공");
      } catch (error) {
        resultMessage = "승인 처리 실패: " + (error.response?.data?.message || error.message);
      }
    } else if (modalType === 'reject') {
      console.log('사용자 거절 처리');
      try {
        const response = await axios.post('/api/investment/reject', {}, { withCredentials: true });
        resultMessage = "거절 처리 완료: " + (response.data.message || "처리 성공");
      } catch (error) {
        resultMessage = "거절 처리 실패: " + (error.response?.data?.message || error.message);
      }
    }
    setModalOpen(false);
    setModalType(null);
    setResultModalMessage(resultMessage);
    setResultModalOpen(true);

    // 2초 후 페이지 새로고침
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setModalType(null);
  };

  const scrollToTop = () => {
    if (topSectionRef.current) {
      topSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    if (bottomSectionRef.current) {
      bottomSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
 
  const parseJSONField = (jsonStr, defaultValue = {}) => {
    try {
      return JSON.parse(jsonStr) || defaultValue;
    } catch (error) {
      console.error("JSON 파싱 실패:", error);
      return defaultValue;
    }
  };
 
  const universityData = parseJSONField(userInfo.universityInfo);
  const highSchoolData = parseJSONField(userInfo.studentCard);
  const certificationData = parseJSONField(userInfo.certification, []);
  const familyData = parseJSONField(userInfo.familyStatus);

  const universityName = universityData?.name || "없음";
  const major = universityData?.degree || "없음";

  const highSchool = highSchoolData?.highschool || "없음";
  const transcript = highSchoolData?.gpa || "없음";

  const certifications = Array.isArray(certificationData)
    ? certificationData.join(", ")
    : certificationData.toString() || "없음";

  const marriageStatus = familyData?.marriageStatus || "없음";
  const children = familyData?.children != null ? familyData.children.toString() : "없음";

  let certificationsArray = [];
  
    if (Array.isArray(certificationData)) {
      certificationsArray = certificationData.map(cert => 
        typeof cert === 'object' && cert.certificate ? cert.certificate : cert
      );
    } else if (typeof certificationData === 'object' && certificationData !== null) {
      certificationsArray = [certificationData.certificate];
    } else if (certificationData) {
      certificationsArray = [certificationData.toString()];
    }
  return (
    <PageContainer>
      <ContentWrapper>
        {/* 기본 사용자 정보 섹션 */}
        <Section ref={topSectionRef}>
          <SectionTitle>기본 사용자 정보</SectionTitle>
          <InfoContainer>
            <UserInfo>
              <ReadOnlyField label="이름" value={userInfo.name} />
              <ReadOnlyField label="이메일" value={userInfo.email} />
              <ReadOnlyField label="생년월일" value={userInfo.birthDate} />
              <ReadOnlyField label="전화번호" value={userInfo.phone} />
              <ReadOnlyField label="주소" value={userInfo.address} />
              <ReadOnlyField label="역할" value={userInfo.role} />
              <ReadOnlyField label="가입일" value={formatDateTime(userInfo.createdAt)} />
            </UserInfo>
          </InfoContainer>
          {userInfo.status === "대기" && (
            <div style={{ marginTop: '16px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <ApproveButton onClick={() => { setModalType('approve'); setModalOpen(true); }}>
                심사 승인
              </ApproveButton>
              <RejectButton onClick={() => { setModalType('reject'); setModalOpen(true); }}>
                심사 거절
              </RejectButton>
            </div>
          )}
        </Section>

        {/* 통계 섹션 */}
        <Section>
          <SectionTitle>통계</SectionTitle>
          <StatBoxesContainer>
            {Object.entries(statCategories).map(([key, label]) => (
              <StatBox
                key={key}
                onClick={() => setSelectedStat(key)}
                $isSelected={selectedStat === key}
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
          <SectionTitle >예상 소득</SectionTitle>
          <StatBoxesContainer>
            <StatBox style = {{marginBottom: '30px'}}>
              <StatTitleText>예상 소득</StatTitleText>
              <StatNumber>
                {expectedValue !== null 
                  ? expectedValue.toLocaleString() + ' 원' 
                  : "데이터 없음"}
              </StatNumber>
            </StatBox>
          </StatBoxesContainer>
          <ChartsContainer> 
            <LineChartCard data={expectedIncomeChartData} name="예상 소득" currentAge={currentAge} />
             
          </ChartsContainer>
        </Section>
        <Section>
  <SectionTitle>사용자 프로필 정보</SectionTitle>
  <ReadOnlyField label="대학" value={universityName} />
  <ReadOnlyField label="학과" value={major} />
  <ReadOnlyField label="고등학교" value={highSchool} />
  <ReadOnlyField label="내신" value={transcript} />
  <div style={{ marginBottom: '16px' }}>
    <FieldLabel>자격증</FieldLabel>
    <div>
      {certificationsArray.length > 0 ? (
        certificationsArray.map((cert, idx) => (
          <CertificationBadge key={idx}>{cert}</CertificationBadge>
        ))
      ) : (
        <span>없음</span>
      )}
    </div>
  </div>
  <ReadOnlyField label="결혼상태" value={marriageStatus} />
  <ReadOnlyField label="자녀" value={children} />
  <ReadOnlyField label="자산" value={userInfo.assets ? userInfo.assets.toLocaleString() + ' 원' : null} />
  <ReadOnlyField label="범죄 기록" value={userInfo.criminalRecord ? '없음' : null} />
  <ReadOnlyField label="건강 상태" value={userInfo.healthStatus} />
  <ReadOnlyField label="성별" value={userInfo.gender != null ? (userInfo.gender ? '여성' : '남성') : null} />
  <ReadOnlyField label="인성 점수" value={userInfo.mentalStatus} />
  <ReadOnlyField label="프로필 생성일" value={formatDateTime(userInfo.profileCreatedAt)} />
</Section>


        {/* 투자 정보 섹션 */}
        <Section>
          <SectionTitle>투자 정보</SectionTitle>
          <ReadOnlyField label="투자 ID" value={userInfo.grantId} />
          <ReadOnlyField label="투자 시작일" value={userInfo.startDate} />
          <ReadOnlyField label="투자 종료일" value={userInfo.endDate} />
          <ReadOnlyField label="상태" value={userInfo.status} />
          <ReadOnlyField label="누적 투자 금액" value={userInfo.originalInvestValue ? userInfo.originalInvestValue.toLocaleString() + ' 원' : null} />
          <ReadOnlyField label="월 지원금" value={userInfo.monthlyAllowance ? userInfo.monthlyAllowance.toLocaleString() + ' 원' : null} />
          <ReadOnlyField label="상환 비율" value={userInfo.refundRate ? userInfo.refundRate + '%' : null} />
          <ReadOnlyField label="최대 투자 가능 금액" value={userInfo.maxInvestment ? userInfo.maxInvestment.toLocaleString() + ' 원' : null} />
          <ReadOnlyField label="운용 보수" value={userInfo.field} placeholder="운용 보수" />
          <ReadOnlyField label="사용한 지원금" value={userInfo.investValue ? userInfo.investValue.toLocaleString() + ' 원' : null} />
          <ReadOnlyField label="임시 월 지원금" value={userInfo.tempAllowance ? userInfo.tempAllowance.toLocaleString() + ' 원' : null} />
          <ReadOnlyField label="투자 생성일" value={formatDateTime(userInfo.investmentCreatedAt)} />
        </Section>

        <Section ref={bottomSectionRef} style={{ height: 0, overflow: 'hidden', margin: 0, padding: 0 }}></Section>


        {/* 모달 영역 */}
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

        {resultModalOpen && (
          <ApprovalModalOverlay>
            <ApprovalModalContent>
              <h3>{resultModalMessage}</h3>
              <ModalButtonContainer>
                <PeriodButton onClick={() => setResultModalOpen(false)}>닫기</PeriodButton>
              </ModalButtonContainer>
            </ApprovalModalContent>
          </ApprovalModalOverlay>
        )}
      </ContentWrapper>

      <ScrollButtonUp onClick={scrollToTop}>↑</ScrollButtonUp>
      <ScrollButton onClick={scrollToBottom}>↓</ScrollButton>
    </PageContainer>
  );
};

export default DetailPage;
