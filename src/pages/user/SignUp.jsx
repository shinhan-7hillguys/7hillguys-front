import React from 'react';
import {Link} from "react-router-dom";
import "styles/user/signup.css";

function SignUp(props) {
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
        name: "",
        birthdate: "",
        phone: "",
        address: "",
        role: "USER",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
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
                    <input
                        type="text"
                        name="address"
                        placeholder="주소"
                        className="input-field"
                        value={formData.address}
                        onChange={handleChange}
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

export default SignUp;