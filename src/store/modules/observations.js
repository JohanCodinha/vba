/* eslint-disable no-shadow */
import Vue from 'vue';
import { reverseGeocoding } from '@/api/mapbox';
import * as types from '../mutations-types';

// initial state
const state = {
  drafts: [],
};

// Getters
const getters = {
  allDrafts: state => state.drafts,
  activeDraft: (state) => {
    const ad = state.drafts.find(draft => draft.id === state.activeDraftId);
    return ad;
  },
};

// Actions
const actions = {
  async saveLocation ({ commit }, { latitude, longitude, accuracy, obsId }) {
    commit('SAVE_LOCATION', { latitude, longitude, accuracy, obsId });
    try {
      const place = await reverseGeocoding(longitude, latitude);
      const description = place.features[0].place_name;
      if (description) {
        commit(types.SAVE_LOCATION_DESCRIPTION, { description, obsId });
      }
    } catch (error) {
      console.log(error);
    }
  },
  setCount ({ commit }, { count, obsId }) {
    commit('SET_COUNT', { count, obsId });
  },
  hydrateImageMetadata ({ commit, dispatch }, { image, obsId }) {
    function getExif (image, tags) {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line
        const ExifWorker = require('worker-loader?inline!./worker.js');
        const worker = new ExifWorker();
        worker.onmessage = message => resolve(message.data);
        worker.onerror = message => reject(message);
        worker.postMessage({ image, tags });
      });
    }
    function ConvertDMSToDD (degrees, minutes, seconds, direction) {
      if (typeof degrees !== 'number'
        || typeof minutes !== 'number'
        || typeof seconds !== 'number') return undefined;
      const dd = degrees
        + minutes / 60
        + seconds / (60 * 60);
      if (direction === 'S' || direction === 'W') {
        return dd * -1;
      } // Don't do anything for N or E
      return dd;
    }
    function formatDate (exifDate) {
      const [date, time] = [...exifDate.split(' ')];
      return `${date.replace(/:/g, '-')}T${time}`;
    }
    const tags = {
      latitude: 'GPSLatitude',
      latitudeRef: 'GPSLatitudeRef',
      longitude: 'GPSLongitude',
      longitudeRef: 'GPSLongitudeRef',
      datetime: 'DateTimeOriginal',
      positioningError: 'GPSHPositioningError',
      dilutionOfPrecision: 'GPSDOP',
    };
    console.time('getExif');
    return getExif(image, tags)
      .then(({ latitude, latitudeRef, longitude, longitudeRef, datetime,
        positioningError, dilutionOfPrecision }) => {
        console.timeEnd('getExif');
        const ddLatitude = ConvertDMSToDD(...latitude, latitudeRef);
        const ddLongitude = ConvertDMSToDD(...longitude, longitudeRef);
        const datetimeString = datetime
          ? formatDate(datetime)
          : null;
        const accuracy = positioningError || dilutionOfPrecision;
        dispatch('saveLocation', {
          latitude: ddLatitude,
          longitude: ddLongitude,
          accuracy,
          obsId,
        });
        commit(types.SET_DATETIME, { datetime: datetimeString, obsId });
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
  setExtraInfo ({ commit }, { code, obsId }) {
    commit('SET_EXTRA_CODE', { code, obsId });
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
      position: {},
    };
    state.drafts.push(observation);
  },
  [types.SAVE_IMAGE] (state, { image, obsId }) {
    const observation = state.drafts.find(obs => obs.id === obsId);
    observation.images.push(image);
  },
  [types.SELECT_SPECIE] (state, { specie, obsId }) {
    const observation = state.drafts.find(obs => obs.id === obsId);
    observation.taxonomy.taxonId = specie.TAXON_ID;
    observation.taxonomy.commonName = specie.COMMON_NAME
      ? specie.COMMON_NAME
      : undefined;
    observation.taxonomy.scientificName = specie.SCIENTIFIC_NAME
      ? specie.SCIENTIFIC_NAME
      : undefined;
  },
  [types.SET_DATETIME] (state, { datetime, obsId }) {
    const observation = state.drafts.find(obs => obs.id === obsId);
    Vue.set(observation, 'datetime', datetime);
  },
  [types.SET_ACTIVE_DRAFT] (state, { obsId }) {
    Vue.set(state, 'activeDraftId', obsId);
  },
  [types.SAVE_LOCATION] (state, { latitude, longitude, accuracy, obsId }) {
    const observation = state.drafts.find(obs => obs.id === obsId);
    Vue.set(observation, 'position', {
      latitude,
      longitude,
      accuracy,
    });
  },
  [types.SAVE_LOCATION_DESCRIPTION] (state, { description, obsId }) {
    const observation = state.drafts.find(obs => obs.id === obsId);
    Vue.set(observation.position, 'description', description);
  },
  [types.SET_COUNT] (state, { count, obsId }) {
    const observation = state.drafts.find(obs => obs.id === obsId);
    Vue.set(observation, 'count', count);
  },
  [types.SET_EXTRA_CODE] (state, { code, obsId }) {
    const observation = state.drafts.find(obs => obs.id === obsId);
    Vue.set(observation, 'extraInfoCode', code);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
