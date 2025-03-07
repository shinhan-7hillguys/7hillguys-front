// src/pages/BenefitCompare.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { fetchPayments } from "../../features/paymentSlice"; // 거래 데이터를 비동기로 가져오는 Thunk 액션
import "styles/card/benefit.css";

// 그래프 색상 배열
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const BenefitCompare = () => {
  const dispatch = useDispatch();
  
  // 로컬 상태: 선택한 달과 그래프 전환을 위한 상태
  const [selectedMonth, setSelectedMonth] = useState("2025-03");
  const [selectedChart, setSelectedChart] = useState("bar");

  // Redux store에서 거래 데이터와 혜택 데이터를 가져옵니다.
  // paymentSlice: payments, status, error
  const { payments, status } = useSelector((state) => state.payment);
  // benefitSlice: selectedBenefits, addedBenefits
  const { selectedBenefits, addedBenefits } = useSelector((state) => state.benefit);

  // 로딩 상태: Redux payment 상태의 status가 "loading"이면 true
  const loading = status === "loading";

  // useEffect: 선택한 달이 변경되면, 거래 데이터를 서버(API) 또는 더미 데이터를 통해 Redux에 업데이트
  useEffect(() => {
    // 실제 API 호출 시, 아래 주석 코드를 사용:
    // dispatch(fetchPayments(selectedMonth));
    // 현재는 fetchPayments thunk가 더미 데이터를 반환하도록 구성되어 있음
    dispatch(fetchPayments(selectedMonth));
  }, [selectedMonth, dispatch]);

  // 모든 혜택 데이터를 합칩니다.
  const allBenefits = [...selectedBenefits, ...addedBenefits];

  // 거래 데이터를 카테고리별로 그룹화하여 집계합니다.
  // 각 거래(txn)마다, 거래의 storeId와 일치하는 혜택을 찾아 해당 할인율을 적용하고,
  // 새로운 결제 금액(newFinal)과 할인액(원금 - newFinal)을 계산합니다.
  const aggregatedData = payments.reduce((acc, txn) => {
    // 혜택 찾기: 한 거래당 하나의 혜택만 적용된다고 가정 → find() 사용
    const matchingBenefit = allBenefits.find((benefit) => benefit.storeId === txn.storeId);
    const effectiveDiscountRate = matchingBenefit ? matchingBenefit.discountRate : 0;
    
    // 새로운 결제 금액 계산:
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
    acc[txn.category].discountAmount += txn.originalAmount - newFinal;
    return acc;
  }, {});
  const computedData = Object.values(aggregatedData);

  // 전체 합계 계산 (막대 그래프 위에 요약 정보로 표시)
  const totalCurrentFinal = computedData.reduce((sum, cur) => sum + cur.finalAmount, 0);
  const totalNewFinal = computedData.reduce((sum, cur) => sum + cur.newFinal, 0);

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
