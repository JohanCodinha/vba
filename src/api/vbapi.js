import axios from 'axios';

const apiUrl = 'http://localhost:3000';

export const login = (username, password) => axios
  .post(`${apiUrl}/auth`, {
    username,
    password,
  })
  .then(res => res.data)
  .catch(error => console.log(error.message));

export const postObservation = (formData, jwt) => {
  console.log(formData);
  return axios.post(`${apiUrl}/record`, formData, {
    headers: { 'x-access-token': jwt },
  });
};
