const API_BASE_URL = "http://localhost:8080"; // 백엔드 API 기본 URL

export const apiRequest = async (endpoint, options = {}) => {
    const defaultHeaders = {
        "Content-Type": "application/json",
    };

    const config = {
        ...options,
        credentials: "include",  // 쿠키 자동 포함
        headers: {
            ...defaultHeaders,
            ...options.headers, // 사용자 정의 헤더 병합
        },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
    }

    return response.json(); // JSON 형태로 반환
};