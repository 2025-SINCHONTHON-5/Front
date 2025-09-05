// src/app/routes.jsx
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from './Layout'

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
import NotificationsPage from '../pages/notifications/NotificationsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // 첫 화면 → /offer
      { index: true, element: <Navigate to="/offer" replace /> },

      // 목록
      { path: 'offer', element: <HomeOffer />, handle: { title: '해드려요' } },
      { path: 'ask', element: <HomeAsk />, handle: { title: '해주세요' } },

      // 해드려요: 새 글 / 상세
      { path: 'offer/posts/new', element: <OfferNewPostPage />, handle: { title: '해드려요 글쓰기' } },
      { path: 'offer/posts/:id', element: <OfferPostDetailPage />, handle: { title: '해드려요 상세' } },

      // 해주세요: 새 글 / 상세
      { path: 'ask/posts/new', element: <AskNewPostPage />, handle: { title: '해주세요 글쓰기' } },
      { path: 'ask/posts/:id', element: <AskPostDetailPage />, handle: { title: '해주세요 상세' } },

      // 기타
      { path: 'login', element: <LoginPage />, handle: { title: '로그인' } },
      { path: 'logindetail', element: <LoginDetailPage />, handle: { title: '로그인' } },
      { path: 'my', element: <MyPage />, handle: { title: '마이페이지' } },
      { path: 'notifications', element: <NotificationsPage />, handle: { title: '알림' } },

      // 잘못된 경로 → /offer
      { path: '*', element: <Navigate to="/offer" replace /> },
    ],
  },
])

export default router
