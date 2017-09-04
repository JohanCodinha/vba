import axios from 'axios';

const apiUrl = 'https://vbago.science/vbapi'; // 'http://localhost:3031';

export const login = (username, password) => axios
  .post(`${apiUrl}/auth`, {
    username,
    password,
  })
  .then(res => res.data)
  .catch(error => console.log(error.message));

export const guestLogin = () => axios
  .get(`${apiUrl}/auth/guest`)
  .then(res => res.data.jwt)
  .catch(error => console.log(error.message));

export const postObservation = (formData, jwt) => axios
  .post(`${apiUrl}/record`, formData, {
    headers: { 'x-access-token': jwt },
  });

export const deleteSurvey = (surveyId, jwt) => axios
  .delete(`${apiUrl}/surveys/${surveyId}`, {
    headers: { 'x-access-token': jwt },
  })
  .then(res => res.data)
  .catch(error => console.log(error.message));

export const getGeneralObservation = jwt => axios
  .get(`${apiUrl}/search/userObservations`, {
    headers: { 'x-access-token': jwt },
  })
  .then(res => res.data)
  .catch(error => console.log(error.message));

export const getMethods = (surveyId, jwt) => axios
  .get(`${apiUrl}/surveys/${surveyId}/methods`, {
    headers: { 'x-access-token': jwt },
  })
  .then(res => res.data)
  .catch(error => console.log(error.message));

export const getMethodsSpecies = (methodId, jwt) => axios
  .get(`${apiUrl}/methods/${methodId}/species`, {
    headers: { 'x-access-token': jwt },
  })
  .then(res => res.data)
  .catch(error => console.log(error.message));

export const getSpeciesMedia = (specieId, jwt) => axios
  .get(`${apiUrl}/species/${specieId}/media`, {
    headers: { 'x-access-token': jwt },
  })
  .then(res => res.data)
  .catch(error => console.log(error.message));

export const searchSpecies = (position, token) => axios
  .get(`${apiUrl}/search/point`, {
    headers: { 'x-access-token': token },
    params: position,
  })
  .then(res => res.data.records)
  .catch(error => console.log(error.message));

export const specieRecords = (position, taxonId, token) => axios
  .get(`${apiUrl}/search/point`, {
    headers: { 'x-access-token': token },
    params: Object.assign({}, position, { detail: true, taxonId }),
  })
  .then(res => res.data.records)
  .catch(error => console.log(error.message));
