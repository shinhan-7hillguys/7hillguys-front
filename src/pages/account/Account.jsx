import React, {useEffect, useState} from "react";
import "../../style/Account.css";
import { useNavigate } from "react-router-dom";

function Account() {
    const navigate = useNavigate();
    const accounts = [
        {id : 1, bank : "농협", number : "24****-51-******"},
        {id : 2, bank : "KB국민", number : "75****-00-******"},
        {id : 3, bank : "신한", number : "01****-89-******"},
        {id : 4, bank : "우리", number : "58****-74-******"}
    ];

    const [selectedAccount, setSelectedAccount] = useState(()=> localStorage.getItem("selectedAccount") || null );

    useEffect(() => {
        if (selectedAccount !== null) {
            localStorage.setItem("selectedAccount", String(selectedAccount));
        }
    }, [selectedAccount]);

    return (
        <div className="account-container">
            <h1>납부 계좌 관리</h1>
            <p>납부하실 계좌를 선택해주세요.</p>
            <button className="button" onClick={()=>navigate("/account/agree")}>계좌 등록</button>

            <div className="account-list">
                {accounts.map((account) => (
                    <div key={account.id}
                    className={`account-item ${selectedAccount === account.id ? "selected" : ""}`}>
                        <span className="bank-name">{account.bank}</span>
                        <span className="account-number">{account.number}</span>
                        <button className="selectbutton" onClick={()=>setSelectedAccount(account.id)}
                        disabled={selectedAccount === account.id}>
                            {selectedAccount === account.id ? "선택중" : "선택"}
                        </button>
                    </div>
                ))}
            </div>
        </div>);
}

export default Account;
