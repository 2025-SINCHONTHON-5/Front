import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from '../../apis/axios';

// --- Mock Data (API 실패 시 사용) ---
const mockPostData = {
    id: 1,
    author: '친절한 라이언',
    request: 123,
    title: '떡볶이 공동구매 하실 분! (목업 데이터)',
    content:
      '학교 앞에서 파는 인생 떡볶이, 다들 아시죠? 혼자 먹기에는 양이 많아서 공동구매 하실 분들을 찾습니다. 매운맛, 보통맛 선택 가능하니 많은 참여 부탁드려요!',
    image: 'https://placehold.co/800x400/F3E8FF/4F46E5?text=떡볶이+이미지',
    total_amount: 12000,
    participants_count: 3,
    max_participants: 5,
    apply_deadline: '2025-09-10T20:00:00Z',
    execute_time: '2025-09-11T19:00:00Z',
    location: '서강대학교 정문',
    accountHolder: '홍길동',
    accountNumber: '우리은행 1002-123-456789',
    status: "OPEN",
    createdAt: '2025-09-05T11:30:00Z',
    comments: [
      { id: 1, author: {id: '어피치'}, content: '저요! 저 참여하고 싶어요! 보통맛으로 부탁드려요.'},
      { id: 2, author: {id: '네오'}, content: '혹시 튀김도 같이 주문 가능한가요?'},
    ]
};
// --- End of Mock Data ---

// Helper Functions
const calculateDday = (deadline) => {
    if (!deadline) return '';
    const today = new Date();
    const targetDate = new Date(deadline);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return '마감';
    if (diffDays === 0) return 'D-Day';
    return `D-${diffDays}`;
};

const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    return new Date(dateTimeString).toLocaleString('ko-KR', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
};

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

const ApplicationModal = ({ post, onClose, onConfirm }) => {
    const [requestMessage, setRequestMessage] = useState('');

    const handleConfirm = () => {
        console.log("요청사항:", requestMessage);
        onConfirm();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 space-y-4">
                <h2 className="text-xl font-bold text-gray-800 text-center">신청하기 전 꼭 확인해주세요</h2>
                
                <div className="bg-gray-50 p-4 rounded-md text-sm space-y-2 text-center">
                    <p className="font-semibold">{post.accountHolder}</p>
                    <p>{post.accountNumber}</p>
                    <p className="pt-2 text-gray-600">
                        예금주명과 계좌번호를 저장해주시고,<br/>
                        인원 모집 성공 알림이 발송되면 입금해주세요.<br/><br/>
                        요청 사항은 아래에 작성해주세요.
                    </p>
                </div>

                <div>
                    <textarea
                        id="request-message"
                        rows="4"
                        maxLength="300"
                        value={requestMessage}
                        onChange={(e) => setRequestMessage(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        placeholder="요청사항을 입력해주세요. (예: 매운맛으로 부탁드려요!)"
                    ></textarea>
                    <p className="text-right text-xs text-gray-500 mt-1">{requestMessage.length}/300</p>
                </div>

                <div className="flex justify-center space-x-3 pt-2">
                    <button onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">취소하기</button>
                    <button onClick={handleConfirm} className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition">신청하기</button>
                </div>
            </div>
        </div>
    )
}

export default function OfferPostDetailPage() {
    const { id } = useParams()
    
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    setError("로그인이 필요합니다.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`/supply/${id}/`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                });

                setPost(response.data);
                setComments(response.data.comments || []);
                console.log('✅ 상세글 API 연동 성공:', response.data);
            } catch (err) {
                console.error("상세글 API 연동 실패:", err);
                if (err.response && err.response.status === 401) {
                    setError('인증에 실패했습니다. 다시 로그인해주세요.');
                } else {
                    setError('데이터 로딩에 실패하여 임시 데이터를 표시합니다.');
                    setPost(mockPostData);
                    setComments(mockPostData.comments || []);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleApplyClick = () => {
        setIsModalOpen(true);
    }

    const handleConfirmApplication = () => {
        setIsModalOpen(false);
        alert('신청이 완료되었습니다.');
    }
    
    // --- ★★★ 댓글 API 연동 수정 ★★★ ---
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim() === '') return;

        const optimisticComment = {
            id: Date.now(),
            author: { id: "나" }, 
            content: newComment,
            created_at: new Date().toISOString()
        };
        
        setComments(prevComments => [...prevComments, optimisticComment]);
        setNewComment('');

        try {
            const accessToken = localStorage.getItem('accessToken');
            const grantType = 'Bearer'; // 일반적으로 'Bearer' 사용

            // 새로운 API 명세에 맞게 요청 본문 구성
            const requestBody = {
                post_id: parseInt(id, 10), // URL의 id를 숫자로 변환하여 사용
                content: newComment
            };

            const response = await axios.post(
                `/supply/comment`, // URL 패턴 수정
                requestBody,       // 요청 본문 수정
                {
                    headers: {
                        'Authorization': `${grantType} ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('✅ 댓글 추가 API 연동 성공:', response.data);
            // 성공 시, 서버 응답 데이터로 임시 댓글을 교체 (응답 본문에 새 댓글 객체가 온다고 가정)
            setComments(prevComments => 
                prevComments.map(comment => 
                    comment.id === optimisticComment.id ? response.data : comment
                )
            );
        } catch (err) {
            console.error("댓글 API 연동 실패:", err);
            alert("댓글 작성에 실패했습니다.");
            // 실패 시, 화면에 추가했던 임시 댓글을 제거
            setComments(prevComments => prevComments.filter(
                comment => comment.id !== optimisticComment.id
            ));
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">로딩 중...</div>;
    }

    if (!post) {
        return <div className="flex justify-center items-center h-screen">게시글을 찾을 수 없습니다.</div>;
    }

    const progressPercentage = (post.participants_count / post.max_participants) * 100;

    return (
        <>
            <div className="bg-white min-h-screen font-sans py-12 px-4">
                <div className="w-full max-w-3xl mx-auto bg-white overflow-hidden">
                    {error && <div className="p-4 mb-4 bg-red-100 text-red-700 text-center rounded-lg">{error}</div>}
                    <article className="p-6 sm:p-8">
                        {post.image && (
                            <img
                                src={post.image}
                                alt="게시글 대표 이미지"
                                className="w-full h-64 object-cover rounded-lg mb-6"
                            />
                        )}

                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {post.title}
                        </h1>
                        <div className="text-sm text-gray-500">
                            <span>{post.author} | {formatDateTime(post.createdAt)}</span>
                        </div>

                        <hr className="my-6 border-gray-200" />
                        
                        <div>
                            <p className="text-sm font-semibold text-gray-900">희망 금액</p>
                            <p className="font-medium text-gray-900">총 {post.total_amount.toLocaleString()}원</p>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        <div className="mt-4">
                            <div className="flex justify-between items-center text-sm font-semibold">
                                <span className="text-gray-600">마감 {calculateDday(post.apply_deadline)}</span>
                                <span className="text-gray-500">{post.participants_count}/{post.max_participants}명</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                                <div className="bg-black h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                            </div>
                        </div>

                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap min-h-[100px] mt-6">
                            {post.content}
                        </p>

                        <hr className="my-8 border-gray-200" />
                        
                        <div>
                            <p className="text-sm font-semibold text-gray-900">수행 일시</p>
                            <p className="font-medium text-gray-900">{formatDateTime(post.execute_time)}</p>
                        </div>
                        
                        <hr className="my-6 border-gray-200" />

                        <div>
                            <p className="text-sm font-semibold text-gray-900">픽업 및 전달 장소</p>
                            <p className="font-medium text-gray-900">{post.location}</p>
                        </div>

                        <hr className="my-8 border-gray-200" />

                        <section>
                            <p className="font-bold text-gray-800 mb-4">{comments.length}개의 댓글</p>
                            <div className="space-y-4">
                                {comments.map((comment) => (
                                    <div key={comment.id}>
                                        <p className="font-semibold text-sm text-gray-800">{comment.author.id}</p>
                                        <p className="text-gray-600 mt-1">{comment.content}</p>
                                    </div>
                                ))}
                            </div>
                        <hr className="my-6 border-gray-200" />

                            <form onSubmit={handleCommentSubmit} className="mt-6">
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="댓글을 입력하세요..."
                                        className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
                                    />
                                    <button
                                        type="submit"
                                        className="flex-shrink-0 bg-gray-600 text-white p-3 rounded-full hover:bg-gray-700 transition"
                                        aria-label="댓글 등록"
                                    >
                                        <SendIcon />
                                    </button>
                                </div>
                            </form>
                        </section>
                    </article>

                    <div className="px-6 sm:px-8 pb-8 pt-8">
                        <button
                            onClick={handleApplyClick}
                            className="w-full bg-black text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition"
                        >
                            신청하기
                        </button>
                    </div>
                </div>
            </div>
            
            {isModalOpen && <ApplicationModal post={post} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirmApplication} />}
        </>
    )
}

