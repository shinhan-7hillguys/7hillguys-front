import React, { useEffect, useState }  from 'react';
import "../../style/Calculation.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
function Calculation() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);        // 로그인 사용자 정보
    const [userSalary, setUserSalary] = useState(null); // user_salary 정보
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get('/api/auth/user')
            .then(response => {
                setUser(response.data); // 예: { userId: 123 }
            })
            .catch(err => {
                console.error("현재 사용자 정보를 불러올 수 없습니다.", err);
                setError("현재 사용자 정보를 불러올 수 없습니다.");
            });
    }, []);

    useEffect(() => {
        if (user && user.userId) {
            axios.get(`/api/salary?userId=${user.userId}`)
                .then(res => {
                    setUserSalary(res.data);
                })
                .catch(err => {
                    console.error("user_salary 정보를 불러올 수 없습니다.", err);
                    setError("user_salary 정보를 불러올 수 없습니다.");
                });
        }
    }, [user]);

    const handleCalculation = async () => {
        if (!user) {
            setError("로그인된 사용자 정보가 없습니다.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const payload = {
                userId: user.userId,
                // 예시: user 객체에 monthlyIncome 필드가 없다면 기본값 3,000,000원 사용, 더미
                userMonthlyIncome: user.monthlyIncome || 3000000
            };

            // 백엔드 API (/account/cal)에 JSON 방식으로 POST 요청
            const response = await axios.post('/account/cal', payload);
            const calculatedAmount = response.data;

            // 계산 결과와 함께 결과 페이지로 이동 (React Router state로 전달)
            navigate("/account/calculationResult", { state: { calculatedAmount } });
        } catch (err) {
            console.error("계산 요청 중 오류 발생:", err);
            setError("계산 요청 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // 로딩 상태나 사용자 정보가 없으면 로딩 메시지 표시
    if (!user) {
        return <div>로그인이 필요한 서비스입니다.</div>;
    }


    return (
        <div className="calculation-container">
            <div className="content">
                <h1 className="title">납부 금액 산정</h1>

                <div className="amount-box">
                    <span className="amount">30,000,000원</span>
                </div>

                <p className="description">
                    {user.name ? `${user.name} 님의 투자 받으신 금액은 다음과 같습니다.` : "사용자 정보 없음"}
                </p>

                <div className="details">
                    <p>투자 시작일 <span className="date">2020.03.02</span></p>
                    <p>투자 종료일 <span className="date">2024.03.02</span></p>
                    <p>총 투자 기간 <span className="date">4년 0개월 0일</span></p>
                </div>

                <button className="calculate-btn" onClick={handleCalculation} disabled={loading}>
                    {loading ? "산정 중..." : "산정하기"}
                </button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
}

export default Calculation;