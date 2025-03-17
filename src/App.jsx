import { useState } from "react";
import "./App.css";
import AppLayout from "./components/common/AppLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

import Mypage from "./pages/mypage/Mypage";
import Main from "./Main";
import Education from "./pages/education/Education";

import Peoch from "./pages/peoch/Peoch";

import PositiveFactor from "./pages/education/PositiveFactor";


import UserMain from "./pages/peoch/Usermain";
import Layout from "./components/dashboard/DashboardLayout";
import SearchResults from "./pages/admin/searchresult";
import Detail from "./pages/admin/Detail";

import Dashboard from "./pages/admin/Dashboard";


// card 및 혜택
import Benefit from "./pages/card/Benefit";
import CardIntroPage from "pages/card/CardIntroPage";
import TermsAgreementPage from "pages/card/TermsAgreementPage";
import CardDesignPage from "pages/card/CardDesignPage";
import IdentityVerificationPage from "pages/card/IdentifyVerificationPage";
import PersonalInfoPage from "pages/card/PersonalInfoPage";
import EnglishNamePage from "pages/card/EnglishNamePage";
import CardPinPage from "pages/card/CardPinPage";
import FinalCheckPage from "pages/card/FinalCheckPage";

// import Dashboard from "./pages/admin/Dashboard";
import Design from "./pages/card/CardDesignPage";
import BenefitCompare from "pages/card/BenefitCompare";

import User from "pages/user/User";
import Login from "pages/user/Login";
import Signup from "pages/user/Signup";
import ResumeEdit from "./pages/education/ResumeEdit";
import SalaryComparisonChart from "./pages/education/SalaryComparisonChart";

/*투자 심사 및 결과*/
import Review from "pages/investReview/Review";
import InvestmentTempAllowance from "./pages/peoch/amount/InvestmentTempAllowance";

import InvestmentExit from "./pages/peoch/amount/InvestmentExit";

import InvestmentStatusCheck from "pages/investResult/InvestmentStatusCheck";
import ContractSigning from "pages/investResult/ContractSigning";

import SetInvestment from "./pages/peoch/amount/SetInvestment";
import InvestmentReallyExit from "./pages/peoch/amount/InvestmentReallyExit";

/* 마이페이지 카드 */
import CardStatement from "./pages/mypage/card/CardStatement";
import BenefitStatement from "./pages/mypage/card/BenefitStatement";
import AllBenefitSearch from "./pages/mypage/card/AllBenefitSearch";
import PaymentTest from "./pages/mypage/card/PaymentTest";
import ResumeDetail from "./pages/education/ResumeDetail";
import StartScreen from "./pages/education/StartScreen";

/* 계좌 */
import Account from "./pages/account/Account";
import AccountRegister from "./pages/account/AccountRegister";
import AccountOther from "./pages/account/AccountOther";
import AccountCheck from "./pages/account/AccountCheck";
import Bill from "./pages/account/Bill";
import Calculation from "./pages/account/Calculation";
import CalculationResult from "./pages/account/CalculationResult";
import PositiveFactors from "./pages/account/PositiveFactors";
import ContractPreview from "./pages/investResult/ContractPreview";



function App() {
  axios.defaults.withCredentials = true;
  // (선택 사항) 기본 URL 설정
  axios.defaults.baseURL = "http://localhost:8080";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        {/* 로그인 & 회원가입 추가 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<Layout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/search/:query" element={<SearchResults />} />
          <Route path="/admin/user/detail/:id" element={<Detail />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/card" element={<Benefit />} />

          <Route path="/card/intro" element={<CardIntroPage />} />
          <Route path="/card/terms" element={<TermsAgreementPage />} />
          <Route path="/card/design" element={<CardDesignPage />} />
          <Route path="/card/identity" element={<IdentityVerificationPage />} />
          <Route path="/card/personal-info" element={<PersonalInfoPage />} />
          <Route path="/card/english-name" element={<EnglishNamePage />} />
          <Route path="/card/pin" element={<CardPinPage />} />
          <Route path="/card/final" element={<FinalCheckPage />} />







          <Route path="/benefit/compare" element={<BenefitCompare />} />

          <Route path="/education" element={<StartScreen />} />
          <Route path="/education/ResumeEdit" element={<ResumeEdit />} />
          <Route path="/education/myeducation" element={<Education />} />
          <Route path="/education/SalaryComparisonChart" element={<SalaryComparisonChart />} />
          <Route path="/education/resume-detail/:id" element={<ResumeDetail />} />
          <Route path="/peoch" element={<Peoch />} />

          <Route path="/contract" element={<ContractSigning />} />
          <Route path="/contract-preview" element={<ContractPreview />} />

    
          <Route path="/user/dashboard" element={<UserMain />} />

          <Route path="/investReview" element={<Review />} />
          <Route path="/investment/status" element={<InvestmentStatusCheck />} />
          <Route path="/investTempAllowance" element={<InvestmentTempAllowance/>}/>
          <Route path="/investExit" element={<InvestmentExit/>}/>
          <Route path="/SetInvestment" element={<SetInvestment/>}/>
          <Route path="/investmentReallyExit" element={<InvestmentReallyExit/>}/>

          <Route
            path="/investment/status"
            element={<InvestmentStatusCheck />}
          />
          <Route
            path="/investment-temp-allowance"
            element={<InvestmentTempAllowance />}
          />
          <Route path="/investment-support" element={<InvestmentExit />} />
          <Route path="/SetInvestment" element={<SetInvestment />} />
          <Route
            path="/investmentReallyExit"
            element={<InvestmentReallyExit />}
          />

          <Route path="/user" element={<User />} />
          <Route
            path="/mypage/card/CardStatement"
            element={<CardStatement />}
          />
          <Route
            path="/mypage/card/BenefitStatement"
            element={<BenefitStatement />}
          />
          <Route
            path="/mypage/card/AllBenefitSearch"
            element={<AllBenefitSearch />}
          />
          <Route path="/mypage/card/PaymentTest" element={<PaymentTest />} />
          <Route path="/education/compare" element={<PositiveFactor />} />

          <Route path="/account" element={<Account />} />
          <Route path="/account/agree" element={<AccountRegister />} />
          <Route path="/account/other" element={<AccountOther />} />
          <Route path="/account/check" element={<AccountCheck />} />
          <Route path="/account/bill" element={<Bill />} />
          <Route path="/account/calculation" element={<Calculation />} />
          <Route path="/account/calculationResult" element={<CalculationResult />} />
          <Route path="/account/positive" element={<PositiveFactors />} />
        </Route>
        <Route element={<Layout />}>
          {/* <Route path="/admin" element={<Dashboard />} /> */}
          <Route path="/admin/search/:query" element={<SearchResults />} />
          <Route path="/admin/user/detail/:id" element={<Detail />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
