<template>
  <div>
    <p>Survey: {{this.surveyId}}</p>
    <ul>
      <li v-for="specie in survey.species">
        <p>{{specie.commonNme}}</p>
        <p>{{specie.scientificNme}}</p>
        <p>count: {{specie.totalCountInt}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'observation-card',
  data () {
    return {
    };
  },
  props: {
    surveyId: {
      type: Number,
      default () { return undefined; },
    },
  },
  computed: {
    ...mapGetters({
      generalObs: 'general',
    }),
    survey () {
      return this.generalObs.find(obs => obs.surveyId === this.surveyId);
    },
  },
  methods: {
    // ...mapActions([
    // ]),
  },
  mounted () {
    this.$store.dispatch('getSurveySpecies', this.surveyId);
  },
};
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
