import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
// import axios from "axios"; // 실제 API 호출 시 사용

// 1. 더미 거래 데이터
//    실제 DB에서는 결제 내역(거래)이 개별 행으로 저장됩니다.
//    각 거래는 storeId, category, originalAmount(원금),
//    finalAmount(현재 혜택만 적용된 결제 금액), discountAmount(할인 받은 금액)을 포함합니다.
const dummyTransactions = [
  { paymentId: 1, storeId: 1, category: "Food", originalAmount: 5000, finalAmount: 4500, discountAmount: 500 },
  { paymentId: 2, storeId: 2, category: "Shopping", originalAmount: 10000, finalAmount: 9000, discountAmount: 1000 },
  { paymentId: 3, storeId: 1, category: "Food", originalAmount: 7000, finalAmount: 6300, discountAmount: 700 },
  { paymentId: 4, storeId: 3, category: "Entertainment", originalAmount: 3000, finalAmount: 2700, discountAmount: 300 },
  { paymentId: 5, storeId: 1, category: "Food", originalAmount: 6000, finalAmount: 5400, discountAmount: 600 },
  { paymentId: 6, storeId: 2, category: "Shopping", originalAmount: 8000, finalAmount: 7200, discountAmount: 800 },
  { paymentId: 7, storeId: 4, category: "Travel", originalAmount: 4000, finalAmount: 3800, discountAmount: 200 },
  { paymentId: 8, storeId: 3, category: "Entertainment", originalAmount: 3500, finalAmount: 3150, discountAmount: 350 },
];

// 2. 더미 혜택 데이터
//    Benefit 페이지에서 가져온 데이터라고 가정합니다.
//    기존 혜택(dummySelectedBenefits)와 임시 추가 혜택(dummyAddedBenefits)
//    각각 discountRate(%)와 혜택이 적용될 storeId를 포함합니다.
const dummySelectedBenefits = [
  { benefitId: 101, name: "기존 혜택 1", description: "기존 혜택 설명1", discountRate: 10, storeId: 1 },
  { benefitId: 102, name: "기존 혜택 2", description: "기존 혜택 설명2", discountRate: 20, storeId: 2 },
];

const dummyAddedBenefits = [
  { benefitId: 103, name: "추가 혜택 1", description: "추가 혜택 설명1", discountRate: 15, storeId: 1 },
];

// 3. 그래프 색상 배열
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// BenefitCompare 컴포넌트
const BenefitCompare = () => {
  // 4. 상태 관리: 선택한 달, 거래 데이터, 로딩 상태, 그래프 유형을 관리합니다.
  const [selectedMonth, setSelectedMonth] = useState("2025-03");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChart, setSelectedChart] = useState("bar");

  // 5. useEffect: selectedMonth가 변경될 때마다 거래 데이터를 불러옵니다.
  //    실제로는 API를 호출하지만 여기서는 1초 딜레이 후 더미 데이터를 사용합니다.
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        // 실제 API 호출 예시:
        // const response = await axios.get(`/api/transactions?month=${selectedMonth}`);
        // setTransactions(response.data);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 딜레이
        setTransactions(dummyTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [selectedMonth]);

  // 6. 모든 혜택 데이터: 기존 혜택과 추가 혜택을 합칩니다.
  const allBenefits = [...dummySelectedBenefits, ...dummyAddedBenefits];

    // 7. 거래 데이터를 카테고리별로 그룹화하여 집계합니다.
    //    각 거래에서, 거래의 storeId와 일치하는 혜택을 찾아 그 할인율을 합산합니다.
    //    그런 후, 각 카테고리별로 원금(originalAmount), 현재 혜택 적용 후 금액(finalAmount),
    //    그리고 새로운 조합 적용 후 금액(newFinal)을 계산합니다.
    const aggregatedData = transactions.reduce((acc, txn) => {
        // 매칭되는 혜택: 거래의 storeId와 같은 혜택들을 찾습니다.
        const matchingBenefits = allBenefits.filter((benefit) => benefit.storeId === txn.storeId);
        // 거래 당 하나의 혜택만 적용된다면 find를 사용할 수도 있습니다.
        // const matchingBenefit = allBenefits.find((benefit) => benefit.storeId === txn.storeId);
        // const effectiveDiscountRate = matchingBenefit ? matchingBenefit.discountRate : 0;
      
        // 여기서는 여러 혜택이 적용될 수 있다고 가정하고 할인율을 합산합니다.
        const effectiveDiscountRate = matchingBenefits.reduce((sum, b) => sum + b.discountRate, 0);
      
        // 새로운 조합 적용 후 결제 금액 계산:
        // newFinal = originalAmount * (1 - effectiveDiscountRate/100)
        const newFinal = txn.originalAmount * (1 - effectiveDiscountRate / 100);
      
        // 그룹화: 거래의 category를 키로 사용합니다.
        if (!acc[txn.category]) {
          acc[txn.category] = {
            category: txn.category,
            originalAmount: 0,
            finalAmount: 0,
            newFinal: 0,
            discountAmount: 0,
          };
        }
        acc[txn.category].originalAmount += txn.originalAmount;
        acc[txn.category].finalAmount += txn.finalAmount;
        acc[txn.category].newFinal += newFinal;
        // 여기서, 기존 discountAmount 대신 새로 계산된 할인액 (originalAmount - newFinal)을 누적합니다.
        acc[txn.category].discountAmount += (txn.originalAmount - newFinal);
        return acc;
      }, {});
      const computedData = Object.values(aggregatedData);
      
      // 전체 합계 계산 (막대 그래프 위에 표시할 값)
      const totalCurrentFinal = computedData.reduce((acc, cur) => acc + cur.finalAmount, 0);
      const totalNewFinal = computedData.reduce((acc, cur) => acc + cur.newFinal, 0);
      

  // 9. JSX 렌더링
  return (
    <div style={{ padding: "20px" }}>
      <h1>혜택 적용 결과 비교</h1>
      {/* 달 선택 UI */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="month-select">월 선택: </label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="2025-03">2025-03</option>
          <option value="2025-04">2025-04</option>
        </select>
      </div>
      {/* 전체 요약 정보 */}
      <div>
        <p>현재 혜택 적용 후 결제 금액: {totalCurrentFinal.toLocaleString()} 원</p>
        <p>새로운 조합 적용 후 결제 금액: {totalNewFinal.toLocaleString()} 원</p>
        <p>(거래 내역의 storeId와 혜택의 storeId가 일치할 때 할인 적용)</p>
      </div>
      {/* 그래프 전환 버튼 */}
      <div style={{ margin: "20px 0" }}>
        <button
          onClick={() => setSelectedChart("bar")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: selectedChart === "bar" ? "#82ca9d" : "#ccc",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          결제 금액 비교
        </button>
        <button
          onClick={() => setSelectedChart("pie")}
          style={{
            padding: "10px 20px",
            backgroundColor: selectedChart === "pie" ? "#82ca9d" : "#ccc",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          할인 비율
        </button>
      </div>
      {loading ? (
        <div style={{ textAlign: "center", margin: "50px 0", fontSize: "1.2rem" }}>
          로딩중입니다...
        </div>
      ) : (
        <>
          {selectedChart === "bar" ? (
            // 막대 그래프: 각 카테고리별로 현재 혜택 적용 후(finalAmount)와 새로운 조합 적용 후(newFinal) 결제 금액을 비교
            <div style={{ width: "100%", height: 300, marginBottom: "40px" }}>
              <h2>카테고리별 결제 금액 비교</h2>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={computedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value.toLocaleString()} 원`} />
                  <Legend />
                  <Bar dataKey="finalAmount" fill="#8884d8" name="현재 혜택 적용 후" />
                  <Bar dataKey="newFinal" fill="#82ca9d" name="새로운 조합 적용 후" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            // 원형 그래프: 각 카테고리별 할인 금액(discountAmount)의 비율을 표시
            <div style={{ width: "100%", height: 300 }}>
              <h2>카테고리별 할인 금액 비율</h2>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={computedData}
                    dataKey="discountAmount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {computedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value.toLocaleString()} 원`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BenefitCompare;
