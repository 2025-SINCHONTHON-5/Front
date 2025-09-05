import React from 'react';

// 날짜 포맷팅 함수
const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
};


// 카드 컴포넌트
const PostCard = ({ post, type = 'offer' }) => {
    // 'offer' 타입일 때만 진행률 계산
    const progressPercentage = type === 'offer' ? (post.currentApplicants / post.maxApplicants) * 100 : 0;

    const calculateDday = (deadline) => {
        const today = new Date();
        const targetDate = new Date(deadline);
        const diffTime = targetDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) return '마감';
        if (diffDays === 0) return 'D-Day';
        return `D-${diffDays}`;
    };

    return (
        <div className="overflow-hidden">
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 truncate">{post.title}</h3>
                <p className="text-gray-600 mt-2 h-10 overflow-hidden text-ellipsis">{post.content}</p>
                
                {/* 'offer' 타입일 때만 마감일과 진행상황 그래프를 보여줍니다. */}
                {type === 'offer' && (
                    <div className="mt-4">
                        <div className="flex justify-between items-center text-sm font-semibold">
                            <span className="text-gray-500">마감 {calculateDday(post.deadline)}</span>
                            <span className="text-gray-500">{post.currentApplicants}/{post.maxApplicants}명</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                            <div className="bg-black h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* 이미지가 있을 경우에만 슬라이더를 보여줍니다. */}
            {post.images && post.images.length > 0 && (
                <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide h-48 bg-gray-100">
                    {post.images.map((imgSrc, index) => (
                        <div key={index} className="flex-shrink-0 w-full h-full snap-center">
                            <img src={imgSrc} alt={`${post.title} ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            )}


            <div className="p-4 flex justify-between items-center text-sm text-gray-500">
                <span>{post.author} | {formatDateTime(post.createdAt)}</span>
                <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    <span>{post.commentCount > 999 ? '+999' : post.commentCount}</span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;

