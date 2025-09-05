import React from 'react';
import ReceiveCard from '../../components/ReceiveCard';

// TODO: 추후 API 연동을 통해 실제 데이터를 가져와야 합니다.
const mockApiData = [
  {
    "title": "BHC 뿌링클 같이 시키실 분",
    "d-day": 2,
    "join_member_count": 2,
    "goal_member_count": 4,
    "join_members": [
      { "name": "김신촌", "call": "010-1111-2222", "content": "저는 뿌링클 콤보로 부탁드려요!" },
      { "name": "이연세", "call": "010-3333-4444", "content": "치즈볼 추가 가능한가요?" },
    ]
  },
  {
    "title": "생수 공동구매",
    "d-day": 7,
    "join_member_count": 8,
    "goal_member_count": 10,
    "join_members": [
      { "name": "박이화", "call": "010-5555-6666", "content": "삼다수 2L 6개짜리 한 묶음이요." }
    ]
  },
  {
    "title": "A4용지 사실 분 구합니다",
    "d-day": 1,
    "join_member_count": 1,
    "goal_member_count": 5,
    "join_members": [
      { "name": "최서강", "call": "010-7777-8888", "content": "더블에이 80g으로 1권만 부탁합니다." }
    ]
  }
];

export default function MyPageReceive() {
  // d-day가 적게 남은 순서대로 데이터를 정렬합니다.
  const sortedData = mockApiData.sort((a, b) => a['d-day'] - b['d-day']);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-md mx-auto">
        <div className="space-y-8">
          {sortedData.map((group) => (
            <section key={group.title}>
              {/* --- 그룹 헤더 --- */}
              <div className="p-4 mb-4 bg-gray-100 border-b-2 border-gray-300 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{group.title}</h2>
                  <span className="px-3 py-1 text-sm font-bold text-red-600 bg-red-100 rounded-full">
                    D-{group['d-day']}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  참여 현황: {group.join_member_count} / {group.goal_member_count}
                </p>
              </div>

              {/* --- 요청자 카드 목록 --- */}
              <div className="space-y-3">
                {group.join_members.map((member, index) => (
                  <ReceiveCard key={index} member={member} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
