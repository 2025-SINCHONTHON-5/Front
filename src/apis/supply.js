import instance from './axios'

/**
 * 해드릴게요 목록 조회
 * @param {Object} params
 * @param {number} [params.page=1]
 * @param {number} [params.page_size=20]
 * @param {string} [params.search]          // 제목/내용 검색어
 * @param {string} [params.ordering]        // created_at | -created_at | apply_deadline | -apply_deadline | execute_time | -execute_time
 * @param {string} [params.status]          // OPEN | FILLED | EXPIRED ...
 * @returns {Promise<{count:number,next:string|null,previous:string|null,results:any[]}>}
 */
export async function fetchOfferList({
  page = 1,
  page_size = 20,
  search,
  ordering,
  status,
} = {}) {
  const res = await instance.get('/supply/', {
    params: { page, page_size, search, ordering, status },
  })
  return res.data
}