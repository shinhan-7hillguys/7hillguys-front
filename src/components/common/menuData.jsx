export const menuData = [
    {
      label: "Card",
      children: [
        { label: "카드 신청하기", to: "/card/intro" },
        { label: "혜택 적용하기", to: "/card" },
        { label: "전체 혜택 조회", to: "/mypage/card/AllBenefitSearch" },
      ],
    },
    {
      label: "마이페이지",
      children: [
        { label: "계좌목록", to: "/account" },
        { label: "납부내역조회", to: "/account/check" },
        { label: "산정", to: "/account/calculation" },
        { label: "긍정효과", to: "/account/positive" },
        { label: "청구서", to: "/account/bill" },
        { label: "카드명세서", to: "/mypage/card/CardStatement" },
        { label: "혜택명세서", to: "/mypage/card/BenefitStatement" },
      ],
    },
    {
      label: "Peoch",
      // 2단계: '같이', '가치'
      children: [
        {
          label: "같이",
          // 3단계: 아래 children
          children: [ 
            { label: "커리어파트너", to: "/education" },
          ],
        },
        {
          label: "가치",
          // 3단계: 아래 children
          children: [
            { label: "임시한도신청", to: "/investTempAllowance" },
            { label: "엑시트", to: "/investExit" },
            { label: "투자받는 금액 변경/신청", to: "/setInvestment" },
            { label: "투자심사신청", to: "/investReview" },
            { label: "심사결과조회", to: "/investment/status" },
            { label: "education", to: "/education" },
          ],
        },
      ],
    },
  ];