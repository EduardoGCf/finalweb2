import axios from './axiosInstance';

const municipalitiesAPI = {
  getAll: async () => {
    const res = await axios.get('/municipalities');
    return res.data;
  },
  create: async (data, token) => {
    const res = await axios.post('/municipalities', data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
};

export default municipalitiesAPI;
