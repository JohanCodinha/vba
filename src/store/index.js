import Vue from 'vue';
import Vuex from 'vuex';
import observations from './modules/observations';
import account from './modules/account';
// import * as getters from './getters';
import * as actions from './actions';
// import mutations from './mutations';

Vue.use(Vuex);

const state = {
  // state
};
const store = new Vuex.Store({
  state,
  actions,
  // mutations,
  // getters,
  modules: {
    account,
    observations,
  },
});
export default store;
