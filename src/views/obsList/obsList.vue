<template>
  <div class="hello">
    <button @click='newObservation'>new Obs</button>
    <h1>Drafts</h1>
    <ul>
      <li v-for="obs in observations"
        @click='editObservation(obs.id)'>
        <p>{{obs.taxonomy.commonName || 'unamed'}}</p>
        <p>is uploaded : {{(obs.recordedId !== undefined) ? 'true': 'false'}}</p>
      </li>
    </ul>
    <h2>Saved Obs</h2>
    <ul>
      <li v-for="record in generalObs">
      <p>site name: {{record.siteNme}}</p>
      <p>survey ID: {{record.surveyId}}</p>
      <button @click='deleteRecord(record.surveyId)'>delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to VBAS',
    };
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
      // const obsId = await this.$store.dispatch('createObservation');
      // console.log(`new obs id ${obsId} of type ${typeof obsId}`);
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
h1, h2 {
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
}
</style>
