import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Chevron Right Icon Component
const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export default function MyPage() {

  const navigate = useNavigate();
  
  const goToReceive = () => {
    navigate('/my/receives');
  };

  const goToRequest = () => {
    navigate('/my/requests');
  }
  
  // TODO: 추후 API 연동을 통해 실제 사용자 데이터와 요청 개수를 가져와야 합니다.
  const userData = {
    name: '홍길동',
    email: 'gildong@example.com',
  };

  const requestCounts = {
    received: 5, // 내가 받은 요청 개수
    applied: 3,  // 내가 신청한 요청 개수
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* ⭐ mx-auto를 추가하여 콘텐츠 블록을 중앙 정렬합니다. */}
      <div className="w-full max-w-md mx-auto text-left">
        {/* --- 사용자 정보 섹션 --- */}
        <section>
          <p className="mt-1 text-4xl font-bold">안녕하세요!</p>
          <p className="mt-1 text-4xl font-bold">{userData.name} 님</p>

          <div className="flex items-center justify-between mt-4">
            <p className="text-base text-gray-500">{userData.email}</p>
            <Link to="/my/settings" className="text-sm font-semibold text-gray-600 hover:text-black">
              계정 설정
            </Link>
          </div>
        </section>

        {/* --- 구분선 --- */}
        <div className="my-8 border-t border-gray-200" />

        {/* --- '해드려요' 관리 섹션 --- */}
        <section>
          <h2 className="text-xl font-bold">해드려요</h2>

          <div className="mt-4 space-y-3">
            {/* 내가 받은 요청 관리하기 */}
            <div className="flex items-center justify-between w-full p-4 transition duration-150 bg-white rounded-lg shadow-sm hover:bg-gray-100"
            >
              <span className="font-semibold text-gray-800">내가 받은 요청 관리하기</span>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-blue-600" onClick={goToReceive}>{requestCounts.received}</span>
                <ChevronRightIcon />
              </div>
            </div>

            {/* 내가 신청한 요청 현황보기 */}
            <div
              className="flex items-center justify-between w-full p-4 transition duration-150 bg-white rounded-lg shadow-sm hover:bg-gray-100"
            >
              <span className="font-semibold text-gray-800">내가 신청한 요청 현황보기</span>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-blue-600" onClick={goToRequest}>{requestCounts.applied}</span>
                <ChevronRightIcon />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
