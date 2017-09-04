/* eslint-disable no-shadow */
import Vue from 'vue';
import { get } from 'lodash';
import { guestLogin, searchSpecies } from '@/api/vbapi';
import * as types from '../mutations-types';

const state = {
  jwt: {
    value: null,
    timestamp: null,
  },
  position: {},
  searchRadius: 250,
  status: {
    searched: false,
    error: null,
  },
  species: [],
};

// getters
const getters = {
  accesToken: (state) => {
    const token = state.jwt;
    if (token && (Date.now() - token.timestamp) < (28 * 60 * 1000)) {
      console.log(`Token aged : ${(Date.now() - token.timestamp) / 1000}s requested`);
      return token.value;
    }
    return false;
  },
  token: (state) => {
    const token = state.token;
    return token;
  },
  searchArea: (state) => {
    const position = state.position;
    if (position.latitude || position.longitude) {
      return {
        lat: position.latitude,
        long: position.longitude,
        rad: state.searchRadius,
      };
    }
    return false;
  },
  species: state => state.species,
  status: state => state.status,
};

const actions = {
  async FETCH_TOKEN ({ commit }) {
    const jwt = await guestLogin();
    console.log(jwt);
    commit(types.SAVE_TOKEN, jwt);
    return !!jwt;
  },
  GET_POSITION ({ commit }) {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        reject(new Error("Device doesn't support geolocation"));
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const accuracy = pos.coords.accuracy;
          const latitude = pos.coords.latitude;
          const longitude = pos.coords.longitude;
          console.log(`Position aquired, accuracy : ${pos.coords.accuracy}`);
          resolve({ accuracy, latitude, longitude });
        },
        (err) => {
          // On error default to set location.
          console.log(new Error(err.message));
          resolve({
            accuracy: '12',
            latitude: '-36.731842',
            longitude: '147.812758',
          });
        }, options);
    })
      .then(position => commit(types.SET_POSITION, position))
      .catch(error => console.log(error));
  },

  async searchSpecies ({ commit, getters, dispatch }) {
    if (!getters.accesToken) {
      await dispatch('FETCH_TOKEN');
    }
    if (!getters.searchArea) {
      await dispatch('GET_POSITION');
    }
    const token = getters.accesToken;
    const searchArea = getters.searchArea;
    if (!token || !searchArea) {
      throw new Error('Search could not be perform, missing search parameters and/or token');
    }
    return searchSpecies(searchArea, token)
      .then((species) => {
        commit(types.UPDATE_STATUS, { searched: true });
        if (!species) {
          return new Error('No species found at location');
        }
        commit(types.CLEAR_AROUND_SPECIES);
        species.forEach((specie) => {
          if (get(specie, 'countOfSightings') > 0) {
            commit(types.ADD_SPECIE, specie);
            console.log(specie);
          }
        });
        return species.length;
      })
      .catch(error => console.log(error));
  },
  async fetchSpecies ({ commit }) {
    console.log('fetciiing');

    commit();
  },
};

const mutations = {
  [types.SAVE_TOKEN] (state, token) {
    const jwt = {
      value: token,
      timestamp: new Date(),
    };
    Vue.set(state, 'jwt', jwt);
  },
  [types.SET_POSITION] (state, { latitude, longitude, accuracy }) {
    const timestamp = Date.now();
    const previousLat = state.position.latitude;
    const previousLon = state.position.longitude;
    const previousAccu = state.position.accuracy;

    const position = {
      latitude: latitude || previousLat,
      longitude: longitude || previousLon,
      accuracy: accuracy || previousAccu,
      timestamp,
    };

    Vue.set(state, 'position', position);
  },
  [types.ADD_SPECIE] (state, specie) {
    state.species.push(specie);
  },
  [types.CLEAR_AROUND_SPECIES] (state) {
    Vue.set(state, 'species', []);
  },
  [types.UPDATE_STATUS] (state, statusUpdate) {
    const newStatus = Object.assign({}, state.status, statusUpdate);
    Vue.set(state, 'status', newStatus);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
