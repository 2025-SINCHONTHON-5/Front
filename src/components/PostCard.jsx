import React from 'react'
import Photo from '../assets/Photo.png'

// 날짜 포맷
const formatDateTime = (dateString) => {
  const d = new Date(dateString)
  const yy = String(d.getFullYear()).slice(-2)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const mi = String(d.getMinutes()).padStart(2, '0')
  return `${yy}/${mm}/${dd} ${hh}:${mi}`
}

export default function PostCard({ post, type = 'offer', showDivider = true }) {
  // 진행률 (offer에서만)
  const progressPct =
    type === 'offer'
      ? Math.min(100, Math.max(0, (post.currentApplicants / post.maxApplicants) * 100))
      : 0

  const dday = (deadline) => {
    const today = new Date()
    const target = new Date(deadline)
    const diffDays = Math.ceil((target - today) / (1000 * 60 * 60 * 24))
    if (diffDays < 0) return '마감'
    if (diffDays === 0) return 'D-Day'
    return `D-${diffDays}`
  }

  // ✅ 고정 이미지 3장 배열 (src/assets/Photo.png)
  const repeated = Array.from({ length: 3 }, () => Photo)


  return (
    <article className={`bg-white ${showDivider ? 'border-b' : ''} border-neutral-200`}>
      {/* 상단 텍스트 — 좌측 시작선(px-4) 통일, 텍스트 잘림 방지 */}
      <div className="px-4 pt-5 pb-4">
        <h3 className="text-[17px] font-semibold text-neutral-900">
          {post.title}
        </h3>
        {/* 말줄임 2줄 (플러그인 없어도 정상 표시, 잘리지는 않음) */}
        <p className="mt-1 text-[13px] leading-6 text-neutral-600 line-clamp-2">
          {post.content}
        </p>

        {type === 'offer' && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-[12px] font-semibold text-neutral-600">
              <span>마감 {dday(post.deadline)}</span>
              <span>{post.currentApplicants}/{post.maxApplicants}명</span>
            </div>
            <div className="mt-1 h-2 rounded-full bg-neutral-200">
              <div
                className="h-2 rounded-full bg-neutral-900"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ✅ 고정 이미지 슬라이드 */}
      <div className="px-4">
        <div
          className="
            flex gap-3
            overflow-x-auto overflow-y-hidden
            snap-x snap-mandatory scroll-smooth
            h-36
            [-ms-overflow-style:none] [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {repeated.map((src, i) => (
            <div
              key={i}
              className="
                snap-start shrink-0
                basis-[45%] max-w-[45%]   /* ✅ 2.2개 정도 보이게 */
              "
            >
              <img
                src={src}
                alt={`preview ${i + 1}`}
                className="
                    block w-full h-auto        /* 원본 비율 유지 */
                    rounded-xl                 /* 이미지 자체만 둥글게 */
                    select-none                /* 드래그 방지(선택 불가) */
                "
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 하단 메타 — 좌측 시작선 맞춤(px-4), 오른쪽에 댓글 수 */}
      <div className="px-4 mb-3 flex items-center justify-between text-[12px] text-neutral-500">
        <span>{post.author} | {formatDateTime(post.createdAt)}</span>
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{post.commentCount > 999 ? '999+' : post.commentCount}</span>
        </span>
      </div>
    </article>
  )
}
