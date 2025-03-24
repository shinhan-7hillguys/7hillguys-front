import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./FundingCalculation.css";

const FundingCalculation = ({ active, finalAmount }) => {
  const amountRef = useRef(null);
  const obj = useRef({ value: 0 });
  const dataContainerRef = useRef(null);
  const [showCountUp, setShowCountUp] = useState(false);

  useEffect(() => {
    if (active) { 
      const tl = gsap.timeline({
        onComplete: () => { 
          gsap.to(".data-item", { opacity: 0, duration: 0.3 });
          setShowCountUp(true); 
          gsap.to(obj.current, {
            value: finalAmount,
            duration: 1.5,
            ease: "expo.inOut",
            onUpdate: () => {
              if (amountRef.current) {
                amountRef.current.innerText = Math.floor(obj.current.value).toLocaleString();
              }
            }
          });
        }
      }); 
      tl.to(".data-item", {
        x: 0,
        y: 0,
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2
      });
    }
  }, [active, finalAmount]);

  return (
    <div className="funding-calculation">
      <div className="data-analysis-container" ref={dataContainerRef}>
        <div className="data-item age">나이</div>
        <div className="data-item job">직업</div>
        <div className="data-item school">학교</div> 
        {showCountUp && (
          <div className="funding-amount" ref={amountRef}>0</div>
        )}
      </div>
      <div className="funding-label">지원금 산정 완료!</div>
    </div>
  );
};

export default FundingCalculation;
