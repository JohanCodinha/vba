import axios from 'axios';

const apiUrl = 'http://localhost:3000';

export const login = (username, password) => axios
  .post(`${apiUrl}/auth`, {
    username,
    password,
  })
  .then(res => res.data)
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
