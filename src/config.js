const config = {
    useDummyData: process.env.REACT_APP_USE_DUMMY_DATA === 'true', //더미 : true, api : false
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api'
  };
  
  export default config;
  