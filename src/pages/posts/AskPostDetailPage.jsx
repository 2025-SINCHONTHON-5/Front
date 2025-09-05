import { useParams } from 'react-router-dom'
import React from 'react'

// --- Mock Data (실제로는 API를 통해 받아올 데이터) ---
const mockPostData = {
    id: 1,
    author: '도움이 필요한 네오',
    title: '정문 앞에서 파는 붕어빵 좀 사다주세요!',
    content: '수업 때문에 나갈 수가 없는데 붕어빵이 너무 먹고 싶어요... 카드 결제도 가능하다고 하니, 혹시 지나가시는 분 계시면 팥붕 3개, 슈붕 3개만 부탁드립니다! 사례는 바로 계좌로 보내드릴게요!',
    imageUrl: 'https://placehold.co/800x400/E0F2FE/0891B2?text=붕어빵+사진', // 예시 이미지
    createdAt: '22/09/06 14:30',
};

const mockComments = [
    { id: 1, author: '친절한 라이언', text: '마침 지나가는 길인데 사다드릴까요?' },
    { id: 2, author: '배고픈 어피치', text: '저도 먹고 싶은데... 혹시 같이 부탁드려도 될까요?' },
    { id: 3, author: '프로도', text: '5분 내로 정문 도착 가능합니다!' },
];
// --- End of Mock Data ---


export default function AskPostDetailPage() {
  const { id } = useParams()

  const handleOfferHelpClick = () => {
        // 실제 애플리케이션에서는 도움 제안 관련 로직을 처리합니다.
        alert('수락하기 기능은 현재 준비 중입니다.');
    };

  return (
        <div className="bg-white min-h-screen font-sans py-12 px-4">
            <div className="w-full max-w-3xl mx-auto bg-white overflow-hidden">
                {/* --- 게시글 본문 섹션 --- */}
                <article className="p-6 sm:p-8">
                    {/* 사진 */}
                    {mockPostData.imageUrl && (
                         <img src={mockPostData.imageUrl} alt="게시글 대표 이미지" className="w-full h-64 object-cover rounded-lg mb-6" />
                    )}

                    {/* 제목 */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockPostData.title}</h1>
                    
                     {/* 작성자 및 작성일 */}
                     <div className="text-sm text-gray-500">
                        <span>{mockPostData.author} | {mockPostData.createdAt}</span>
                    </div>

                    {/* 구분선 */}
                    <hr className="my-6 border-gray-200" />

                    {/* 상세 내용 */}
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap min-h-[100px]">
                        {mockPostData.content}
                    </p>

                     {/* 구분선 */}
                     <hr className="my-8 border-gray-200" />

                    {/* --- 댓글 섹션 --- */}
                    <section>
                        <p className="font-bold text-gray-800 mb-4">{mockComments.length}개의 댓글</p>
                        <div className="space-y-4">
                            {mockComments.map(comment => (
                                <div key={comment.id}>
                                    <p className="font-semibold text-sm text-gray-800">{comment.author}</p>
                                    <p className="text-gray-600 mt-1">{comment.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </article>

                {/* --- 수락하기 버튼 섹션 --- */}
                <div className="px-6 sm:px-8 pb-8 pt-8">
                    <button
                        onClick={handleOfferHelpClick}
                        className="w-full bg-black text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition"
                    >
                        수락하기
                    </button>
                </div>
            </div>
        </div>
    );
}

