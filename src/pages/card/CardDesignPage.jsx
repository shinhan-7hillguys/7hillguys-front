import React from "react";
 import { useNavigate } from "react-router-dom";
 import { useDispatch, useSelector } from "react-redux";
 import { setCardDesign } from "../../features/cardApplicationSlice";
 
 function CardDesignPage() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { cardDesign } = useSelector((state) => state.cardApplication);
 
   const handleDesignSelect = (design) => {
     dispatch(setCardDesign(design));
   };
 
   const handleNextClick = () => {
     if (!cardDesign) {
       alert("카드 디자인을 선택해주세요.");
       return;
     }
     navigate("/card/identity");
   };
 
   return (
     <div style={{ padding: 20 }}>
       <h2>카드 디자인 선택</h2>
       <div>
         <button
           style={{
             backgroundColor: cardDesign === "pink" ? "pink" : "white",
             marginRight: 8,
           }}
           onClick={() => handleDesignSelect("pink")}
         >
           핑크 카드
         </button>
         <button
           style={{
             backgroundColor: cardDesign === "blue" ? "lightblue" : "white",
             marginRight: 8,
           }}
           onClick={() => handleDesignSelect("blue")}
         >
           블루 카드
         </button>
         <button
           style={{
             backgroundColor:
               cardDesign === "chameleon" ? "lightgreen" : "white",
           }}
           onClick={() => handleDesignSelect("chameleon")}
         >
           카멜레온 카드
         </button>
       </div>
       <br />
       <button onClick={handleNextClick}>다음 단계</button>
     </div>
   );
 }
 
 export default CardDesignPage;