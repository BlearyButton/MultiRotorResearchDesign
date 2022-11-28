import axios from 'axios';
// import CustomHistory from '../custom/CustomHistory';
import TokenService from './token.service';

const instance = axios.create({
  baseURL: 'https://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = TokenService.getLocalAccessToken();

    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// if (!TokenService.getLocalAccessToken() && window.location.pathname !== '/login') {
//   CustomHistory.replace('/login');
//   CustomHistory.go(0);
// }

// instance.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     if (err.response) {
//       // Access Token was expired
//       if (err.response.status === 401) {
//         CustomHistory.replace('/login');
//       }
//     }

//     return Promise.reject(err);
//   }
// );

export default instance;
