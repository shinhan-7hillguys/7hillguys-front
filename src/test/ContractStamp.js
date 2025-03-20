import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import contractImg from "./contract.png";
import stampImg from "./stamp.png";
import "./ContractStamp.css";

const ContractStamp = ({ active }) => {
  const contractRef = useRef(null);
  const stampRef = useRef(null);

  useEffect(() => {
    if (active) {
     
      gsap.fromTo(
        contractRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    
      gsap.fromTo(
        stampRef.current,
        { opacity: 0, scale: 0, rotation: -45 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "bounce.out", delay: 0.5 }
      );
    }
  }, [active]);

  return (
    <div className="contract-stamp-container">
      <img ref={contractRef} src={contractImg} alt="Contract" className="contract-icon" />
      <img ref={stampRef} src={stampImg} alt="Stamp" className="stamp-icon" />
    </div>
  );
};

export default ContractStamp;
