<template>
  <li class="card">
  <div class="card-content">
    <div class="card-data"
      @click="$router.push({ name: 'GeneralObs', params: { observationId: obsId } })">
      <p>{{specieName || 'Unidentified specie'}}</p>
      <p>{{siteName || 'Unknown location'}}</p>
      <p>Status: {{status}}</p>
    </div>
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
          <!-- <i class="material-icons right">delete</i> -->
        </a>
        <a class="waves-effect waves-light btn"
          @click='deleteRecord(surveyId)'>upload
          <!-- <i class="material-icons right">cloud upload</i> -->
        </a>
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
      default () { return 'Location not specified'; },
    },
    status: {
      type: String,
      default () { return undefined; },
    },
    specieName: {
      type: String,
      default () { return 'Specie not selected'; },
    },
    obsId: {
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
    deleteDraft () {
      this.$store.dispatch('deleteObservation', this.obsId);
    },
    upload () {
      console.log('uploading start');
      this.$store.dispatch('uploadObservation', { observation: this.obsId });
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
