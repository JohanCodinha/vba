import axios from 'axios';

const apiUrl = 'http://localhost:3000';

export const login = () => axios
  .post(`${apiUrl}/auth`, {
    username: 'codeforvic',
    password: 19910908,
  })
  .then(res => res.data.jwt)
  .catch(error => console.log(error.message));

export const uploadObservation = (observation, jwt) => {
  const file = observation.images[0];
  const formData = new FormData();
  formData.append('commonName', observation.taxonomy.commonName);
  formData.append('images', file);
  // debugger;
  axios.post(`${apiUrl}/record`, formData, {
    headers: { 'x-access-token': jwt },
  })
  .then(res => console.log(res));
};
