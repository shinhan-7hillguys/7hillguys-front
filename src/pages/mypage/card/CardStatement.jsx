import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

function CardStatement() {
  const [statement, setStatement] = useState({
    monthlyAllowance: 0,
    monthlySpent: 0,
    statementList: [],
  });

  // 현재 연도와 월 가져오기 (기본값 설정)
  const now = new Date();
  const currentYear = now.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1); // 기본값: 현재 월
  const yearMonth = `${currentYear}-${String(selectedMonth).padStart(2, "0")}`;

  // 날짜 형식 변환 (xxxx.xx.xx)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 2자리 유지
    const day = String(date.getDate()).padStart(2, "0"); // 2자리 유지
    return `${year}.${month}.${day}`;
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/card/cardStatement", {
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
        console.error("Error fetching card statement:", error);
      });
  }, [yearMonth]); // yearMonth가 변경될 때마다 실행

  // 남은 한도 계산
  const remainingAmount = statement.monthlyAllowance - statement.monthlySpent;

  // 정렬 상태: 기본값은 "최신순"
  const [sortType, setSortType] = useState("최신순");

  // 정렬된 거래 내역 배열을 메모이제이션 (sortType이나 statementList가 변경될 때마다 재계산)
  const sortedStatementList = useMemo(() => {
    // 배열 복사 후 정렬
    return [...statement.statementList].sort((a, b) => {
      if (sortType === "고액순") {
        // 금액이 큰 순서로 정렬
        return b.amount - a.amount;
      } else {
        // 최신순: 날짜가 최신인 순서로 정렬
        return new Date(b.paymentDate) - new Date(a.paymentDate);
      }
    });
  }, [sortType, statement.statementList]);

  return (
    <div className="min-h-screen bg-gray-100 p-0">
      <div className="w-full bg-white rounded-l-md rounded-r-md shadow-md p-6">
        <div className="flex justify-center mb-4">
          <h1 className="text-2xl font-bold">카드 명세서</h1>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
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
        </div>
        <div className="rounded-lg p-4 mb-4 bg-pink-50">
          <p className="text-gray-600 text-sm">총 이용금액</p>
          <p className="text-3xl font-bold text-gray-800">
            {statement.monthlySpent.toLocaleString()}원
          </p>
        </div>
        <div className="flex justify-between items-center mb-4 px-2">
          <p className="text-gray-700">
            <span className="text-sm text-gray-500 mr-1">남은 한도:</span>
            <span className="font-semibold">
              {remainingAmount.toLocaleString()} 원
            </span>
          </p>
          <p className="text-gray-700">
            <span className="text-sm text-gray-500 mr-1">월 한도:</span>
            <span className="font-semibold">
              {statement.monthlyAllowance.toLocaleString()} 원
            </span>
          </p>
        </div>
        <div className="flex items-center justify-end mb-4 px-2 text-sm text-gray-600">
          <button
            onClick={() => setSortType("최신순")}
            className="px-3 py-1 hover:bg-gray-100 rounded-full mr-2"
          >
            <span
              className={`${
                sortType === "최신순" ? "font-bold underline" : ""
              }`}
            >
              최신순
            </span>
          </button>
          <button
            onClick={() => setSortType("고액순")}
            className="px-3 py-1 hover:bg-gray-100 rounded-full"
          >
            <span
              className={`${
                sortType === "고액순" ? "font-bold underline" : ""
              }`}
            >
              고액순
            </span>
          </button>
        </div>
        <ul>
          {sortedStatementList.map((tx) => {
            const textColorClass =
              tx.paymentStatus === "REFUNDED"
                ? "text-red-500"
                : "text-blue-500";
            return (
              <li
                key={tx.id}
                className="py-3 px-3 mb-3 rounded border-b-2 border-solid border-gray-300 last:border-none"
              >
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">
                    {tx.storeName}
                  </span>
                  <span className={`font-bold ${textColorClass}`}>
                    {tx.paymentStatus === "REFUNDED"
                      ? Math.abs(tx.amount).toLocaleString()
                      : tx.amount.toLocaleString()}
                    원
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-500">
                    {formatDate(tx.paymentDate)}
                  </p>
                  {tx.benefitDiscountAmount > 0 && (
                    <p className="text-pink-600 text-sm">
                      할인 적용: -{tx.benefitDiscountAmount.toLocaleString()} 원
                    </p>
                  )}
                </div>
                {tx.paymentStatus === "PENDING" && (
                  <p className="text-blue-500 text-sm mt-1">
                    할부 {tx.installmentRound} / {tx.installmentMonth} 개월
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default CardStatement;
