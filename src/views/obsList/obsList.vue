<template>
  <div class="hello">
<!--     <button @click='newObservation'>new Obs</button>
 -->    <div class="fixed-action-btn">
      <a class="btn-floating btn-large waves-effect waves-light"><i class="material-icons"
      @click='newObservation'>add</i></a>
    </div>
    <h3>Drafts</h3>
    <ul>
      <draft-observation-card v-for="obs in observations"
        :obsId="obs.id"
        :specieName="obs.taxonomy.commonName"
        :siteName="obs.position.description"
        :image="obs.images[0]"
        :status="obs.recordedId === undefined ? 'Local draft': 'Uploaded'">

      </draft-observation-card>

    </ul>
    <h3>Saved Obs</h3>
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
import draftObservationCard from './draftObsCard';

export default {
  name: 'observations-list',
  data () {
    return {
      msg: 'Welcome to VBAS',
    };
  },
  components: {
    'observation-card': observationCard,
    'draft-observation-card': draftObservationCard,
  },
  computed: {
    ...mapGetters({
      generalObs: 'general',
    }),
    observations () {
      return this.$store.state.newObservations.items;
    },
  },
  methods: {
    ...mapActions([
    ]),
    async newObservation () {
      this.$router.push({ name: 'GeneralObs' });
    },
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
/*.fixed-action-btn {
    position: fixed;
    right: 23px;
    bottom: 23px;
}*/
/*h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
}

li {
  display: inline-block;
  margin: 0 10px;
}

li:nth-child(odd) {
  background-color: lightgrey;
}

a {
  color: #42b983;
}*/
</style>
