import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import "styles/user/signup.css";

function Signup(props) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        birthdate: "",
        phone: "",
        address: "",
        assets: 0,
        role: "USER",
    });

    // 로고 클릭 시 홈으로 이동
    const handleLogoClick = () => {
        navigate("/");
    };

    const [isPostcodeVisible, setIsPostcodeVisible] = useState(false);

    useEffect(() => {
        // 다음 주소 API 스크립트 동적 로드
        const script = document.createElement("script");
        script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleSearchAddress = () => {
        setIsPostcodeVisible((prev) => !prev); // 버튼 클릭 시 토글

        if (!isPostcodeVisible) {
            setTimeout(() => {
                const postcode = new window.daum.Postcode({
                    oncomplete: function (data) {
                        let fullAddress = data.address;
                        if (data.addressType === "R" && data.bname) {
                            fullAddress += ` (${data.bname})`;
                        }
                        setFormData((prev) => ({ ...prev, address: fullAddress }));

                        setIsPostcodeVisible(false); // 주소 선택 후 창 닫기
                    },
                    width: "100%",
                    height: "400px",
                });

                postcode.embed(document.getElementById("postcode-container"));
            }, 0);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if(response.ok) {
                alert("회원가입이 완료되었습니다.");
                navigate("/");
            } else {
                const errorData = await response.json();
                alert(errorData.message || "회원가입에 실패했습니다.");
            }
        } catch(error) {
            console.error("Error:", error);
            alert("서버 오류가 발생했습니다.");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                {/* 로고 클릭 시 홈으로 이동 */}
                <h2 className="signup-title" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
                    <img src="/logo.png" alt="Logo" width={38} />
                    Peoch
                </h2>
                <h2 className="signup-title">회원가입</h2>
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
                    <input
                        type="text"
                        name="name"
                        placeholder="이름"
                        className="input-field"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="birthdate"
                        className="input-field"
                        value={formData.birthdate}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="휴대폰번호"
                        className="input-field"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="주소"
                        className="input-field"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="assets"
                        placeholder="자산"
                        value={formData.assets || ""}
                        onChange={handleChange}
                        className="input-field"
                    />

                    <button type="submit" className="signup-button">
                        가입하기
                    </button>
                </form>
                <p>
                    이미 계정이 있으신가요? <div style={{ color: "#ff6688" }}><Link to="/login">로그인</Link></div>
                </p>
            </div>
        </div>
    );
}
  
export default Signup;  