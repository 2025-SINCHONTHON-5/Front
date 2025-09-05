import React from 'react'
import { Link } from 'react-router-dom'
import PostCard from '../../components/PostCard.jsx'

// --- Mock Data (해드려요) ---
const mockOffers = [
  {
    id: 1,
    title: '떡볶이 공동구매 하실 분!',
    content:
      '학교 앞에서 파는 인생 떡볶이, 다들 아시죠? 혼자 먹기에는 양이 많아서 공동구매 하실 분들을 찾습니다. 매운맛, 보통맛 선택 가능하니...',
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
    content:
      '오늘 저녁 BHC 치킨 시켜 드실 분 계신가요? 배달비가 너무 비싸서 같이 시키실 분 구합니다. 정문에서 같이 받으면 될 것 같아요!',
    deadline: '2025-09-07T18:00:00',
    currentApplicants: 1,
    maxApplicants: 4,
    images: ['https://placehold.co/600x400/D1FAE5/065F46?text=치킨+이미지'],
    author: '배고픈 어피치',
    createdAt: '2025-09-06T19:00:00',
    commentCount: 5,
  },
]

const PencilIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"
    />
  </svg>
)

export default function HomeOffer() {
  return (
    <div className="bg-white min-h-screen font-sans p-4 sm:p-6">
      <div className="mx-auto max-w-xl">
        {/* 상단 정보 */}
        <header className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-500">총 {mockOffers.length}개</h2>
          <button className="flex items-center space-x-2 rounded px-4 py-2 text-sm font-medium text-gray-700">
            <span>최신순</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </header>

        {/* 카드 리스트 */}
        <main>
          {mockOffers.map((offer, idx) => (
            <PostCard
              key={offer.id}
              post={offer}
              type="offer"
              showDivider={idx !== mockOffers.length - 1}
            />
          ))}
        </main>

        {/* 새 글 버튼 */}
        <Link
          to="/offer/posts/new"
          className="fixed bottom-20 left-6 flex items-center justify-center rounded-full bg-gray-100 p-4 text-black shadow-lg transition-transform hover:scale-110"
          aria-label="해드려요 새 글 작성"
        >
          <PencilIcon />
        </Link>
      </div>
    </div>
  )
}
