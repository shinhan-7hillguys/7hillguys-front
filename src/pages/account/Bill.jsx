import React, { useState } from 'react';
import "../../style/Bill.css";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Bill() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);

    const [paymentDate, setPaymentDate] = useState(null);

    const handleMonthClick = (date) => {
        setSelectedDate(date);
        const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        setPaymentDate(nextMonthDate);
        setIsCalendarOpen(false);
    };

    const formatDate = (dateObj) => {
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    return (
        <div className="bill-container">
            <h2>청구서</h2>
            <p>
                <strong>홍길동</strong> 님의{' '}
                <strong>
                    {selectedDate ? `${selectedDate.getMonth() + 1}월` : '12월'}
                </strong>{' '}
                청구 금액은 다음과 같습니다.
            </p>

            <div className="amount-box">
                <span className="amount">500,000원</span>
                <button
                    className="question-btn"
                    onClick={() => setIsModalOpen(true)}
                >
                    ?
                </button>
            </div>

            <div className="details">
                <p>납부일 <span>{paymentDate ? formatDate(paymentDate) : '2025.01.01'}</span></p>
                <p>처리 방식 <span>자동 이체</span></p>
                <p>납부 계좌 <span>농협 24*****- *******</span></p>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>산정 방식</h3>
                        <p><strong>투자 받으신 금액:</strong> 300,000,000원</p>
                        <p><strong>상환 비율:</strong> 1.67%</p>
                        <p><strong>PEOCH의 기본 계산식:</strong> XXXXXXXXXX(식)</p>
                        <button
                            className="close-modal"
                            onClick={() => setIsModalOpen(false)}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}

            {isCalendarOpen && (
                <div className="modal-overlay" onClick={() => setIsCalendarOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>월 선택</h3>
                        <Calendar
                            defaultView="year"
                            minDetail="year"
                            maxDetail="year"
                            onClickMonth={handleMonthClick}
                        />
                        <button
                            className="close-modal"
                            onClick={() => setIsCalendarOpen(false)}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}

            <div className="button-container">
                <button
                    className="month-select"
                    onClick={() => setIsCalendarOpen(true)}
                >
                    월 선택
                </button>
                <button className="close">닫기</button>
            </div>
        </div>
    );
}

export default Bill;
