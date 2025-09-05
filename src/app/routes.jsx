import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'

import LoginPage from '../pages/login/LoginPage'
import LoginDetailPage from '../pages/login/LoginDetailPage'
import HomePage from '../pages/home/HomePage'
import HomeAsk from '../pages/home/HomeAsk'
import HomeOffer from '../pages/home/HomeOffer'
import NewPostPage from '../pages/posts/NewPostPage'
import PostDetailPage from '../pages/posts/PostDetailPage'
import MyPage from '../pages/my/MyPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },           // /
      { path: 'home/ask', element: <HomeAsk /> },       // /home/ask
      { path: 'home/offer', element: <HomeOffer /> },   // /home/offer
      { path: 'login', element: <LoginPage /> },        // /login
      { path: 'logindetail', element: <LoginDetailPage /> }, // /logindetail
      { path: 'posts/new', element: <NewPostPage /> },  // /posts/new
      { path: 'posts/:id', element: <PostDetailPage /> }, // /posts/123
      { path: 'my', element: <MyPage /> },              // /my
    ],
  },
])

export default router
