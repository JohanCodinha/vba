<template>
  <div class="hello">
    <h1>{{generalObs.length}} saved observations</h1>
    <ul>
      <observation-card v-for="record in generalObs"
        :siteName="record.siteNme"
        :surveyId="record.surveyId"
        :status="record.expertReviewStatusCde"
        :key="record.surveyId"></observation-card>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import observationCard from './obsCard';

export default {
  name: 'saved-observations',
  data () {
    return {
    };
  },
  components: {
    'observation-card': observationCard,
  },
  computed: {
    ...mapGetters({
      generalObs: 'general',
    }),
    // observations () {
    //   return this.$store.state.newObservations.items;
    // },
  },
  methods: {
    ...mapActions([
    ]),
    // async newObservation () {
    //   this.$router.push({ name: 'GeneralObs' });
    // },
    editObservation (obsId) {
      this.$router.push({ name: 'GeneralObs', params: { observationId: obsId } });
    },
    deleteRecord (surveyId) {
      this.$store.dispatch('deleteSurvey', surveyId);
    },
  },
};
</script>

<style scoped>
h1 {
  margin: 1rem;
  font-size: 1.8rem
}
</style>
