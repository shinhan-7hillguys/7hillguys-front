import { useState } from "react";
import "./App.css";
import AppLayout from "./components/common/AppLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Benefit from "./pages/card/Benefit";
import Mypage from "./pages/mypage/Mypage";
import Main from "./Main";
import Education from "./pages/education/Education";
import Peoch from "./pages/peoch/Peoch"; 
import MyCard from "./pages/mypage/card/MyCard";
import PositiveFactor from "./pages/education/PositiveFactor";
 
import Dashboard from "./pages/admin/Dashboard";
import UserMain from "./pages/peoch/Usermain";
 
import Dashboard from "./pages/admin/dashboard";
import Design from "./pages/card/design";
import BenefitCompare from "pages/card/BenefitCompare";


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
          <Route path="/benefit/compare" element={<BenefitCompare />} />

          <Route path="/mypage" element={<Mypage />} />
          <Route path="/education" element={<Education />} />
          <Route path="/ResumeEdit" element={<ResumeEdit />} />
          <Route path="/SalaryComparisonChart" element={<SalaryComparisonChart />} />
          <Route path="/peoch" element={<Peoch />} />
 
          <Route path="/admin" element={<Dashboard />} /> 
          <Route path="/user/dashboard" element={<UserMain />} />
 
          <Route path="/investReview" element={<Review />} />
          <Route path="/investment-temp-allowance" element={<InvestmentTempAllowance/>}/>
          <Route path="/investment-support" element={<InvestmentSupport/>}/> 

          <Route path="/user" element={<User />} />

          <Route path="/mypage/card" element={<MyCard />} />
          <Route path="/education/compare" element={<PositiveFactor />} /> 
          <Route path="/design" element={<Design />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
