import apiClient from './apiClient';

export const getProfile = async (email) => {
  const response = await apiClient.get('/profile', { params: { email } });
  return response.data;
};

export const updateProfile = async (profile) => {
  const response = await apiClient.put('/profile', profile);
  return response.data;
};
