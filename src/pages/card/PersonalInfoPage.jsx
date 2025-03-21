// src/pages/PersonalInfoPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInfo } from "../../features/cardApplicationSlice";
import NavigationHeader from "components/common/NavigationHeader";

function PersonalInfoPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, userInfoStatus } = useSelector((state) => state.cardApplication);
const {
    termsAgreed,
    englishName,
    cardPin,
   
  } = useSelector((state) => state.cardApplication);

  useEffect(() => {
    // 컴포넌트가 마운트되면 사용자 정보를 서버에서 가져옴
    if (!termsAgreed) {
      navigate("/card/terms");
    }

    dispatch(fetchUserInfo());
  }, [termsAgreed, englishName, cardPin, navigate,dispatch]);

  const handleNextClick = () => {
    navigate("/card/english-name");
  };

  return (
    <>
      <div >
      {userInfoStatus === "loading" ? (
        <p className="info_loading">불러오는 중...</p>
      ) : (
        <div className="card_person">
          <h2><em>{userInfo.name}</em> 님의 정보를 확인해주세요.</h2>
          <div >
            <label>이름: </label>
            <input type="text" value={userInfo.name} readOnly />
          </div>
          <div>
            <label>전화번호: </label>
            <input type="text" value={userInfo.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
} readOnly />
          </div>
          <div>
            <label>이메일: </label>
            <input type="text" value={userInfo.email} readOnly />
          </div>
          <div>
            <label>주소: </label>
            {/* <p>※해당 주소로 카드가 배송됩니다. </p> */}
            <input type="text" value={userInfo.address} readOnly />
          </div>
 
          <div className="btn_div">
          <button className="card_btn" onClick={handleNextClick}>다음 단계</button>
          </div>
          
        </div>
      )}
    </div>
    </>
  
  );
}

export default PersonalInfoPage;
