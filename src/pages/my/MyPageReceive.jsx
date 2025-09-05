import React, { useState } from 'react';
import ReceiveCard from '../../components/ReceiveCard';

// TODO: 추후 API 연동을 통해 실제 데이터를 가져와야 합니다.
const mockApiData = [
  {
    "title": "BHC 뿌링클 같이 시키실 분",
    "content": "신촌역 5번 출구 앞에서 같이 받으실 분 구합니다. 배달비 n빵해요!",
    "deadline": "2025-09-08T22:00:00Z",
    "currentApplicants": 2,
    "maxApplicants": 4,
    "join_members": [
      { "name": "김신촌", "call": "010-1111-2222", "content": "저는 뿌링클 콤보로 부탁드려요!" },
      { "name": "이연세", "call": "010-3333-4444", "content": "치즈볼 추가 가능한가요?" },
    ]
  },
  {
    "title": "생수 공동구매",
    "content": "쿠팡에서 삼다수 2L 12개 묶음 사실 분 계신가요? 로켓배송입니다.",
    "deadline": "2025-09-13T23:59:59Z",
    "currentApplicants": 8,
    "maxApplicants": 10,
    "join_members": [
      { "name": "박이화", "call": "010-5555-6666", "content": "삼다수 2L 6개짜리 한 묶음이요." }
    ]
  },
  {
    "title": "A4용지 사실 분 구합니다",
    "content": "학교 앞 알파문구에서 더블에이 500매짜리 5권 묶음으로 삽니다.",
    "deadline": "2025-09-07T18:00:00Z",
    "currentApplicants": 1,
    "maxApplicants": 5,
    "join_members": [
      { "name": "최서강", "call": "010-7777-8888", "content": "더블에이 80g으로 1권만 부탁합니다." }
    ]
  }
];

// D-day 계산을 위한 헬퍼 함수
const dday = (deadline) => {
  const today = new Date();
  const target = new Date(deadline);
  const diffDays = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return '마감';
  if (diffDays === 0) return 'D-Day';
  return `D-${diffDays}`;
};

// 위/아래 화살표 아이콘 컴포넌트
const UpArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
  </svg>
);
const DownArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default function MyPageReceive() {
  // 각 그룹의 펼침/접힘 상태를 관리하는 state
  const [expandedGroups, setExpandedGroups] = useState({}); // 기본적으로 모든 그룹을 닫힌 상태로 초기화합니다.

  // 그룹의 펼침/접힘 상태를 토글하는 함수
  const handleToggle = (title) => {
    setExpandedGroups(prevState => ({
      ...prevState,
      [title]: !prevState[title]
    }));
  };

  // deadline을 기준으로 데이터를 정렬합니다. (원본 배열 수정을 피하기 위해 복사본 사용)
  const sortedData = [...mockApiData].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  return (
    <div className="min-h-screen p-2">
      <div className="max-w-md mx-auto">
        {/* 헤더 */}
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-500">총 {sortedData.length}개</h2>
          <div className="relative">
            <button className="flex items-center py-2 space-x-2 text-sm font-medium text-gray-700 bg-white rounded-md">
              <span>마감임박순</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
        </header>

        {/* --- 그룹 목록 --- */}
        <div className="divide-y divide-gray-200">
          {sortedData.map((group) => {
            const progressPct = Math.min(100, Math.max(0, (group.currentApplicants / group.maxApplicants) * 100));
            const isExpanded = expandedGroups[group.title];
            
            return (
              <section key={group.title} className="py-2">
                {/* --- 그룹 헤더 (이제 클릭 가능) --- */}
                <div onClick={() => handleToggle(group.title)} className="cursor-pointer">
                  <div className="flex items-start justify-between">
                    <h3 className="pr-4 text-lg font-bold text-neutral-900">{group.title}</h3>
                    {isExpanded ? <UpArrowIcon /> : <DownArrowIcon />}
                  </div>
                  <p className="mt-1 text-sm text-neutral-600 line-clamp-2">{group.content}</p>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs font-semibold text-neutral-600">
                      <span>마감 {dday(group.deadline)}</span>
                      <span>{group.currentApplicants}/{group.maxApplicants}명</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-neutral-200">
                      <div className="h-2 rounded-full bg-blue-600" style={{ width: `${progressPct}%` }} />
                    </div>
                  </div>
                </div>

                {/* --- 참여자 카드 목록 (조건부 렌더링) --- */}
                {isExpanded && (
                  <div className="mt-4 space-y-3">
                    {group.join_members.map((member, index) => (
                      <ReceiveCard key={index} member={member} />
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}