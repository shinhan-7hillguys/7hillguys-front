import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/Checkbox.css";

function AccountRegister() {
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    return (
        <div className={"agreement-container"}>
            <h1>오픈뱅킹 이용 동의</h1>
            <p>서비스 이용을 위해 아래 약관에 동의해주세요.</p>
            <div className="checkbox-container">
                <label className={"checkbox"}>
                    <input type = "checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                    <span className={"checkmark"}></span> 약관 전체동의
                </label>
            </div>

            <div className={"button-container"}>
                <button onClick={() => navigate(-1)}>뒤로 가기</button>
                <button className="next-button" disabled={!isChecked} onClick={()=>navigate("/account/other")}> 다음으로 </button>
            </div>
        </div>
    );
}

export default AccountRegister;