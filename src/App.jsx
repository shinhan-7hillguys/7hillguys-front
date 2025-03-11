import { useState } from "react";
import "./App.css";
import AppLayout from "./components/common/AppLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Mypage from "./pages/mypage/Mypage";
import Main from "./Main";
import Education from "./pages/education/Education";
import Peoch from "./pages/peoch/Peoch";
import Admin from "./pages/admin/Admin";
import MyCard from "./pages/mypage/card/MyCard";

import PositiveFactor from "./pages/education/PositiveFactor";
import BenefitCompare from "pages/card/BenefitCompare";

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

/*user 디렉토리*/
import User from "pages/user/User";
import Login from "pages/user/Login";
import Signup from "pages/user/Signup";
import ResumeEdit from "./pages/education/ResumeEdit";
import SalaryComparisonChart from "./pages/education/SalaryComparisonChart";

/*투자 심사 및 결과*/
import Review from "pages/investReview/Review";
import InvestmentTempAllowance from "./pages/peoch/amount/InvestmentTempAllowance";
import InvestmentSupport from "./pages/peoch/amount/InvestmentSupport";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />

        {/* 로그인 & 회원가입 추가 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

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

          <Route path="/mypage" element={<Mypage />} />
          <Route path="/education" element={<Education />} />
          <Route path="/ResumeEdit" element={<ResumeEdit />} />
          <Route path="/SalaryComparisonChart" element={<SalaryComparisonChart />} />
          <Route path="/peoch" element={<Peoch />} />
          <Route path="/investReview" element={<Review />} />
          <Route path="/investment-temp-allowance" element={<InvestmentTempAllowance/>}/>
          <Route path="/investment-support" element={<InvestmentSupport/>}/>
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />

          <Route path="/mypage/card" element={<MyCard />} />
          <Route path="/education/compare" element={<PositiveFactor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
