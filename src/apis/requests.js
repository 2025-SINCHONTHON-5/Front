import instance from './axios'

/**
 * 해주세요 글 목록 조회
 * @param {'-created_at'|'created_at'|'-comment_count'} ordering
 */
export async function fetchAskList(ordering = '-created_at') {
  const res = await instance.get('/request', {
    params: { ordering },
  })
  // res.data 는 배열
  return res.data
}