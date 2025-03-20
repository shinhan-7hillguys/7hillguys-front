import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "styles/investResult/ContractPreview.css";

const ContractPreview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const pdfUrl = location.state?.pdfUrl;

    if (!pdfUrl) {
        return <p>계약서를 불러올 수 없습니다.</p>;
    }

    const handleDownload = () => {
        try {
            if (!pdfUrl.startsWith("data:application/pdf;base64,")) {
                throw new Error("잘못된 PDF 데이터 형식");
            }

            // Base64 → Blob 변환
            const byteCharacters = atob(pdfUrl.split(",")[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: "application/pdf" });

            // Blob을 URL로 변환 후 다운로드
            const url = window.URL.createObjectURL(blob);

            // 다운로드용 `<a>` 태그 생성
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "signed_contract.pdf");

            // 다운로드 강제 실행
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // 메모리 해제
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("🚨 PDF 다운로드 실패:", error);
            alert("다운로드 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="preview-container">
            <h2 className="preview-title">서명된 계약서 미리보기</h2>

            {/* ✅ iframe 제거 → sandbox 문제 해결 */}
            <p>PDF 다운로드 버튼을 눌러 계약서를 저장하세요.</p>

            <div className="preview-button-container">
                {/* 📌 handleDownload 직접 실행 */}
                <button className="preview-button download-button" onClick={handleDownload}>
                    PDF 다운로드
                </button>
                <button className="preview-button home-button" onClick={() => navigate("/")}>
                    홈으로 이동
                </button>
            </div>
        </div>
    );
};

export default ContractPreview;