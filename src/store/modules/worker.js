/* eslint-disable no-unused-vars */
/* global onmessage:true */
import Exif from 'exif-js';

onmessage = function workerTriger (e) {
  if (e.data.devtoolsEnabled) return;
  console.log('Message received from main script');
  const workerResult = e.data;
  console.log(Exif);
  Exif.getData(e.data, function exifData () {
    const latitude = Exif.getTag(this, 'GPSLatitude');
    const latitudeRef = Exif.getTag(this, 'GPSLatitudeRef');
    const longitude = Exif.getTag(this, 'GPSLongitude');
    const longitudeRef = Exif.getTag(this, 'GPSLongitudeRef');
    const datetime = Exif.getTag(this, 'DateTimeOriginal');
    if (typeof longitude === 'undefined'
    || typeof latitude === 'undefined') throw new Error('no gps data found in exif');
    postMessage({ latitude, latitudeRef, longitude, longitudeRef, datetime });
  });
};

// export default self;
