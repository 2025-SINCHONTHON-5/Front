import instance from './axios';

export const getUserProfile = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const grantType = localStorage.getItem('grantType');

  if (!accessToken) {
    throw new Error('인증 토큰이 없습니다. 다시 로그인해주세요.');
  }

  const response = await instance.get('/accounts/', {
    headers: {
      'Authorization': `${grantType} ${accessToken}`,
    },
  });
  
  return response.data;
};