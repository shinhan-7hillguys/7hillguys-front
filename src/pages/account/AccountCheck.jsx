import React, {useEffect, useState} from 'react';
import "../../style/Account.css";

function AccountCheck() {
    const [selectedAccount, setSelectedAccount] = useState(null);
    const paymentHistory = [
        { date: "25.02.01", amount: "500,000원", time: "2025.02.01 11:30:33", balance: "290,000,000원" },
        { date: "25.01.01", amount: "500,000원", time: "2025.01.01 10:15:22", balance: "290,500,000원" },
        { date: "24.12.01", amount: "500,000원", time: "2024.12.01 09:50:12", balance: "291,000,000원" },
    ];


    useEffect(() => {
        const savedAccount = JSON.parse(localStorage.getItem("selectedAccount"));
        if(savedAccount){
            setSelectedAccount(savedAccount);
        }
    }, []);

    const handleClick = (index) => {
        setSelectedAccount(selectedAccount === index ? null : index);
    };


    return (
        <div className="history-container">
            <h1>납부 내역 조회</h1>
            <div className="payment-list">
                {paymentHistory.map((item, index) => (
                    <div key={index} className="payment-item">
                        <div className="payment-summary" onClick={() => handleClick(index)}>
                            <div className="payment-label">
                                <span>출금</span>
                                <span>{item.date}</span>
                            </div>
                            <span className="payment-amount">{item.amount}</span>
                        </div>

                        {selectedAccount === index && (
                            <div className="payment-details">
                                <p><strong>거래 시간:</strong> {item.time}</p>
                                <p><strong>거래 후 잔액:</strong> {item.balance}</p>
                                <button onClick={() => setSelectedAccount(null)}>닫기</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AccountCheck;