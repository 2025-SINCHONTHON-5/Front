import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sinchonthonLogo from '../../assets/sinchonthonLogo.png';
import { login } from '../../apis/auth'; // auth.js에서 loginAPI 함수를 가져옵니다.

export default function LoginDetailPage() {
  // 이메일, 비밀번호 입력을 위한 state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 에러 메시지와 로딩 상태를 관리하기 위한 state
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 페이지 이동을 위한 navigate 함수
  const navigate = useNavigate();

  // 로그인 버튼 클릭 시 실행될 함수
  const handleLogin = async () => {
    // 이전 에러 메시지와 로딩 상태 초기화
    setError('');
    setIsLoading(true);

    try {
      // API 함수를 호출하여 로그인을 시도합니다.
      const data = await login(email, password);

      // (중요) 로그인 성공 시 받은 토큰을 안전한 곳(localStorage)에 저장합니다.
      localStorage.setItem('accessToken', data.access.token);
      localStorage.setItem('refreshToken', data.refresh.token);

      console.log('✅ 로그인 성공:', data);

      // 로그인 성공 후 메인 페이지('/offer')로 이동합니다.
      navigate('/offer');

    } catch (err) {
      // 로그인 실패 시
      if (err.response && err.response.data && err.response.data.detail) {
        // 백엔드에서 보낸 에러 메시지를 state에 저장합니다.
        setError(err.response.data.detail);
      } else {
        // 그 외 네트워크 에러 등의 경우 일반적인 메시지를 보여줍니다.
        setError('로그인 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      // 성공/실패 여부와 관계 없이 로딩 상태를 종료합니다.
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="flex flex-col items-center w-full max-w-xs">
        <img
          src={sinchonthonLogo}
          alt="선착! 서비스 로고"
          className="w-[200px] h-[200px]"
        />
        <div className="mb-4" />
        <h3 className="text-2xl font-bold">서비스 이름</h3>
        <p className="mt-2 text-base text-gray-600">서비스 슬로건</p>
        <div className="mb-10" />

        <div className="w-full">
          {/* 이메일 섹션 */}
          <div className="w-full text-left">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700">이메일</label>
            <input
              type="email"
              id="email"
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            />
          </div>

          {/* 비밀번호 섹션 */}
          <div className="w-full mt-4 text-left">
            <label htmlFor="password" className="text-sm font-semibold text-gray-700">비밀번호</label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>
        
        {/* 에러 메시지가 있을 경우에만 이 부분을 보여줍니다. */}
        {error && (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        )}
        
        <div className="w-full mt-8">
          <button
            type="button"
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full px-4 py-3 font-semibold !text-white !bg-black rounded-full shadow-md hover:!bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 disabled:!bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </div>
      </div>
    </div>
  );
}

