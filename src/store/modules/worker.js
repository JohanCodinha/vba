/* eslint-disable no-unused-vars */
/* global onmessage:true */
import Exif from 'exif-js';

onmessage = function workerTriger (message) {
  if (message.devtoolsEnabled) return;
  const image = message.data.image;
  const tags = message.data.tags;
  console.log('Message received from main script');
  Exif.getData(image, function exifData () {
    const tagsValues = {};
    Object.keys(tags).forEach((key) => {
      const tagValue = Exif.getTag(this, tags[key]);
      if (Array.isArray(tagValue)) {
        tagsValues[key] = tagValue.map(cell => Number(cell) || cell);
      } else {
        tagsValues[key] = Number(tagValue) || tagValue;
      }
    });
    postMessage(tagsValues);
  });
};
