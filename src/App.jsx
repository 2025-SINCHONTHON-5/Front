import { RouterProvider } from 'react-router-dom'
import router from './app/routes'
import './App.css' // Tailwind 외 커스텀 전역 스타일
export default function App() {
  return <RouterProvider router={router} />
}
