
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
