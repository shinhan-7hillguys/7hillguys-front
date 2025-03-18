import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import "styles/user/signup.css";

function Signup(props) {
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
        name: "",
        birthdate: "",
        phone: "",
        address: "",
        role: "USER",
    });

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
        const container = document.getElementById("postcode-container");
        container.style.display = "block"; // iframe을 보이도록 설정

        const postcode = new window.daum.Postcode({
            oncomplete: function (data) {
                let fullAddress = data.address;
                if (data.addressType === "R") {
                    if (data.bname) fullAddress += ` (${data.bname})`;
                }
                setFormData((prev) => ({ ...prev, address: fullAddress }));

                container.style.display = "none"; // 주소 선택 후 iframe 숨김
            },
            width: "100%", // iframe 가로 크기 설정
            height: "400px", // iframe 세로 크기 설정
        });

        postcode.embed(container); // 기존 open() 대신 embed() 사용하여 iframe으로 렌더링
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
                    {/*<input
                        type="text"
                        name="address"
                        placeholder="주소"
                        className="input-field"
                        value={formData.address}
                        onChange={handleChange}
                    />*/}

                    <div className="address-input-group">
                        <input
                            type="text"
                            name="address"
                            placeholder="주소"
                            className="input-field"
                            value={formData.address || ""}
                            readOnly
                        />
                        <button onClick={handleSearchAddress} className="address-search-btn">
                            주소 검색
                        </button>
                    </div>

                    {/* Daum 주소 API가 삽입될 div */}
                    <div id="postcode-container" style={{ width: "100%", height: "400px", display: "none" }}></div>

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
                    이미 계정이 있으신가요? <Link to="/login">로그인</Link>
                </p>
            </div>
        </div>
    );
}
  
export default Signup;  