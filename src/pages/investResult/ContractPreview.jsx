import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "styles/investResult/ContractPreview.css";


pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

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

            const byteCharacters = atob(pdfUrl.split(",")[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');

            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 100);
        } catch (error) {
            console.error("🚨 PDF 다운로드 실패:", error);
            alert("다운로드 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="preview-container">
            <h2 className="preview-title">서명된 계약서 미리보기</h2>

            <div className="pdf-viewer">
                <Document
                    file={pdfUrl}
                    onLoadError={(error) => console.error("PDF 로드 오류:", error)}
                >
                    <Page pageNumber={1} width={window.innerWidth * 0.9} />
                </Document>
            </div>

            <div className="preview-button-container">
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