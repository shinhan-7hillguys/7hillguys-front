import React, { useEffect, useState } from "react";
import axios from "axios";

function AllBenefitSearch() {
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/card/allBenefitSearch", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
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
    <div className="min-h-screen bg-gray-100 p-0">
      <div className="w-full bg-white shadow-md rounded-l-md rounded-r-md overflow-hidden">
        <div className="bg-pink-50 p-4">
          <p className="text-lg md:text-xl text-black text-center font-bold drop-shadow-sm">
            필요한 혜택만 쏙쏙!
            <br />
            카멜레온 카드로 맞춤형 혜택을 누려보세요!
          </p>
        </div>

        {/* 오른쪽 상단: 지난달 결제 기준 (핑크색) */}
        <div className="flex justify-end px-4 py-2">
          <span className="text-xs text-pink-500">*지난달 결제 기준</span>
        </div>

        {/* 혜택 리스트 */}
        <ul className="divide-y divide-gray-200">
          {benefits.map((benefitObj) => (
            <li key={benefitObj.benefit.id} className="p-4">
              {!benefitObj.inUse && benefitObj.missedBenefitAmount > 0 && (
                <p className="text-pink-500 font-semibold text-sm mb-1">
                  🍑 놓치고 있는 혜택!{" "}
                  {benefitObj.missedBenefitAmount.toLocaleString()}원 더 절약할
                  수 있었어요!
                </p>
              )}
              <div className="flex items-center justify-between">
                <h2 className="text-sm md:text-base font-bold text-gray-800">
                  {benefitObj.storeName} - {benefitObj.benefit.name}
                </h2>
                {benefitObj.inUse && (
                  <span className="text-green-600 text-xs md:text-sm font-semibold">
                    사용 중
                  </span>
                )}
              </div>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                {benefitObj.benefit.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AllBenefitSearch;
