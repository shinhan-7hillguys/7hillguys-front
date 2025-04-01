const API_BASE_URL = process.env.REACT_APP_API_URL || "http://192.168.0.172:31001";

export const customFetch = async (endpoint, options = {}) => {
    const defaultHeaders = {
        "Content-Type": "application/json",
    };

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
    }

    return response.json();
};
