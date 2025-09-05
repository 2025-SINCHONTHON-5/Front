import { Outlet, NavLink, useMatches, useNavigate } from 'react-router-dom'

export default function Layout() {
  const matches = useMatches()
  const nav = useNavigate()

  // 가장 깊은 라우트에서 handle.title 읽기
  const current = [...matches].reverse().find((m) => m.handle?.title)
  const title = current?.handle?.title ?? ''

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="mx-auto flex h-12 max-w-md items-center px-3">
          {/* 뒤로가기 버튼 */}
          <button
            onClick={() => nav(-1)}
            className="w-8 text-left text-[18px] leading-none text-neutral-700 hover:opacity-80"
            aria-label="뒤로가기"
          >
            ←
          </button>

          {/* 가운데 제목 */}
          <div className="flex-1 text-center">
            <h1 className="text-[15px] font-semibold">{title}</h1>
          </div>

          {/* 오른쪽 여백 */}
          <div className="w-8" />
        </div>
      </header>

      {/* Main Content (탭바 높이만큼 padding-bottom) */}
      <main className="mx-auto max-w-md px-3 pt-3 pb-16">
        <Outlet />
      </main>

      {/* Bottom Tab Bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t bg-white sm:hidden"
        aria-label="하단 탭 내비게이션"
      >
        <ul className="mx-auto flex max-w-md">
          <TabItem to="/offer" label="해드려요" />
          <TabItem to="/ask" label="해주세요" />
          <TabItem to="/notifications" label="알림" />
          <TabItem to="/my" label="마이페이지" />
        </ul>
      </nav>
    </div>
  )
}

/* 개별 탭 아이템 */
function TabItem({ to, label }) {
  const base =
    'flex flex-col items-center justify-center gap-1 text-[11px] flex-1 py-2'
  const idle = 'text-neutral-400'
  const active = 'text-neutral-900 font-medium'

  return (
    <li className="flex-1">
      <NavLink to={to} className={({ isActive }) => `${base} ${isActive ? active : idle}`}>
        {/* 간단한 X 박스 아이콘 */}
        <div className="w-5 h-5 grid place-items-center rounded border border-neutral-300 text-neutral-400">
          ×
        </div>
        <span className="whitespace-nowrap">{label}</span>
      </NavLink>
    </li>
  )
}
