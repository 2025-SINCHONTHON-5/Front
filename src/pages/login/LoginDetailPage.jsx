import React from 'react';
import sinchonthonLogo from '../../assets/sinchonthonLogo.png';

export default function LoginDetailPage() {
  return (
    // 전체 화면을 채우고 내용을 수직/수평 중앙 정렬합니다.
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      
      {/* 전체 컨텐츠를 감싸고 최대 너비를 지정합니다. */}
      <div className="flex flex-col items-center w-full max-w-xs">
        
        {/* 1. 로고 */}
        <img
          src={sinchonthonLogo}
          alt="선착! 서비스 로고"
          className="w-[200px] h-[200px]"
        />

        {/* 2. 로고 아래 여백 */}
        <div className="mb-4" /> 

        {/* 3. 서비스 이름과 슬로건 */}
        <h3 className="text-2xl font-bold">서비스 이름</h3>
        <p className="mt-2 text-base text-gray-600">
          서비스 슬로건
        </p>
        
        {/* 4. 슬로건과 폼 사이의 여백 */}
        <div className="mb-10" />

        {/* --- 폼 시작 --- */}
        <div className="w-full">
          {/* 이메일 섹션 */}
          <div className="w-full text-left"> {/* ⭐ 부모 div를 만들고 text-left로 정렬 */}
            <label htmlFor="email" className="text-sm font-semibold text-gray-700">
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일 입력"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* 비밀번호 섹션 */}
          <div className="w-full mt-4 text-left"> {/* ⭐ 부모 div를 만들고 text-left로 정렬 */}
            <label htmlFor="password" className="text-sm font-semibold text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호 입력"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        {/* 폼과 버튼 사이의 여백 */}
        <div className="mb-8 mt-8" />

        {/* 로그인 버튼 */}
        <div className="w-full">
          <button
            type="button"
            className="w-full px-4 py-3 font-semibold !text-white !bg-black rounded-full shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
          >
            로그인
          </button>
        </div>
        {/* --- 폼 끝 --- */}
        
      </div>
    </div>
  );
}