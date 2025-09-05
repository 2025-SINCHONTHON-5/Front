import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from '../../apis/axios';

// --- Mock Data (API 실패 시 사용될 데이터) ---
const mockPostData = {
    id: 1,
    requester: { "id": "도움이 필요한 네오", "email": "user1@example.com" },
    helper: null,
    title: '정문 앞에서 파는 붕어빵 좀 사다주세요! (목업 데이터)',
    content: '수업 때문에 나갈 수가 없는데 붕어빵이 너무 먹고 싶어요... 카드 결제도 가능하다고 하니, 혹시 지나가시는 분 계시면 팥붕 3개, 슈붕 3개만 부탁드립니다! 사례는 바로 계좌로 보내드릴게요!',
    photo: 'https://placehold.co/800x400/E0F2FE/0891B2?text=붕어빵+사진',
    created_at: "2025-09-06T14:30:00Z",
    updated_at: "2025-09-06T14:30:00Z",
    comments: [
        {
            id: 1,
            author: { "id": "친절한 라이언", "email": "user2@example.com" },
            content: "마침 지나가는 길인데 사다드릴까요?",
            created_at: "2025-09-06T14:35:00Z"
        }
    ],
    comment_count: 1
};

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

export default function AskPostDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // AskPostDetailPage.jsx

useEffect(() => {
    const fetchData = async () => {
        try {
            // 1. localStorage에서 Access Token을 가져옵니다.
            const accessToken = localStorage.getItem('accessToken');

            // 2. 만약 토큰이 없다면 에러 처리 (선택 사항이지만 좋은 습관입니다)
            if (!accessToken) {
                setError("로그인이 필요합니다.");
                setLoading(false);
                // 필요하다면 로그인 페이지로 리다이렉트
                // navigate('/login');
                return;
            }

            // 3. API 호출 시 headers에 Authorization 추가!
            const response = await axios.get(`/request/${id}/`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            });

            console.log('✅ API 응답 데이터:', response.data);
            setPost(response.data);
            setComments(response.data.comments || []);
        } catch (err) {
            console.error("API 연동 실패:", err);
            // 401 에러의 경우 토큰 만료 등의 구체적인 메시지를 보여줄 수도 있습니다.
            if (err.response && err.response.status === 401) {
                setError('인증에 실패했습니다. 다시 로그인해주세요.');
            } else {
                setError('데이터 로딩에 실패하여 임시 데이터를 표시합니다.');
                setPost(mockPostData);
                setComments(mockPostData.comments);
            }
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, [id]);

    const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    // 1. 로컬에 먼저 보여줄 임시 댓글 객체 생성 (Optimistic UI)
    // 실제 사용자 정보는 로그인 상태에서 가져와야 합니다.
    const optimisticComment = {
        id: Date.now(), // 임시 ID
        author: { id: "나" }, // TODO: 실제 로그인된 사용자 닉네임으로 변경
        content: newComment,
        created_at: new Date().toISOString()
    };
    
    // 2. 화면에 바로 댓글 추가
    setComments(prevComments => [...prevComments, optimisticComment]);
    setNewComment('');

    try {
        // TODO: 실제 access token을 가져오는 로직으로 교체해야 합니다.
        const accessToken = localStorage.getItem('accessToken'); 

        // 3. API 호출
        const response = await axios.post(
            `/request/${id}/comments/`, // task_pk를 id prop으로 사용
            {
                content: newComment, // 요청 본문
            },
            {
                headers: { // 헤더 설정
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // 4. API 호출 성공 시, 서버로부터 받은 실제 댓글 데이터로 교체
        console.log('✅ 댓글 추가 성공:', response.data);
        setComments(prevComments => 
            // 기존 댓글 목록에서 임시 댓글을 찾아 서버 데이터로 교체
            prevComments.map(comment => 
                comment.id === optimisticComment.id ? response.data : comment
            )
        );

    } catch (err) {
        // 5. API 호출 실패 시
        console.error("댓글 API 연동 실패:", err);
        // 이미 화면에는 임시 댓글이 추가되어 있으므로 별도 처리 없이 사용자 경험은 유지됩니다.
        // 이 경우, 페이지를 새로고침하면 해당 댓글은 사라지게 됩니다.
    }
};

    
    const handleOfferHelpClick = () => {
        // navigate 함수의 두 번째 인자로 state를 전달하여 데이터를 넘길 수 있습니다.
        navigate('/offer/posts/new', { 
            state: { 
                requestId: id, // 현재 '부탁해요' 게시글의 ID
                requestTitle: post.title // 현재 '부탁해요' 게시글의 제목
            } 
        });
    };
    
    // 6. 에러 메시지와 게시글을 함께 표시할 수 있도록 수정 (선택 사항)
    if (!post) {
        return <div className="flex justify-center items-center h-screen">게시글을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="bg-white min-h-screen font-sans py-12 px-4">
            <div className="w-full max-w-3xl mx-auto bg-white overflow-hidden">
                {error && <div className="p-4 bg-red-100 text-red-700 text-center">{error}</div>}
                
                <article className="p-6 sm:p-8">
                    {/* --- 7. 모든 데이터를 mockData가 아닌 state(post, comments)에서 가져오도록 수정 --- */}
                    {post.photo && (
                        <img src={post.photo} alt="게시글 대표 이미지" className="w-full h-64 object-cover rounded-lg mb-6" />
                    )}

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
                    
                    <div className="text-sm text-gray-500">
                        <span>{post.requester.id} | {new Date(post.created_at).toLocaleString('ko-KR')}</span>
                    </div>

                    <hr className="my-6 border-gray-200" />
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap min-h-[100px]">
                        {post.content}
                    </p>

                    <hr className="my-8 border-gray-200" />
                    <section>
                        <p className="font-bold text-gray-800 mb-4">{comments.length}개의 댓글</p>
                        <div className="space-y-4">
                            {comments.map(comment => (
                                <div key={comment.id}>
                                    <p className="font-semibold text-sm text-gray-800">{comment.author.id}</p>
                                    <p className="text-gray-600 mt-1">{comment.content}</p>
                                </div>
                            ))}
                        </div>
                    
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
                        onClick={handleOfferHelpClick}
                        className="w-full bg-black text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition"
                    >
                        수락하기
                    </button>
                </div>
            </div>
        </div>
    );
}