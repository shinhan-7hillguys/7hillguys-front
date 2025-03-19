import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import "./main.css";
import axios from "axios";
import { CiLogin, CiLogout } from "react-icons/ci";

gsap.registerPlugin(ScrollTrigger);

const Main = () => {
  const [user, setUser] = useState(null);
  const containerRef = useRef(null);
  const togetherRef = useRef(null);
  const valueRef = useRef(null);
  const panel2Ref = useRef(null);

  useEffect(() => {
    axios
      .get("/auth/user/userId", { withCredentials: true })
      .then((response) => {
        // 응답에 사용자 이름이 있으면 로그인 된 상태로 판단
        if (response.data.username) {
          setUser(response.data.username);
        }
      })
      .catch((error) => {
        console.error("로그인 상태 확인 실패:", error);
        setUser(null);
      });
  }, []);

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

  // 텍스트 애니메이션을 위한 ref 추가
  const sectionsRef = useRef([]);

  useEffect(() => {
    // 스크롤 스냅 효과 제거 (부드러운 스크롤을 위해)
    document.body.style.overflow = "auto";
    document.body.style.scrollSnapType = "none";

    gsap.set(".text-animation", { opacity: 0, scale: 0.8, y: 100 });

    // 각 섹션에 대한 애니메이션 설정
    const sections = document.querySelectorAll(".vertical-section");

    sections.forEach((section, index) => {
      const texts = section.querySelectorAll(".text-animation");

      texts.forEach((text, i) => {
        // 텍스트 애니메이션 타임라인 생성
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
          {
            opacity: 0,
            scale: 0.8,
            y: 100,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.1,
            ease: "power2.out",
          }
        );
        // 사라지는 애니메이션
        tl.to(
          text,
          {
            opacity: 0,
            scale: 1,
            y: -100, // 위로 올라가면서 사라짐
            duration: 0.5,
            ease: "power2.in",
          },
          "+=0.2"
        );
      });
    });

    // 첫 번째 섹션 애니메이션
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

    const images = gsap.utils.toArray(
      ".main_img1, .main_img2, .main_img3, .main_img4, .main_img5"
    );

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
        .to(
          img,
          {
            rotation: targetRotation,
            ease: "power2.out",
            duration: 1,
          },
          0
        )
        .to(
          img,
          {
            rotation: 0,
            ease: "power2.out",
            duration: 1,
          },
          0.5
        );
    });

    // 패럴랙스 효과 추가
    gsap.utils.toArray(".parallax-section").forEach((section) => {
      const depth = section.dataset.speed;
      const movement = -(section.offsetHeight * depth);

      gsap.fromTo(
        section,
        {
          y: 0,
        },
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

    // 스크롤 버튼 클릭 시 다음 섹션으로 스크롤
    document.querySelector(".scroll_btn").addEventListener("click", () => {
      const nextSection = document.querySelector(".text-animation-section");
      nextSection.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  return (
    <div className="main" ref={containerRef}>
      <div className="main_header">
        <div> 
        <Link
            style={{
                float: "left",
                marginRight: "10px",
                fontSize: "30px",  
                fontWeight: "bold", 
                textDecoration: "none" 
            }}
            to="/user/dashboard"
            className="service-link"
            >
            <img
                style={{ marginRight: "10px" }}
                src="./logo.png"
                alt=""
                width={30}
                height={30}
            />
            Peoch
        </Link>
        </div>
        <div
          className="auth-links"
          style={{
            justifyContent: "flex-end",
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          {user ? (
            <Link to="/login" className="login-button">
              <CiLogout size={40} />
            </Link>
          ) : (
            <>
              <Link to="/login">
                <CiLogin size={40} />
              </Link>
              <Link to="/signup" className="register-button">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
      {/* 첫 번째 섹션 - 인트로 */}
      <section className="vertical-section intro-section">
        <div className="main_intro">
          <p className="p1">새로운 금융의 시작</p>
          <p className="p2">
            <em ref={togetherRef}>같이</em> 만드는 <em ref={valueRef}>가치</em>
          </p>
          <h2>Peoch</h2>
        </div>
        <button className="scroll_btn">S c r o l l</button>
        <div className="main_img1"></div>
        <div className="main_img2"></div>
        <div className="main_img3"></div>
        <div className="main_img4"></div>
        <div className="main_img5"></div>
      </section>
    </div>
  );
};

export default Main;
