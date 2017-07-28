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
      path: '/img/:observationId',
      name: 'ImagePicker',
      component: imgagePicker,
    },
    {
      path: '/search/:observationId',
      name: 'SpeciePicker',
      component: speciePicker,
      props: true,
    },
    {
      path: '/location/:observationId',
      name: 'LocationPicker',
      component: locationPicker,
      props: true,

    },
    {
      path: '/generalObs/:observationId?',
      name: 'GeneralObs',
      component: generalObservation,
      props: true,
    },
  ],
});
