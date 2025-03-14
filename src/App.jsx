import { useState } from "react";
import "./App.css";
import AppLayout from "./components/common/AppLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Benefit from "./pages/card/Benefit";
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
import ContractPreview from "pages/investResult/ContractPreview";

import SetInvestment from "./pages/peoch/amount/SetInvestment";
import InvestmentReallyExit from "./pages/peoch/amount/InvestmentReallyExit";

/* 마이페이지 카드 */
import CardStatement from "./pages/mypage/card/CardStatement";
import BenefitStatement from "./pages/mypage/card/BenefitStatement";
import AllBenefitSearch from "./pages/mypage/card/AllBenefitSearch";
import PaymentTest from "./pages/mypage/card/PaymentTest";

/* 계좌 */
import Account from "./pages/account/Account";
import AccountRegister from "./pages/account/AccountRegister";
import AccountOther from "./pages/account/AccountOther";
import AccountCheck from "./pages/account/AccountCheck";
import Bill from "./pages/account/Bill";
import Calculation from "./pages/account/Calculation";
import CalculationResult from "./pages/account/CalculationResult";
import PositiveFactors from "./pages/account/PositiveFactors";

function App() {
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
          <Route path="/card/design" element={<Design />} />
          <Route path="/benefit/compare" element={<BenefitCompare />} />

          <Route path="/mypage" element={<Mypage />} />
          <Route path="/education" element={<Education />} />
          <Route path="/ResumeEdit" element={<ResumeEdit />} />
          <Route
            path="/SalaryComparisonChart"
            element={<SalaryComparisonChart />}
          />
          <Route path="/peoch" element={<Peoch />} />

          <Route path="/contract" element={<ContractSigning />} />
          <Route path="/contract-preview" element={<ContractPreview />} />

          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/user/dashboard" element={<UserMain />} />

          <Route path="/investReview" element={<Review />} />
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

          <Route path="/user/dashboard" element={<UserMain />} />


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
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/search/:query" element={<SearchResults />} />
          <Route path="/admin/user/detail/:id" element={<Detail />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
