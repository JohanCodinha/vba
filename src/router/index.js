import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import imgagePicker from '@/components/imagePicker';
import speciePicker from '@/components/speciePicker';
import generalObservation from '@/components/generalObservation';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/img',
      name: 'ImagePicker',
      component: imgagePicker,
    },
    {
      path: '/search',
      name: 'SpeciePicker',
      component: speciePicker,
    },
    {
      path: '/generalObs',
      name: 'GeneralObs',
      component: generalObservation,
    },
  ],
});
