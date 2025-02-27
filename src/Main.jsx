import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Main = () => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    const sections = gsap.utils.toArray("section", scroller);
    const totalSections = sections.length;

    const scrollLength = container.offsetWidth * (totalSections - 1);
    const viewportHeight = window.innerHeight;

    // ✅ 스크롤이 끝났을 때 마지막 `<section>`이 화면을 꽉 채우도록 보장
    const scrollEnd = scrollLength; // ✅ 마지막 섹션이 스크롤 끝에서 보이도록 조정

    // ✅ 충분한 세로 스크롤 공간 확보
    container.style.height = `${scrollEnd + viewportHeight + 1}px`;

    const pin = gsap.to(scroller, {
      x: -scrollLength,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        pinSpacing: false, // ✅ 마지막 섹션이 미리 화면을 차지하는 문제 방지
        scrub: 1,
        start: "top top",
        end: `+=${scrollEnd + viewportHeight * 0.02}`, // ✅ 스크롤 종료 후 추가 공간 확보
        invalidateOnRefresh: true,
      },
    });

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <div className="main">
      <div ref={containerRef} className="viewport-container">
        <div ref={scrollerRef} className="horizontal-scroller">
          <section className="panel">
            <div className="main_box"></div>
          </section>
          <section className="panel">Panel 2</section>
          <section className="panel">Panel 3</section>
          <section className="panel">Panel 4</section>
          <section className="panel">Panel 5</section>
        </div>
      </div>
    </div>
  );
};

export default Main;
