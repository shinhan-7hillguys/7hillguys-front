import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch("http://192.168.0.172:31001/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) { 
                navigate("/");  
            } else {
                console.error("로그아웃 실패");
                navigate("/");  
            }
        } catch (error) { 
            alert("서버 오류가 발생했습니다.");
            navigate("/");  
        }
    };
 
    useEffect(() => {
        handleLogout();
    }, []);

    return (
        <div/>
    );
};

export default LogoutButton;