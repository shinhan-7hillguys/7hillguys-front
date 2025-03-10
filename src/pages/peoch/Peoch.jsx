import React from "react";
import {useNavigate} from "react-router-dom";

const Peoch = () => {
  const navigate = useNavigate();

  return (
      <div style={{textAlign: "center", marginTop: "50px"}}>
        <h1>종현</h1>
        <button
            onClick={() => navigate("/investment-temp-allowance")}
            style={{
              margin: "10px",
              padding: "10px 20px",
              backgroundColor: "#ff7f50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
        >
          임시 한도 신청
        </button>
        <button
            onClick={() => navigate("/investment-support")}
            style={{
              margin: "10px",
              padding: "10px 20px",
              backgroundColor: "#82ca9d",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
        >
          투자 지원 금액 변경
        </button>
          <button
              onClick={() => navigate("/setInvestment")}
              style={{
                  margin: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#f4d03f",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
              }}
          >
              투자 받는 금액 신청/변경
          </button>
      </div>
  );
};

export default Peoch;
