// src/app/Header.jsx
import { useMatches, useNavigate } from 'react-router-dom'

export default function Header() {
  const matches = useMatches()
  const nav = useNavigate()
  const current = [...matches].reverse().find(m => m.handle?.title)
  const title = current?.handle?.title ?? ''

  return (
    <header className="sticky top-0 z-10 bg-white border-b">
      <div className="mx-auto flex h-12 max-w-md items-center px-3">
        <button
          onClick={() => nav(-1)}
          className="w-8 text-left text-[18px] leading-none text-neutral-700 hover:opacity-80"
          aria-label="뒤로가기"
        >
          ←
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-[15px] font-semibold">{title}</h1>
        </div>
        <div className="w-8" />
      </div>
    </header>
  )
}
