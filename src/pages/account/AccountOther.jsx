import React, {useEffect, useState} from "react";
import "../../style/Account.css";
import { useNavigate } from "react-router-dom";

function AccountOther() {
    const navigate = useNavigate();
    const accounts = [
        {id : 1, bank : "농협", number : "24****-51-******"},
        {id : 2, bank : "KB국민", number : "75****-00-******"},
        {id : 3, bank : "신한", number : "01****-89-******"},
        {id : 4, bank : "우리", number : "58****-74-******"}
    ];
    const add = [{id : 5, bank : "계좌 정보 직접 입력", number: "찾는 계좌가 없다면 직접 입력하세요."}];

    const [selectedAccount2, setSelectedAccount2] = useState(()=> localStorage.getItem("selectedAccount2") || null );
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (selectedAccount2 !== null) {
            localStorage.setItem("selectedAccount", String(selectedAccount2));
        }
    }, [selectedAccount2]);

    return (
        <div className="account-container">
            <h1>납부 계좌 관리</h1>
            <p>납부하실 계좌를 선택해주세요.</p>
            <button className="button" onClick={()=>navigate("/account/agree")}>계좌 등록</button>

            <div className="account-list">
                {accounts.map((account) => (
                    <div key={account.id}
                         className={`account-item ${selectedAccount2 === account.id ? "selected" : ""}`}>
                        <span className="bank-name">{account.bank}</span>
                        <span className="account-number">{account.number}</span>
                        <button className="selectbutton" onClick={()=>setSelectedAccount2(account.id)}
                                disabled={selectedAccount2 === account.id}>
                            {selectedAccount2 === account.id ? "선택중" : "선택"}
                        </button>
                    </div>
                ))}
                <button className="input-account" onClick={()=>setIsModalOpen(true)}>+</button>
                {isModalOpen && (
                    <div className={"modal-overlay"} onClick={()=>setIsModalOpen(false)}>
                        <h2>은행 선택</h2>
                        <p>계좌 입력</p>
                        <button className="close-modal" onClick={()=>setIsModalOpen(false)}> 닫기 </button>
                    </div>
                )}
            </div>
        </div>);
}

export default AccountOther;
