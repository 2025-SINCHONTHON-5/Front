import React from 'react';

// member prop은 { name, call, content } 형태의 객체입니다.
export default function ReceiveCard({ member }) {
  return (
    <div className="p-4 bg-[#F0F4FA] borderrounded-lg shadow-sm">
      <div className="space-y-2 text-left">
        <div>
          <p className="font-bold text-gray-900">{member.name}</p>
        </div>
        <div>
          <p className="font-bold text-gray-900">{member.call}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">{member.content}</p>
        </div>
      </div>
    </div>
  );
}

