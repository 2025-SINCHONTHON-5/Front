import { useParams } from 'react-router-dom'
import React, { useState } from 'react'

// --- Mock Data (실제로는 API를 통해 받아올 데이터) ---
const mockPostData = {
  id: 1,
  author: '친절한 라이언',
  title: '떡볶이 공동구매 하실 분!',
  content:
    '학교 앞에서 파는 인생 떡볶이, 다들 아시죠? 혼자 먹기에는 양이 많아서 공동구매 하실 분들을 찾습니다. 매운맛, 보통맛 선택 가능하니 많은 참여 부탁드려요!',
  totalAmount: 12000,
  currentApplicants: 3,
  maxApplicants: 5,
  deadline: '2025-09-10T20:00:00',
  executionTime: '25/09/11 오후 7시',
  location: '서강대학교 정문',
  accountHolder: '홍길동',
  accountNumber: '우리은행 1002-123-456789',
  imageUrl: 'https://placehold.co/800x400/F3E8FF/4F46E5?text=떡볶이+이미지',
  createdAt: '25/09/05 11:30',
}

const mockComments = [
  { id: 1, author: '어피치', text: '저요! 저 참여하고 싶어요! 보통맛으로 부탁드려요.'},
  { id: 2, author: '네오', text: '혹시 튀김도 같이 주문 가능한가요?'},
]
// --- End of Mock Data ---

// D-day 계산 함수
const calculateDday = (deadline) => {
    const today = new Date();
    const targetDate = new Date(deadline);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return '마감';
    if (diffDays === 0) return 'D-Day';
    return `D-${diffDays}`;
};

// 신청 확인 모달 컴포넌트
const ApplicationModal = ({ post, onClose, onConfirm }) => {
    const [requestMessage, setRequestMessage] = useState('');

    const handleConfirm = () => {
        // 실제 앱에서는 여기서 서버로 요청사항을 전송합니다.
        console.log("요청사항:", requestMessage);
        onConfirm();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 space-y-4">
                <h2 className="text-xl font-bold text-gray-800 text-center">신청하기 전 꼭 확인해주세요</h2>
                
                <div className="bg-white-100 p-4 rounded-md text-sm space-y-2 text-center">
                    <p>{post.accountHolder}</p>
                    <p>{post.accountNumber}</p>
                    <p className="pt-2 text-gray-600">
                        예금주명과 계좌번호를 저장해주시고,
                        <br/>
                        인원 모집 성공 알림이 발송되면 입금해주세요.
                        <br/><br/>
                        요청 사항은 아래에 작성해주세요.

                    </p>
                </div>

                <div>
                    <textarea
                        id="request-message"
                        rows="4"
                        maxLength="300"
                        value={requestMessage}
                        onChange={(e) => setRequestMessage(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        placeholder="요청사항을 입력해주세요."
                    ></textarea>
                    <p className="text-right text-xs text-gray-500 mt-1">{requestMessage.length}/300</p>
                </div>

                <div className="flex justify-center space-x-3 pt-2">
                    <button onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">취소하기</button>
                    <button onClick={handleConfirm} className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-indigo-700 transition">신청하기</button>
                </div>
            </div>
        </div>
    )
}

export default function OfferPostDetailPage() {
  const { id } = useParams()
  const [comments, setComments] = useState(mockComments)
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const handleApplyClick = () => {
    setIsModalOpen(true); // 신청하기 버튼 클릭 시 모달 열기
  }

  const handleConfirmApplication = () => {
    setIsModalOpen(false); // 모달의 신청하기 버튼 클릭 시
    alert('신청이 완료되었습니다.');
  }
  
  const progressPercentage = (mockPostData.currentApplicants / mockPostData.maxApplicants) * 100;

  return (
    <>
      <div className="bg-white min-h-screen font-sans py-12 px-4">
        <div className="w-full max-w-3xl mx-auto bg-white overflow-hidden">
          <article className="p-6 sm:p-8">
            {mockPostData.imageUrl && (
              <img
                src={mockPostData.imageUrl}
                alt="게시글 대표 이미지"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {mockPostData.title}
            </h1>
            <div className="text-sm text-gray-500">
              <span>{mockPostData.author} | {mockPostData.createdAt}</span>
            </div>

            <hr className="my-6 border-gray-200" />
            
            <div>
                <p className="text-sm font-semibold text-gray-900">희망 금액</p>
                <p className="font-medium text-gray-900">총 {mockPostData.totalAmount.toLocaleString()}원</p>
            </div>

            <hr className="my-6 border-gray-200" />

            <div className="mt-4">
                <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-gray-500">마감 {calculateDday(mockPostData.deadline)}</span>
                    <span className="text-gray-500">{mockPostData.currentApplicants}/{mockPostData.maxApplicants}명</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div className="bg-black h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>
            </div>

            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap min-h-[100px] mt-6">
              {mockPostData.content}
            </p>

            <hr className="my-8 border-gray-200" />
            
            <div>
                <p className="text-sm font-semibold text-gray-900">수행 일시</p>
                <p className="font-medium text-gray-900">{mockPostData.executionTime}</p>
            </div>
            
            <hr className="my-6 border-gray-200" />

            <div>
                <p className="text-sm font-semibold text-gray-900">픽업 및 전달 장소</p>
                <p className="font-medium text-gray-900">{mockPostData.location}</p>
            </div>

            <hr className="my-8 border-gray-200" />

            <section>
              <p className="font-bold text-gray-800 mb-4">{comments.length}개의 댓글</p>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id}>
                    <p className="font-semibold text-sm text-gray-800">{comment.author}</p>
                    <p className="text-gray-600 mt-1">{comment.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>

          <div className="px-6 sm:px-8 pb-8 pt-8">
            <button
              onClick={handleApplyClick}
              className="w-full bg-black text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition"
            >
              신청하기
            </button>
          </div>
        </div>
      </div>
      
      {/* 모달 렌더링 */}
      {isModalOpen && <ApplicationModal post={mockPostData} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirmApplication} />}
    </>
  )
}

