import React, { useState } from "react";
import axios from "axios";

function PaymentTest() {
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

  const [responseMessage, setResponseMessage] = useState("");

  // 결제 요청 함수
  const handlePayment = (storeId, amount) => {
    const requestData = {
      cardNumber: "1234567812345678",
      amount: amount,
      storeId: storeId,
      installmentMonth: 0,
    };

    axios
      .post("http://localhost:8080/payment/paymentRequest", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { success, message, code } = response.data;

        if (success) {
          setResponseMessage(`결제 완료! (${message}) [코드: ${code}]`);
        } else {
          setResponseMessage(`결제 실패: ${message} [코드: ${code}]`);
        }
      })
      .catch((error) => {
        setResponseMessage("서버 오류로 결제 요청에 실패했습니다.");
      });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <h1 className="text-xl font-bold text-gray-800 mb-4">
        카드 혜택 테스트 페이지
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {/* 혜택 적용 가능 상품 */}
        <div className="p-4 border rounded-lg text-center shadow-sm">
          <img
            src="./images/starbucks.png"
            alt="스타벅스"
            className="mx-auto h-16 mb-2"
          />
          <h2 className="text-lg font-bold">스타벅스 (혜택 O)</h2>
          <p className="text-gray-700">30,000원 결제</p>
          <button
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => handlePayment(1, 30000)}
          >
            결제하기
          </button>
        </div>

        {/* 혜택 적용 불가 상품 */}
        <div className="p-4 border rounded-lg text-center shadow-sm">
          <img
            src="/images/megacoffee.png"
            alt="메가커피"
            className="mx-auto h-16 mb-2"
          />
          <h2 className="text-lg font-bold">메가커피 (혜택 X)</h2>
          <p className="text-gray-700">30,000원 결제</p>
          <button
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => handlePayment(12, 30000)}
          >
            결제하기
          </button>
        </div>
      </div>

      {/* 결제 결과 메시지 */}
      {responseMessage && (
        <p className="mt-4 text-center text-blue-600 font-semibold">
          {responseMessage}
        </p>
      )}
    </div>
  );
}

export default PaymentTest;
