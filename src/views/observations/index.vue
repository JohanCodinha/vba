<template>
  <div class="container">
  <div class="loggedOut" v-if="!logedIn">
    <h1>
      <router-link class="link" :to="{ name: 'Signin'}">Sign in</router-link>
      to the Victorian Biodiversity Atlas to see your observations
    </h1>
  </div>
    <h1 v-if="generalObs.length > 0">{{generalObs.length}} saved observations</h1>
    <ul>
      <observation-card v-for="record in generalObs"
        :scientificName="record.species && record.species.length && record.species[0].scientificNme"
        :commonName="record.species && record.species.length && record.species[0].commonNme"
        :siteName="record.siteNme"
        :surveyId="record.surveyId"
        :status="record.expertReviewStatusCde"
        :startDate="record.surveyStartSdt"
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
      logedIn: 'isLogin',
    }),
  },
  methods: {
    ...mapActions([
    ]),
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
.container {
  padding-bottom: .5rem;
  display: flex;
  flex-direction: column;
}

h1 {
  margin: 1rem;
  font-size: 1.8rem
}

.loggedOut {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.link {
  color: #00b7bd;
  text-decoration: underline;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
}

</style>
