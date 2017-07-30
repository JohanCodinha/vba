import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/views/obsList/obsList';
import imgagePicker from '@/views/components/imagePicker';
import speciePicker from '@/views/components/speciePicker';
import generalObservation from '@/views/components/generalObservation';
import locationPicker from '@/views/components/locationPicker';

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
