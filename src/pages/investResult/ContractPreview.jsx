import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "styles/investResult/ContractPreview.css";

const ContractPreview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const pdfUrl = location.state?.pdfUrl;

    if (!pdfUrl) {
        return <p>❌ 계약서를 불러올 수 없습니다.</p>;
    }

    return (
        <div className="preview-container">
            <h2 className="preview-title">서명된 계약서 미리보기</h2>
            <object className="preview-object" data={pdfUrl} type="application/pdf" width="100%" height="600px">
                <p>❌ PDF미리보기는 웹 환경에서만 가능합니다. 모바일 환경에서는 다운로드를 이용해주세요. <a href={pdfUrl} download>여기에서 다운로드</a></p>
            </object>

            <div className="preview-button-container">
                <a href={pdfUrl} download="signed_contract.pdf">
                    <button className="preview-button download-button">PDF 다운로드</button>
                </a>
                <button className="preview-button home-button" onClick={() => navigate("/")}>
                    홈으로 이동
                </button>
            </div>
        </div>
    );
};

export default ContractPreview;