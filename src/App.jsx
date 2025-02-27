import { useState } from "react";
import './App.css';
import AppLayout from "./components/common/AppLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Benefit from "./pages/card/Benefit";
import Mypage from "./pages/mypage/Mypage";
import Main from "./Main";

function App() {
  
  
 

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/card" element={<Benefit />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
