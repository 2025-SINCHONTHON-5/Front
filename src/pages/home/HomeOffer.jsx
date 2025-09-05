import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PostCard from '../../components/PostCard.jsx'
import { fetchOfferList } from '../../apis/supply'
import { toAbsolute } from '../../lib/url'

// 셀렉트 → API ordering 값 매핑
const ORDER_MAP = {
  latest: '-created_at',
  oldest: 'created_at',
  apply_deadline_asc: 'apply_deadline',
  apply_deadline_desc: '-apply_deadline',
  execute_time_asc: 'execute_time',
  execute_time_desc: '-execute_time',
}

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" />
  </svg>
)

export default function HomeOffer() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [orderKey, setOrderKey] = useState('latest')  // 셀렉트 키
  const [page, setPage] = useState(1)                 // 기본 1페이지

  const ordering = useMemo(() => ORDER_MAP[orderKey], [orderKey])

  useEffect(() => {
    let alive = true
    ;(async () => {
      setLoading(true)
      setError('')
      try {
        const data = await fetchOfferList({ page, page_size: 20, ordering })
        const mapped = (data?.results || []).map((d) => ({
          id: d.id,
          title: d.title,
          // 목록에는 내용 필드가 없을 수 있어요 → 빈 문자열 처리
          content: '',
          // PostCard는 deadline(모집 마감)을 보여주므로 apply_deadline 사용
          deadline: d.apply_deadline,
          // 현재 인원 수 정보가 명세에 없으니 0으로 표시 (백엔드가 주면 교체)
          currentApplicants: d.participants_count ?? 0,
          maxApplicants: d.max_participants ?? 0,
          // 이미지: 절대경로로 변환
          photo: d.image ? toAbsolute(d.image) : null,
          images: d.image ? [toAbsolute(d.image)] : [],
          // 메타
          author: '', // 목록엔 작성자 정보가 없으니 빈 값
          createdAt: d.created_at,
          commentCount: 0,
        }))
        if (alive) setItems(mapped)
      } catch (e) {
        console.error(e)
        if (alive) setError('목록을 불러오지 못했어요.')
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => { alive = false }
  }, [page, ordering])

  return (
    <div className="bg-white min-h-screen font-sans p-4 sm:p-6">
      <div className="mx-auto max-w-xl">
        {/* 헤더 */}
        <header className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-500">
            총 {loading ? '-' : items.length}개
          </h2>

          {/* 정렬 */}
          <select
            className="rounded border border-gray-300 bg-white px-3 py-2 text-sm"
            value={orderKey}
            onChange={(e) => setOrderKey(e.target.value)}
            aria-label="정렬"
          >
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="apply_deadline_asc">마감 임박순(↑)</option>
            <option value="apply_deadline_desc">마감 늦은순(↓)</option>
            <option value="execute_time_asc">실행 시간 이른순(↑)</option>
            <option value="execute_time_desc">실행 시간 늦은순(↓)</option>
          </select>
        </header>

        {/* 카드 리스트 */}
        <main>
          {loading && <p className="py-6 text-sm text-gray-500">불러오는 중…</p>}
          {error && <p className="py-6 text-sm text-red-500">{error}</p>}
          {!loading && !error && items.length === 0 && (
            <p className="py-6 text-sm text-gray-500">게시글이 없어요.</p>
          )}

          {!loading && !error && items.map((offer, idx) => (
            <PostCard
              key={offer.id}
              post={offer}
              type="offer"
              showDivider={idx !== items.length - 1}
            />
          ))}
        </main>

        {/* (옵션) 페이징 버튼 - 간단 예시 */}
        {/* <div className="mt-6 flex justify-center gap-3">
          <button
            className="rounded border px-3 py-1 text-sm disabled:opacity-40"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            이전
          </button>
          <span className="text-sm text-gray-600">{page} 페이지</span>
          <button
            className="rounded border px-3 py-1 text-sm"
            onClick={() => setPage((p) => p + 1)}
          >
            다음
          </button>
        </div> */}

        {/* 새 글 버튼 */}
        <Link
          to="/offer/posts/new"
          className="fixed bottom-20 right-6 flex items-center justify-center rounded-full bg-gray-900 p-4 text-white shadow-lg transition-transform hover:scale-105"
          aria-label="해드려요 새 글 작성"
        >
          <PencilIcon />
        </Link>
      </div>
    </div>
  )
}
