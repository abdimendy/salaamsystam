import api from './axiosInstance';

export const uploadApi = {
  uploadBusinessImage: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload/business-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
