import React, { useState, useEffect } from 'react';
import PostCard from '../../components/PostCard.jsx'; 
import { getJoinedRequests } from '../../apis/mypage.js';

// 메인 페이지 컴포넌트
export default function MyPageRequest() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('newest'); // 정렬 상태 관리

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getJoinedRequests(sortOrder);
        setRequests(data);
      } catch (err) {
        setError(err.message || '요청 목록을 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sortOrder]); // sortOrder가 변경될 때마다 데이터를 다시 불러옵니다.

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">로딩 중...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">에러: {error}</div>;
  }

  return (
    <div className="min-h-screen p-4 bg-white font-sans sm:p-6">
      <div className="max-w-xl mx-auto">
        {/* 헤더 */}
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-500">총 {requests.length}개</h2>
          <div className="relative">
            {/* TODO: select 태그 등을 활용하여 sortOrder state를 변경하는 기능 구현 */}
            <button className="flex items-center py-2 space-x-2 text-sm font-medium text-gray-700 bg-white rounded-md">
              <span>최신순</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
        </header>

        {/* 카드 목록 */}
        <main className="border-t border-gray-200">
          {requests.length > 0 ? (
            requests.map(request => (
              <div key={request.id} className="border-b border-gray-200">
                {/* API 응답에 따라 post prop의 값을 매칭해야 합니다. */}
                <PostCard post={request} type="offer" />
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-gray-500">
              <p>신청한 요청이 없습니다.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}