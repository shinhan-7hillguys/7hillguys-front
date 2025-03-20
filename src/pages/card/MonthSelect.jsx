import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomSelect from "./CustomSelect";

const MonthSelect = ({ onChange, value }) => {
  const card = useSelector((state) => state.benefit.card);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!card || !card.issuedDate) return;
    // 카드 발급일이 "22/11" 형식으로 저장되어 있다고 가정 (년/월)
    const [issuedYearStr, issuedMonthStr] = card.issuedDate.split("/");
    const issuedYear = parseInt(issuedYearStr, 10) + 2000; // 예: "22" -> 2022
    const issuedMonth = parseInt(issuedMonthStr, 10);        // 예: 11

    // 시작 날짜: 발급년도와 발급월의 1일
    const startDate = new Date(issuedYear, issuedMonth - 1, 1);
    // 종료 날짜: 오늘의 연도와 월의 1일
    const today = new Date();
    const endDate = new Date(today.getFullYear(), today.getMonth(), 1);

    // 두 날짜 사이의 모든 "yyyy-MM" 옵션 생성
    const opts = [];
    let temp = new Date(startDate);
    while (temp <= endDate) {
      const year = temp.getFullYear();
      const month = (temp.getMonth() + 1).toString().padStart(2, "0");
      opts.push(`${year}-${month}`);
      temp.setMonth(temp.getMonth() + 1);
    }
    setOptions(opts);
  }, [card]);

  return (
    <CustomSelect
      options={options}
      value={value}
      onChange={onChange}
      placeholder="월 선택"
      width="120px"  // 원하는 width 지정
    />
  );
};

export default MonthSelect;
