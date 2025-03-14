import React, { useEffect, useRef, useState } from "react";
import SignaturePad from "react-signature-canvas";

// JWT에서 userId 추출하는 함수
const getUserIdFromToken = () => {
    const token = localStorage.getItem("token"); // JWT 가져오기
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Base64 디코딩
        return { userId: payload.userId, token }; // userId와 token 반환
    } catch (error) {
        console.error("🚨 JWT 파싱 오류:", error);
        return null;
    }
};

const ContractSigning = () => {
    const sigPad = useRef(null);
    const [signature, setSignature] = useState("");
    const [contract, setContract] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);

    // JWT에서 userId와 token 가져오기
    const userData = getUserIdFromToken();
    const userId = userData?.userId;
    const token = userData?.token;

    // 📌 계약서 내용 불러오기 (JWT 포함)
    useEffect(() => {
        if (!userId || !token) {
            console.error("🚨 JWT 없음 - 인증 필요");
            return;
        }

        fetch(`http://localhost:8080/api/contract/template/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, // 📌 JWT 포함
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) throw new Error("서버 응답 실패");
                return response.json();
            })
            .then(data => setContract(data))
            .catch(error => console.error("🚨 계약서 불러오기 실패:", error));
    }, [userId, token]);

    // 📌 서명 저장 (Base64 변환)
    const handleSaveSignature = () => {
        if (sigPad.current) {
            const base64Signature = sigPad.current.getTrimmedCanvas().toDataURL("image/png");
            setSignature(base64Signature);
        }
    };

    // 📌 계약서 서명 후 제출
    const handleSubmitContract = async () => {
        if (!signature) {
            alert("서명을 입력하세요!");
            return;
        }

        const response = await fetch("http://localhost:8080/api/contract/sign", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}` // JWT 포함
            },
            body: JSON.stringify({ userId, base64Signature: signature }),
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            setPdfUrl(url);
        } else {
            alert("서명 제출 실패");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>대출 계약서</h2>

            {/* 계약서 내용 표시 */}
            {contract ? (
                <div style={{ textAlign: "left", maxWidth: "600px", margin: "auto", padding: "20px", border: "1px solid black" }}>
                    <h3>{contract.title}</h3>
                    <p>{contract.investmentDetails}</p>
                    <h4>상환 조건</h4>
                    <p>{contract.repaymentTerms}</p>
                    <h4>약정 사항</h4>
                    <ul>
                        {contract.agreements.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>계약서를 불러오는 중...</p>
            )}

            <h2>전자 서명</h2>
            <div style={{ border: "2px solid black", display: "inline-block", background: "white", padding: "10px" }}>
                <SignaturePad ref={sigPad} canvasProps={{ width: 500, height: 200 }} />
            </div>

            <br />
            <button onClick={() => sigPad.current.clear()}>서명 지우기</button>
            <button onClick={handleSaveSignature}>서명 저장</button>
            <button onClick={handleSubmitContract} disabled={!signature}>계약서 제출</button>

            {/* PDF 미리보기 */}
            {pdfUrl && (
                <div>
                    <h3>서명된 계약서 미리보기</h3>
                    <iframe src={pdfUrl} width="80%" height="500px" />
                    <a href={pdfUrl} download="signed_contract.pdf">
                        <button>PDF 다운로드</button>
                    </a>
                </div>
            )}
        </div>
    );
};

export default ContractSigning;