import api from './axiosInstance';

function triggerDownload(blob, filename) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

export const pdfApi = {
  downloadBusiness: async (id, filename = `business-${id}.pdf`) => {
    const { data } = await api.get(`/pdf/business/${id}`, { responseType: 'blob' });
    triggerDownload(data, filename);
    return data;
  },
  downloadReport: async (filename = 'yellowbook-report.pdf') => {
    const { data } = await api.get('/pdf/report', { responseType: 'blob' });
    triggerDownload(data, filename);
    return data;
  },
};
