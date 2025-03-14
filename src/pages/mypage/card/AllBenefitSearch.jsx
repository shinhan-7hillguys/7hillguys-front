import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function AllBenefitSearch() {
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

  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/card/allBenefitSearch/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBenefits(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching benefits:", error);
      });
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-3xl mx-auto">
      {/* 제목 */}
      <h1 className="text-xl font-bold text-gray-800 mb-2">전체 혜택 조회</h1>
      <p className="text-gray-600 mb-4">
        필요한 혜택만 쏙쏙! 카멜레온 카드로 맞춤형 혜택을 누려보세요!
      </p>

      {/* 혜택 리스트 */}
      <ul className="divide-y divide-gray-300">
        {benefits.length > 0 ? (
          benefits.map((benefitObj) => (
            <li key={benefitObj.benefit.id} className="py-4">
              {/* 놓친 혜택 강조 */}
              {!benefitObj.inUse && benefitObj.missedBenefitAmount > 0 && (
                <p className="text-pink-500 font-semibold mb-1">
                  {benefitObj.benefit.name} 놓치고 있는 혜택!{" "}
                  {benefitObj.missedBenefitAmount.toLocaleString()}원 더 절약할
                  수 있었어요!
                </p>
              )}

              <div className="flex items-center">
                <h2 className="text-lg font-bold text-gray-800">
                  {benefitObj.benefit.name}
                </h2>
                {benefitObj.inUse && (
                  <span className="text-green-600 text-sm font-semibold ml-2">
                    사용 중
                  </span>
                )}
              </div>
              <p className="text-gray-600">{benefitObj.benefit.description}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">
            혜택 정보가 없습니다.
          </p>
        )}
      </ul>
    </div>
  );
}

export default AllBenefitSearch;
