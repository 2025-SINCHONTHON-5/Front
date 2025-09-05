import { Outlet } from 'react-router-dom'
import Header from '../Header'

export default function HeaderLayout() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header />
      <main className="mx-auto max-w-md">
        <Outlet />
      </main>
    </div>
  )
}