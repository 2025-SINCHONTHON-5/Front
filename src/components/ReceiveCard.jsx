import React from 'react';

// member prop은 { name, call, content } 형태의 객체입니다.
export default function ReceiveCard({ member }) {
  return (
    <div className="p-4 bg-[#F0F4FA] border border-[#F0F4FA] rounded-lg">
      <div className="space-y-1">
        <div>
          <p className="font-bold text-gray-900">{member.name}</p>
        </div>
        <div>
          <p className="text-md font-bold text-gray-900">{member.call}</p>
        </div>
        <div>
          <p className="text-sm text-[#818A99]">{member.content}</p>
        </div>
      </div>
    </div>
  );
}