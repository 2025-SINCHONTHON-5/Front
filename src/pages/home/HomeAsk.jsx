import React from 'react';
import PostCard from '../../components/PostCard.jsx';
import { Link } from 'react-router-dom';

// --- Mock Data (해주세요 게시글용) ---
const mockAsks = [
    {
        id: 1,
        title: '정문 앞에서 파는 붕어빵 좀 사다주세요!',
        content: '수업 때문에 나갈 수가 없는데 붕어빵이 너무 먹고 싶어요... 카드 결제도 가능하다고 하니, 혹시 지나가시는 분 계시면 팥붕 3개...',
        images: [
            'https://placehold.co/600x400/E0F2FE/0891B2?text=붕어빵+사진',
        ],
        author: '도움이 필요한 네오',
        createdAt: '2025-09-06T14:30:00',
        commentCount: 8,
    },
    {
        id: 2,
        title: '노트북 충전기 빌려주실 분 ㅠㅠ',
        content: '중앙도서관에서 공부하고 있는데 노트북 충전기를 안 가져왔어요. C타입 충전기 잠시만 빌려주실 천사분 계신가요? ㅠㅠ 바로 돌려드릴게요!',
        images: [
             'https://placehold.co/600x400/F3F4F6/4B5563?text=노트북+충전기',
        ],
        author: '급한 컴공생',
        createdAt: '2025-09-06T11:00:00',
        commentCount: 3,
    },
    {
        id: 3,
        title: '혹시 남는 A4 용지 있으신 분',
        content: '과제 제출해야 하는데 A4 용지가 딱 한 장 모자라네요... 혹시 한 장만 주실 수 있는 분 계신가요?',
        images: [], // 이미지가 없는 경우
        author: '종이 없는 튜브',
        createdAt: '2025-09-05T16:45:00',
        commentCount: 5,
    }
];
// --- End of Mock Data ---

const PencilIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" />
    </svg>
);


// 메인 페이지 컴포넌트
export default function HomeAsk() {
  return (
    <div className="bg-white min-h-screen font-sans p-4 sm:p-6">
        <div className="max-w-xl mx-auto">
            {/* 헤더 */}
            <header className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-500">총 {mockAsks.length}개</h2>
                <div className="relative">
                    <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 bg-white px-4 py-2">
                        <span>최신순</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </div>
            </header>

            {/* 카드 목록 */}
            <main className="border-t border-gray-200">
                {mockAsks.map(ask => (
                    <div key={ask.id} className="border-b border-gray-200">
                        {/* PostCard를 재사용하되, type을 'ask'로 전달합니다. */}
                        <PostCard post={ask} type="ask" />
                    </div>
                ))}
            </main>

            <Link 
            to="/ask/posts/new" // AskNewPostPage 경로
            className="fixed bottom-20 left-6 bg-gray-100 text-black p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-transform transform hover:scale-110"
            aria-label="해주세요 새 글 작성"
        >
            <PencilIcon />
        </Link>
        </div>
    </div>
  );
}

