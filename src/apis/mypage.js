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

export const getReceivedRequests = async (order = 'enddate') => {
  const accessToken = localStorage.getItem('accessToken');
  const grantType = localStorage.getItem('grantType');

  if (!accessToken) {
    throw new Error('인증 토큰이 없습니다. 다시 로그인해주세요.');
  }

  const response = await instance.get('/accounts/my-receive-request', {
    headers: {
      'Authorization': `${grantType} ${accessToken}`,
    },
    // API 요청 시 쿼리 파라미터를 함께 보냅니다.
    params: {
      order: order,
    },
  });
  
  return response.data;
};

export const getJoinedRequests = async (order = 'newest') => {
  const accessToken = localStorage.getItem('accessToken');
  const grantType = localStorage.getItem('grantType');

  if (!accessToken) {
    throw new Error('인증 토큰이 없습니다. 다시 로그인해주세요.');
  }

  const response = await instance.get('/accounts/my-join-request', {
    headers: {
      'Authorization': `${grantType} ${accessToken}`,
    },
    params: {
      order: order,
    },
  });
  
  return response.data;
};