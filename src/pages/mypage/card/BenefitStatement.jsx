import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function BenefitStatement() {
  // JWT에서 userId 추출하는 함수
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token"); // JWT 가져오기
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Base64 디코딩
      return { userId: payload.userId, token }; // userId와 token 반환
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
  }, [yearMonth]); // yearMonth가 변경될 때마다 실행

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {/* 월 선택 드롭다운 */}
      <div className="flex space-x-2 mb-4">
        <span className="text-lg font-bold">{currentYear}년</span>{" "}
        {/* 연도 고정 */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="p-2 border rounded"
        >
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}월
            </option>
          ))}
        </select>
      </div>

      {/* 사용자 정보 및 총 할인 금액 */}
      <h2 className="text-xl font-bold mb-2">
        {statement.userName}님이 받은 혜택
      </h2>
      <p className="text-green-600 text-lg font-semibold mb-4">
        받은 혜택: {statement.totalBenefitDiscount} 원
      </p>

      {/* 거래 내역 (할인 적용된 건수만) */}
      <h3 className="text-lg font-bold mt-4">할인 적용 거래 내역</h3>
      <ul className="mt-2">
        {statement.statementList &&
          statement.statementList.map((tx, index) => (
            <li
              key={tx.id}
              className={`p-3 border-b ${
                index === statement.statementList.length - 1
                  ? "border-none"
                  : "border-gray-300"
              } bg-white shadow-sm`}
            >
              <div className="flex justify-between">
                <span className="font-semibold">{tx.storeName}</span>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500 line-through">
                    {tx.originalAmount} 원
                  </span>
                  <span className="font-bold">{tx.finalAmount} 원</span>
                </div>
                <span className="font-bold text-right text-green-500">
                  {tx.benefitDiscountAmount} 원
                </span>
                <p className="text-gray-600 text-sm mt-1">
                  {formatDate(tx.paymentDate)}
                </p>
                <p>--------------</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default BenefitStatement;
