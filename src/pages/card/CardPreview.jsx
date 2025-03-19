import React, { useState, useRef } from "react";
import {
  CardContainer,
  CardStyled,
  CardFront,
  CardBack,
  Chip,
  CardLogo,
  NumberLabel,
  NameLabel,
  ExpiryLabel,
  BlackStrip,
  CVCLabel,
  SignatureLabel,
  SignatureLine,
} from "./CardStyles";
import { useSelector } from "react-redux";


const layoutPresets = {
    "1": {
      number: { bottom: "60px", left: "20px", fontSize: "20px", letterSpacing: "2px", position: "absolute" },
      chip: { top: "30px", left: "20px", width: "50px", height: "40px", position: "absolute" },
      logo: { top: "20px", right: "20px", width: "60px", position: "absolute" },
      name: { bottom: "20px", left: "20px", fontSize: "16px", position: "absolute" },
      expiry: { bottom: "20px", right: "20px", fontSize: "16px", position: "absolute" },
      signature: { bottom: "120px", left: "20px", fontSize: "14px", position: "absolute" },
      signatureLine: { bottom: "90px", left: "20px", width: "50%", height: "2px", backgroundColor: "lightgray", position: "absolute" },
      cvc: { bottom: "20px", right: "20px", fontSize: "16px", position: "absolute" },
    },
    "2": {
      chip: { top: "30px", left: "20px", width: "50px", height: "40px", position: "absolute" },
      logo: { top: "20px", right: "20px", width: "60px", position: "absolute" },
      numberBack: { top: "80px", left: "150px", fontSize: "20px", letterSpacing: "2px", whiteSpace: "pre-wrap", writingMode: "sideways-lr", transform: "rotate(180deg)", position: "absolute" },
      nameBack: { top: "90px", left: "100px", fontSize: "14px", writingMode: "sideways-lr", transform: "rotate(180deg)", position: "absolute" },
      expiryBack: { top: "90px", left: "305px", fontSize: "16px", writingMode: "sideways-lr", transform: "rotate(180deg)", position: "absolute" },
      signature: { top: "10px", left: "60px", fontSize: "14px", writingMode: "sideways-lr", transform: "rotate(180deg)", position: "absolute" },
      signatureLine: { top: "100px", left: "-40px", width: "35%", height: "2px", backgroundColor: "rgb(89 89 89)", writingMode: "sideways-lr", transform: "rotate(270deg)", position: "absolute" },
      cvc: { top: "120px", left: "-100px", fontSize: "16px", writingMode: "sideways-lr", transform: "rotate(180deg)", position: "absolute" },
    },
  };
  
  const CardPreview = ({
    cardNumber,
    expiry,
    cvc,
    bgImage,
    layout,
    flipped,
    handleCardClick,
    toggleFlip,
    logoGrayscale,
    cardFrontColor,
    cardBackColor,
    cardBackTextColor,
    step,
  }) => {
    const currentLayout = layoutPresets[layout] || layoutPresets["1"];
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [lastTap, setLastTap] = useState(0); 
  const dragging = useRef(false);
    const { englishName } = useSelector((state) => state.cardApplication);
  const startRef = useRef({ x: 0, y: 0 });
  const handleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300; 
    if (step === 1) { 
      handleCardClick();
      return;
    }
    if (now - lastTap < DOUBLE_TAP_DELAY) {
      toggleFlip();  
      setLastTap(0);
    } else {
      setLastTap(now);
    }
  };

  const handleMouseDown = (e) => {
    if (step === 1) return;  
    dragging.current = true;
    startRef.current = { x: e.clientX, y: e.clientY };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!dragging.current) return;
    const deltaX = e.clientX - startRef.current.x;
    const deltaY = e.clientY - startRef.current.y; 
    const newTiltX = Math.max(Math.min(deltaY / 5, 15), -15);
    const newTiltY = Math.max(Math.min(deltaX / 5, 15), -15);
    setTilt({ x: newTiltX, y: newTiltY });
  };

  const handleMouseUp = () => {
    dragging.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp); 
    setTilt({ x: 0, y: 0 });
  };

  // 터치 이벤트 핸들러도 동일하게 적용
  const handleTouchStart = (e) => {
    if (step === 1) return;
    dragging.current = true;
    const touch = e.touches[0];
    startRef.current = { x: touch.clientX, y: touch.clientY };
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = (e) => {
    if (!dragging.current) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - startRef.current.x;
    const deltaY = touch.clientY - startRef.current.y;
    const newTiltX = Math.max(Math.min(deltaY / 10, 15), -15);
    const newTiltY = Math.max(Math.min(deltaX / 10, 15), -15);
    setTilt({ x: newTiltX, y: newTiltY });
  };

  const handleTouchEnd = () => {
    dragging.current = false;
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <CardContainer>
        <CardStyled
        $flipped={flipped}
        $tiltX={tilt.x}
        $tiltY={tilt.y} 
        $animate={step === 4}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onDoubleClick={toggleFlip}
        onClick={handleTap}
        >
        <CardFront $bgImage={bgImage} $cardFrontColor={cardFrontColor}>
          <Chip style={layout === "1" ? currentLayout.chip : layoutPresets["1"].chip}>
            <svg role="img" viewBox="0 0 100 100" aria-label="Chip">
              <use href="#chip-lines" />
            </svg>
          </Chip>
          <CardLogo
            src="https://simey-credit-card.netlify.app/img/logos/master.svg"
            alt="card logo"
            style={layout === "2" ? currentLayout.logo : layoutPresets["1"].logo}
            $logoGrayscale={logoGrayscale}
          />
          {layout == "1" && (
            <>
              <NumberLabel style={layoutPresets["1"].number}>{cardNumber}</NumberLabel>
              <NameLabel style={layoutPresets["1"].name}>{`${englishName.firstName} ${englishName.lastName}`}</NameLabel>
              <ExpiryLabel style={layoutPresets["1"].expiry}>{expiry}</ExpiryLabel>
            </>
          )}
        </CardFront>
        <CardBack $cardBackColor={cardBackColor} $cardBackTextColor={cardBackTextColor}>
          <BlackStrip />
          {layout == "1" ? (
            <>
              <SignatureLabel style={{ ...layoutPresets["1"].signature, textShadow: "none" }}>
                서 명(Signature)
              </SignatureLabel>
              <SignatureLine style={layoutPresets["1"].signatureLine} />
              <CVCLabel style={{ ...layoutPresets["1"].cvc, textShadow: "none" }}>{cvc}</CVCLabel>
            </>
          ) : (
            <>
              <NumberLabel style={{ ...currentLayout.numberBack, whiteSpace: "pre-wrap", textShadow: "none" }}>
                {(() => {
                  const groups = cardNumber.split(" ");
                  return groups.length === 4
                    ? `${groups[0]} ${groups[1]}\n${groups[2]} ${groups[3]}`
                    : cardNumber;
                })()}
              </NumberLabel>
              <NameLabel style={{ ...currentLayout.nameBack, textShadow: "none" }}>{`${englishName.firstName} ${englishName.lastName}`}</NameLabel>
              <ExpiryLabel style={{ ...currentLayout.expiryBack, textShadow: "none" }}>{expiry}</ExpiryLabel>
              <SignatureLabel style={{ ...currentLayout.signature, textShadow: "none" }}>
                서 명(Signature)
              </SignatureLabel>
              <SignatureLine style={currentLayout.signatureLine} />
              <CVCLabel style={{ ...currentLayout.cvc, textShadow: "none" }}>{cvc}</CVCLabel>
            </>
          )}
        </CardBack>
      </CardStyled>
    </CardContainer>
  );
};

export default CardPreview;
