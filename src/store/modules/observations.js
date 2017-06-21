/* eslint-disable no-shadow */
/* eslint-disable */
import Exif from 'exif-js';
// import vbaSpecies from '../../api/vbaSpecies';
import * as types from '../mutations-types';

// initial state
const state = {
  drafts: [],
};

// getters
const getters = {
  // allProducts: state => state.all
  allDrafts: state => state.drafts,
};

// actions
const actions = {
  getCoordinates ({ commit }, file) {
    // return new Promise((resolve, reject) => {
    function getExif (image) {
      return new Promise((resolve, reject) => {
        if (window.Worker) {
          // eslint-disable-next-line
          const ExifWorker = require('worker-loader?inline!./worker.js');
          const worker = new ExifWorker();
          worker.onmessage = function workerResponse (e) {
            console.log(e.data);
            resolve(e.data);
            // debugger;
          };
          worker.onerror = function workerError (e) {
            console.log(e);
            // debugger;
          };
          return worker.postMessage(file);
        }
        return Exif.getData(image, function exifData () {
          const latitude = Exif.getTag(this, 'GPSLatitude');
          const latitudeRef = Exif.getTag(this, 'GPSLatitudeRef');
          const longitude = Exif.getTag(this, 'GPSLongitude');
          const longitudeRef = Exif.getTag(this, 'GPSLongitudeRef');
          const datetime = Exif.getTag(this, 'DateTimeOriginal');
          if (typeof longitude === 'undefined'
            || typeof latitude === 'undefined') reject(new Error('no gps data found in exif'));
          resolve({ latitude, latitudeRef, longitude, longitudeRef, datetime });
        });
      });
    }
    function ConvertDMSToDD (degrees, minutes, seconds, direction) {
      // [Number, Number, Number] to [123, -456, 789]
      const dd = Number(degrees)
        + Number(minutes) / 60
        + Number(seconds) / (60 * 60);
      if (direction === 'S' || direction === 'W') {
        return dd * -1;
      } // Don't do anything for N or E
      return dd;
    }
    function formatDate (exifDate) {
      const [date, time] = [...exifDate.split(' ')];
      return `${date.replace(/:/g, '-')}T${time}`;
    }
    console.time('getExif');
    return getExif(file)
      .then(({ latitude, latitudeRef, longitude, longitudeRef, datetime }) => {
        console.timeEnd('getExif');
        const ddLatitude = ConvertDMSToDD(
          ...latitude.map(n => n.valueOf()), latitudeRef);
        const ddLongitude = ConvertDMSToDD(
          ...longitude.map(n => n.valueOf()), longitudeRef);
        const datetimeString = formatDate(datetime);
        return { ddLatitude, ddLongitude, datetimeString };
      }).catch((error) => {
        console.log(error);
      });
  },
  createObservation ({ commit }) {
    function generateId () {
      return Date.now();
    }
    const id = generateId();
    commit(types.CREATE_OBSERVATION, id);
    return id;
  },
  addImage ({ commit }, { image, obsId }) {
    commit('SAVE_IMAGE', { image, obsId });
  },
  selectSpecie ({ commit }, { specie, obsId }) {
    console.log(specie);
    commit('SELECT_SPECIE', { specie, obsId });
  },
};

// mutations
const mutations = {
  [types.CREATE_OBSERVATION] (state, id) {
    const observation = {
      id,
      images: [],
      taxonomy: {
        taxonId: undefined,
        commonName: undefined,
        scientificName: undefined,
      },
    };
    state.drafts.push(observation);
  },
  [types.SAVE_IMAGE] (state, { image, obsId }) {
    const observation = state.drafts.find(obs => obs.id === obsId);
    // debugger;
    observation.images.push(image);
  },
  [types.SELECT_SPECIE] (state, { specie, obsId }) {
    const observation = state.drafts.find(obs => obs.id === obsId);
    // debugger;
    observation.taxonomy.taxonId = specie.TAXON_ID;
    observation.taxonomy.commonName = specie.COMMON_NAME
      ? specie.COMMON_NAME
      : undefined;
    observation.taxonomy.scientificName = specie.SCIENTIFIC_NAME
      ? specie.SCIENTIFIC_NAME
      : undefined;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
