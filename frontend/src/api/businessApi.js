import api from './axiosInstance';

export const businessApi = {
  getAll: () => api.get('/businesses'),
  getFeatured: (count = 6) => api.get('/businesses/featured', { params: { count } }),
  search: ({ name, categoryId, city, page = 1, pageSize = 12 }) =>
    api.get('/businesses/search', { params: { name, categoryId, city, page, pageSize } }),
  getById: (id) => api.get(`/businesses/${id}`),
  create: (data) => api.post('/businesses', data),
  update: (id, data) => api.put(`/businesses/${id}`, data),
  delete: (id) => api.delete(`/businesses/${id}`),
};
