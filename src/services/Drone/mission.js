import api from '../api';

const getMissions = () =>
  api
    .get('/missions')
    .then((res) => res)
    .catch((err) => Promise.reject(err.response.data));

const saveMission = (mission) =>
  api
    .post(`/missions`, mission)
    .then((res) => res)
    .catch((err) => Promise.reject(err.response.data));

const updateMission = (mission) =>
  api
    .put(`/missions/${mission.id}`, mission)
    .then((res) => res)
    .catch((err) => Promise.reject(err.response.data));

const removeMission = (missionId) =>
  api
    .delete(`/missions/${missionId}`)
    .then((res) => res)
    .catch((err) => Promise.reject(err.response.data));

const MissionService = {
  getMissions,
  saveMission,
  updateMission,
  removeMission,
};

export default MissionService;
