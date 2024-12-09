import axios from './axiosInstance';

const usersAPI = {
  getAll: async (token) => {
    const res = await axios.get('/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },
  create: async (user, token) => {
    const res = await axios.post('/users', user, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
};

export default usersAPI;
