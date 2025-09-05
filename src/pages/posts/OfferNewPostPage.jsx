import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../apis/axios';

export default function OfferNewPostPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // 이전 페이지에서 넘겨받은 '부탁해요' 게시글 정보
    const [linkedRequest, setLinkedRequest] = useState(null);

    // 폼 입력 데이터 상태 관리
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        total_amount: '',
        max_participants: '',
        apply_deadline: '',
        execute_time: '',
        location: '',
        file: null,
    });
    const [error, setError] = useState(null);

    // 컴포넌트 마운트 시 이전 페이지에서 전달받은 state를 확인
    useEffect(() => {
        if (location.state && location.state.requestId) {
            setLinkedRequest({
                id: location.state.requestId,
                title: location.state.requestTitle,
            });
            // 제목 자동 완성
            setFormData(prev => ({ ...prev, title: `[RE] ${location.state.requestTitle}`}));
        }
    }, [location.state]);

    // 입력 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 파일 변경 핸들러
    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, file: e.target.files[0] }));
    };

    // 폼 제출 핸들러 (author 필드 제거됨)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // API 요청 본문에 더 이상 author를 포함하지 않습니다.
        const requestBody = {
            request: linkedRequest ? linkedRequest.id : null,
            title: formData.title,
            content: formData.content,
            total_amount: parseInt(formData.total_amount, 10) || 0,
            max_participants: parseInt(formData.max_participants, 10) || 0,
            apply_input: formData.apply_deadline,
            execute_input: formData.execute_time,
        };
        
        console.log("--- 🚀 API 요청 데이터 미리보기 (JSON) ---");
        console.log(requestBody);
        console.log("---------------------------------------");

        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                setError("인증 정보가 없습니다. 다시 로그인해주세요.");
                return;
            }

            const response = await axios.post('/supply/', requestBody, {
                headers: {
                    // 서버는 이 헤더의 토큰으로 사용자를 식별합니다.
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("✅ '도와줄게요' 게시글 등록 성공:", response.data);
            alert('게시글이 성공적으로 등록되었습니다!');
            
            navigate(`/offer/${response.data.id}`);

        } catch (err) {
            console.error("❌ '도와줄게요' 게시글 등록 실패:", err);
            
            if (err.response && err.response.data) {
                console.error("💥 서버 응답 에러:", err.response.data);
                
                const errorData = err.response.data;
                const errorMessages = Object.keys(errorData)
                    .map(key => `${key}: ${errorData[key].join(', ')}`)
                    .join('\n');
                
                setError(errorMessages || "입력 내용을 다시 확인해주세요.");
            } else {
                setError("게시글 등록에 실패했습니다. 네트워크 연결을 확인해주세요.");
            }
        }
    };

    const inputStyle = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";
    const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
    const descriptionStyle = "text-xs text-gray-500 mb-2";

    return (
        <div className="bg-gray-50 min-h-screen font-sans p-4 flex justify-center items-center">
            <section className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 sm:p-8 text-left">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">'도와줄게요' 게시글 작성</h1>

                {linkedRequest && (
                    <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
                        <p className="text-sm text-gray-600">아래 '부탁해요' 요청에 대한 도움글을 작성합니다:</p>
                        <p className="font-semibold text-indigo-800">{linkedRequest.title}</p>
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 제목 */}
                    <div>
                        <label htmlFor="title" className={labelStyle}>제목 <span className="text-red-500">*</span></label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} className={inputStyle} placeholder="제목을 입력해주세요." required />
                    </div>

                    {/* 상세 내용 */}
                    <div>
                        <label htmlFor="content" className={labelStyle}>내용 <span className="text-red-500">*</span></label>
                        <textarea id="content" name="content" value={formData.content} onChange={handleInputChange} rows="6" className={inputStyle} placeholder="어떻게 도와주실 수 있는지 구체적으로 작성해주세요." required />
                    </div>

                    {/* 희망 금액 (총액) */}
                    <div>
                        <label htmlFor="total_amount" className={labelStyle}>희망 금액 <span className="text-red-500">*</span></label>
                        <p className={descriptionStyle}>N명에게 받을 금액의 총합을 알려주세요. (예: 1만원일 경우 '10000'입력)</p>
                        <input type="number" id="total_amount" name="total_amount" value={formData.total_amount} onChange={handleInputChange} className={inputStyle} placeholder="금액을 숫자로만 입력해주세요." required />
                    </div>

                    {/* 모집 인원 */}
                    <div>
                        <label htmlFor="max_participants" className={labelStyle}>모집 인원<span className="text-red-500">*</span></label>
                        <p className={descriptionStyle}>희망하는 목표 모집 인원을 알려주세요. (예: 10명일 경우 '10'입력)</p>
                        <input type="number" id="max_participants" name="max_participants" value={formData.max_participants} onChange={handleInputChange} className={inputStyle} placeholder="모집 인원을 숫자로만 입력해주세요." required />
                    </div>

                    {/* 마감시간 */}
                    <div>
                        <label htmlFor="apply_deadline" className={labelStyle}>마감 일시<span className="text-red-500">*</span></label>
                        <p className={descriptionStyle}>신청 마감 일시를 알려주세요. (예: 2025, 7)</p>
                        <input type="number" id="apply_deadline" name="apply_deadline" value={formData.apply_deadline} onChange={handleInputChange} className={inputStyle} placeholder="마감 일시를 입력해주세요." required />
                    </div>

                    {/* 시행시간 */}
                    <div>
                        <label htmlFor="execute_time" className={labelStyle}>수행 일시<span className="text-red-500">*</span></label>
                        <p className={descriptionStyle}>요청을 실제로 수행할 일시를 알려주세요. (예: 2025-08-21 19:00)</p>
                        <input type="number" id="execute_time" name="execute_time" value={formData.execute_time} onChange={handleInputChange} className={inputStyle} placeholder="수행 일시를 입력해주세요." required />
                    </div>

                    {/* 픽업/전달 장소 */}
                    <div>
                        <label htmlFor="location" className={labelStyle}>픽업 및 전달 장소<span className="text-red-500">*</span></label>
                        <p className={descriptionStyle}>심부름을 배달할 구체적인 장소를 알려주세요.<br/>공동구매 혹은 개별 배달의 경우 '없음'이라고 작성해주세요.</p>
                        <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} className={inputStyle} placeholder="장소를 입력해주세요." required />
                    </div>
                    
                    {/* 사진 첨부 */}
                    <div>
                        <label htmlFor="file-upload" className={labelStyle}>사진</label>
                        <p className={descriptionStyle}>이미지 형식은 JPG/PNG, 용량은 5MB 이하만 가능합니다.</p>
                        <input id="file-upload" name="file" type="file" onChange={handleFileChange} accept="image/png, image/jpeg" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"/>
                    </div>
                    
                    {/* 에러 메시지 */}
                    {error && <p className="text-sm text-red-500 text-center whitespace-pre-wrap">{error}</p>}
                    
                    <button type="submit" className="w-full bg-black text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition">
                        등록하기
                    </button>
                </form>
            </section>
        </div>
    );
}