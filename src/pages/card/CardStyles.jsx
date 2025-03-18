import styled, { createGlobalStyle, keyframes, css } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    background: #333844;
    color: white;
    font-family: "Pretendard", sans-serif;
  }
`;

export const waterWave = keyframes`
0% {
  background-position: 0% 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0% 50%;
}
`;

export const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s;
  &:focus {
    border-color: #e08490;
    outline: none;
  }
`;

export const HiddenInput = styled(Input)`
  display: none;
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  margin: 0 auto;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23999" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><polygon points="0,0 20,0 10,10"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 10px;
  transition: border-color 0.3s;
  &:focus {
    border-color: #e08490;
    outline: none;
  }
`;

export const BreadCrumb = styled.div`
  margin: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
`;

export const MainCategory = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: black;
`;

export const SubCategory = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: black;
`;

export const StageName = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`;

export const CardPage = styled.div`
  position: relative;
  display: flex;
  color: black;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const MobileButton = styled.button`
  padding: 10px 20px;
  background-color: #f4a9c0;
  border: 1.5px solid black;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin: 5px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #e38aa1;
  }
`;

export const CardContainer = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
  text-align: center;
  margin-bottom: 20px;
  perspective: 1000px;  
    -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
 
`;

export const CardStyled = styled.div`
  position: relative;
  width: 340px;
  height: 214px;
  margin: 0 auto;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  will-change: transform;
  border-radius: 12px;
  perspective: 1000px;
  transform: 
    rotateX(${({ $tiltX }) => $tiltX || 0}deg)
    rotateY(${({ $tiltY }) => $tiltY || 0}deg)
    ${({ $flipped }) => ($flipped ? "rotateY(180deg)" : "rotateY(0deg)")};
  ${({ $animate }) =>
    $animate &&
    css`
      animation: ${popAnimation} 2s ease-in-out;
    `}
`;

export const CardFront = styled.aside`
  background-image: ${({ $bgImage }) => $bgImage || "linear-gradient(#333, #555)"};
  background-size: cover;
  background-position: center;
  color: ${({ $cardFrontColor }) => $cardFrontColor};
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  border-radius: 12px;
  border: 1px solid #ddd; 
`;

const popAnimation = keyframes`
  0% {
    transform: scale(1) rotateY(0deg);
  }
  50% {
    transform: scale(1.1) rotateY(360deg);
  }
  100% {
    transform: scale(1) rotateY(360deg);
  }
`;

export const cardBackColorPresets = [
  "#808080",  
  "#FFFFFF",  
  "#FFCDD2",  
  "#C8E6C9", 
  "#BBDEFB",  
  "#FFF9C4",  
  "#D1C4E9",  
  "#FFCCBC", 
];

export const CardBack = styled.aside`
  background-color: ${({ $cardBackColor }) => $cardBackColor};
  color: ${({ $cardBackTextColor }) => $cardBackTextColor};
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  border-radius: 12px;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transition: background 0.5s ease, color 0.5s ease;
`;

export const Chip = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 40px;
  background: linear-gradient(145deg, #ffd700, #e6ac00);
  border: 1px solid #b8860b;
  border-radius: 6px;
`;

export const CardLogo = styled.img`
  position: absolute;
  filter: invert(0) brightness(1) contrast(1.2) saturate(${({ $logoGrayscale }) => ($logoGrayscale ? 0 : 1)});
  transition: filter 0.5s ease;
`;


export const NumberLabel = styled.label`
  position: absolute;
  letter-spacing: 0.1em;
  white-space: nowrap;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3), -1px -1px 2px rgba(255,255,255,0.5);
  color: inherit;
  transition: color 0.1s ease;
`;

export const NameLabel = styled.label`
  position: absolute;
  text-transform: uppercase;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3), -1px -1px 2px rgba(255,255,255,0.5);
  color: inherit;
  transition: color 0.3s ease;
`;

export const ExpiryLabel = styled.label`
  position: absolute;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3), -1px -1px 2px rgba(255,255,255,0.5);
  color: inherit;
  transition: color 0.3s ease;
`;

export const BlackStrip = styled.div`
  width: 100%;
  height: 20%;
  background: black;
  position: absolute;
  top: 20px;
  left: 0;
`;

export const CVCLabel = styled.label`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 1.3rem;
  letter-spacing: 0.1em;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3), -1px -1px 2px rgba(255,255,255,0.5);
`;

export const SignatureLabel = styled.label`
  margin-top: 80px; 
  color: inherit;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3), -1px -1px 2px rgba(255,255,255,0.5);
`;

export const SignatureLine = styled.div`
  width: 40%;
  height: 2px; 
  background-color: inherit;
  margin-top: 40px;
`;