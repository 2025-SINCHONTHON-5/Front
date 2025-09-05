import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PostCard from '../../components/PostCard.jsx'
import { fetchAskList } from '../../apis/requests'
import { toAbsolute } from '../../lib/url'

const ORDER_MAP = {
  latest: '-created_at',     // 최신순(기본)
  oldest: 'created_at',      // 오래된순
  mostComment: '-comment_count', // 댓글 많은 순
}

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" />
  </svg>
)

export default function HomeAsk() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [orderKey, setOrderKey] = useState('latest') // latest | oldest | mostComment

  const ordering = useMemo(() => ORDER_MAP[orderKey], [orderKey])

  useEffect(() => {
    let alive = true
    ;(async () => {
      setLoading(true)
      setError('')
      try {
        const data = await fetchAskList(ordering)
        // 백엔드 스키마를 PostCard가 쓰는 필드로 매핑
        const mapped = (data || []).map((d) => ({
          id: d.id,
          title: d.title,
          content: d.content,
          // 서버가 photo 하나만 주는 명세 → 3장 슬라이더용으로 같은 사진 반복
          photo: d.photo ? toAbsolute(d.photo) : null,
          images: d.photo ? [toAbsolute(d.photo)] : [],
          author: d.requester?.email || d.requester?.id || '익명',
          createdAt: d.created_at,
          commentCount: d.comment_count ?? 0,
        }))
        if (alive) setItems(mapped)
      } catch (e) {
        console.error(e)
        if (alive) setError('목록을 불러오지 못했어요.')
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [ordering])

  return (
    <div className="bg-white min-h-screen font-sans p-4 sm:p-6">
      <div className="mx-auto max-w-xl">
        {/* 헤더 */}
        <header className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-500">
            총 {loading ? '-' : items.length}개
          </h2>

          {/* 정렬 선택 */}
          <div className="relative">
            <select
              className="rounded border border-gray-300 bg-white px-3 py-2 text-sm"
              value={orderKey}
              onChange={(e) => setOrderKey(e.target.value)}
              aria-label="정렬"
            >
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
              <option value="mostComment">댓글 많은 순</option>
            </select>
          </div>
        </header>

        {/* 목록 */}
        <main>
          {loading && <p className="py-6 text-sm text-gray-500">불러오는 중…</p>}
          {error && <p className="py-6 text-sm text-red-500">{error}</p>}
          {!loading && !error && items.length === 0 && (
            <p className="py-6 text-sm text-gray-500">게시글이 없어요.</p>
          )}

          {!loading &&
            !error &&
            items.map((ask, idx) => (
              <PostCard
                key={ask.id}
                post={ask}
                type="ask"
                showDivider={idx !== items.length - 1}
              />
            ))}
        </main>

        {/* 새 글 작성 버튼 */}
        <Link
          to="/ask/posts/new"
          className="fixed bottom-20 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg transition-transform hover:scale-105"
          aria-label="해주세요 새 글 작성"
        >
          <PencilIcon />
        </Link>
      </div>
    </div>
  )
}
