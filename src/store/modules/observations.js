/* eslint-disable no-shadow */
import Vue from 'vue';
import { getGeneralObservation, deleteSurvey } from '@/api/vbapi';
import { SAVE_GENERAL_OBS, DELETE_SURVEY } from '../mutations-types';

// initial state
const state = {
  general: [],
};

// Getters
const getters = {
  general: state => state.general,
};

// Actions
const actions = {
  async getGeneralObs ({ rootState, commit }) {
    try {
      const jwt = rootState.account.jwt.value;
      const { records } = await getGeneralObservation(jwt);
      commit(SAVE_GENERAL_OBS, records);
    } catch (error) {
      console.log(error);
    }
  },

  async deleteSurvey ({ rootState, commit }, surveyId) {
    try {
      const jwt = rootState.account.jwt.value;
      const { deletedSurveyId } = await deleteSurvey(surveyId, jwt);
      commit(DELETE_SURVEY, Number(deletedSurveyId));
    } catch (error) {
      console.log(error);
    }
  },
};

// mutations
const mutations = {
  [SAVE_GENERAL_OBS] (state, records) {
    state.general.push(...records);
  },
  [DELETE_SURVEY] (state, surveyId) {
    const newState = state.general.filter(record => record.surveyId !== surveyId);
    Vue.set(state, 'general', newState);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
