// src/Main.jsx
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import axios from "axios";
import "./main.css";

gsap.registerPlugin(ScrollTrigger);

const Main = () => {
  const containerRef = useRef(null);
  const togetherRef = useRef(null);
  const valueRef = useRef(null);
  const panel2Ref = useRef(null);
  const sectionsRef = useRef([]);

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        console.log("로그아웃 성공");
        window.location.href = "/"; // 메인 페이지로 이동
      } else {
        console.error("로그아웃 실패");
        alert("로그아웃에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    // 스크롤 스냅 효과 제거
    document.body.style.overflow = "auto";
    document.body.style.scrollSnapType = "none";

    // 텍스트 애니메이션 초기 설정
    gsap.set(".text-animation", { opacity: 0, scale: 0.8, y: 100 });

    // 각 섹션에 대한 애니메이션 설정
    const sections = document.querySelectorAll(".vertical-section");
    sections.forEach((section) => {
      const texts = section.querySelectorAll(".text-animation");
      texts.forEach((text, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        });
        // 나타나는 애니메이션
        tl.fromTo(
          text,
          { opacity: 0, scale: 0.8, y: 100 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, delay: i * 0.1, ease: "power2.out" }
        );
        // 사라지는 애니메이션
        tl.to(
          text,
          { opacity: 0, scale: 1, y: -100, duration: 0.5, ease: "power2.in" },
          "+=0.2"
        );
      });
    });

    // 첫 번째 섹션 애니메이션 타임라인
    const tlMain = gsap.timeline();
    tlMain
      .fromTo(
        togetherRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
      )
      .fromTo(
        valueRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
        "+=0"
      );

    // panel2 애니메이션
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

    // 이미지 애니메이션
    const images = gsap.utils.toArray(".main_img1, .main_img2, .main_img3, .main_img4, .main_img5");
    images.forEach((img, index) => {
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

    // 이미지 회전 애니메이션 예시
    images.forEach((img, index) => {
      const targetRotation = (index + 1) % 2 === 0 ? 45 : -45;
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top -3%",
          toggleActions: "play reverse play reverse",
        },
      })
        .to(img, { rotation: targetRotation, ease: "power2.out", duration: 1 })
        .to(
          img,
          { rotation: 0, ease: "power2.out", duration: 1 },
          0.5
        );
    });

    // 패럴랙스 효과 추가
    gsap.utils.toArray(".parallax-section").forEach((section) => {
      const depth = section.dataset.speed;
      const movement = -(section.offsetHeight * depth);
      gsap.fromTo(
        section,
        { y: 0 },
        {
          y: movement,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        }
      );
    });

    // 스크롤 버튼 클릭 이벤트 (존재하는 경우)
    const scrollBtn = document.querySelector(".scroll_btn");
    if (scrollBtn) {
      scrollBtn.addEventListener("click", () => {
        const nextSection = document.querySelector(".text-animation-section");
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    }

    // cleanup: 이벤트 리스너 제거
    return () => {
      if (scrollBtn) {
        scrollBtn.removeEventListener("click", () => {});
      }
    };
  }, []);

  return (
    <div className="main" ref={containerRef}>
      <div className="main_header">
        <div>
          <Link to="/user/dashboard">
            <img src="./logo.png" alt="logo" width={30} height={30} /> L o g i n
          </Link>
        </div>
        <div className="auth-links">
          <Link to="/login" className="login-button">
            L o g i n
          </Link>
          <button className="logout-button" onClick={handleLogout}>
            L o g o u t
          </button>
        </div>
      </div>

      {/* 같이, 가치 섹션 */}
      <section className="vertical-section slogan-section">
        <div className="slogan-container">
          <h2 className="text-animation big-slogan">같이, 가치.</h2>
          <p className="text-animation slogan-description">함께하는 청년 드림팀</p>
        </div>
      </section>

      {/* 커뮤니티 기반 금융 섹션 */}
      <section className="vertical-section text-right-section dark-section parallax-section" data-speed="0.25">
        <div className="split-container reverse">
          <div className="image-side">
            <div className="community-images">
              <img src="../public/community1.jpg" alt="커뮤니티 1" className="community-img" />
              <img src="../public/community2.jpg" alt="커뮤니티 2" className="community-img" />
            </div>
          </div>
          <div className="text-side">
            <h2 className="text-animation heading">커뮤니티 기반 금융</h2>
            <p className="text-animation subheading">
              함께 <span className="highlight">성장</span>하는 가치
            </p>
            <p className="text-animation description">
              Peoch에서 비슷한 목표를 가진 사람들과 연결되어 정보를 공유하고, 서로의 성장을 응원하세요.
            </p>
          </div>
        </div>
      </section>

      {/* 투명한 금융 서비스 섹션 */}
      <section className="vertical-section features-section parallax-section" data-speed="0.3">
        <div className="text-container">
          <h2 className="text-animation heading">투명한 금융 서비스</h2>
          <p className="text-animation subheading">신뢰와 안전을 최우선으로</p>
          <p className="text-animation description">
            카멜레온 카드를 활용한 맞춤형 AI를 기반으로 한 객관적이며 공정한 금융 환경을 제공합니다.
          </p>
        </div>
        <div className="features-grid text-animation">
          <div className="feature-card">
            <div className="feature-icon">
              <img src="../public/icon-blockchain.png" alt="카멜레온 카드" />
            </div>
            <h3>카멜레온 카드</h3>
            <p>필요한 혜택만 내가 쓰는 대로 진화하는 카드 서비스를 제공합니다.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <img src="../public/icon-security.png" alt="같이" />
            </div>
            <h3>같이 그리고 가치</h3>
            <p>과거가 아닌 미래의 가치를 기반으로 당신에게 투자합니다.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <img src="../public/icon-ai.png" alt="AI" />
            </div>
            <h3>AI 기반 분석</h3>
            <p>인공지능이 개인의 성장 가능성을 객관적으로 평가하여 공정한 금융 기회를 제공합니다.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <img src="../public/icon-community.png" alt="커뮤니티" />
            </div>
            <h3>함께 그리고 또 같이</h3>
            <p>같은 목표를 가진 사람들과 나를 확인하며 함께 성장할 수 있는 환경을 조성합니다.</p>
          </div>
        </div>
      </section>

      {/* 마지막 CTA 섹션 */}
      <section className="vertical-section cta-section" ref={panel2Ref}>
        <div className="cta-container">
          <h2>지금 바로 시작하세요</h2>
          <p>Peoch와 함께 당신의 미래에 투자하세요.</p>
          <p>
            "People(사람)"과 "같이(가치)"를 결합한 Peoch는 개인의 미래 성장 가능성을 기반으로
            맞춤형 금융 지원을 제공합니다.
          </p>
          <button className="start-btn">시작하기</button>
        </div>
      </section>
    </div>
  );
};

export default Main;
