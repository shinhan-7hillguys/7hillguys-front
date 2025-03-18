// src/components/LogoutButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                console.log(" 로그아웃 성공");
                navigate("/"); // 로그아웃 후 메인 페이지로 이동
            } else {
                console.error("로그아웃 실패");
            }
        } catch (error) {
            console.error("로그아웃 중 오류 발생:", error);
            alert("서버 오류가 발생했습니다.");
        }
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            로그아웃
        </button>
    );
};

export default LogoutButton;