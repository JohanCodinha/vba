<template>
  <li class="card">
    <div class="card-content_">
      <dl @click="$router.push({ name: 'GeneralObs', params: { observationId: obsId } })">
        <dd>{{specieName || 'Unidentified specie'}}</dd>
        <dd>{{siteName || 'Unknown location'}}</dd>
        <dt>Status :</dt>
        <dd>{{status}}</dd>
      </dl>
      <a href="#">
        <i @click="cardReveal" class="material-icons">more_vert</i>
      </a>
    </div>
    <div class="card-reveal_" v-bind:class="{'card-revealed': cardRevealed}">
      <div>
        <a class="btn_ red_" @click='deleteRecord(surveyId)'>Delete </a>
        <a class="btn_" @click=''>upload </a>
      </div>
      <a href="#">
        <i @click="cardHide" class="material-icons">close</i>
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
      cardRevealed: false,
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
    cardReveal () {
      this.$data.cardRevealed = true;
      console.log(this.$data.cardRevealed);
    },
    cardHide () {
      this.$data.cardRevealed = false;
      console.log(this.$data.cardRevealed);
    },
  },
};
</script>

<style scoped>
.card {
  overflow: hidden;
}

.card-content_ {
  padding: 1.5rem;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
}

.card-reveal_ {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  position: absolute;
  background-color: #fff;
  width: 100%;
  height: 100%;
  top: 100%;
  transition: transform .3s;
}

.card-revealed {
  transform: translateY(-100%);
}

.btn_ {
  text-decoration: none;
  color: #fff;
  background-color: #26a69a;
  text-align: center;
  letter-spacing: .5px;
  border: none;
  border-radius: 2px;
  display: inline-block;
  height: 36px;
  line-height: 36px;
  padding: 0 2rem;
  text-transform: uppercase;
}

.red_ {
  background-color: #D32F2F;
}
</style>
