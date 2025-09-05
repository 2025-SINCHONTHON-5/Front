import React, { useState } from 'react';

export default function AskNewPostPage() {
    // 폼 입력 데이터 상태 관리
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        file: null,
    });

    // 입력 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    // 파일 변경 핸들러
    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, file: e.target.files[0] }));
    };

    // 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        // 실제 애플리케이션에서는 이 부분에서 API 호출 등을 통해 서버로 데이터를 전송합니다.
        console.log("제출된 데이터:", formData);
        alert('게시글이 성공적으로 등록되었습니다! (콘솔 로그 확인)');
    };

    // 입력 필드 스타일
    const inputStyle = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";
    // 라벨 스타일
    const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
    // 설명 텍스트 스타일
    const descriptionStyle = "text-xs text-gray-500 mb-2";

    return (
        <div className="bg-white-100 min-h-screen font-sans p-4 flex justify-center items-center">
            <section className="w-full max-w-2xl bg-white rounded-2xl p-6 sm:p-8 space-y-6 text-left">
                               
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 제목 */}
                    <div>
                        <label htmlFor="title" className={labelStyle}>
                            제목 <span className="text-red-500">*</span>
                        </label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} className={inputStyle} placeholder="제목을 입력해주세요." required />
                    </div>

                    {/* 상세 내용 */}
                    <div>
                        <label htmlFor="content" className={labelStyle}>
                            내용 <span className="text-red-500">*</span>
                        </label>
                        <textarea id="content" name="content" value={formData.content} onChange={handleInputChange} rows="6" className={inputStyle} placeholder="필요한 내용을 구체적으로 작성해주세요." required />
                    </div>
                    
                    {/* 사진 첨부 */}
                    <div>
                        <label htmlFor="file-upload" className={labelStyle}>사진</label>
                        <p className={descriptionStyle}>이미지 형식은  JPG/PNG, 용량은 5MB 이하만 가능합니다.</p>
                        <input id="file-upload" name="file-upload" type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"/>
                    </div>
                    
                    {/* 등록 버튼 */}
                    <button type="submit" className="w-full bg-gray-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-102">
                        등록하기
                    </button>
                </form>
            </section>
        </div>
    );
}
