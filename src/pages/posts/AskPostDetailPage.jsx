import { useParams } from 'react-router-dom'
import React from 'react'

const mockPostData = {
    id: 1,
    author: '도움이 필요한 네오',
    title: '정문 앞에서 파는 붕어빵 좀 사다주세요!',
    content: '수업 때문에 나갈 수가 없는데 붕어빵이 너무 먹고 싶어요... 카드 결제도 가능하다고 하니, 혹시 지나가시는 분 계시면 팥붕 3개, 슈붕 3개만 부탁드립니다! 사례는 바로 계좌로 보내드릴게요!',
    imageUrl: 'https://placehold.co/800x400/E0F2FE/0891B2?text=붕어빵+사진', // 예시 이미지
    createdAt: '2025년 9월 6일',
};

export default function AskPostDetailPage() {
  const { id } = useParams()



  const handleOfferHelpClick = () => {
        // 실제 애플리케이션에서는 도움 제안 관련 로직을 처리합니다.
        alert('도움 제안 기능은 현재 준비 중입니다.');
    };


  return (
        <div className="bg-gray-100 min-h-screen font-sans py-12 px-4">
            <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* --- 게시글 본문 섹션 --- */}
                <article className="p-6 sm:p-8">
                    {/* 사진 */}
                    {mockPostData.imageUrl && (
                         <img src={mockPostData.imageUrl} alt="게시글 대표 이미지" className="w-full h-64 object-cover rounded-lg mb-6" />
                    )}

                    {/* 제목 */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockPostData.title}</h1>
                    
                     {/* 작성자 및 작성일 */}
                     <div className="text-sm text-gray-500 mb-6">
                        <span>작성자: {mockPostData.author}</span>
                        <span className="mx-2">·</span>
                        <span>{mockPostData.createdAt}</span>
                    </div>

                    {/* 상세 내용 */}
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {mockPostData.content}
                    </p>
                </article>

                {/* --- 도움 제안 버튼 섹션 --- */}
                <div className="px-6 sm:px-8 pb-8">
                    <button
                        onClick={handleOfferHelpClick}
                        className="w-full bg-indigo-600 text-black font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-102"
                    >
                        도움 제안하기
                    </button>
                </div>
            </div>
        </div>
    );
}
