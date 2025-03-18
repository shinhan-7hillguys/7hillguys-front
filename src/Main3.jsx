import React, {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {Link} from "react-router-dom";
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

        // 애플 스타일 텍스트 애니메이션 추가
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
                    <Link to="/mypage">
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

            {/* 미래 지향적 금융 섹션 */}
            <section className="vertical-section text-animation-section parallax-section" data-speed="0.1">
                <div className="text-container">
                    <h2 className="text-animation heading">미래 지향적 금융</h2>
                    <p className="text-animation subheading">당신의 <span className="highlight">가능성</span>에 투자합니다</p>
                    <p className="text-animation description">Peoch는 전통적인 신용평가를 넘어, 개인의 <span className="highlight">성장 가능성</span>과
                        잠재력을 평가하여 맞춤형 금융 서비스를 제공합니다.</p>
                </div>
                <div className="image-section">
                    <div className="image-container">
                        <img src="../public/finance-image.jpg" alt="미래 지향적 금융 서비스"/>
                    </div>
                </div>
            </section>

            {/* 일반 금융과 Peoch의 차이점 섹션 */}
            <section className="vertical-section comparison-section parallax-section" data-speed="0.2">
                <div className="text-container">
                    <h2 className="text-animation heading">일반 금융 vs Peoch</h2>
                    <p className="text-animation subheading"><span className="highlight">과거</span>가 아닌 <span
                        className="highlight">미래</span>를 봅니다</p>
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
                </div>
            </section>

            {/* 함께하는 청년 드림팀 섹션 */}
            <section className="vertical-section dream-team-section parallax-section" data-speed="0.15">
                <div className="text-container">
                    <h2 className="text-animation heading">같이, 가치.</h2>
                    <p className="text-animation subheading">함께하는 청년 드림팀</p>
                    <p className="text-animation description">비슷한 꿈을 가진 사람들과 연결되어 서로의 성장을 응원하고 함께 발전해 나가세요. Peoch
                        커뮤니티에서 <span className="highlight">같이</span> 만드는 <span className="highlight">가치</span>를 경험하세요.
                    </p>
                </div>
                <div className="dream-team-images text-animation">
                    <div className="dream-team-image">
                        <img src="../public/team1.jpg" alt="청년 드림팀 1"/>
                    </div>
                    <div className="dream-team-image">
                        <img src="../public/team2.jpg" alt="청년 드림팀 2"/>
                    </div>
                    <div className="dream-team-image">
                        <img src="../public/team3.jpg" alt="청년 드림팀 3"/>
                    </div>
                </div>
            </section>

            {/* 개인 IPO 시스템 섹션 */}
            <section className="vertical-section ipo-section parallax-section" data-speed="0.25">
                <div className="text-container">
                    <h2 className="text-animation heading">개인 IPO 시스템</h2>
                    <p className="text-animation subheading">당신의 <span className="highlight">미래 가치</span>에 투자받으세요</p>
                    <p className="text-animation description">교육, 창업, 주택 구매 등 인생의 중요한 순간에 필요한 자금을 개인 IPO를 통해 조달하고, 성장과
                        함께 투자자들과 수익을 공유하세요.</p>
                </div>
                <div className="ipo-features text-animation">
                    <div className="feature-icon">
                        <img src="../public/icon-education.png" alt="교육 아이콘"/>
                        <p>교육 투자</p>
                    </div>
                    <div className="feature-icon">
                        <img src="../public/icon-startup.png" alt="창업 아이콘"/>
                        <p>창업 지원</p>
                    </div>
                    <div className="feature-icon">
                        <img src="../public/icon-house.png" alt="주택 아이콘"/>
                        <p>주택 구매</p>
                    </div>
                    <div className="feature-icon">
                        <img src="../public/icon-career.png" alt="커리어 아이콘"/>
                        <p>커리어 전환</p>
                    </div>
                </div>
            </section>

            {/* 기능 요약 섹션 (애플 스타일) */}
            <section className="vertical-section features-section">
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <img src="../public/icon-ai.png" alt="AI 아이콘"/>
                        </div>
                        <h3>AI 기반 신용평가</h3>
                        <p>개인의 미래 가능성에 기반한 평가 시스템으로, 과거 기록이 아닌 성장 잠재력을 중심으로 신용을 평가합니다.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <img src="../public/icon-community.png" alt="커뮤니티 아이콘"/>
                        </div>
                        <h3>커뮤니티 기반 금융</h3>
                        <p>비슷한 목표를 가진 사람들과 연결되어 정보를 공유하고 함께 성장할 수 있는 플랫폼을 제공합니다.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <img src="../public/icon-blockchain.png" alt="블록체인 아이콘"/>
                        </div>
                        <h3>투명한 블록체인 기술</h3>
                        <p>모든 거래 내역이 블록체인에 기록되어 투명성을 보장하며, 철저한 개인정보 보호 시스템으로 안전한 금융 환경을 제공합니다.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <img src="../public/icon-ipo.png" alt="IPO 아이콘"/>
                        </div>
                        <h3>개인 IPO 시스템</h3>
                        <p>자신의 미래 가치에 투자받을 수 있는 개인 IPO 시스템을 통해 인생의 중요한 순간에 필요한 자금을 조달할 수 있습니다.</p>
                    </div>
                </div>
            </section>

            {/* 마지막 섹션 - 소개 */}
            <section className="vertical-section final-section" ref={panel2Ref}>
                <div className="main_intro2">
                    <div className="main_intro2_top">
                        <h2>peoch</h2>
                        <p>"People(사람)"과 "같이(가치)"를 결합한 단어로, 개인의 미래 성장 가능성을 기반으로 한 맞춤형 금융 지원을 제공합니다.</p>
                        <p>Peoch는 고객의 과거뿐 아니라 미래의 성장 가능성을 평가하여, 맞춤형 자금 지원을 제공합니다.</p>
                        <p>지금 바로 Peoch와 함께 당신의 금융 미래를 설계해보세요.</p>
                        <button className="start-btn">시작하기</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Main;
