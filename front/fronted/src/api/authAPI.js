import axios from './axiosInstance';

const authAPI = {
  register: async (email, password) => {
    const res = await axios.post('/auth/register', { email, password });
    return res.data;
  },
  login: async (email, password) => {
    const res = await axios.post('/auth/login', { email, password });
    return res.data;
  }
};

export default authAPI;
