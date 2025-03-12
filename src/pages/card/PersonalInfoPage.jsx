// src/pages/PersonalInfoPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInfo } from "../../features/cardApplicationSlice";

function PersonalInfoPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, userInfoStatus } = useSelector((state) => state.cardApplication);

  useEffect(() => {
    // 컴포넌트가 마운트되면 사용자 정보를 서버에서 가져옴
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const handleNextClick = () => {
    navigate("/card/english-name");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>사용자 정보 확인</h2>
      {userInfoStatus === "loading" ? (
        <p>불러오는 중...</p>
      ) : (
        <>
          <div>
            <label>이름: </label>
            <input type="text" value={userInfo.name} readOnly />
          </div>
          <div>
            <label>전화번호: </label>
            <input type="text" value={userInfo.phone} readOnly />
          </div>
          <div>
            <label>이메일: </label>
            <input type="text" value={userInfo.email} readOnly />
          </div>
          <div>
            <label>주소: </label>
            <input type="text" value={userInfo.address} readOnly />
          </div>
          <br />
          <button onClick={handleNextClick}>다음 단계</button>
        </>
      )}
    </div>
  );
}

export default PersonalInfoPage;
