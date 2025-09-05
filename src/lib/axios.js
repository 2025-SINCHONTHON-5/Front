import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000',
  timeout: 10000,
})

// 요청 인터셉터: 토큰 자동 첨부 등
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 응답 인터셉터: 공통 에러 처리
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // 예: 로그아웃/재인증 유도 등
      // window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)
