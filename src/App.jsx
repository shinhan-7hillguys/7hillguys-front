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
import MyCard from "./pages/mypage/card/MyCard";
import PositiveFactor from "./pages/education/PositiveFactor";
import Account from "./pages/account/Account";
import AccountRegister from "./pages/account/AccountRegister";
import AccountOther from "./pages/account/AccountOther";
import AccountCheck from "./pages/account/AccountCheck";
import Bill from "./pages/account/Bill";
import Calculation from "./pages/account/Calculation";
import CalculationResult from "./pages/account/CalculationResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route element={<AppLayout />}>
          <Route path="/card" element={<Benefit />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/education" element={<Education />} />
          <Route path="/peoch" element={<Peoch />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/signup" element={<Admin />} />
          <Route path="/mypage/card" element={<MyCard />} />
          <Route path="/education/compare" element={<PositiveFactor />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/agree" element={<AccountRegister />} />
          <Route path="/account/other" element={<AccountOther />} />
          <Route path="/account/check" element={<AccountCheck />} />
          <Route path="/account/bill" element={<Bill />} />
          <Route path="/account/calculation" element={<Calculation />} />
          <Route path="/account/calculationResult" element={<CalculationResult />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
