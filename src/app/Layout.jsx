import { Outlet, Link, useLocation } from 'react-router-dom'

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
        <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link to="/" className="font-semibold">SINCHONTHON</Link>
          <div className="flex items-center gap-3">
            <Link to="/posts/new" className="text-sm hover:underline">글쓰기</Link>
            <Link to="/my" className="text-sm hover:underline">마이</Link>
            <Link to="/login" className="text-sm hover:underline">
              {pathname.startsWith('/login') ? '로그인중' : '로그인'}
            </Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>

    </div>
  )
}
