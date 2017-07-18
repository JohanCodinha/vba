/* eslint-disable no-shadow */
import Vue from 'vue';
import { login } from '@/api/vbapi';
import * as types from '../mutations-types';

const state = {
  jwt: {
    value: null,
    timestamp: null,
  },
  displayName: null,
  userUid: null,
};

// getters
const getters = {
  isLogin: (state) => {
    const { jwt, timestamp } = state.jwt;
    const thirtyMinutes = 30 * 60 * 1000;
    const jwtUnder30Min = ((new Date()) - timestamp) < thirtyMinutes;
    return (jwt !== null && jwtUnder30Min);
  },
  displayName: state => state.displayName,
};

const actions = {
  async fetchToken ({ commit }, { username, password }) {
    try {
      const { jwt, userUid, displayName } = await login(username, password);
      commit('SAVE_TOKEN', jwt);
      commit('SAVE_USER_INFO', { userUid, displayName });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
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
  [types.SAVE_USER_INFO] (state, { userUid, displayName }) {
    Vue.set(state, 'displayName', displayName);
    Vue.set(state, 'userUid', userUid);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
