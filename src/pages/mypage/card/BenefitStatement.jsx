import React, { useEffect, useState } from "react";
import axios from "axios";

function BenefitStatement() {
  // JWT에서 userId 추출하는 함수
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return { userId: payload.userId, token };
    } catch (error) {
      console.error("JWT 파싱 오류:", error);
      return null;
    }
  };

  // JWT에서 userId와 token 가져오기
  const userData = getUserIdFromToken();
  const userId = userData?.userId;
  const token = userData?.token;

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
    axios
      .get(`http://localhost:8080/card/benefitStatement/${userId}`, {
        params: { yearMonth },
        headers: {
          Authorization: `Bearer ${token}`,
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
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* 연/월 선택 영역 */}
        <div className="flex items-center justify-center space-x-2 p-4 border-b border-gray-200">
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

        {/* 받은 혜택 정보 */}
        <div className="text-center py-6">
          {statement.userName && (
            <p className="text-sm text-gray-500 mb-1">
              {statement.userName}님이 받은 혜택
            </p>
          )}
          <p className="text-3xl font-bold text-pink-600">
            {String(statement.totalBenefitDiscount)}원
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
                    {String(tx.originalAmount)}원
                  </span>
                  <span>→</span>
                  <span>{String(tx.finalAmount)}원</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-400">
                  {formatDate(tx.paymentDate)}
                </span>
                <span className="font-bold text-pink-600 text-lg mr-8">
                  {String(tx.benefitDiscountAmount)}원
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
