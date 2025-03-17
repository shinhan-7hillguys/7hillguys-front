const config = {
    useDummyData: 'true', //더미 : true, api : false
    //여기에서 바꾸면 외부에서 접근 가능
    //나중에 배포할떄 조정
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api'
  };
  
  export default config;
  