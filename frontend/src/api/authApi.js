import apiClient from './apiClient';

const getAuthData = (response) => {
  const data = response.data?.data ?? response.data;
  if (!data?.token) {
    throw new Error(response.data?.message || 'Authentication response did not include a token.');
  }
  return data;
};

export const loginApi = async (email, password) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return getAuthData(response);
};

export const registerApi = async (name, email, password) => {
  const response = await apiClient.post('/auth/register', { name, email, password });
  return getAuthData(response);
};