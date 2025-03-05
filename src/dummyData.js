const dataMap = {
    userCount: {
      week: {
        barData: [
          { name: '월', usage: 2000 },
          { name: '화', usage: 2500 },
          { name: '수', usage: 2200 },
          { name: '목', usage: 3000 },
          { name: '금', usage: 2800 },
          { name: '토', usage: 3500 },
          { name: '일', usage: 3200 },
        ],
        pieData: [
          { name: '서비스 A', value: 400 },
          { name: '서비스 B', value: 300 },
          { name: '서비스 C', value: 300 },
          { name: '서비스 D', value: 200 },
        ],
      },
      month: {
        barData: [
          { name: '1주', usage: 15000 },
          { name: '2주', usage: 17000 },
          { name: '3주', usage: 16000 },
          { name: '4주', usage: 18000 },
        ],
        pieData: [
          { name: '서비스 A', value: 1500 },
          { name: '서비스 B', value: 1200 },
          { name: '서비스 C', value: 1300 },
          { name: '서비스 D', value: 1000 },
        ],
      },
      '6months': {
        barData: [
          { name: '1월', usage: 60000 },
          { name: '2월', usage: 65000 },
          { name: '3월', usage: 70000 },
          { name: '4월', usage: 68000 },
          { name: '5월', usage: 72000 },
          { name: '6월', usage: 75000 },
        ],
        pieData: [
          { name: '서비스 A', value: 6000 },
          { name: '서비스 B', value: 5000 },
          { name: '서비스 C', value: 5500 },
          { name: '서비스 D', value: 4500 },
        ],
      },
      year: {
        barData: [
          { name: '1분기', usage: 180000 },
          { name: '2분기', usage: 190000 },
          { name: '3분기', usage: 200000 },
          { name: '4분기', usage: 210000 },
        ],
        pieData: [
          { name: '서비스 A', value: 25000 },
          { name: '서비스 B', value: 22000 },
          { name: '서비스 C', value: 23000 },
          { name: '서비스 D', value: 15000 },
        ],
      },
    },
    totalSignups: {
      week: {
        barData: [
          { name: '월', usage: 1000 },
          { name: '화', usage: 1200 },
          { name: '수', usage: 1100 },
          { name: '목', usage: 1400 },
          { name: '금', usage: 1300 },
          { name: '토', usage: 1500 },
          { name: '일', usage: 1600 },
        ],
        pieData: [
          { name: '채널 A', value: 200 },
          { name: '채널 B', value: 180 },
          { name: '채널 C', value: 150 },
          { name: '채널 D', value: 100 },
        ],
      },
      month: {
        barData: [
          { name: '1주', usage: 5000 },
          { name: '2주', usage: 5200 },
          { name: '3주', usage: 5100 },
          { name: '4주', usage: 5300 },
        ],
        pieData: [
          { name: '채널 A', value: 800 },
          { name: '채널 B', value: 700 },
          { name: '채널 C', value: 600 },
          { name: '채널 D', value: 500 },
        ],
      },
      '6months': {
        barData: [
          { name: '1월', usage: 20000 },
          { name: '2월', usage: 21000 },
          { name: '3월', usage: 22000 },
          { name: '4월', usage: 23000 },
          { name: '5월', usage: 24000 },
          { name: '6월', usage: 25000 },
        ],
        pieData: [
          { name: '채널 A', value: 4000 },
          { name: '채널 B', value: 3500 },
          { name: '채널 C', value: 3000 },
          { name: '채널 D', value: 2500 },
        ],
      },
      year: {
        barData: [
          { name: '1분기', usage: 60000 },
          { name: '2분기', usage: 62000 },
          { name: '3분기', usage: 64000 },
          { name: '4분기', usage: 66000 },
        ],
        pieData: [
          { name: '채널 A', value: 15000 },
          { name: '채널 B', value: 14000 },
          { name: '채널 C', value: 13000 },
          { name: '채널 D', value: 12000 },
        ],
      },
    },
    totalAmount: {
      week: {
        barData: [
          { name: '월', usage: 4000 },
          { name: '화', usage: 4200 },
          { name: '수', usage: 4100 },
          { name: '목', usage: 4300 },
          { name: '금', usage: 4400 },
          { name: '토', usage: 4500 },
          { name: '일', usage: 4600 },
        ],
        pieData: [
          { name: '상품 A', value: 800 },
          { name: '상품 B', value: 700 },
          { name: '상품 C', value: 600 },
          { name: '상품 D', value: 500 },
        ],
      },
      month: {
        barData: [
          { name: '1주', usage: 15000 },
          { name: '2주', usage: 15500 },
          { name: '3주', usage: 16000 },
          { name: '4주', usage: 16500 },
        ],
        pieData: [
          { name: '상품 A', value: 2500 },
          { name: '상품 B', value: 2200 },
          { name: '상품 C', value: 2000 },
          { name: '상품 D', value: 1800 },
        ],
      },
      '6months': {
        barData: [
          { name: '1월', usage: 60000 },
          { name: '2월', usage: 62000 },
          { name: '3월', usage: 64000 },
          { name: '4월', usage: 66000 },
          { name: '5월', usage: 68000 },
          { name: '6월', usage: 70000 },
        ],
        pieData: [
          { name: '상품 A', value: 10000 },
          { name: '상품 B', value: 9000 },
          { name: '상품 C', value: 8000 },
          { name: '상품 D', value: 7000 },
        ],
      },
      year: {
        barData: [
          { name: '1분기', usage: 180000 },
          { name: '2분기', usage: 185000 },
          { name: '3분기', usage: 190000 },
          { name: '4분기', usage: 195000 },
        ],
        pieData: [
          { name: '상품 A', value: 40000 },
          { name: '상품 B', value: 35000 },
          { name: '상품 C', value: 30000 },
          { name: '상품 D', value: 25000 },
        ],
      },
    },
    revenue: {
      week: {
        barData: [
          { name: '월', usage: 500 },
          { name: '화', usage: 550 },
          { name: '수', usage: 520 },
          { name: '목', usage: 580 },
          { name: '금', usage: 600 },
          { name: '토', usage: 650 },
          { name: '일', usage: 700 },
        ],
        pieData: [
          { name: '국내', value: 500 },
          { name: '해외', value: 300 },
          { name: '직접', value: 200 },
          { name: '기타', value: 100 },
        ],
      },
      month: {
        barData: [
          { name: '1주', usage: 2500 },
          { name: '2주', usage: 2600 },
          { name: '3주', usage: 2700 },
          { name: '4주', usage: 2800 },
        ],
        pieData: [
          { name: '국내', value: 800 },
          { name: '해외', value: 500 },
          { name: '직접', value: 400 },
          { name: '기타', value: 300 },
        ],
      },
      '6months': {
        barData: [
          { name: '1월', usage: 6000 },
          { name: '2월', usage: 6200 },
          { name: '3월', usage: 6400 },
          { name: '4월', usage: 6600 },
          { name: '5월', usage: 6800 },
          { name: '6월', usage: 7000 },
        ],
        pieData: [
          { name: '국내', value: 1500 },
          { name: '해외', value: 1200 },
          { name: '직접', value: 1000 },
          { name: '기타', value: 800 },
        ],
      },
      year: {
        barData: [
          { name: '1분기', usage: 7000 },
          { name: '2분기', usage: 7500 },
          { name: '3분기', usage: 8000 },
          { name: '4분기', usage: 8500 },
        ],
        pieData: [
          { name: '국내', value: 2000 },
          { name: '해외', value: 1500 },
          { name: '직접', value: 1200 },
          { name: '기타', value: 1000 },
        ],
      },
    },
  };
  

export const CardData = {
  cardNumber: "1111 2222 3333 4444",
  cardName: "JAMES KIM",
  expiry: "12/34",
  cvc: "999",
  bgImage: "",  
  layout: "1",
  flipped: false,
};
export const dummyUser = {
  user_id: 1,
  email: 'hong@example.com',
  name: '홍길동',
  birth_date: '1990-01-01',
  phone: '010-1234-5678',
  address: '서울시 강남구',
  role: 'user',
  created_at: '2020-01-01 12:00:00',
  updated_at: '2020-01-01 12:00:00',
};

export const dummyUserProfile = {
  user_profile_id: 1,
  user_id: 1,
  university: '서울대학교, 컴퓨터공학',
  education_major: '서울고등학교, 내신 4.2',
  certification: '정보처리기사, 컴퓨터활용능력',
  family_status: '미혼, 자녀 없음',
  assets: 500000000,
  criminal_record: false,
  health_status: 90,
  gender: true,
  address: '서울시 강남구',
  mental_status: 85,
  created_at: '2020-02-01 09:00:00',
  updated_at: '2020-02-01 09:00:00',
};

export const dummyInvestment = {
  grant_id: 101,
  user_id: 1,
  expected_income: '500000000', // 예시
  start_date: '2024-01-01',
  end_date: '2024-12-31',
  status: '승인됨',
  original_invest_value: 300000000,
  monthly_allowance: 10000000,
  isActive: true,
  refund_rate: 85,
  max_investment: 500000000,
  Field: '2%',  // 운용 보수
  invest_value: 250000000,
  temp_allowance: 8000000,
  created_at: '2024-01-01 10:00:00',
  updated_at: '2024-06-01 10:00:00',
};

export const dummyStatCategories = {
  remainingSupport: '잔여 지원금',
  expectedPaymentRate: '예상 납부율',
  similarGroupComparison: '유사 그룹 비교',
};

export const dummyDataMap = {
  // 잔여 지원금: 월, 6개월, 연만 제공 (주 옵션 제거)
  remainingSupport: {
    month: { 
      barData: [
        { name: '1주차', usage: 12000000 },
        { name: '2주차', usage: 14000000 },
        { name: '3주차', usage: 13000000 },
        { name: '4주차', usage: 15000000 },
      ],
      pieData: [
        { name: '지원금 A', value: 50000000 },
        { name: '지원금 B', value: 30000000 },
      ],
      prevTotal: 48000000,
    },
    '6months': { 
      barData: [
        { name: '1월', usage: 11000000 },
        { name: '2월', usage: 11500000 },
        { name: '3월', usage: 12000000 },
        { name: '4월', usage: 12500000 },
        { name: '5월', usage: 13000000 },
        { name: '6월', usage: 13500000 },
      ],
      pieData: [
        { name: '지원금 A', value: 70000000 },
        { name: '지원금 B', value: 50000000 },
      ],
      prevTotal: 68000000,
    },
    year: { 
      barData: [
        { name: '1분기', usage: 35000000 },
        { name: '2분기', usage: 36000000 },
        { name: '3분기', usage: 37000000 },
        { name: '4분기', usage: 38000000 },
      ],
      pieData: [
        { name: '지원금 A', value: 150000000 },
        { name: '지원금 B', value: 100000000 },
      ],
      prevTotal: 138000000,
    },
  },
  expectedPaymentRate: {
    week: { 
      barData: [
        { name: '월', usage: 10 },
        { name: '화', usage: 10 },
        { name: '수', usage: 10 },
        { name: '목', usage: 10 },
        { name: '금', usage: 10 },
        { name: '토', usage: 10 },
        { name: '일', usage: 10 },
      ],
      pieData: [{ name: '납부율', value: 10 }],
      prevTotal: 9,
    },
    month: { 
      barData: [
        { name: '1주차', usage: 10 },
        { name: '2주차', usage: 10 },
        { name: '3주차', usage: 10 },
        { name: '4주차', usage: 10 },
      ],
      pieData: [{ name: '납부율', value: 10 }],
      prevTotal: 9.5,
    },
    '6months': { 
      barData: [
        { name: '1월', usage: 10 },
        { name: '2월', usage: 10 },
        { name: '3월', usage: 10 },
        { name: '4월', usage: 10 },
        { name: '5월', usage: 10 },
        { name: '6월', usage: 10 },
      ],
      pieData: [{ name: '납부율', value: 10 }],
      prevTotal: 9,
    },
    year: { 
      barData: [
        { name: '1분기', usage: 10 },
        { name: '2분기', usage: 10 },
        { name: '3분기', usage: 10 },
        { name: '4분기', usage: 10 },
      ],
      pieData: [{ name: '납부율', value: 10 }],
      prevTotal: 10,
    },
  },
  similarGroupComparison: {
    week: { 
      barData: [
        { name: '월', usage: 105 },
        { name: '화', usage: 105 },
        { name: '수', usage: 105 },
        { name: '목', usage: 105 },
        { name: '금', usage: 105 },
        { name: '토', usage: 105 },
        { name: '일', usage: 105 },
      ],
      pieData: [{ name: '소득 비교', value: 105 }],
      prevTotal: 100,
    },
    month: {
      barData: [
        { name: '1주차', usage: 107 },
        { name: '2주차', usage: 108 },
        { name: '3주차', usage: 106 },
        { name: '4주차', usage: 107 },
      ],
      pieData: [{ name: '소득 비교', value: 107 }],
      prevTotal: 105,
    },
    '6months': {
      barData: [
        { name: '1월', usage: 110 },
        { name: '2월', usage: 109 },
        { name: '3월', usage: 111 },
        { name: '4월', usage: 110 },
        { name: '5월', usage: 109 },
        { name: '6월', usage: 110 },
      ],
      pieData: [{ name: '소득 비교', value: 110 }],
      prevTotal: 108,
    },
    year: {
      barData: [
        { name: '1분기', usage: 108 },
        { name: '2분기', usage: 107 },
        { name: '3분기', usage: 109 },
        { name: '4분기', usage: 108 },
      ],
      pieData: [{ name: '소득 비교', value: 108 }],
      prevTotal: 105,
    },
  },
};

export const dummyUsers = [
  {
    id: 1,
    name: 'Alice Kim',
    birth_date: '1990-05-10',
    occupation: 'Developer',
    gender: 'female',
    salary: 5000,
    photo: 'https://placehold.co/80x80/png',
  },
  {
    id: 2,
    name: 'Bob Lee',
    birth_date: '1988-07-22',
    occupation: 'Designer',
    gender: 'male',
    salary: 4000,
    photo: 'https://placehold.co/80x80/png',
  },
  {
    id: 3,
    name: 'Charlie Park',
    birth_date: '1985-03-15',
    occupation: 'Manager',
    gender: 'male',
    salary: 6000,
    photo: 'https://placehold.co/80x80/png',
  },
  {
    id: 4,
    name: 'Diana Choi',
    birth_date: '1992-11-30',
    occupation: 'Developer',
    gender: 'female',
    salary: 5500,
    photo: 'https://placehold.co/80x80/png',
  },
  {
    id: 5,
    name: 'Evan Jung',
    birth_date: '1987-02-18',
    occupation: 'Designer',
    gender: 'male',
    salary: 4500,
    photo: 'https://placehold.co/80x80/png',
  },
];
  export default dataMap;