import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignaturePad from "react-signature-canvas";

import "styles/investResult/ContractSigning.css";

const ContractSigning = () => {
    const navigate = useNavigate();  // ✅ 페이지 이동을 위한 useNavigate 추가
    const sigPad = useRef(null);
    const [signature, setSignature] = useState("");
    const [contract, setContract] = useState(null);

    // 📌 계약서 내용 불러오기 (쿠키 포함)
    useEffect(() => {
        fetch("/api/contract/template", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) throw new Error("서버 응답 실패");
                return response.json();
            })
            .then(data => setContract(data))
            .catch(error => console.error("🚨 계약서 불러오기 실패:", error));
    }, []);

    // 📌 서명 저장 (Base64 변환)
    const handleSaveSignature = () => {
        if (sigPad.current) {
            const base64Signature = sigPad.current.getTrimmedCanvas().toDataURL("image/png");
            setSignature(base64Signature);
        }
    };

    // 📌 계약서 서명 후 제출 및 다음 페이지로 이동
    const handleSubmitContract = async () => {
        if (!signature) {
            alert("서명을 입력하세요!");
            return;
        }

        try {
            const response = await fetch("/api/contract/sign", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ base64Signature: signature }),
            });

            if (!response.ok) {
                throw new Error(`서명 제출 실패: ${response.status} ${response.statusText}`);
            }

            const blob = await response.blob();
            const reader = new FileReader();

            reader.onloadend = () => {
                const pdfDataUrl = reader.result; // ✅ Data URL 변환
                navigate("/contract-preview", { state: { pdfUrl: pdfDataUrl } }); // ✅ 미리보기 페이지로 이동
            };

            reader.readAsDataURL(blob);
        } catch (error) {
            console.error("🚨 계약서 제출 중 오류 발생:", error);
            alert("서명 제출 실패! 서버 상태를 확인하세요.");
        }
    };

    return (
        <div className="contract-container">
            <h2 className="contract-title">대출 계약서</h2>

            {/* 계약서 내용 표시 */}
            {contract ? (
                <div className="contract-box">
                    <h3>{contract.title}</h3>
                    <p className="contract-content">{contract.investmentDetails}</p>
                    <h4 className="contract-section">상환 조건</h4>
                    <p className="contract-content">{contract.repaymentTerms}</p>
                    <h4 className="contract-section">약정 사항</h4>
                    <ul className="contract-content">
                        {contract.agreements.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>계약서를 불러오는 중...</p>
            )}

            <h2 className="contract-section">전자 서명</h2>
            <div className="signature-box">
                <SignaturePad ref={sigPad} canvasProps={{ width: 500, height: 200 }} />
            </div>

            <div className="contract-button-container">
                <button className="contract-button clear-button" onClick={() => sigPad.current.clear()}>
                    서명 지우기
                </button>
                <button className="contract-button save-button" onClick={handleSaveSignature}>
                    서명 저장
                </button>
                <button className="contract-button submit-button" onClick={handleSubmitContract} disabled={!signature}>
                    계약서 제출
                </button>
            </div>
        </div>
    );
};

export default ContractSigning;