import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "styles/user/login.css";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            if (response.ok) {
                alert("로그인 성공!");
                navigate("/");
            } else {
                const errorData = await response.json();
                alert(errorData.message || "로그인 실패");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("서버 오류가 발생했습니다.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">로그인</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="이메일"
                        className="input-field"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        className="input-field"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="login-button">로그인</button>
                </form>
                <div className="options">
                    <Link to="/find-id" className="option-link">아이디 찾기</Link>
                    <Link to="/find-password" className="option-link">비밀번호 찾기</Link>
                </div>
                <div className="login-signup-box">
                    <p>아직 회원이 아니신가요?</p>
                    <Link to="/signup" className="signup-button">회원가입</Link>
                </div>
                <div className="social-login">
                    <button className="kakao-login">

                        카카오톡으로 계속하기
                    </button>
                    <button className="naver-login">

                        네이버로 계속하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;