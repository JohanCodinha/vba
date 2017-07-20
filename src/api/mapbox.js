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

// https://api.mapbox.com/geocoding/v5/mapbox.places/145.13034%20%2C%20-38.51631.json?access_token=pk.eyJ1IjoicGFuZWx2dyIsImEiOiJjaW56cmlxaTcxOTk1dTJtM3F2aGE3Y25mIn0.bKj9LERNGK-5royXLrqthg
