import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const InvestmentSupport = () => {
    // 상태값 정의
    const [chartData, setChartData] = useState({
        series: [{name: '예상 소득', data: []}],
        options: {
            chart: {type: 'line', height: 350},
            xaxis: {categories: []},
        },
    });

    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태 관리
    const token = localStorage.getItem("token");
    // API 호출 및 데이터 처리
    useEffect(() => {
        const fetchExpectedIncome = async () => {
            try {

                const response = await axios.get('http://localhost:8080/api/expectedincome/2', {
                    headers: {
                        Authorization: `Bearer ${token}` // Bearer Token 추가
                    }
                });
                const incomeData = response.data[0]; // 첫 번째 데이터를 사용
                const expectedIncome = JSON.parse(incomeData.expectedIncome); // JSON 문자열 파싱

                // x축과 y축 데이터 생성
                const years = Object.keys(expectedIncome).map((year) => `${year}년`);
                const incomeValues = Object.values(expectedIncome);

                // 차트 데이터 업데이트
                setChartData({
                    series: [{name: '예상 소득', data: incomeValues}],
                    options: {
                        chart: {type: 'line', height: 350},
                        xaxis: {categories: years},
                    },
                });
                setLoading(false);
            } catch (err) {
                console.error('데이터를 가져오는 중 에러 발생:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchExpectedIncome();
    }, []);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>에러가 발생했습니다. 다시 시도해주세요.</p>;

    return (
        <div style={{padding: '20px', fontFamily: 'Arial'}}>
            <h1>투자 지원 금액 변경</h1>

            {/* 차트 렌더링 */}
            <Chart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={350}
            />

            {/* 결과 정보 */}
            <div style={{marginTop: '20px'}}>
                <p>총 예상 소득 합계: {chartData.series[0].data.reduce((a, b) => a + b, 0).toLocaleString()} 원</p>
            </div>
        </div>
    );
};

export default InvestmentSupport;
