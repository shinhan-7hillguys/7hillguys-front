import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import "./main.css";

gsap.registerPlugin(ScrollTrigger);

const Main = () => {

    const containerRef = useRef(null);
    const togetherRef = useRef(null);
    const valueRef = useRef(null);
    const panel2Ref = useRef(null);

    // 텍스트 애니메이션을 위한 ref 추가
    const sectionsRef = useRef([]);

    useEffect(() => {
        // 스크롤 스냅 효과 제거 (부드러운 스크롤을 위해)
        document.body.style.overflow = 'auto';
        document.body.style.scrollSnapType = 'none';


        gsap.set(".text-animation", {opacity: 0, scale: 0.8, y: 100});

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
                    }
                });

                // 나타나는 애니메이션
                tl.fromTo(
                    text,
                    {
                        opacity: 0,
                        scale: 0.8,
                        y: 100
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.5,
                        delay: i * 0.1,
                        ease: "power2.out"
                    }
                );

                // 사라지는 애니메이션 - 위로 올라가면서 사라짐
                tl.to(
                    text,
                    {
                        opacity: 0,
                        scale: 1,
                        y: -100, // 위로 올라가면서 사라짐
                        duration: 0.5,
                        ease: "power2.in"
                    },
                    "+=0.2"
                );
            });
        });

        // 첫 번째 섹션 애니메이션
        const tl = gsap.timeline();

        tl.fromTo(
            togetherRef.current,
            {opacity: 0, y: -50},
            {opacity: 1, y: 0, duration: 1.5, ease: "power2.out"}
        )
            .fromTo(
                valueRef.current,
                {opacity: 0, y: -50},
                {opacity: 1, y: 0, duration: 1.5, ease: "power2.out"},
                "+=0"
            );

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

        const images = gsap.utils.toArray(".main_img1, .main_img2, .main_img3, .main_img4, .main_img5");

        images.forEach((img, index) => {
            gsap.fromTo(
                img,
                {scale: 0.6, opacity: 0},
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

        // 이미지 회전 애니메이션
        images.forEach((img, index) => {
            const targetRotation = ((index + 1) % 2 === 0) ? 45 : -45;

            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top -3%",
                    toggleActions: "play reverse play reverse",
                }
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
        gsap.utils.toArray('.parallax-section').forEach(section => {
            const depth = section.dataset.speed;
            const movement = -(section.offsetHeight * depth);

            gsap.fromTo(section, {
                y: 0
            }, {
                y: movement,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    start: "top bottom",
                    end: "bottom top"
                }
            });
        });

        // 스크롤 버튼 클릭 시 다음 섹션으로 스크롤
        document.querySelector('.scroll_btn').addEventListener('click', () => {
            const nextSection = document.querySelector('.text-animation-section');
            nextSection.scrollIntoView({behavior: 'smooth'});
        });
    }, []);

    return (
        <div className="main" ref={containerRef}>
            <div className="main_header">
                <div>
                    <Link to="/user/dashboard">
                        <img src="./logo.png" alt="" width={30} height={30}/>L o g i n
                    </Link>
                </div>
                <div className="auth-links">
                    <Link to="/login" className="login-button">
                        L o g i n
                    </Link>
                    <Link to="/signup" className="signup-button">S i g n u p</Link>
                </div>

            </div>
            {/* 첫 번째 섹션 - 인트로 */}
            <section className="vertical-section intro-section">
                <div className="main_intro">
                    <p className="p1">새로운 금융의 시작</p>
                    <p className="p2"><em ref={togetherRef}>같이</em> 만드는 <em ref={valueRef}>가치</em></p>
                    <h2>Peoch</h2>
                </div>
                <button className="scroll_btn">S c r o l l</button>
                <div className="main_img1"></div>
                <div className="main_img2"></div>
                <div className="main_img3"></div>
                <div className="main_img4"></div>
                <div className="main_img5"></div>
            </section>

            {/* 미래 지향적 금융 섹션 - 왼쪽 텍스트, 오른쪽 이미지 */}
            <section className="vertical-section text-left-section parallax-section" data-speed="0.1">
                <div className="split-container">
                    <div className="text-side">
                        <h2 className="text-animation heading">미래 지향적 금융</h2>
                        <p className="text-animation subheading">당신의 <span className="highlight">가능성</span>에 투자합니다</p>
                        <p className="text-animation description">Peoch는 전통적인 신용평가를 넘어, 개인의 <span className="highlight">성장 가능성</span>과
                            잠재력을 평가하여 맞춤형 금융 서비스를 제공합니다.</p>
                    </div>
                    <div className="image-side">
                        <div className="floating-image">
                            <img src="./public/innovation1.jpg" alt="미래 지향적 금융"/>
                        </div>
                    </div>
                </div>
            </section>

            {/* 일반 금융과 Peoch 비교 섹션 */}
            <section className="vertical-section comparison-section parallax-section" data-speed="0.2">
                <div className="text-container">
                    <h2 className="text-animation heading">일반 금융 vs Peoch</h2>
                    <p className="text-animation subheading"><span className="highlight">과거</span>가 아닌 <span
                        className="highlight">미래</span>를 봅니다</p>
                </div>
                <div className="comparison-table text-animation">
                    <div className="comparison-item">
                        <div className="comparison-title">일반 금융</div>
                        <div className="comparison-content">
                            <p>과거 신용 기록 중심</p>
                            <p>표준화된 대출 조건</p>
                            <p>복잡한 서류 절차</p>
                            <p>단순 이자 수익 모델</p>
                        </div>
                    </div>
                    <div className="comparison-item highlighted">
                        <div className="comparison-title">Peoch 금융</div>
                        <div className="comparison-content">
                            <p>미래 성장 가능성 평가</p>
                            <p>개인 맞춤형 금융 설계</p>
                            <p>AI 기반 간편 심사</p>
                            <p>성장 공유 수익 모델</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 맞춤형 금융 솔루션 섹션 - 전체 배경 이미지 */}
            <section className="vertical-section full-bg-section parallax-section" data-speed="0.15">
                <div className="overlay"></div>
                <div className="centered-content">
                    <h2 className="text-animation heading">맞춤형 금융 솔루션</h2>
                    <p className="text-animation subheading">당신의 꿈을 위한 자금</p>
                    <p className="text-animation description">교육, 창업, 주택 구매 등 인생의 중요한 순간에 필요한 자금을 개인 맞춤형으로 설계하여
                        제공합니다.</p>
                    <div className="solution-icons">
                        <div className="solution-icon">
                            <img src="../public/icon-education.png" alt="교육"/>
                            <span>교육</span>
                        </div>
                        <div className="solution-icon">
                            <img src="../public/icon-startup.png" alt="창업"/>
                            <span>창업</span>
                        </div>
                        <div className="solution-icon">
                            <img src="../public/icon-house.png" alt="주택"/>
                            <span>주택</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 같이, 가치 섹션 */}
            <section className="vertical-section slogan-section">
                <div className="slogan-container">
                    <h2 className="text-animation big-slogan">같이, 가치.</h2>
                    <p className="text-animation slogan-description">함께하는 청년 드림팀</p>
                </div>
            </section>

            {/* 커뮤니티 기반 금융 섹션 - 오른쪽 텍스트, 왼쪽 이미지 */}
            <section className="vertical-section text-right-section dark-section parallax-section" data-speed="0.25">
                <div className="split-container reverse">
                    <div className="image-side">
                        <div className="community-images">
                            <img src="../public/community1.jpg" alt="커뮤니티 1" className="community-img"/>
                            <img src="../public/community2.jpg" alt="커뮤니티 2" className="community-img"/>
                        </div>
                    </div>
                    <div className="text-side">
                        <h2 className="text-animation heading">커뮤니티 기반 금융</h2>
                        <p className="text-animation subheading">함께 <span className="highlight">성장</span>하는 가치</p>
                        <p className="text-animation description">Peoch에서 비슷한 목표를 가진 사람들과 연결되어 정보를 공유하고, 서로의 성장을
                            응원하세요.</p>
                    </div>
                </div>
            </section>

            {/* 투명한 금융 서비스 섹션 - 아이콘 그리드 */}
            <section className="vertical-section features-section parallax-section" data-speed="0.3">
                <div className="text-container">
                    <h2 className="text-animation heading">투명한 금융 서비스</h2>
                    <p className="text-animation subheading">신뢰와 안전을 최우선으로</p>
                    <p className="text-animation description">카멜레온 카드를 활용한 맞춤형 AI를 기반으로 한 객관적이며 공정한 금융 환경을 제공합니다.</p>
                </div>
                <div className="features-grid text-animation">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <img src="../public/icon-blockchain.png" alt="카멜레온 카드"/>
                        </div>
                        <h3>카멜레온 카드</h3>
                        <p>필요한 혜택만 내가 쓰는 대로 진화하는 카드 서비스를 제공합니다.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <img src="../public/icon-security.png" alt="같이"/>
                        </div>
                        <h3>같이 그리고 가치</h3>
                        <p>과거가 아닌 미래의 가치를 기반으로 당신에게 투자합니다.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <img src="../public/icon-ai.png" alt="AI"/>
                        </div>
                        <h3>AI 기반 분석</h3>
                        <p>인공지능이 개인의 성장 가능성을 객관적으로 평가하여 공정한 금융 기회를 제공합니다.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <img src="../public/icon-community.png" alt="커뮤니티"/>
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
                    <p>"People(사람)"과 "같이(가치)"를 결합한 Peoch는 개인의 미래 성장 가능성을 기반으로 맞춤형 금융 지원을 제공합니다.</p>
                    <button className="start-btn">시작하기</button>
                </div>
            </section>
        </div>
    );
};

export default Main;
