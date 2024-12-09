
import axios from './axiosInstance';

const incidentRequestsAPI = {
  getAll: async (token) => {
    const res = await axios.get('/incident-requests', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },
  approve: async (id, token) => {
    const res = await axios.post(`/incident-requests/${id}/approve`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },
  reject: async (id, token) => {
    const res = await axios.post(`/incident-requests/${id}/reject`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
};

export default incidentRequestsAPI;
