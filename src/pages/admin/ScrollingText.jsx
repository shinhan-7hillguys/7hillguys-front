import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

// 컨테이너 고정 너비를 가진 래퍼 (필요에 따라 width 값을 조정)
const ScrollingTextWrapper = styled.div`
  overflow: hidden;
  white-space: nowrap;
  width: 100px;  
`;

// 애니메이션 keyframes – scrollDistance는 스크롤해야 할 거리 (px)
const getScrollAnimation = (scrollDistance) => keyframes`
  0% {
    transform: translateX(0);
  }
  70% {
    transform: translateX(-${scrollDistance}px);
  }
  85% {
    transform: translateX(-${scrollDistance}px);
  }
  100% {
    transform: translateX(0);
  }
`;
 
const ScrollingTextContent = styled.div`
  display: inline-block;
  ${({ animate, scrollDistance, duration }) =>
    animate &&
    css`
      animation: ${getScrollAnimation(scrollDistance)} ${duration}s linear infinite;
    `}
`; 
 const ScrollingText = ({ children, containerWidth = 150 }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const containerW = containerRef.current.offsetWidth;
      const contentW = contentRef.current.scrollWidth;
      if (contentW > containerW) {
        const distance = contentW - containerW;
        setScrollDistance(distance); 
        setDuration(distance * 0.03 + 5);
        setAnimate(true);
      } else {
        setAnimate(false);
      }
    }
  }, [children, containerWidth]);

  return (
    <ScrollingTextWrapper ref={containerRef} style={{ width: containerWidth }}>
      <ScrollingTextContent
        ref={contentRef}
        animate={animate}
        scrollDistance={scrollDistance}
        duration={duration}
      >
        {children}
      </ScrollingTextContent>
    </ScrollingTextWrapper>
  );
};

export default ScrollingText;
