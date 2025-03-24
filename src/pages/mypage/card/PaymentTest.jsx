import React, { useState } from "react";
import axios from "axios";
import starbucks from "image/starbucks.png";
import megacoffee from "image/megacoffee.png";
import axiosInstance from "api";

function PaymentTest() {
  const [responseMessage, setResponseMessage] = useState("");

  // 결제 요청 함수
  const handlePayment = (storeId, amount) => {
    const requestData = {
      cardNumber: "1234567812345678",
      amount: amount,
      storeId: storeId,
      installmentMonth: 0,
    };

    axiosInstance
        .post("/payment/paymentRequest", requestData, {})
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
          <img src={starbucks} alt="스타벅스" className="mx-auto h-16 mb-2" />
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
          <img src={megacoffee} alt="메가커피" className="mx-auto h-16 mb-2" />
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
