
// src/components/NavigationHeader.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NavigationHeader = ({ nextRoute }) => {
  const navigate = useNavigate();

  return (
    <header className="navigation-header">
      {/* 뒤로 가기: history의 이전 페이지로 이동 */}
      <button className="nav-btn" onClick={() => navigate(-1)}>
        뒤로
      </button>
      {/* nextRoute가 있으면 다음 페이지로 이동하는 버튼을 표시 */}
      {nextRoute && (
        <button className="nav-btn" onClick={() => navigate(nextRoute)}>
          앞으로
        </button>
      )}
    </header>
  );
};

export default NavigationHeader;
