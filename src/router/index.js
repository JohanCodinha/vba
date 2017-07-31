import Vue from 'vue';
import Router from 'vue-router';
import obsList from '@/views/obsList/obsList';
import imgagePicker from '@/views/components/imagePicker';
import speciePicker from '@/views/components/speciePicker';
import generalObservation from '@/views/components/generalObservation';
import locationPicker from '@/views/components/locationPicker';
import survey from '@/views/survey/survey';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'obsList',
      component: obsList,
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
    {
      path: '/survey/:surveyId',
      name: 'survey',
      component: survey,
      props: true,
    },
  ],
});
