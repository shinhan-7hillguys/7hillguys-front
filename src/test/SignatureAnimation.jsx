import React, { useEffect, useState, useRef } from "react";
import { ReactComponent as SignatureSVG } from "./signature.svg";
import "./SignatureAnimation.css";
import gsap from "gsap";

const SignatureAnimation = ({ active }) => {
  const [animate, setAnimate] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (active) { 
      const startAnimationTimeout = setTimeout(() => {
        setAnimate(true); 
        const gsapAnimationTimeout = setTimeout(() => {
          if (containerRef.current) {
            const svgElement = containerRef.current.querySelector("svg");
            if (svgElement) { 
              gsap.to(svgElement, {
                scale: 0.95,
                duration: 0.3,
                ease: "power1.out",
                yoyo: true,
                repeat: 1,
              });
            }
          }
        }, 2000);
        return () => clearTimeout(gsapAnimationTimeout);
      }, 100);
      return () => clearTimeout(startAnimationTimeout);
    }
  }, [active]);

  return (
    <div
      className={`signature-container ${animate ? "animate" : ""}`}
      ref={containerRef}
    >
      <SignatureSVG />
    </div>
  );
};

export default SignatureAnimation;
