/* eslint-disable no-unused-vars */
/* global onmessage:true */
import Exif from 'exif-js';

onmessage = function workerTriger (message) {
  if (message.devtoolsEnabled) return;
  console.log('Message received from main script');
  Exif.getData(message.data, function exifData () {
    const latitude = Exif.getTag(this, 'GPSLatitude');
    const latitudeRef = Exif.getTag(this, 'GPSLatitudeRef');
    const longitude = Exif.getTag(this, 'GPSLongitude');
    const longitudeRef = Exif.getTag(this, 'GPSLongitudeRef');
    const datetime = Exif.getTag(this, 'DateTimeOriginal');
    console.log('from worker :');
    console.log(latitude, longitude, datetime);
    postMessage({ latitude, latitudeRef, longitude, longitudeRef, datetime });
  });
};

// export default self;
