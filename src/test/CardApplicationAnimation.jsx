import React, { useEffect, useState } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import "./CardApplicationAnimation.css";

const CardApplicationAnimation = ({ active }) => {
  const [showBag, setShowBag] = useState(false);
  const [showCar, setShowCar] = useState(false);
  const [animateCardScale, setAnimateCardScale] = useState(false);

  useEffect(() => {
    if (active) { 
      const bagTimeout = setTimeout(() => {
        setShowBag(true);
 
        const carTimeout = setTimeout(() => {
          setShowCar(true);
 
          const cardScaleTimeout = setTimeout(() => {
            setAnimateCardScale(true);
            
            setTimeout(() => {
              setAnimateCardScale(false);
            }, 1000);
          }, 1000);
          return () => clearTimeout(cardScaleTimeout);
        }, 1000);
        return () => clearTimeout(carTimeout);
      }, 100);
      return () => clearTimeout(bagTimeout);
    }
  }, [active]);

  return (
    <div className="card-application-container">
     
      <MdOutlineShoppingBag
        className={`ca-icon ca-bag ${showBag ? "ca-visible" : ""}`}
      />
 
      <CiCreditCard1
        style={{ left: "-25%", top: "60%", position:"relative"}}
        className={
          "card-design-icon1 " + (animateCardScale ? "card-scale" : "")
        }
      />
 
      <FaCar
        className={`ca-icon ca-car ${showCar ? "ca-visible" : ""}`}
      />
    </div>
  );
};

export default CardApplicationAnimation;
