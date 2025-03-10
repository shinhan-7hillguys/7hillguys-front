import html2canvas from "html2canvas";
import React, { useRef, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import styled from "styled-components";
// import "./Card.css";
import axios from "axios";

// Styled Components
const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  &:focus {
    border-color: #e08490;
    outline: none;
  }
    transition: border-color 0.3s;
`;

const HiddenInput = styled(Input)`
  display: none;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  margin: 0 auto;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23999" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><polygon points="0,0 20,0 10,10"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 10px;
  transition : border-color 0.3s;
  &:focus {
    border-color: #e08490;
    outline: none;
  }
`;

const BreadCrumb = styled.div`
  margin: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

const MainCategory = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: black;
`;

const SubCategory = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: black;
`;

const StageName = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`;

function CardSinglePage() {
  // 1) 상태 선언
  const [cardNumber, setCardNumber] = useState("3497 9387 3498 1659");
  const [cardName, setCardName] = useState("NAME NAME");
  const [expiry, setExpiry] = useState("06/28");
  const [cvc, setCvc] = useState("123");
  const [bgImage, setBgImage] = useState("");
  const [layout, setLayout] = useState("1");
  const [flipped, setFlipped] = useState(false);
  const [cardFrontColor, setCardFrontColor] = useState("white");
  const [cardBackColor, setCardBackColor] = useState("black");
  const [bgFile, setBgFile] = useState(null);
  const [step, setStep] = useState(1);

  // 2) 함수 선언

  // 글자 색상 토글
  const toggleCardColors = () => {
    setCardFrontColor((prev) => (prev === "white" ? "black" : "white"));
    setCardBackColor((prev) => (prev === "black" ? "white" : "black"));
  };
  const handleSubmit = () => {
    const formData = new FormData();
    if (bgFile) {
      formData.append("image", bgFile);
    }
    formData.append("layout", layout);
    formData.append("username", cardName);
    // 글자 색상: white이면 0, black이면 1
    const letterColor = cardFrontColor === "white" ? 0 : 1;
    formData.append("letterColor", letterColor);
  
    axios.post("/card/design/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(response => {
        console.log(" 결과:", response.data);
      })
      .catch(error => {
        console.error("POST 에러:", error);
      });
  };

  // 다음 단계 처리 (3단계에서 제출 후 이동)
  const nextStepHandler = () => {
    if (step === 3) {
      handleSubmit();
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const toggleFlip = () => setFlipped((prev) => !prev);

  const handleCardClick = () => {
    if (step === 1) {
      fileInputRef.current.click();
    }
  };

  // 이미지 파일 업로드 처리
  const handleBgChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBgFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setBgImage(`url(${event.target.result})`);
    };
    reader.readAsDataURL(file);
  };

  const handleCardNumberChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    const formatted = onlyNums.replace(/(.{4})(?=.)/g, "$1 ");
    setCardNumber(formatted || "0000 0000 0000 0000");
  };

  const handleExpiryChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    const formatted = onlyNums.replace(/(.{2})(?=.)/g, "$1/");
    setExpiry(formatted || "MM/YY");
  };

  const handleCvcChange = (e) => {
    setCvc(e.target.value || "123");
  };

  const handleLayoutChange = (e) => {
    setLayout(e.target.value);
  };

  // 3) ref 선언
  const cardRef = useRef(null);
  const fileInputRef = useRef(null);

  // 4) 카드 캡처
  const handleCapture = () => {
    if (!cardRef.current) return;
    html2canvas(cardRef.current, { scale: 2 }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "custom-card.png";
      link.click();
    });
  };

  // 5) 레이아웃별 스타일 정의 
  const layoutPresets = {
    "1": { 
      // 앞면
      number: {
        position: "absolute",
        bottom: "60px",
        left: "20px",
        fontSize: "20px",
        letterSpacing: "2px",
      },
      chip: {
        position: "absolute",
        top: "30px",
        left: "20px",
        width: "50px",
        height: "40px",
      },
      logo: {
        position: "absolute",
        top: "20px",
        right: "20px",
        width: "60px",
      },
      name: {
        position: "absolute",
        bottom: "20px",
        left: "20px",
        fontSize: "16px",
      },
      expiry: {
        position: "absolute",
        bottom: "20px",
        right: "20px",
        fontSize: "16px",
      },
      // 뒷면
      signature: {
        position: "absolute",
        bottom: "120px",
        left: "20px",
        fontSize: "14px",
      },
      signatureLine: {
        position: "absolute",
        bottom: "90px",
        left: "20px",
        width: "50%",
        height: "2px",
        backgroundColor: "lightgray",
      },
      cvc: {
        position: "absolute",
        bottom: "20px",
        right: "20px",
        fontSize: "16px",
      },
    },
    "2": {
      // 앞면
      chip: {
        position: "absolute",
        top: "30px",
        left: "20px",
        width: "50px",
        height: "40px",
      },
      logo: {
        position: "absolute",
        top: "20px",
        right: "20px",
        width: "60px",
      },
      // 뒷면 
      numberBack: {
        position: "absolute",
        top: "80px",
        left: "150px",
        fontSize: "20px",
        writingMode: "sideways-lr",
        transform: "rotate(180deg)",
        letterSpacing: "2px",
        whiteSpace: "pre-wrap",
      },
      nameBack: {
        position: "absolute",
        top: "90px",
        left: "100px",
        fontSize: "14px",
        writingMode: "sideways-lr",
        transform: "rotate(180deg)",
      },
      expiryBack: {
        position: "absolute",
        top: "90px",
        left: "305px",
        fontSize: "16px",
        writingMode: "sideways-lr",
        transform: "rotate(180deg)",
      },
      // 뒷면
      signature: {
        position: "absolute",
        top: "10px",
        left: "60px",
        fontSize: "14px",
        writingMode: "sideways-lr",
        transform: "rotate(180deg)",
      },
      signatureLine: {
        position: "absolute",
        top: "100px",
        left: "-40px",
        width: "35%",
        height: "2px",
        backgroundColor: "rgb(89 89 89)",
        writingMode: "sideways-lr",
        transform: "rotate(270deg)",
      },
      cvc: {
        position: "absolute",
        top: "120px",
        left: "-100px",
        fontSize: "16px",
        writingMode: "sideways-lr",
        transform: "rotate(180deg)",
      },
    },
  };

  // 6) CardPreview 컴포넌트
  const CardPreview = ({
    cardNumber,
    cardName,
    expiry,
    cvc,
    bgImage,
    layout,
    flipped,
    handleCardClick,
    toggleFlip,
  }) => {
    const currentLayout = layoutPresets[layout];
    return (
      <div className="card-container" style={{ textAlign: "center", marginBottom: "20px" }}>
        <div
          className={`card ${flipped ? "flipped" : ""}`}
          ref={cardRef}
          onDoubleClick={toggleFlip}
          onClick={handleCardClick}
          style={{
            width: "340px",
            height: "214px",
            position: "relative",
            margin: "0 auto",
            cursor: "pointer",
            transformStyle: "preserve-3d",
            transition: "transform 0.6s",
            borderRadius: "12px",
          }}
        >
          {/* 카드 앞면 */}
          <aside
            className="card-front"
            style={{
              backgroundImage: bgImage || "linear-gradient(#333, #555)",
              color: cardFrontColor,
              width: "100%",
              height: "100%",
              position: "absolute",
              backfaceVisibility: "hidden",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <div className="chip" style={layout === "2" ? currentLayout.chip : layoutPresets["1"].chip}>
              <svg role="img" viewBox="0 0 100 100" aria-label="Chip">
                <use href="#chip-lines" />
              </svg>
            </div>
            <img
              className="cardLogo"
              src="https://simey-credit-card.netlify.app/img/logos/master.svg"
              alt="card logo"
              style={layout === "2" ? currentLayout.logo : layoutPresets["1"].logo}
            />
            {layout === "1" && (
              <>
                <label className="number" style={layoutPresets["1"].number}>
                  {cardNumber}
                </label>
                <label className="name" style={layoutPresets["1"].name}>
                  {cardName}
                </label>
                <label className="expiry" style={layoutPresets["1"].expiry}>
                  {expiry}
                </label>
              </>
            )}
          </aside>
          {/* 카드 뒷면 */}
          <aside
            className="card-back"
            style={{
              backgroundColor: "#808080",
              color: cardBackColor,
              width: "100%",
              height: "100%",
              position: "absolute",
              backfaceVisibility: "hidden",
              transform: flipped ? "rotateY(0deg)" : "rotateY(-180deg)",
            }}
          >
            <div className="black-strip"></div>
            {layout === "1" && (
              <>
                <label className="signature" style={layoutPresets["1"].signature}>
                  서 명(Signature)
                </label>
                <div className="signature-line" style={layoutPresets["1"].signatureLine}></div>
                <label className="cvc" style={layoutPresets["1"].cvc}>
                  {cvc}
                </label>
              </>
            )}
            {layout === "2" && (
              <>
                <label
                  className="number"
                  style={{
                    ...currentLayout.numberBack,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {(() => {
                    const groups = cardNumber.split(" ");
                    return groups.length === 4
                      ? `${groups[0]} ${groups[1]}\n${groups[2]} ${groups[3]}`
                      : cardNumber;
                  })()}
                </label>
                <label className="name" style={currentLayout.nameBack}>
                  {cardName}
                </label>
                <label className="expiry" style={currentLayout.expiryBack}>
                  {expiry}
                </label>
                <label className="signature" style={currentLayout.signature}>
                  서 명(Signature)
                </label>
                <div className="signature-line" style={currentLayout.signatureLine}></div>
                <label className="cvc" style={currentLayout.cvc}>
                  {cvc}
                </label>
              </>
            )}
          </aside>
        </div>
      </div>
    );
  };

  // 7) 브라우저 창 크기
  const { width, height } = useWindowSize();

  // 8) 단계별 UI 렌더링 함수
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div style={{ margin: "20px 0", textAlign: "center" }}>
            <StageName>카드 배경 선택</StageName>
            <br />
            <p>카드를 눌러 원하는 이미지를 업로드하세요.</p>
            <input
              type="file"
              accept="image/jpeg, image/png, image/svg+xml"
              onC hange={handleBgChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            /> 
          </div>
        );
      case 2:
        return (
          <div style={{ margin: "20px 0", textAlign: "center" }}>
            <StageName>카드 레이아웃 선택</StageName>
            <br />
            <StyledSelect onChange={handleLayoutChange} value={layout}>
              <option value="1">레이아웃 1</option>
              <option value="2">레이아웃 2</option>
              <option value="3">레이아웃 3</option>
            </StyledSelect>
            <br />
            <br />
            <p>카드를 두 번 누르면 뒷면을 볼 수 있어요.</p>
          </div>
        );
      case 3:
        return (
          <div style={{ margin: "20px 0", textAlign: "center" }}>
            <StageName>카드 정보 입력</StageName>
            <br />
            <HiddenInput
              type="text"
              placeholder="1234 1234 1234 1234"
              onChange={handleCardNumberChange}
            />
            <label>사용자 이름(영문)</label>
            <Input
              type="text"
              placeholder="JAMES KIM"
              value={cardName}
              onChange={(e) => setCardName(e.target.value.toUpperCase())}
              style={{ display: "block", marginBottom: 10 }}
            />
            <HiddenInput type="text" placeholder="MM/YY" onChange={handleExpiryChange} />
            <HiddenInput type="text" placeholder="123" onChange={handleCvcChange} />
          </div>
        );
      case 4:
        return (
          <div style={{ margin: "20px 0", textAlign: "center", position: "relative" }}>
            <Confetti
              width={width}
              height={height}
              numberOfPieces={500}
              confettiSource={{ x: width / 3, y: -95, w: width / 3, h: 0 }}
              style={{ position: "fixed", top: height * 0.11, left: 0, pointerEvents: "none", zIndex: 9999 }}
            />
            <StageName>신청 완료!</StageName>
            <br />
            <p>카드 신청이 정상적으로 완료되었습니다.</p>
            <div style={{ fontSize: "3rem" }}>👍</div>
            <button onClick={handleCapture} className="mobile-button" style={{ marginTop: "20px" }}>
              카드 이미지 저장
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  // 9) 최종 렌더링
  return (
    <div className="card-page">
      <BreadCrumb>
        <MainCategory>커스텀 카드 디자인</MainCategory>
        <SubCategory>
          {step === 1
            ? "카드 배경 선택"
            : step === 2
            ? "카드 레이아웃 선택"
            : step === 3
            ? "카드 정보 입력"
            : "신청 완료!"}
        </SubCategory>
      </BreadCrumb>
      {/* 단계별 컨텐츠 */}
      {renderStepContent()}

      <CardPreview
        cardNumber={cardNumber}
        cardName={cardName}
        expiry={expiry}
        cvc={cvc}
        bgImage={bgImage}
        layout={layout}
        flipped={flipped}
        handleCardClick={handleCardClick}
        toggleFlip={toggleFlip}
      />

      {/* 단계 이동 버튼 */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <button onClick={toggleCardColors} className="mobile-button">
          글자 색상 전환
        </button>
      </div>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {step > 1 && <button onClick={prevStep} className="mobile-button">이전</button>}
        {step < 4 && <button onClick={nextStepHandler} className="mobile-button">다음</button>}
      </div>

      {/* 숨겨진 SVG들 */}
      <svg id="chip" style={{ display: "none" }}>
        <g id="chip-lines">
          <polyline points="0,50 35,50"></polyline>
          <polyline points="0,20 20,20 35,35"></polyline>
          <polyline points="50,0 50,35"></polyline>
          <polyline points="65,35 80,20 100,20"></polyline>
          <polyline points="100,50 65,50"></polyline>
          <polyline points="35,35 65,35 65,65 35,65 35,35"></polyline>
          <polyline points="0,80 20,80 35,65"></polyline>
          <polyline points="50,100 50,65"></polyline>
          <polyline points="65,65 80,80 100,80"></polyline>
        </g>
      </svg>
      <svg id="contactless" style={{ display: "none" }}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M9.172 15.172a4 4 0 0 1 5.656 0"></path>
        <path d="M6.343 12.343a8 8 0 0 1 11.314 0"></path>
        <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0"></path>
      </svg>
    </div>
  );
}

export default CardSinglePage;
