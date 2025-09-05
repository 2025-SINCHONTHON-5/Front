import { useParams } from 'react-router-dom'

export default function PostDetailPage() {
  const { id } = useParams()

  return (
    <article className="mx-auto max-w-2xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">게시글 상세</h1>
      <p className="text-neutral-600">게시글 ID: {id}</p>
      <div className="mt-2">
        <p>여기에 게시글 내용을 표시할 예정입니다.</p>
      </div>
    </article>
  )
}