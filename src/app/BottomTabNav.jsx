import { NavLink } from 'react-router-dom'

// 아이콘들 (경로/이름 그대로 사용)
// ⚠️ notifications 아이콘 파일명이 'notifictaions.svg' 로 보입니다.
import OfferIcon from '../assets/offer.svg'
import AskIcon from '../assets/ask.svg'
import BellIcon from '../assets/notifictaions.svg'
import ProfileIcon from '../assets/Profile.svg'

export default function BottomTabNav() {
  return (
    <nav
      className="
        fixed inset-x-0 bottom-0 z-50 border-t border-neutral-300 bg-white
        sm:hidden
      "
      aria-label="하단 탭"
    >
      <ul className="mx-auto flex max-w-md pb-[env(safe-area-inset-bottom)]">
        <Tab to="/offer" icon={OfferIcon} label="제공" />
        <Tab to="/ask" icon={AskIcon} label="요청" />
        <Tab to="/notifications" icon={BellIcon} label="알림" />
        <Tab to="/my" icon={ProfileIcon} label="마이페이지" />
      </ul>
    </nav>
  )
}

function Tab({ to, icon, label }) {
  const base =
    'flex flex-1 items-center justify-center gap-1 py-2 select-none'
  return (
    <li className="flex-1">
      <NavLink
        to={to}
        className={({ isActive }) =>
          [
            base,
            isActive ? 'text-neutral-900' : 'text-neutral-400',
          ].join(' ')
        }
      >
        {({ isActive }) => (
          <div className="flex flex-col items-center gap-1">
            {/* 아이콘은 이미지 파일이라 색상을 변경하기 어려워서
               활성/비활성은 opacity + grayscale로 표현 */}
            <img
              src={icon}
              alt={label}
              className={[
                'w-6 h-6',
                isActive ? 'opacity-100' : 'opacity-40 grayscale',
                'transition-all duration-150',
              ].join(' ')}
              draggable={false}
            />
            <span
              className={[
                'text-[11px] leading-none',
                isActive ? 'font-semibold' : 'font-normal',
              ].join(' ')}
            >
              {label}
            </span>
          </div>
        )}
      </NavLink>
    </li>
  )
}
