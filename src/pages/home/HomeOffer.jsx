import React from 'react';
import PostCard from '../../components/PostCard.jsx'; 

// --- Mock Data (해드려요 게시글용) ---
const mockOffers = [
  {
    id: 1,
    title: '떡볶이 공동구매 하실 분!',
    content: '학교 앞에서 파는 인생 떡볶이, 다들 아시죠? 혼자 먹기에는 양이 많아서 공동구매 하실 분들을 찾습니다. 매운맛, 보통맛 선택 가능하니...',
    deadline: '2025-09-10T20:00:00',
    currentApplicants: 3,
    maxApplicants: 5,
    images: [
      'https://placehold.co/600x400/F3E8FF/4F46E5?text=떡볶이+1',
      'https://placehold.co/600x400/E0F2FE/0891B2?text=떡볶이+2',
      'https://placehold.co/600x400/FEF3C7/F59E0B?text=떡볶이+3',
    ],
    author: '친절한 라이언',
    createdAt: '2025-09-05T11:30:00',
    commentCount: 12,
  },
  {
    id: 2,
    title: '배달비 N빵 하실 분 구합니다 (치킨)',
    content: '오늘 저녁 BHC 치킨 시켜 드실 분 계신가요? 배달비가 너무 비싸서 같이 시키실 분 구합니다. 정문에서 같이 받으면 될 것 같아요!',
    deadline: '2025-09-07T18:00:00',
    currentApplicants: 1,
    maxApplicants: 4,
    images: [
      'https://placehold.co/600x400/D1FAE5/065F46?text=치킨+이미지',
    ],
    author: '배고픈 어피치',
    createdAt: '2025-09-06T19:00:00',
    commentCount: 5,
  },
];
// --- End of Mock Data ---


// 메인 페이지 컴포넌트
export default function HomeOffer() {
  return (
    <div className="bg-white min-h-screen font-sans p-4 sm:p-6">
        <div className="max-w-xl mx-auto">
            {/* 헤더 */}
            <header className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-500">총 {mockOffers.length}개</h2>
                <div className="relative">
                    <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 bg-white px-4 py-2">
                        <span>최신순</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </div>
            </header>

            {/* 카드 목록 */}
            <main className="border-t border-gray-200">
                {mockOffers.map(offer => (
                    <div key={offer.id} className="border-b border-gray-200">
                        <PostCard post={offer} type="offer" />
                    </div>
                ))}
            </main>
        </div>
    </div>
  );
}

