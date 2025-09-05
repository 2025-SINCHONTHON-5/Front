import { useParams } from 'react-router-dom'

export default function AskPostDetailPage() {
  const { id } = useParams()
  return (
    <article className="mx-auto max-w-2xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">해주세요 — 상세</h1>
      <p className="text-neutral-600">게시글 ID: {id}</p>
      {/* TODO: 상세 내용 */}
    </article>
  )
}