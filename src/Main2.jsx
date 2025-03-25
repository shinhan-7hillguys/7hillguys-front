import React, {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {Link} from "react-router-dom";
import "./main.css";

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
            {opacity: 0, y: -50}, // 시작 상태
            {opacity: 1, y: 0, duration: 1.5, ease: "power2.out"}
        )
            // ✅ "가치" 등장 애니메이션 (0.5초 후 실행)
            .fromTo(
                valueRef.current,
                {opacity: 0, y: -50}, // 시작 상태
                {opacity: 1, y: 0, duration: 1.5, ease: "power2.out"},
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

        const images = gsap.utils.toArray(".main_img1, .main_img2, .main_img3, .main_img4, .main_img5");

        images.forEach((img, index) => {
            gsap.fromTo(
                img,
                {scale: 0.6, opacity: 0}, // 시작 상태: 작고 투명하게
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power2.out",
                    delay: index * 0.3, // 각 이미지마다 0.3초씩 딜레이 (원하는 값으로 조절 가능)
                    scrollTrigger: {
                        trigger: img,
                        start: "top 100%",
                        toggleActions: "play none none none",
                    },
                }
            );
        });

        images.forEach((img, index) => {
            // 짝수: 왼쪽(+45도), 홀수: 오른쪽(-45도) 회전
            const targetRotation = ((index + 1) % 2 === 0) ? 45 : -45;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top -3%",
                    // scrub 제거: 스크롤 진행에 따라 애니메이션이 아닌, 트리거 시에 한번 실행됨
                    toggleActions: "play reverse play reverse",  // 트리거되면 애니메이션 실행
                    // markers: true, // 필요시 디버깅용 마커 활성화
                }
            });
            if (index == 0) {
                tl.to(
                    img,
                    {
                        background: "#000",
                        opacity: 0.8,
                        ease: "power2.out",
                        duration: 2,
                    },
                    // 이전 tween이 끝난 후 (예: 2초 시점에 실행)
                );
            }

            // 1. 위치 이동 및 border-radius 변경
            tl.to(
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

            // 2. 크기 tween: 스크롤 시작부터 끝까지 점진적으로 변경했던 부분을
            //    이제는 트리거 시 부드럽게 실행되도록 duration을 줌


            // 3. 회전 tween: 트리거 시 전반부에 targetRotation, 후반부에 0으로 복귀
            tl.to(
                img,
                {
                    rotation: targetRotation,
                    ease: "power2.out",
                    duration: 1,
                },
                0
            );
            tl.to(
                img,
                {
                    rotation: 0,
                    ease: "power2.out",
                    duration: 1,
                },
                0.5
            );


        });


        return () => {
            pin.kill();
        };
    }, []);

    return (
        <div className="main">
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
                    <Link to="/signup" className="signup-button"> S i g n u p</Link>
                </div>
            </div>
            <div ref={containerRef} className="viewport-container">
                <div ref={scrollerRef} className="horizontal-scroller">
                    <section className="panel">
                        <div className="main_intro">
                            <p className="p1">새로운 금융의 시작</p>
                            <p className="p2"><em>같이</em> 만드는 <em>가치</em></p>
                            <h2>Peoch</h2>
                        </div>
                        <button className="scroll_btn">S c r o l l</button>
                        <div className="main_img1"></div>
                        <div className="main_img2"></div>
                        <div className="main_img3"></div>
                        <div className="main_img4"></div>
                        <div className="main_img5"></div>
                    </section>
                    <section className="panel">
                        <div className="main_intro2">
                            <div className="main_intro2_top">
                                <h2>peoch</h2>
                                <p>“People(사람)”과 “같이(가치)”를 결합한 단어로, 개인의 미래 성장 가능성을 기반으로 한 맞춤형 금융 지원을 제공합니다.</p>
                                <p>Peoch는 고객의 과거뿐 아니라 미래의 성장 가능성을 평가하여, 맞춤형 자금 지원을 제공합니다.</p>
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
