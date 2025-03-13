import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const AppLayout = () => {
  // 사이드바 렌더링 여부
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // 단순 토글 함수: 애니메이션 없이 즉시 상태 변경
  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <div className="container">
      <header>
        {/* <div className="header_top"></div> */}
        <div className="header_bottom">
          <Link to="/">
            <h2>
              <img src="/logo.png" alt="Logo" width={38} />
              Peoch
            </h2>
          </Link>

          {/* 햄버거 버튼: 클릭 시 토글 */}
          <img
            src="/menu.png"
            alt="메뉴"
            width={30}
            height={30}
            onClick={toggleSidebar}
            style={{ cursor: "pointer" }}
          />
        </div>
      </header>

      {/* isSidebarVisible이 true면 사이드바 렌더링 */}
      {isSidebarVisible && (
        <aside className="sidebar">
          <ul>
            <li>
              {/* 사이드바 내 닫기 버튼 */}
              <button className="close-btn" onClick={toggleSidebar}>
                x
              </button>
            </li>
            <li>
              <Link to="/" onClick={toggleSidebar}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/card" onClick={toggleSidebar}>
                Card
              </Link>
            </li>
            <li>
              <Link to="/mypage" onClick={toggleSidebar}>
                My Page
              </Link>
            </li>
            <nav>
              <Link to="/card" style={{ marginRight: "1rem" }}>
                Card
              </Link>
              <Link to="/mypage" style={{ marginRight: "1rem" }}>
                My Page
              </Link>
              <Link to="/education" style={{ marginRight: "1rem" }}>
                {" "}
                education
              </Link>
              <Link to="/peoch" style={{ marginRight: "1rem" }}>
                {" "}
                Peoch
              </Link>
              <Link to="/admin" style={{ marginRight: "1rem" }}>
                {" "}
                admin
              </Link>
              <Link to="/investReview" style={{ marginRight: "1rem" }}>
                {" "}
                investReview
              </Link>
              <Link to="/user" style={{ marginRight: "1rem" }}>
                {" "}
                의찬
              </Link>
              <Link to="/education/compare" style={{ marginRight: "1rem" }}>
                민영
              </Link>
              <Link
                to="/mypage/card/CardStatement"
                style={{ marginRight: "1rem" }}
              >
                카드명세서
              </Link>
              <Link
                to="/mypage/card/BenefitStatement"
                style={{ marginRight: "1rem" }}
              >
                혜택명세서
              </Link>
              <Link
                to="/mypage/cardAllBenefitSearch"
                style={{ marginRight: "1rem" }}
              >
                전체 혜택 조회
              </Link>
            </nav>
          </ul>
        </aside>
      )}

      <Outlet />
    </div>
  );
};

export default AppLayout;
