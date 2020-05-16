import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async credentials => {
  const response = await axios.post(baseUrl, credentials, {
    headers: { Authorization: token },
  });
  return response.data;
};

export default { setToken, getAll, create };
