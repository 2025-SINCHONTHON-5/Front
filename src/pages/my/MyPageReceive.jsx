import React, { useState, useEffect } from 'react';
import ReceiveCard from '../../components/ReceiveCard';
import { getReceivedRequests } from '../../apis/mypage'; // API 함수 import

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
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('enddate'); // 정렬 상태 관리
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getReceivedRequests(sortOrder);
        setRequests(data);
      } catch (err) {
        setError(err.message || '요청 목록을 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sortOrder]); // sortOrder가 변경될 때마다 데이터를 다시 불러옵니다.

  const handleToggle = (id) => {
    setExpandedGroups(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">로딩 중...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">에러: {error}</div>;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-500">총 {requests.length}개</h2>
          <div className="relative">
            {/* TODO: select 태그를 활용한 정렬 기능 구현 */}
            <button className="flex items-center py-2 space-x-2 text-sm font-medium text-gray-700 bg-white rounded-md">
              <span>마감임박순</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
        </header>

        <div className="divide-y divide-gray-200">
          {requests.map((group) => {
            const progressPct = Math.min(100, Math.max(0, (group.join_member_count / group.max_participants) * 100));
            const isExpanded = expandedGroups[group.id];
            
            return (
              <section key={group.id} className="py-6">
                <div onClick={() => handleToggle(group.id)} className="cursor-pointer">
                  <div className="flex items-start justify-between">
                    <h3 className="pr-4 text-lg font-bold text-neutral-900">{group.title}</h3>
                    {isExpanded ? <UpArrowIcon /> : <DownArrowIcon />}
                  </div>
                  {/* API에 content 필드가 없으므로 임시 제거. 필요 시 추가 */}
                  {/* <p className="mt-1 text-sm text-neutral-600 line-clamp-2">{group.content}</p> */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs font-semibold text-neutral-600">
                      <span>{dday(group.days_left)}</span>
                      <span>{group.join_member_count}/{group.max_participants}명</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-neutral-200">
                      <div className="h-2 rounded-full bg-blue-600" style={{ width: `${progressPct}%` }} />
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 space-y-3">
                    {group.joins.map((member) => (
                      <ReceiveCard key={member.id} member={{
                        name: member.name,
                        call: member.phone_number,
                        content: member.content
                      }} />
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