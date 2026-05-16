import api from './axiosInstance';

export const reviewApi = {
  getAll: () => api.get('/reviews'),
  getByBusiness: (businessId) => api.get(`/reviews/business/${businessId}`),
  getById: (id) => api.get(`/reviews/${id}`),
  create: (data) => api.post('/reviews', data),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
};
