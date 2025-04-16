import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "api";

function BenefitStatement() {
  const [statement, setStatement] = useState({
    userName: "",
    totalBenefitDiscount: 0,
    statementList: [],
  });

  // 현재 연도, 월
  const now = new Date();
  const currentYear = now.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const yearMonth = `${currentYear}-${String(selectedMonth).padStart(2, "0")}`;

  // 날짜 형식 변환 (xxxx.xx.xx)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  useEffect(() => {
    axiosInstance
      .get("/api/card/benefitStatement", {
        withCredentials: true,
        params: { yearMonth },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setStatement(response.data);
      })
      .catch((error) => {
        console.error("Error fetching benefit statement:", error);
      });
  }, [yearMonth]);

  return (
    <div className="min-h-screen">
      <div className="w-full bg-white my-custom-rounded shadow-md p-6 min-h-screen">
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold">혜택 명세서</h1>
        </div>
        <div className="flex items-center justify-start space-x-2 p-4 border-b border-gray-200">
          <span className="text-xl font-bold">{currentYear}년</span>
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="block appearance-none w-full bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}월
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5.516 7.548L10 12.032l4.484-4.484L16 8.064 10 14.064 4 8.064l1.516-1.516z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-4 mb-4 bg-pink-50">
          {statement.userName && (
            <p className="text-sm mb-1">{statement.userName}님이 받은 혜택</p>
          )}
          <p className="text-3xl font-bold text-pink-600">
            {statement.totalBenefitDiscount.toLocaleString()}원
          </p>
        </div>

        <ul>
          {statement.statementList.map((tx) => (
            <li
              key={tx.id}
              className="py-3 px-3 mb-3 rounded border-b-2 border-solid border-gray-300 last:border-none"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{tx.storeName}</span>
                <div className="flex items-center space-x-1">
                  <span className="line-through">
                    {tx.originalAmount.toLocaleString()}원
                  </span>
                  <span>→</span>
                  <span>{tx.finalAmount.toLocaleString()}원</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-400">
                  {formatDate(tx.paymentDate)}
                </span>
                <span className="font-bold text-pink-600 text-lg mr-8">
                  {tx.benefitDiscountAmount.toLocaleString()}원
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BenefitStatement;
