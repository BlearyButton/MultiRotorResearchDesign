import api from './api';

const login = (email, password) =>
  api
    .post('/auth/login', { email, password })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response.data));

const AuthService = {
  login,
};

export default AuthService;
