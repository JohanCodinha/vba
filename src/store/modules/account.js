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
  status: null,
};

const getters = {
  isLogin: (state) => {
    const { jwt, timestamp } = state.jwt;
    const thirtyMinutes = 30 * 60 * 1000;
    const jwtUnder30Min = ((new Date()) - timestamp) < thirtyMinutes;
    return (jwt !== null && jwtUnder30Min);
  },
  displayName: state => state.displayName,
  status: state => state.status,
};

const actions = {
  async fetchToken ({ commit }, { username, password }) {
    try {
      const { jwt, userUid, displayName } = await login(username, password);
      commit(types.STATUS, { message: 'Login successful' });
      commit(types.SAVE_TOKEN, jwt);
      commit(types.SAVE_USER_INFO, { userUid, displayName });
    } catch (error) {
      const message = error.response.data.message;
      commit(types.STATUS, { message });
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
  [types.STATUS] (state, { message }) {
    Vue.set(state, 'status', message);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
