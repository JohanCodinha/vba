<template>
  <li>
    <p>Specie Name: {{specieName}}</p>
    <p>site name: {{siteName}}</p>
    <p>status: {{status}}</p>
    <button @click='deleteDraft'>delete</button>
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
