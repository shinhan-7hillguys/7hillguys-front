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
                투자심사신청
              </Link>
              <Link to="/investment/status" style={{ marginRight: "1rem" }}>
                {" "}
                심사결과조회
              </Link>
              <Link to="/contract" style={{ marginRight: "1rem" }}>
                {" "}
                계약서
              </Link>
              <Link to="/user" style={{ marginRight: "1rem" }}>
                {" "}
                의찬
              </Link>
              <Link to="/account" style={{ marginRight: "1rem" }}>
                계좌목록
              </Link>
              <Link to="/account/check" style={{ marginRight: "1rem" }}>
                납부내역조회
              </Link>
              <Link to="/account/calculation" style={{ marginRight: "1rem" }}>
                산정
              </Link>
              <Link to="/account/positive" style={{ marginRight: "1rem" }}>
                긍정효과
              </Link>
              <Link to="/account/bill" style={{ marginRight: "1rem" }}>
                청구서
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
                to="/mypage/card/AllBenefitSearch"
                style={{ marginRight: "1rem" }}
              >
                전체 혜택 조회
              </Link>
              <Link
                to="/mypage/card/PaymentTest"
                style={{ marginRight: "1rem" }}
              >
                카드 결제 테스트
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
