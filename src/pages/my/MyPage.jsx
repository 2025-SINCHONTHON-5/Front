import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../../apis/mypage';
import { Link, useNavigate } from 'react-router-dom';


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

  // API 데이터를 저장할 state와 로딩/에러 상태를 관리할 state를 추가합니다.
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 컴포넌트가 처음 렌더링될 때 사용자 정보를 불러옵니다.
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUserData(data);
      } catch (err) {
        setError(err.message || '프로필 정보를 불러오는 데 실패했습니다.');
        // 선택사항: 토큰 만료 등 에러 발생 시 로그인 페이지로 리디렉션
        // navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]); // navigate를 의존성 배열에 추가합니다.

  const goToReceived = () => {
    navigate('/my/receives');
  };

  const goToApplied = () => {
    navigate('/my/requests');
  };

  // 로딩 중일 때 보여줄 UI
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">로딩 중...</div>;
  }

  // 에러가 발생했을 때 보여줄 UI
  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">에러: {error}</div>;
  }

  // 데이터 로딩이 성공적으로 완료되었을 때 보여줄 UI
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-md mx-auto text-left">
        {/* --- 사용자 정보 섹션 (API 데이터 사용) --- */}
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

        {/* --- '해드려요' 관리 섹션 (API 데이터 사용) --- */}
        <section>
          <h2 className="text-xl font-bold">해드려요</h2>
          <div className="mt-4 space-y-4">
            {/* 내가 받은 요청 관리하기 */}
            <div
              onClick={goToReceived}
              className="flex items-center justify-between w-full py-2 transition duration-150 cursor-pointer hover:opacity-70"
            >
              <span className="font-semibold text-gray-500">내가 받은 요청 관리하기</span>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-500">{userData.receive_request_count}개</span>
                <ChevronRightIcon />
              </div>
            </div>

            {/* 내가 신청한 요청 현황보기 */}
            <div
              onClick={goToApplied}
              className="flex items-center justify-between w-full transition duration-150 cursor-pointer hover:opacity-70"
            >
              <span className="font-semibold text-gray-500">내가 신청한 요청 현황보기</span>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-500">{userData.join_request_count}개</span>
                <ChevronRightIcon />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}