import React, { useState } from 'react';

// 아이콘 SVG 컴포넌트 (가독성을 위해 분리)
const MoneyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 6a7.5 7.5 0 100 12 7.5 7.5 0 000-12z" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);


export default function NewPostPage() {
    // 'request' (해주세요) 또는 'offer' (해드려요) 상태 관리
    const [postType, setPostType] = useState('request');

    // 폼 입력 데이터 상태 관리
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        price: '',
        location: '',
        deadline: '',
    });

    // 입력 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        // 실제 애플리케이션에서는 이 부분에서 API 호출 등을 통해 서버로 데이터를 전송합니다.
        console.log("제출된 데이터:", { postType, ...formData });
        alert('게시글이 성공적으로 등록되었습니다! (콘솔 로그 확인)');
    };

    // 유형 선택 버튼 스타일
    const getButtonClass = (type) => {
        return `w-full py-3 px-4 text-sm font-bold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            postType === type
                ? 'bg-indigo-600 text-white shadow-lg transform hover:scale-105'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`;
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center font-sans p-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-800">새로운 게시글 등록</h1>
                
                {/* 게시글 유형 선택 */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => {
                            setPostType('request');
                            setFormData(prev => ({ ...prev, deadline: '' })); // 유형 변경 시 마감일 초기화
                        }}
                        className={getButtonClass('request')}
                    >
                        🙋‍♀️ 해주세요 (심부름, 공구 요청)
                    </button>
                    <button
                        type="button"
                        onClick={() => setPostType('offer')}
                        className={getButtonClass('offer')}
                    >
                        🙋‍♂️ 해드려요 (재능, 서비스 제공)
                    </button>
                </div>

                {/* 게시글 작성 폼 */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* 제목 입력 */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder={postType === 'request' ? '예: 학교 앞에서 떡볶이 사다주실 분' : '예: 포토샵으로 간단한 누끼 작업해드려요'}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            required
                        />
                    </div>

                    {/* 내용 입력 */}
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">상세 내용</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            rows="6"
                            placeholder={postType === 'request' ? '필요한 내용을 구체적으로 작성해주세요. (예: 4시까지 정문으로 와주시면 됩니다!)' : '제공할 수 있는 서비스에 대해 상세히 설명해주세요.'}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            required
                        ></textarea>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* 가격 입력 (동적 라벨) */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                <MoneyIcon />
                                {postType === 'request' ? '사례금 (선택 사항)' : '서비스 비용'}
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder={postType === 'request' ? '예: 3000' : '예: 5000'}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>

                        {/* 마감일 입력 ('해주세요' 유형에만 보임) */}
                        {postType === 'request' && (
                            <div>
                                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                                    <CalendarIcon />
                                    마감일
                                </label>
                                <input
                                    type="datetime-local"
                                    id="deadline"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    required
                                />
                            </div>
                        )}
                    </div>
                     {/* 위치 정보 */}
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                            <LocationIcon />
                            위치 정보 (선택 사항)
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="예: 서강대학교 정문"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>

                    {/* 파일 첨부 */}
                    <div>
                        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">사진 첨부 (선택 사항)</label>
                        <input id="file-upload" name="file-upload" type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"/>
                    </div>
                    
                    {/* 등록 버튼 */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-102"
                    >
                        게시글 등록하기
                    </button>
                </form>
            </div>
        </div>
    );
}


/* export default function NewPostPage() {
  return (
    <p>NewPostPage</p>
  )
} */