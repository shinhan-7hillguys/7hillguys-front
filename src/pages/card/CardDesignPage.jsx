import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import axios from "axios";
import {
  GlobalStyle,
  Input,
  HiddenInput,
  StyledSelect,
  BreadCrumb,
  MainCategory,
  SubCategory,
  StageName,
  CardPage,
  MobileButton,
  cardBackColorPresets,
} from "./CardStyles";
import CardPreview from "./CardPreview";

function CardDesignPage() {
  const [cardNumber, setCardNumber] = useState("3497 9387 3498 1659");
  const [cardName, setCardName] = useState("NAME NAME");
  const [expiry, setExpiry] = useState("06/28");
  const [cvc, setCvc] = useState("123");
  const [bgImage, setBgImage] = useState("");
  const [layout, setLayout] = useState(1); // 숫자로 관리
  const [flipped, setFlipped] = useState(false);
  const [cardFrontColor, setCardFrontColor] = useState("white");
  const [cardBackColor, setCardBackColor] = useState("#808080");
  const [cardBackTextColor, setCardBackTextColor] = useState("white");
  const [bgFile, setBgFile] = useState(null);
  const [step, setStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [logoGrayscale, setLogoGrayscale] = useState(true);

  const fileInputRef = useRef(null);
  const cardRef = useRef(null);
  const { width, height } = useWindowSize();

  // 함수 선언
  const toggleLogoSaturation = () => setLogoGrayscale((prev) => !prev);

  const cardDesign = {
    layoutId: layout, // 숫자로 전달
    username: cardName,
    letterColor: cardFrontColor === "white" ? 0 : 1,
    cardBackColor: cardBackColor,
    logoGrayscale: logoGrayscale ? 1 : 0,
  };

  const handleCardBackColorChange = (color) => {
    setCardBackColor(color);
  };

  // 전면과 뒷면 텍스트 색상을 같이 토글 (뒷면 텍스트 색상은 별도로 관리)
  const toggleCardColors = () => {
    setCardFrontColor((prev) => (prev === "white" ? "black" : "white"));
    setCardBackTextColor((prev) => (prev === "white" ? "black" : "white"));
  };

  const toggleFlip = () => setFlipped((prev) => !prev);

  const logoToggleButtonStyle = {
    background: "linear-gradient(45deg, rgba(255,0,0,0.5), rgba(0,255,0,0.5), rgba(0,0,255,0.5))",
    backgroundSize: "200% 200%",
    color: logoGrayscale ? "white" : "black",
    transition: "filter 0.3s, background 0.3s, color 0.3s ",
    filter: logoGrayscale ? "saturate(0)" : "saturate(1)",
    animation: "waterWave 3s ease infinite",
  };

  const handleSubmit = () => {
    const formData = new FormData();
    if (bgFile) formData.append("image", bgFile);
    formData.append("cardDesignDTO", new Blob([JSON.stringify(cardDesign)], { type: "application/json" }));

    axios
      .post("http://localhost:8080/api/card/design/insert", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => console.log("결과:", response.data))
      .catch((error) => console.error("POST 에러:", error));
  };

  const nextStepHandler = () => {
    if (step === 3) handleSubmit();
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleCardClick = () => {
    if (step === 1 && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleBgChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBgFile(file);
    const reader = new FileReader();
    reader.onload = (event) => setBgImage(`url(${event.target.result})`);
    reader.readAsDataURL(file);
  };

  const handleCardNumberChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    const formatted = onlyNums.replace(/(.{4})(?=.)/g, "$1 ");
    setCardNumber(formatted || "0000 0000 0000 0000");
  };

  const textToggleButtonStyle = {
    backgroundColor: cardFrontColor === "white" ? "white" : "black",
    color: cardFrontColor === "white" ? "black" : "white",
    transition: "background-color 0.3s, color 0.3s",
  };

  const handleExpiryChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    const formatted = onlyNums.replace(/(.{2})(?=.)/g, "$1/");
    setExpiry(formatted || "MM/YY");
  };

  const handleCvcChange = (e) => setCvc(e.target.value || "123");

  const handleLayoutChange = (e) => setLayout(parseInt(e.target.value, 10)); // 숫자로 변환

  const handleCapture = () => {
    if (!cardRef.current) return;
    html2canvas(cardRef.current, { scale: 2 }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "custom-card.png";
      link.click();
    });
  };

  useEffect(() => {
    if (step === 4) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setShowConfetti(false);
    }
  }, [step]);

  return (
    <>
      <GlobalStyle />
      <CardPage>
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

        {step === 1 && (
          <div style={{ margin: "20px 0", textAlign: "center" }}>
            <StageName>카드 배경 선택</StageName>
            <br />
            <p>카드를 눌러 원하는 이미지를 업로드하세요.</p>
            <HiddenInput
              type="file"
              accept="image/jpeg, image/png, image/svg+xml"
              onChange={handleBgChange}
              ref={fileInputRef}
            />
          </div>
        )}

        {step === 2 && (
          <div style={{ margin: "20px 0", textAlign: "center" }}>
            <StageName>카드 레이아웃 선택</StageName>
            <br />
            <StyledSelect onChange={handleLayoutChange} value={layout}>
              <option value={1}>레이아웃 1</option>
              <option value={2}>레이아웃 2</option>
              <option value={3}>레이아웃 3</option>
            </StyledSelect>
            <br />
            <br />
            <p>카드를 두 번 누르면 뒷면을 볼 수 있어요.</p>
          </div>
        )}

        {step === 3 && (
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
        )}

        {step === 4 && (
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
          </div>
        )}

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
          logoGrayscale={logoGrayscale}
          cardFrontColor={cardFrontColor}
          cardBackColor={cardBackColor}
          cardBackTextColor={cardBackTextColor}
          step={step}
        />

        {step !== 4 && (
          <>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "10px" }}>
              <MobileButton onClick={toggleCardColors} style={textToggleButtonStyle}>
                글자 색상
              </MobileButton>
              <MobileButton onClick={toggleLogoSaturation} style={logoToggleButtonStyle}>
                로고 색상
              </MobileButton>
            </div>
            <div style={{ margin: "20px 0 5px 5px", textAlign: "center", width: "100%" }}>
              <StageName>카드 뒷면 배경 색상 선택</StageName>
              <div
                style={{
                  display: "flex",
                  overflowX: "auto",
                  gap: "10px",
                  padding: "10px 0 10px 20px",
                  justifyContent: "center",
                }}
              >
                {cardBackColorPresets.map((color) => {
                  const borderStyle =
                    color.toUpperCase() === "#FFFFFF" && color !== cardBackColor
                      ? "2px solid black"
                      : color === cardBackColor
                      ? "2px solid #e08490"
                      : "none";
                  return (
                    <MobileButton
                      key={color}
                      onClick={() => handleCardBackColorChange(color)}
                      style={{
                        backgroundColor: color,
                        border: borderStyle,
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        padding: 0,
                        flex: "0 0 auto",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <MobileButton onClick={handleCapture}>카드 이미지 저장</MobileButton>
          </div>
        )}

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          {step > 1 && <MobileButton onClick={prevStep}>이전</MobileButton>}
          {step < 4 && <MobileButton onClick={nextStepHandler}>다음</MobileButton>}
        </div>
      </CardPage>
    </>
  );
}

export default CardDesignPage;

