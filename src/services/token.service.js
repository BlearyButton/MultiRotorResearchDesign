const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token;
};

const updateLocalAccessToken = (token) => {
  const user = JSON.parse(localStorage.getItem('user'));
  user.token = token;
  localStorage.setItem('user', JSON.stringify(user));
};

const removeLocalAccessToken = () => {
  localStorage.setItem('user', null);
};

const getUser = () => JSON.parse(localStorage.getItem('user'));

const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem('user');
};

const TokenService = {
  getLocalAccessToken,
  updateLocalAccessToken,
  removeLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;
