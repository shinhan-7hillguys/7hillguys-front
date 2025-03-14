// src/components/ResumeProgressCard.jsx
import React from 'react';

const ResumeProgressCard = ({
                                userName = '유성훈',
                                completionPercentage = 10,
                                updateLink = '#', // 이력서 업데이트 링크
                                data = {
                                    coverLetter: 0,    // 자소서 개수
                                    languageScore: 0,  // 어학점수 (예: 토익점수)
                                    internExp: 0,      // 인턴 경험 개수
                                    certificate: 0,    // 자격증 개수
                                    gpa: 0,            // 학점
                                },
                            }) => {
    return (
        <div
            style={{
                width: '90%',           // 부모 너비 꽉 채움
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                padding: '16px',
                fontFamily: 'sans-serif',
                backgroundColor: '#fff',
            }}
        >
            {/* 상단 영역 */}
            <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
                    {userName}님
                </div>
                <div style={{ fontSize: '14px', color: '#555' }}>
                    이력서를 <strong>{completionPercentage}%</strong> 완성했어요
                </div>
            </div>

            {/* 이력서 업데이트하기 버튼 */}
            <a
                href={updateLink}
                style={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    fontSize: '14px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    marginBottom: '16px',
                }}
            >
                이력서 업데이트하기
            </a>

            {/* 구분선 */}
            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '16px 0' }} />

            {/* 하단 정보 영역 */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* 자소서 */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{data.coverLetter}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>자소서</div>
                </div>

                {/* 어학점수 */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{data.languageScore}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>어학점수</div>
                </div>

                {/* 인턴경험 */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{data.internExp}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>인턴경험</div>
                </div>

                {/* 자격증 */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{data.certificate}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>자격증</div>
                </div>

                {/* 학점 */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{data.gpa}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>학점</div>
                </div>
            </div>
        </div>
    );
};

export default ResumeProgressCard;