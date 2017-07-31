import axios from 'axios';

import mapboxToken from './token';

const apiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
/* eslint-disable import/prefer-default-export */
export const reverseGeocoding = (longitude, latitude) => {
  console.log(`reverse geocoding for ${longitude}, ${latitude}`);
  const qs = `${longitude}%2C${latitude}.json?access_token=${mapboxToken}`;
  return axios.get(`${apiUrl}/${qs}`)
    .then(response => response.data);
};

