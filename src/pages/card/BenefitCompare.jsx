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
import { fetchPayments } from "../../features/paymentSlice";
import "styles/card/benefit.css";
import { useNavigate } from "react-router-dom";
import MonthSelect from "./MonthSelect";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#36A2EB", "#FFCE56"];


const BenefitCompare = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 기본값: 오늘 날짜의 "yyyy-MM" (한국 기준)
  const today = new Date();
  const defaultMonth = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;

  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [selectedChart, setSelectedChart] = useState("bar");

  const { payments, status } = useSelector((state) => state.payment);
  const { appliedBenefits, addedBenefits, card } = useSelector((state) => state.benefit);
  const loading = status === "loading";
  const cardId = card ? card.cardId : null;

  useEffect(() => {
    if (!card) {
      navigate("/card");
    }
  }, [card, navigate]);

  // selectedMonth가 변경될 때마다 API 호출
  useEffect(() => {
    if (cardId && selectedMonth) {
      dispatch(fetchPayments({ cardId: cardId, month: selectedMonth }));
    }
  }, [selectedMonth, cardId, dispatch]);

  // 그룹화 및 계산 로직 (생략)

  const aggregatedData = payments.reduce((acc, txn) => {
    const matchingBenefit = [...appliedBenefits, ...addedBenefits].find((benefit) => {
      const storeId = benefit?.store?.storeId ? benefit?.store?.storeId : benefit?.benefit?.store?.storeId;
      return storeId == txn.store?.storeId;
    });


    // console.log("matchingBenefit : ",matchingBenefit)

    const effectiveDiscountRate = matchingBenefit?.benefit?.discountRate ?? matchingBenefit?.discountRate ?? 0;

    const newFinal = txn.originalAmount * (1 - effectiveDiscountRate / 100);
    // console.log(txn.originalAmount)
    // console.log(newFinal)
    const discount = txn.originalAmount - newFinal
    if (!acc[txn.store.category]) {
      acc[txn.store.category] = {
        category: txn.store.category,
        originalAmount: 0,
        finalAmount: 0,
        newFinal: 0,
        discountAmount: 0,
      };
    }


    acc[txn.store.category].originalAmount += txn.originalAmount;
    acc[txn.store.category].finalAmount += txn.finalAmount;
    acc[txn.store.category].newFinal += newFinal;
    acc[txn.store.category].discountAmount += discount;
    console.log(JSON.stringify(acc));
    return acc;
  }, {});

  const computedData = Object.values(aggregatedData);
  // console.log(computedData)
  const totalCurrentFinal = computedData.reduce((sum, cur) => sum + cur.finalAmount, 0);
  const totalNewFinal = computedData.reduce((sum, cur) => sum + cur.newFinal, 0);

  return (
    <div className="benefit_compare" style={{ padding: "20px" }}>
      <h1>혜택 적용 결과 비교</h1>
      {/* 달 선택 UI */}
      <div className="month_box" style={{ marginBottom: "20px" }}>
        {/* <label htmlFor="month-select">월 선택: </label> */}
        <MonthSelect
          value={selectedMonth}
          onChange={setSelectedMonth} // 이벤트 객체가 아닌 선택한 값 자체를 전달
        />
      </div>
      <div className="payment_graph">
        <p><div>기존 혜택 적용</div><div>{totalCurrentFinal.toLocaleString()} 원</div> </p>
        <p><div>새로운 조합 적용</div><div>{totalNewFinal.toLocaleString()} 원</div> </p>
      </div>
      <div style={{ margin: "20px 0" }}>
        <button
          onClick={() => setSelectedChart("bar")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: selectedChart === "bar" ? "#ff99aa" : "#ccc",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "600"
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
            fontWeight: "600"
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
                  <Bar dataKey="finalAmount" fill="rgb(111 219 255)" name="현재 혜택 적용 후" />
                  <Bar dataKey="newFinal" fill="rgb(88 245 127)" name="새로운 조합 적용 후" />
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
