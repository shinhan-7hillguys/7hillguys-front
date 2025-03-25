import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import checkImg from "./check.png";
import "./InvestmentConfirmation.css";

const InvestmentConfirmation = ({ active }) => {
  const checkRef = useRef(null);

  useEffect(() => {
    if (active) {
      gsap.fromTo(
        checkRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1.2, duration: 0.5, ease: "bounce.out", onComplete: () => {
            gsap.to(checkRef.current, { scale: 1, duration: 0.2 });
          } 
        }
      );
    }
  }, [active]);

  return (
    <div className="investment-confirmation">
      <img ref={checkRef} src={checkImg} alt="Check Mark" className="check-img" />
    </div>
  );
};

export default InvestmentConfirmation;
