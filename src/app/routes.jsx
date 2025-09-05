// src/app/routes.jsx
import { createBrowserRouter, Navigate } from 'react-router-dom'

// 레이아웃
import ShellLayout from './layouts/ShellLayout'     // 헤더 + 탭바
import HeaderLayout from './layouts/HeaderLayout'   // 헤더만
import BlankLayout from './layouts/BlankLayout'     // 둘 다 없음

import LoginPage from '../pages/login/LoginPage'
import LoginDetailPage from '../pages/login/LoginDetailPage'

// 리스트 페이지
import HomeAsk from '../pages/home/HomeAsk'        // /ask
import HomeOffer from '../pages/home/HomeOffer'    // /offer

// 해드려요(offer) 전용: 새 글 / 상세
import OfferNewPostPage from '../pages/posts/OfferNewPostPage'
import OfferPostDetailPage from '../pages/posts/OfferPostDetailPage'

// 해주세요(ask) 전용: 새 글 / 상세
import AskNewPostPage from '../pages/posts/AskNewPostPage'
import AskPostDetailPage from '../pages/posts/AskPostDetailPage'

import MyPage from '../pages/my/MyPage'
import MyPageRequest from '../pages/my/MyPageRequest'
import MyPageReceive from '../pages/my/MyPageReceive'

import NotificationsPage from '../pages/notifications/NotificationsPage'

const router = createBrowserRouter([
  // 1) 목록 화면: 헤더 + 하단 탭 (Shell)
  {
    path: '/',
    element: <ShellLayout />,
    children: [
      { index: true, element: <Navigate to="/offer" replace /> },
      { path: 'offer', element: <HomeOffer />, handle: { title: '해드려요' } },
      { path: 'ask', element: <HomeAsk />, handle: { title: '해주세요' } },
      { path: 'notifications', element: <NotificationsPage />, handle: { title: '알림' } },
      { path: 'my', element: <MyPage />, handle: { title: '마이페이지' } },
    ],
  },

  // 2) 상세/작성: 헤더만 (Header)
  {
    path: '/',
    element: <HeaderLayout />,
    children: [
      { path: 'offer/posts/new', element: <OfferNewPostPage />, handle: { title: '해드려요 글쓰기' } },
      { path: 'offer/posts/:id', element: <OfferPostDetailPage />, handle: { title: '해드려요 상세' } },
      { path: 'ask/posts/new', element: <AskNewPostPage />, handle: { title: '해주세요 글쓰기' } },
      { path: 'ask/posts/:id', element: <AskPostDetailPage />, handle: { title: '해주세요 상세' } },  
      { path: 'my/requests', element: <MyPageRequest />, handle: { title: '내가 신청한 요청 현황' }},
      { path: 'my/receives', element: <MyPageReceive />, handle: { title: '내가 받은 요청 관리' } },
      // 알림/마이 하위 상세들도 여기에 추가하면 됨 (예시)
      // { path: 'my/something/:id', element: <MySomethingDetailPage />, handle: { title: '...' } },
    ],
  },

  // 3) 로그인 화면: 상하단 없음 (Blank)
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },                // 풀 화면
      { path: 'logindetail', element: <LoginDetailPage />, handle: { title: '로그인' } }, // 상단만 필요하면 HeaderLayout로 옮겨도 OK
    ],
  },

  // 4) 기타 → /offer
  { path: '*', element: <Navigate to="/offer" replace /> },
])

export default router

