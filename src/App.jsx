import { useState } from "react";
import "./App.css";
import AppLayout from "./components/common/AppLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Benefit from "./pages/card/Benefit";
import Mypage from "./pages/mypage/Mypage";
import Main from "./Main";
import Education from "./pages/education/Education";
import Peoch from "./pages/peoch/Peoch";
import Admin from "./pages/admin/Admin";
import CardStatement from "pages/mypage/card/CardStatement";
import BenefitStatement from "pages/mypage/card/BenefitStatement";
import AllBenefitSearch from "pages/mypage/card/AllBenefitSearch";
import PositiveFactor from "./pages/education/PositiveFactor";
import BenefitCompare from "pages/card/BenefitCompare";

/*user 디렉토리*/
import User from "pages/user/User";
import Login from "pages/user/Login";
// import SignUp from "pages/user/SignUp";

/*투자 심사 및 결과*/
// import Review from "investReview/Review";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />

        {/* 로그인 & 회원가입 추가 */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<SignUp />} /> */}

        <Route element={<AppLayout />}>
          <Route path="/card" element={<Benefit />} />
          <Route path="/benefit/compare" element={<BenefitCompare />} />

          <Route path="/mypage" element={<Mypage />} />
          <Route path="/education" element={<Education />} />
          <Route path="/peoch" element={<Peoch />} />
          <Route path="/admin" element={<Admin />} />

          {/* <Route path="/investReview" element={<Review />} /> */}
          <Route path="/user" element={<User />} />

          <Route path="/mypage/card" element={<CardStatement />} />
          <Route path="/mypage/card" element={<BenefitStatement />} />
          <Route path="/mypage/card" element={<AllBenefitSearch />} />
          <Route path="/education/compare" element={<PositiveFactor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
