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
  const images = observation.images;
  const { latitude, longitude } = observation.position;
  const { commonName, scientificName, taxonId } = observation.taxonomy;
  const { count, extraInfoCode, datetime } = observation;

  const formData = new FormData();
  images.forEach(image => formData.append('images', image));
  formData.append('latitude', latitude);
  formData.append('longitude', longitude);
  formData.append('commonName', commonName);
  formData.append('scientificName', scientificName);
  formData.append('taxonId', taxonId);
  formData.append('count', count);
  formData.append('dateTime', datetime);
  formData.append('extraInfoCode', extraInfoCode);
  debugger;
  return axios.post(`${apiUrl}/record`, formData, {
    headers: { 'x-access-token': jwt },
  })
    .then(res => console.log(res));
};
