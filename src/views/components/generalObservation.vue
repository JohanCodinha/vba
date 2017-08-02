<template>
  <div class="general-observation container">
    <div class="card">
      <div class="card-content">
      <div class="card-title">General Observation</div>
        <imagePicker :observationId="obsId"></imagePicker>
        <router-link
        :to="{ name: 'SpeciePicker', params : { observationId: obsId } }">
          <template v-if="taxonId">
            <p>{{commonName}}</p>
            <p>{{scientificName}}</p>
          </template>
          <template v-else>
            <p>Lookup Species</p>
          </template>
        </router-link>
        <countPicker :obsId="obsId"></countPicker>
        <extraInfo :obsId="obsId"></extraInfo>
        <div class="input-field">
          <textarea class="materialize-textarea" name="notes"
          >Notes ...</textarea>
        </div>
        <datePicker :obsId="obsId"></datePicker>
        <router-link 
        :to="{ name: 'LocationPicker', params : { observationId: obsId } }">
          <template v-if="coordinates">
            <p>Lat: {{latitude}}</p>
            <p>Long: {{longitude}}</p>
            <p>{{locationDescription}}</p>
          </template>
          <template v-else>
            <p>Enter location :</p>
          </template>
        </router-link>
      <div class="center-align">
        <button class="btn" 
         @click="upload"
          :disabled="obsIsValid">Upload</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import imagePicker from './imagePicker';
import speciePicker from './speciePicker';
import datePicker from './datePicker';
import countPicker from './countPicker';
import extraInfo from './extraInfo';

export default {
  name: 'generalObservation',
  components: {
    imagePicker,
    speciePicker,
    datePicker,
    countPicker,
    extraInfo,
  },
  props: {
    observationId: {
      type: [Number, String],
      default () { return undefined; },
    },
  },
  // data () {
  //   return {
  //     obsId: Number(this.observationId),
  //   };
  // },
  computed: {
    ...mapGetters([
      'allitems',
    ]),
    obsId () {
      return Number(this.observationId);
    },
    activeDraft () {
      const draft = this.allitems.find(item => item.id === this.obsId);
      return draft;
    },
    taxonomy () {
      const draftObservation = this.activeDraft;
      return draftObservation
        ? draftObservation.taxonomy
        : null;
    },
    taxonId () {
      return this.taxonomy
        ? this.taxonomy.taxonId
        : null;
    },
    commonName () {
      const draft = this.activeDraft;
      return draft
        ? draft.taxonomy.commonName
        : null;
    },
    scientificName () {
      const draft = this.activeDraft;
      return draft
        ? draft.taxonomy.scientificName
        : null;
    },
    coordinates () {
      const draft = this.activeDraft;
      if (!draft || !draft.position) return null;
      return (draft.position.latitude && draft.position.longitude)
        ? draft.position
        : null;
    },
    latitude () {
      return this.coordinates
        ? this.coordinates.latitude
        : null;
    },
    longitude () {
      return this.coordinates
        ? this.coordinates.longitude
        : null;
    },
    locationDescription () {
      return this.activeDraft.position.description;
    },
    obsIsValid () {
      const draft = this.activeDraft;
      if (!draft) return true;
      if (draft.taxonomy.taxonId !== null
        && draft.position.latitude !== null
        && draft.position.longitude !== null
        && draft.datetime !== null) {
        return false;
      }
      return true;
    },
  },
  methods: {
    ...mapActions([
      'createObservation',
    ]),
    navigateTo (routeName) {
      debugger;
      this.$router.push({ name: routeName, params: { obsId: this.obsId } });
    },
    upload () {
      console.log('uploading start');
      this.$store.dispatch('uploadObservation', { observation: this.activeDraft });
    },
  },
  mounted: async function mountedEvent () {
    if (this.observationId === undefined) {
      const observationId = await this.createObservation();
      // this.obsId = newObsId;
      console.log(`new draft created ${observationId}`);
      this.$router.replace({ name: 'GeneralObs', params: { observationId } });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
