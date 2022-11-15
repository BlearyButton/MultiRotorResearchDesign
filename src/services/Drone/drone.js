import api from '../api';

const getDronesByUserId = () =>
  api
    .get('/drones')
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data));

const DroneService = {
  getDronesByUserId,
};

export default DroneService;
