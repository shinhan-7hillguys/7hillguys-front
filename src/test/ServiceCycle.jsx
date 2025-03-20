import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ServiceCycle.css";
import ContractStamp from "./ContractStamp";
import InvestmentConfirmation from "./InvestmentConfirmation";
import FundingCalculation from "./FundingCalculation";
import SignatureAnimation from "./SignatureAnimation";
import CardApplicationAnimation from "./CardApplicationAnimation";
import CardDesignAnimation from "./CardDesignAnimation";

gsap.registerPlugin(ScrollTrigger);
 
const stages = [
  { id: 0, title: "투자신청", description: "투자 신청을 시작합니다.", start: "top 60%" },
  { id: 1, title: "심사승인", description: "심사 과정이 진행됩니다.", start: "top 40%" },
  { id: 2, title: "투자지원금 산정", description: "AI가 회원님의 정보를 토대로 지원금액을 산정합니다.", start: "top 10%" },
  { id: 3, title: "계약서 작성", description: "계약서 작성 중입니다.", start: "top -20%" },
  { id: 4, title: "카드신청", description: "원하는 혜택만 골라 쓸 수 있는 카멜레온 카드 신청을 시작합니다.", start: "top -40%" },
  { id: 5, title: "카드디자인 신청", description: "혜택만큼 특별한 디자인, 자신이 원하는 대로 디자인을 고를 수 있어요.", start: "top -50%" },
];

const MainCycle = () => {
  const stagesRef = useRef([]);
  const userMarkerRef = useRef(null);
  const [activeStage, setActiveStage] = useState(null);
  const [completedStages, setCompletedStages] = useState([]);

  useEffect(() => {
    stagesRef.current.forEach((el, index) => { 
      ScrollTrigger.create({
        trigger: el,
        start: stages[index].start,  
        end: "bottom center",
        onEnter: () => {
          setActiveStage(index);
          setCompletedStages(prev => prev.includes(index) ? prev : [...prev, index]);
        },
        onEnterBack: () => {
          setActiveStage(index);
          setCompletedStages(prev => prev.includes(index) ? prev : [...prev, index]);
        }, 
      });
    });

    gsap.to(userMarkerRef.current, {
      y: () =>
        document.querySelector(".cycle-container").scrollHeight - window.innerHeight,
      ease: "none",
      scrollTrigger: {
        trigger: ".cycle-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="main-cycle-wrapper">   
      <div className="cycle-container">
        <div className="vertical-line" />
        <div className="user-marker" ref={userMarkerRef}></div>
        <div className="stages">
          {stages.map((stage, idx) => {
            const alignment = idx % 2 === 0 ? "left" : "right";
            const isCompleted = completedStages.includes(idx);
            return (
              <div
                key={stage.id}
                className={`stage ${alignment}`}
                ref={(el) => (stagesRef.current[idx] = el)}
              >
                <div className="stage-info">
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </div>
                {(activeStage === idx || isCompleted) && (
                  <>
                    <div className="alert-box">{stage.title} 완료!</div>
                    {stage.title === "투자신청" && <InvestmentConfirmation active={true} />}
                    {stage.title === "심사승인" && <ContractStamp active={true} />}
                    {stage.title === "투자지원금 산정" && <FundingCalculation active={true} finalAmount={134000} />}
                    {stage.title === "계약서 작성" && <SignatureAnimation active={true} />}
                    {stage.title === "카드신청" && <CardApplicationAnimation active={true} />}
                    {stage.title === "카드디자인 신청" && <CardDesignAnimation active={true} />}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainCycle;
