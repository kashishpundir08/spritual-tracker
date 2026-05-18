import apiClient from './apiClient';

export const addCustomMantra = async (mantra, language) => {
    const response = await apiClient.post('/mantras/add', { mantra, language });
    return response.data;
};

export const getCustomMantras = async () => {
    const response = await apiClient.get('/mantras/list');
    return response.data;
};

export const deleteCustomMantra = async (id) => {
    const response = await apiClient.delete(`/mantras/delete/${id}`);
    return response.data;
};