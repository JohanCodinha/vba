import { postObservation } from '@/api/vbapi';

/* eslint-disable import/prefer-default-export */
export const uploadObservation = async ({ state }, { observation }) => {
  const jwt = state.account.jwt.value;
  const images = observation.images;
  const { latitude, longitude, accuracy } = observation.position;
  const { commonName, scientificName, taxonId } = observation.taxonomy;
  const { count, extraInfoCode, datetime } = observation;

  const formData = new FormData();
  images.forEach(image => formData.append('images', image));
  formData.append('latitude', latitude);
  formData.append('longitude', longitude);
  formData.append('accuracy', accuracy);
  formData.append('commonName', commonName);
  formData.append('scientificName', scientificName);
  formData.append('taxonId', taxonId);
  formData.append('count', count);
  formData.append('dateTime', datetime);
  formData.append('extraInfoCode', extraInfoCode);
  try {
    const uploadResponse = await postObservation(formData, jwt);
    console.log(uploadResponse);
  } catch (error) {
    console.log(error);
  }
};
