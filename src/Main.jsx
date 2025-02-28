import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Main = () => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const togetherRef = useRef(null);
  const valueRef = useRef(null);
  const panel2Ref = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    const sections = gsap.utils.toArray("section", scroller);
    const totalSections = sections.length;

    const scrollLength = container.offsetWidth * (totalSections - 1);
    const viewportHeight = window.innerHeight;

    const scrollEnd = scrollLength;

    container.style.height = `${scrollEnd + viewportHeight + 1}px`;

    const pin = gsap.to(scroller, {
      x: -scrollLength,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        pinSpacing: false,
        scrub: 1,
        start: "top top",
        end: `+=${scrollEnd + viewportHeight * 0.04}`,
        invalidateOnRefresh: true,
      },
    });

    const tl = gsap.timeline();

    tl.fromTo(
      togetherRef.current,
      { opacity: 0, y: -50 }, // 시작 상태
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    )
      // ✅ "가치" 등장 애니메이션 (0.5초 후 실행)
      .fromTo(
        valueRef.current,
        { opacity: 0, y: -50 }, // 시작 상태
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
        "+=0" // 이전 애니메이션이 끝난 후 0.5초 뒤 실행
      );
    // ✅ 패널 2 등장 애니메이션 (스크롤 트리거)
    gsap.from(panel2Ref.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: panel2Ref.current,
        start: "top 80%",
        toggleActions: "play none none none", // 처음 한 번만 실행
      },
    });

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <div className="main">
      <div className="main_header">
        <Link to="/mypage">L o g i n</Link>
      </div>
      <div ref={containerRef} className="viewport-container">
        <div ref={scrollerRef} className="horizontal-scroller">
          <section className="panel">
            <div className="panel_background">
              <div className="main_box">
                <div className="main_box_top"></div>
                <div className="main_box_middle">
                  <h2>
                    <em ref={togetherRef}>같이</em> 만드는{" "}
                    <em ref={valueRef}>가치</em>
                    , <br />
                    새로운 금융의 시작
                  </h2>
                  <p>
                    Peoch는 단순한 금융 서비스가 아닌, 개인의 미래 가능성을 믿고
                    지원하는 새로운 금융모델입니다.
                  </p>
                  <div className="button_box">
                    <button>
                      Scroll{" "}
                      <img src="./next.png" alt="" width={20} height={20} />
                    </button>
                  </div>
                </div>
                <div className="main_box_bottom"></div>
              </div>
            </div>
          </section>
          <section ref={panel2Ref} className="panel">
            Panel 2 (애니메이션 등장)
          </section>
          <section className="panel">Panel 3</section>
          <section className="panel">Panel 4</section>
          <section className="panel">Panel 5</section>
        </div>
      </div>
    </div>
  );
};

export default Main;
