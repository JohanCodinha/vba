<template>
  <li>
  <router-link :to="{ name: 'survey', params: { surveyId: this.surveyId } }">
    <p>site name: {{siteName}}</p>
    <p>survey ID: {{surveyId}}</p>
    <p>status: {{status}}</p>
    <button @click='deleteRecord(surveyId)'>delete</button>
  </router-link>
  </li>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'observation-card',
  data () {
    return {
    };
  },
  props: {
    siteName: {
      type: String,
      default () { return undefined; },
    },
    status: {
      type: String,
      default () { return undefined; },
    },
    surveyId: {
      type: Number,
      default () { return undefined; },
    },
  },
  computed: {
    // ...mapGetters({
    //   generalObs: 'general',
    // }),
  },
  methods: {
    // ...mapActions([
    // ]),
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

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
