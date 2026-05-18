import apiClient from './apiClient';

export const saveChantingSession = async (mantra, malas, timeSpentSeconds) => {
    const response = await apiClient.post('/chanting/save', {
        mantra,
        malas,
        timeSpentSeconds
    });
    return response.data;
};

export const getChantingStats = async () => {
    const response = await apiClient.get('/chanting/stats');
    return response.data;
};

export const getTodayChanting = async () => {
    const response = await apiClient.get('/chanting/today');
    return response.data;
};

export const getChantingHistory = async () => {
    const response = await apiClient.get('/chanting/history');
    return response.data;
};