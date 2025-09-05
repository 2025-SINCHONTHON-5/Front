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
import MyPageRequest from '../pages/my/MyPageRequest'
import MyPageReceive from '../pages/my/MyPageReceive'

import NotificationsPage from '../pages/notifications/NotificationsPage'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [

      // 첫 화면은 /offer 로
      { index: true, element: <Navigate to="/offer" replace /> },

      // 목록
      { path: 'offer', element: <HomeOffer /> },
      { path: 'ask', element: <HomeAsk /> },

      // 해드려요: 새 글 / 상세
      { path: 'offer/posts/new', element: <OfferNewPostPage /> },
      { path: 'offer/posts/:id', element: <OfferPostDetailPage /> },

      // 해주세요: 새 글 / 상세
      { path: 'ask/posts/new', element: <AskNewPostPage /> },
      { path: 'ask/posts/:id', element: <AskPostDetailPage /> },

      // 로그인
      { path: 'logindetail', element: <LoginDetailPage /> },
      { path: 'login', element: <LoginPage /> },

      // 마이 페이지 : 마이 페이지 / 내가 신청한 요청 관리 / 내가 받은 요청 관리
      { path: 'my', element: <MyPage /> },
      { path: 'my/requests', element: <MyPageRequest /> },
      { path: 'my/receives', element: <MyPageReceive /> },

      // 기타
      { path: 'notifications', element: <NotificationsPage /> },

      // // 잘못된 경로는 /offer로
      // { path: '*', element: <Navigate to="/offer" replace /> },

    ],
  },
])

export default router

