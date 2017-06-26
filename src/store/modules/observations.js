/* eslint-disable no-shadow */
// import vbaSpecies from '../../api/vbaSpecies';
import Vue from 'vue';
import * as types from '../mutations-types';
// initial state
const state = {
  drafts: [],
  activeDraft: null,
};

// getters
const getters = {
  // allProducts: state => state.all
  allDrafts: state => state.drafts,
  activeDraft: (state) => {
    const ad = state.drafts.find(draft => draft.id === state.activeDraft);
    return ad;
  },
};

// actions
const actions = {
  hydrateImageMetadata ({ commit }, { image, obsId }) {
    // return new Promise((resolve, reject) => {
    function getExif (image) {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line
        const ExifWorker = require('worker-loader?inline!./worker.js');
        const worker = new ExifWorker();
        worker.onmessage = function workerResponse (e) {
          console.log(e.data);
          resolve(e.data);
        };
        worker.onerror = function workerError (e) {
          reject(e);
        };
        worker.postMessage(image);
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
    return getExif(image)
      .then(({ latitude, latitudeRef, longitude, longitudeRef, datetime }) => {
        console.timeEnd('getExif');
        const ddLatitude = latitude
          ? ConvertDMSToDD(...latitude.map(n => n.valueOf()), latitudeRef)
          : null;
        const ddLongitude = longitude
          ? ConvertDMSToDD(...longitude.map(n => n.valueOf()), longitudeRef)
          : null;
        const datetimeString = datetime
          ? formatDate(datetime)
          : null;
        // if (latitude)
        const metadata = {
          latitude: ddLatitude,
          longitude: ddLongitude,
          datetime: datetimeString,
          obsId,
        };
        commit('HYDRATE_IMAGE', metadata);
        return metadata;
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
  setActiveDraft ({ commit }, { obsId }) {
    commit('SET_ACTIVE_DRAFT', { obsId });
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
      // position: null,
    };
    state.drafts.push(observation);
  },
  [types.SAVE_IMAGE] (state, { image, obsId }) {
    const observation = state.drafts.find(obs => obs.id === obsId);
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
  [types.HYDRATE_IMAGE] (state, { latitude, longitude, datetime, obsId }) {
    const observation = state.drafts.find(obs => obs.id === obsId);
    Vue.set(observation, 'datetime', datetime);
    Vue.set(observation, 'position', {
      latitude,
      longitude,
    });
  },
  [types.SET_ACTIVE_DRAFT] (state, { obsId }) {
    state.activeDraft = obsId; // eslint-disable-line no-param-reassign
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
