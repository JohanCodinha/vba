import Vue from 'vue';
import Vuex from 'vuex';
import newObservations from './modules/newObservations';
import observations from './modules/observations';
import account from './modules/account';
import explore from './modules/explore';
// import * as getters from './getters';
// import * as actions from './actions';
// import mutations from './mutations';

Vue.use(Vuex);

const state = {
  // state
};
const store = new Vuex.Store({
  state,
  // actions,
  // mutations,
  // getters,
  modules: {
    account,
    observations,
    newObservations,
    explore,
  },
});
export default store;
