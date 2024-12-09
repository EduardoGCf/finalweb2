
import axios from './axiosInstance';

const incidentsAPI = {
  getAll: async () => {
    const res = await axios.get('/incidents');
    return res.data;
  },
  create: async (formData) => {
    const res = await axios.post('/incidents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  },
  delete: async (id) => {
    const res = await axios.delete(`/incidents/${id}`);
    return res.data;
  }
};

export default incidentsAPI;
