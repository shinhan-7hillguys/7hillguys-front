import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { CiCreditCard2 } from "react-icons/ci";
import "./CardDesignAnimation.css";

const CardDesignAnimation = ({ active }) => {
  const [bgColor, setBgColor] = useState("#ffffff");
  const cardBgRef = useRef(null);
  const iconRef = useRef(null);
  const chipRef = useRef(null);
  const numberRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    if (active) {
      updateColor();
      const interval = setInterval(() => {
        updateColor();
      }, 3000);

      
      gsap.fromTo(
        cardBgRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "expo.inout" }
      );
 
      gsap.fromTo(
        iconRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "expo.inout", delay: 0.3 }
      );

 
      gsap.fromTo(
        chipRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "expo.inout", delay: 1.0 }
      );
      gsap.fromTo(
        numberRef.current,
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "expo.inout", delay: 1.2 }
      );
      gsap.fromTo(
        logoRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "expo.inout", delay: 1.5 }
      );

      return () => {
        clearInterval(interval);
      };
    }
  }, [active]);

  const updateColor = () => {
    const newColor =
      "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    setBgColor(newColor);
  };

  return (
    <div className="card-design-container">
      <div
        className="card-bg"
        ref={cardBgRef}
        style={{ backgroundColor: bgColor }}
      >
 
        <div className="card-inner">
          <div ref={chipRef} className="abstract-chip"></div>
          <div ref={numberRef} className="abstract-number"></div>
          <div ref={logoRef} className="abstract-logo"></div>
        </div>
      </div>
    </div>
  );
};

export default CardDesignAnimation;
