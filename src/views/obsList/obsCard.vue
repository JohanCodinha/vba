<template>
  <li class="card">
    <div class="card-content">
      <div class="card-data"
        @click="$router.push({ name: 'survey', params: { surveyId } })">
            <p>site name: {{siteName}}</p>
            <p>survey ID: {{surveyId}}</p>
            <p>status: {{status}}</p>
      </div>
      <!-- </router-link> -->
      <span class="activator">
        <i class="material-icons activator">more_vert</i>
      </span>
      </div>
      <div class="card-reveal">
        <span class="card-title">
          <i class="material-icons right">close</i>
        </span>
        <a class="waves-effect waves-light btn red darken-2"
          @click='deleteRecord(surveyId)'>Delete
          <i class="material-icons right">delete</i>
        </a>
        <a class="waves-effect waves-light btn"
          @click='deleteRecord(surveyId)'>Edit</a>
      </div>
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
.card-data {
  display: flex;
  flex-direction: column;
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
