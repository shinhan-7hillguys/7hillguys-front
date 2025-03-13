import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function CardStatement() {
  const [statement, setStatement] = useState({
    monthlyAllowance: 0,
    monthlySpent: 0,
    statementList: [],
  });

  // JWT에서 userId 추출하는 함수
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token"); // JWT 가져오기
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Base64 디코딩
      return { userId: payload.userId, token }; // userId와 token 반환
    } catch (error) {
      console.error("🚨 JWT 파싱 오류:", error);
      return null;
    }
  };

  // JWT에서 userId와 token 가져오기
  const userData = getUserIdFromToken();
  const userId = userData?.userId;
  const token = userData?.token;

  // 현재 연도와 월 가져오기 (기본값 설정)
  const now = new Date();
  const currentYear = now.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1); // 기본값: 현재 월
  const yearMonth = `${currentYear}-${String(selectedMonth).padStart(2, "0")}`;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/card/statement/${userId}`, {
        params: { yearMonth },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setStatement(response.data);
      })
      .catch((error) => {
        console.error("Error fetching card statement:", error);
      });
  }, [yearMonth]);

  useEffect(() => {}, [statement]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 2자리 유지
    const day = String(date.getDate()).padStart(2, "0"); // 2자리 유지
    return `${year}.${month}.${day}`;
  };

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

      {/* 월 사용 금액 및 남은 한도 */}
      <h2 className="text-xl font-bold mb-4">카드 명세서</h2>
      <div className="mb-4">
        <p className="text-gray-600">
          💳 남은 한도:{" "}
          <span className="font-bold">
            {statement.monthlyAllowance - statement.monthlySpent} 원
          </span>
        </p>
        <p className="text-red-600">
          💸 총 결제금액:{" "}
          <span className="font-bold">{statement.monthlySpent} 원</span>
        </p>
      </div>

      {/* 거래 내역 */}
      <h3 className="text-lg font-bold mt-4">이용 내역</h3>
      <ul className="mt-2">
        {statement.statementList.map((tx, index) => {
          // REFUND 상태라면 금액 앞에 `-` 추가
          const amountDisplay =
            tx.paymentStatus === "REFUNDED" ? `-${tx.amount}` : `${tx.amount}`;

          return (
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
                <span className="font-bold text-right">{amountDisplay} 원</span>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                {formatDate(tx.paymentDate)}
              </p>
              {/* 결제 상태가 PENDING이면 할부 정보 표시 */}
              {tx.paymentStatus === "PENDING" && (
                <p className="text-blue-500 text-sm">
                  ⏳ 할부 {tx.installmentRound} / {tx.installmentMonth} 개월
                </p>
              )}
              {/* 혜택으로 받은 할인 금액이 0보다 크면 표시 */}
              {tx.benefitDiscountAmount > 0 && (
                <p className="text-green-600 text-sm">
                  🎁 할인 적용: -{tx.benefitDiscountAmount} 원
                </p>
              )}
              <p>--------------------</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CardStatement;
