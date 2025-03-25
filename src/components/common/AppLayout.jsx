import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; // Sidebar.jsx 파일 경로에 맞게 수정
import { IoArrowBackOutline } from "react-icons/io5";

const AppLayout = () => {
  // 사이드바 렌더링 여부
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // 사이드바 토글 함수
  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleBack = () =>{
    navigate(-1);
  }
  return (
    <div className="container">
      <header>
        <div className="header_bottom">
        <IoArrowBackOutline
            style={{ cursor: "pointer", fontSize: "35px"  }}
            alt="back"
            onClick={handleBack}
          />
          <Link style = {{marginRight : "15px", marginTop : "10px"}} to="/">
            <h2>
              <img src="/logo.png" alt="Logo" width={38} />
              Peoch
            </h2>
          </Link>

 
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

      {/* 사이드바가 보일 때 Sidebar 컴포넌트 렌더링 */}
      {isSidebarVisible && <Sidebar toggleSidebar={toggleSidebar} />}

      <div className="container2">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
