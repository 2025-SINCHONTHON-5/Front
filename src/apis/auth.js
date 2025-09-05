import instance from './axios';

export const login = async (email, password) => {
    const response = await instance.post('/accounts/login', { 
        email: email, 
        password: password 
    });
    return response.data;
};