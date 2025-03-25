export const menuData = [
  {
    label: "Peoch", 
    children: [
      {
        label: "같이(Together)", 
        children: [
          {label: "커리어파트너", to: "/education"},
        ],
      },
      {
        label: "가치(Value)", 
        children: [
          {label: "투자심사신청", to: "/investReview"}, 
          {label: "심사결과조회", to: "/investment/status"},
          {label: "임시한도신청", to: "/investTempAllowance"},  
          {label: "조기상환", to: "/investExit"}, 
        ],
      },
    ],
  },

  {
    label: "카드",
    children: [
      {label: "카드신청", to: "/card/intro"},
      {label: "혜택적용", to: "/card"},
      {label: "전체혜택조회", to: "/mypage/card/AllBenefitSearch"},
    ],
  },


  {
    label: "마이페이지",
    children: [
      {label: "카드명세서", to: "/mypage/card/CardStatement"}, 
      {label: "혜택명세서", to: "/mypage/card/BenefitStatement"}, 
      {label: "납부금액산정", to: "/account/calculation"},
      {label: "청구서", to: "/account/bill"},
      {label: "계좌목록", to: "/account"},
      {label: "납부내역조회", to: "/account/check"},  
    ],
  },
  ];