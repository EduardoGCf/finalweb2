import axios from './axiosInstance';

const roadsAPI = {
  getAll: async () => {
    const res = await axios.get('/roads');
    return res.data;
  },
  getById: async (id) => {
    const res = await axios.get(`/roads/${id}`);
    return res.data;
  },
  create: async (road, token) => {
    const res = await axios.post('/roads', road, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
};

export default roadsAPI;
