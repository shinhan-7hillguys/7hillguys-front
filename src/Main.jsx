import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import "./main.css";

gsap.registerPlugin(ScrollTrigger);

const Main = () => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const togetherRef = useRef(null);
  const valueRef = useRef(null);
  const panel2Ref = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    const sections = gsap.utils.toArray("section", scroller);
    const totalSections = sections.length;
    const viewportHeight = window.innerHeight;
    const scrollLength = container.offsetWidth * (totalSections - 1);
    const scrollEnd = scrollLength;

    // container의 높이를 재설정
    container.style.height = `${scrollEnd + viewportHeight + 1}px`;

    // 핀 애니메이션 설정
    const pin = gsap.to(scroller, {
      x: -scrollLength,
      ease: "none",
      scrollTrigger: {
        trigger: scroller,
        pin: true,
        pinSpacing: false,
        scrub: 1,
        start: "top top",
        end: `+=${scrollEnd + viewportHeight * 0.04}`,
        invalidateOnRefresh: true,
      },
    });

    // 타임라인 애니메이션
    const tl = gsap.timeline();
    tl.fromTo(
      togetherRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    ).fromTo(
      valueRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
      "+=0"
    );

    // 두 번째 패널 애니메이션
    gsap.from(panel2Ref.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: panel2Ref.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // 이미지 애니메이션 설정
    const images = gsap.utils.toArray(
      ".main_img1, .main_img2, .main_img3, .main_img4, .main_img5"
    );

    images.forEach((img, index) => {
      console.log(12)
      gsap.fromTo(
        img,
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          delay: index * 0.3,
          scrollTrigger: {
            trigger: img,
            start: "top 100%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    images.forEach((img, index) => {
      console.log(container)
      const targetRotation = (index + 1) % 2 === 0 ? 45 : -45;
      const tlImg = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start:  "top+=10 top", 
    onEnter: () => console.log("ScrollTrigger: Entered, timeline 시작!"),
    onLeave: () => console.log("ScrollTrigger: Left, timeline 종료!"),
          toggleActions: "play reverse play reverse",
        },
      });
      if (index === 0) {
        tlImg.to(img, {
          background: "#000",
          opacity: 0.8,
          ease: "power2.out",
          duration: 2,
        });
      }
      tlImg.to(
        img,
        {
          top: 0,
          right: -container.offsetWidth,
          width: 350,
          height: 550,
          borderRadius: "0 0 0 200px",
          ease: "power2.out",
          duration: 2,
        },
        0
      );
      tlImg.to(
        img,
        {
          rotation: targetRotation,
          ease: "power2.out",
          duration: 1,
        },
        0
      );
      tlImg.to(
        img,
        {
          rotation: 0,
          ease: "power2.out",
          duration: 1,
        },
        0.5
      );
    });
    

    // // 약간의 지연 후 ScrollTrigger 새로고침
    // setTimeout(() => {
    //   ScrollTrigger.refresh();
    // }, 100);

    // 클린업: ScrollTrigger 및 GSAP 인스턴스 해제
    return () => {
      pin.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="main">
      <div className="main_header">
        <div>
          <Link to="/mypage">
            <img src="./logo.png" alt="" width={30} height={30} />
            L o g i n
          </Link>
        </div>
        <div className="auth-links">
          <Link to="/login" className="login-button">
            L o g i n
          </Link>
          <Link to="/signup" className="signup-button">
            S i g n u p
          </Link>
        </div>
      </div>
      <div ref={containerRef} className="viewport-container">
        <div ref={scrollerRef} className="horizontal-scroller">
          <section className="panel">
            <div className="main_intro">
              <p className="p1" ref={togetherRef}>
                새로운 금융의 시작
              </p>
              <p className="p2" ref={valueRef}>
                <em>같이</em> 만드는 <em>가치</em>
              </p>
              <h2>Peoch</h2>
            </div>
            <button className="scroll_btn">S c r o  l l</button>
            <div className="main_img1"></div>
            <div className="main_img2"></div>
            <div className="main_img3"></div>
            <div className="main_img4"></div>
            <div className="main_img5"></div>
          </section>
          <section className="panel" ref={panel2Ref}>
            <div className="main_intro2">
              <div className="main_intro2_top">
                <h2>peoch</h2>
                <p>
                  “People(사람)”과 “같이(가치)”를 결합한 단어로, 개인의 미래 성장 가능성을
                  기반으로 한 맞춤형 금융 지원을 제공합니다.
                </p>
                <p>
                  Peoch는 고객의 과거뿐 아니라 미래의 성장 가능성을 평가하여, 맞춤형 자금
                  지원을 제공합니다.
                </p>
              </div>
              <div className="main_intro2_bottom"></div>
            </div>
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
