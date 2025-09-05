import { useParams } from 'react-router-dom'
import React, { useState } from 'react'

const mockPostData = {
  id: 1,
  author: '친절한 라이언',
  title: '엽기떡볶이 공구해주실 분!',
  content:
    '엽떡 저 혼자 먹기는 좀 그런데 다른 분이 공구해주시면 같이 먹고 싶어요',
  totalAmount: 12000,
  maxPeople: 4,
  deadline: '9월 7일 오후 8시',
  executionTime: '9월 8일 오후 2시',
  location: '서강대학교 정문',
  accountHolder: '홍길동',
  accountNumber: '우리은행 1002-123-456789',
  imageUrl: 'https://placehold.co/800x400/F3E8FF/4F46E5?text=떡볶이+이미지', // 예시 이미지
  createdAt: '2025년 9월 5일',
}

const mockComments = [
  {
    id: 1,
    author: '어피치',
    text: '저요! 저 참여하고 싶어요! 보통맛으로 부탁드려요.',
    timestamp: '2시간 전',
  },
  {
    id: 2,
    author: '네오',
    text: '혹시 튀김도 같이 주문 가능한가요?',
    timestamp: '1시간 전',
  },
]

export default function OfferPostDetailPage() {
  const { id } = useParams()

  // 댓글 목록과 새 댓글 입력을 위한 상태 관리
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState('')

  // 새 댓글 입력 핸들러
  const handleCommentChange = (e) => {
    setNewComment(e.target.value)
  }

  // 댓글 제출 핸들러
  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (newComment.trim() === '') return // 빈 댓글은 등록하지 않음

    const newCommentObject = {
      id: Date.now(), // 간단한 고유 ID 생성
      author: '현재 사용자', // 실제 앱에서는 로그인된 사용자 정보 사용
      text: newComment,
      timestamp: '방금 전',
    }

    setComments([...comments, newCommentObject]) // 기존 댓글 목록에 새 댓글 추가
    setNewComment('') // 입력창 비우기
  }





  return (
    <div className="bg-white-100 min-h-screen font-sans py-12 px-4">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl overflow-hidden">
        {/* --- 게시글 본문 섹션 --- */}
        <article className="p-6 sm:p-8">
          {/* 이미지 */}
          {mockPostData.imageUrl && (
            <img
              src={mockPostData.imageUrl}
              alt="게시글 대표 이미지"
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}

          {/* 제목 */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {mockPostData.title}
          </h1>

          {/* 작성자 및 작성일 */}
          <div className="text-sm text-gray-500 mb-6">
            <span>작성자: {mockPostData.author}</span>
            <span className="mx-2">·</span>
            <span>{mockPostData.createdAt}</span>
          </div>

          {/* 상세 내용 (줄글) */}
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-8">
            {mockPostData.content}
          </p>

          {/* 핵심 정보 요약 (구조화된 스타일) */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-800">
              참여 안내
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <p className="text-sm font-medium text-gray-500">모집 인원</p>
                <p className="font-semibold text-gray-900">
                  {mockPostData.maxPeople}명
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">목표 금액</p>
                <p className="font-semibold text-gray-900">
                  {mockPostData.totalAmount.toLocaleString()}원
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">신청 마감</p>
                <p className="font-semibold text-gray-900">
                  {mockPostData.deadline}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">활동 시간</p>
                <p className="font-semibold text-gray-900">
                  {mockPostData.executionTime}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm font-medium text-gray-500">전달 장소</p>
                <p className="font-semibold text-gray-900">
                  {mockPostData.location}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm font-medium text-gray-500">입금 계좌</p>
                <p className="font-semibold text-gray-900">
                  {mockPostData.accountHolder} ({mockPostData.accountNumber})
                </p>
              </div>
            </div>
          </div>
        </article>

        <hr className="my-6" />

        {/* --- 댓글 섹션 --- */}
        <section className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            댓글 {comments.length}개
          </h2>

          {/* 댓글 작성 폼 */}
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition mb-2"
              rows="3"
              placeholder="따뜻한 댓글을 남겨주세요."
            />
            <button
              type="submit"
              className="w-full sm:w-auto float-right bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
            >
              등록
            </button>
          </form>

          {/* 댓글 목록 */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">
                    {comment.author.charAt(0)}
                  </div>
                </div>
                <div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="font-semibold text-gray-800 text-sm">
                      {comment.author}
                    </p>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 pl-1">
                    {comment.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

