import { NavLink } from 'react-router-dom'

export default function TabNav() {
  const base = 'px-4 py-2 rounded-full text-sm'
  const active = 'bg-black text-white'
  const idle = 'bg-neutral-100 hover:bg-neutral-200'

  return (
    <div className="flex gap-2">
      <NavLink to="/home/ask" className={({ isActive }) => `${base} ${isActive ? active : idle}`}>
        해주세요
      </NavLink>
      <NavLink to="/home/offer" className={({ isActive }) => `${base} ${isActive ? active : idle}`}>
        해드릴게요
      </NavLink>
    </div>
  )
}
