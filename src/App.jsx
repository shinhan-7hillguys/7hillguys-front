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
import SignUp from "./pages/user/SignUp";
import Dashboard from "./pages/admin/Dashboard";
import UserMain from "./pages/peoch/Usermain";
import Layout from "./components/dashboard/DashboardLayout";
import SearchResults from "./pages/admin/searchresult";
import Detail from "./pages/admin/Detail";

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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage/card" element={<MyCard />} />
          <Route path="/education/compare" element={<PositiveFactor />} />
          <Route path="/user/dashboard" element={<UserMain />} />
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