import React from 'react';
import { useNavigate } from 'react-router-dom';

// 로고 이미지 경로를 import 합니다.
// public 폴더를 사용한다면 '/sinchonthonLogo.png' 와 같이 바로 사용해도 됩니다.
import sinchonthonLogo from '../../assets/sinchonthonLogoWhite.svg';

const LoginPage = () => {
  const navigate = useNavigate();

  const goToLoginDetail = () => {
    navigate('/logindetail');
  };

  return (
    // 전체 화면을 채우고 내용을 수직/수평 중앙 정렬합니다.
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col items-center">
        
        {/* 1. 200x200 사이즈 로고 */}
        <img
          src={sinchonthonLogo}
          alt="서비스 로고"
          className="w-[200px] h-[200px]" // 정확한 픽셀 사이즈 지정
        />

        {/* 2. 로고 아래 16px 패딩 (margin-bottom) */}
        <div className="mb-4" /> 

        {/* 3. 서비스 이름과 슬로건 */}
        <h2 className="text-4xl font-bold">서비스로고</h2>
        <p className="mt-2 text-base text-gray-600">
          서비스 슬로건
        </p>
        
        {/* 4. 슬로건 아래 100px 패딩 (margin-bottom) */}
        <div className="mb-[100px]" />

        {/* 버튼들을 감싸는 컨테이너 */}
        <div className="w-full max-w-xs">
          {/* 5. 로그인 버튼 */}
          <button
            type="button"
            onClick={goToLoginDetail}
            className="w-full px-4 py-3 font-semibold !text-black !bg-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            로그인
          </button>
          
          {/* 6. 로그인 버튼과 회원가입 버튼 사이 16px 패딩 (margin-top) */}
          <div className="mt-4" />

          {/* 7. 회원가입 버튼 */}
          <button
            type="button"
            className="w-full px-4 py-3 font-semibold text-white bg-black border-white rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;