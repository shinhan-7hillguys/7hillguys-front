import React, { useEffect, useState } from 'react';
import "../../style/Calculation.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

function Calculation() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userSalary, setUserSalary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get('/api/auth/user', {
            headers: { "Content-Type": "application/json" }
        })
            .then(response => {
                setUser(response.data);
            })
            .catch(err => {
                console.error("현재 사용자 정보를 불러올 수 없습니다.", err);
                setError("현재 사용자 정보를 불러올 수 없습니다.");
            });
    }, []);

      useEffect(() => {
        if (user) {
            // axios.get('/api/salary', {
            //     headers: { "Content-Type": "application/json" }
            // })
            //     .then(res => {
            //         console.log("userSalary data:", res.data);
            //         setUserSalary(res.data);
            //     })
            //     .catch(err => {
            //         console.error("user_salary 정보를 불러올 수 없습니다.", err);
            //         setError("user_salary 정보를 불러올 수 없습니다.");
            //     });

            setUserSalary({ salary: 30000000 });
        }
    }, [user]);

    const handleCalculation = () => {
        if (!user) {
            setError("로그인된 사용자 정보가 없습니다.");
            return;
        }
        setLoading(true);
        //setError("");
        try {

            const dummyCalculatedAmount = 5000000;
            // const payload = {
            //     userId: user.userId,
            //     userMonthlyIncome: user.monthlyIncome || 3000000
            // };
            // const response = await axios.post('/account/cal', payload, {
            //     headers: { "Content-Type": "application/json" }
            // });
            // const calculatedAmount = response.data;
            navigate("/account/calculationResult", { state: { calculatedAmount: dummyCalculatedAmount } });
        } catch (err) {
            console.error("계산 요청 중 오류 발생:", err);
            setError("계산 요청 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <div>로그인이 필요한 서비스입니다.</div>;
    }

    return (
        <div className="calculation-container">
            <div className="content">
                <h1 className="title">납부 금액 산정</h1>
                <div className="amount-box">
                    <span className="amount">
                        {userSalary ? userSalary.salary.toLocaleString() + "원" : "30,000,000원"}
                    </span>
                </div>
                <p className="description">
                    {user.name ? `${user.name} 님의 투자 받으신 금액은 다음과 같습니다.` : "투자 받으신 금액은 다음과 같습니다."}
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
