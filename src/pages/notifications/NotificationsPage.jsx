export default function NotificationsPage() {
  // TODO: 추후 api.get('/notifications')로 데이터 로드
  const total = 3
  const list = [
    { id: 1, text: '나의 요청을 수락했어요' },
    { id: 2, text: '새 댓글이 달렸어요' },
    { id: 3, text: '메시지가 도착했어요' },
  ]

  return (
    <section className="p-4 text-left">
      <p className="text-sm font-medium">총 {total}개</p>

      <ul className="mt-4 space-y-4">
        {list.map(item => (
          <li key={item.id} className="text-sm text-neutral-800">
            {item.text}
          </li>
        ))}
      </ul>
    </section>
  )
}