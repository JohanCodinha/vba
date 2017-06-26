import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import imgagePicker from '@/components/imagePicker';
import speciePicker from '@/components/speciePicker';
import generalObservation from '@/components/generalObservation';
import locationPicker from '@/components/locationPicker';

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
      props: true,
    },
    {
      path: '/location',
      name: 'LocationPicker',
      component: locationPicker,
    },
    {
      path: '/generalObs',
      name: 'GeneralObs',
      component: generalObservation,
    },
  ],
});
