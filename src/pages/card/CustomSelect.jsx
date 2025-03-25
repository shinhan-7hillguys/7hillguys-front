import React, { useState, useRef, useEffect } from "react";

const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder = "월 선택",
  width = "200px",
  selectedFontSize = "44px", // 선택 영역 글자 크기 (크게)
  optionFontSize = "16px"    // 드롭다운 옵션 글자 크기
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 선택된 값에서 월 부분만 추출 (예: "2025-03" → "03월")
  const displayValue = value ? value.split("-")[1] + "월" : "";

  return (
    <div ref={dropdownRef} style={{ position: "relative", width }}>
      {/* 선택 영역 */}
      <div
        style={{
          padding: "8px 40px 8px 8px", // 오른쪽 여백 확보
          cursor: "pointer",
          backgroundColor: "#fff",
          fontSize: selectedFontSize,
          position: "relative",
          color: "#ff99aa",
          width:"150px"
        }}
        onClick={toggleDropdown}
      >
        {value ? displayValue : placeholder}
        {/* 오른쪽에 드롭다운 아이콘 */}
        <span
          style={{
            position: "absolute",
            right: "20px", // 부모 내부에 위치하도록 변경
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "20px",
            display: "inline-block",
            padding: "0px 3px 1px 3px",
            height: "32px",
            cursor: "pointer",
            backgroundColor: "#fff",
            borderRadius: "150px",
            lineHeight: "1.3"
          }}
          onClick={toggleDropdown}
        >
          ▼
        </span>
      </div>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            maxHeight: "200px",
            overflowY: "auto",
            background: "#fff",
            border: "1px solid #ccc",
            zIndex: 1000,
            msOverflowStyle: "none", // IE, Edge
            scrollbarWidth: "none"   // Firefox
          }}
        >
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {options.map((option) => (
            <div
              key={option}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
                fontSize: optionFontSize
              }}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
