<template>
  <div class="general-observation">
    <h2>General Observation</h2>
    <imagePicker :obsId="observationId"></imagePicker>
    <div class="specie-picker" @click="navigateTo('SpeciePicker')">
      <template v-if="taxonId">
        <p>{{commonName}}</p>
        <p>{{scientificName}}</p>
      </template>
      <template v-else>
        <p>Search for species...</p>
      </template>
    </div>
    <!-- <speciePicker :obsId="observationId"></speciePicker> -->
    <countPicker :obsId="observationId"></countPicker>
    <extraInfo></extraInfo>
    <textarea name="notes"
      rows="5">Notes ...</textarea>
    <datePicker :obsId="observationId"></datePicker>
    <div class="location-picker" @click="navigateTo('LocationPicker')">
      <template v-if="coordinates">
        <p>{{latitude}}</p>
        <p>{{longitude}}</p>
      </template>
      <template v-else>
        <p>Enter location :</p>
      </template>
    </div>
  </div>
</template>

<script>
import imagePicker from '@/components/imagePicker';
import speciePicker from '@/components/speciePicker';
import datePicker from '@/components/datePicker';
// import locationPicker from '@/components/locationPicker';
import countPicker from '@/components/countPicker';
import extraInfo from '@/components/extraInfo';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'generalObservation',
  components: {
    imagePicker,
    speciePicker,
    datePicker,
    // locationPicker,
    countPicker,
    extraInfo,
  },
  // data () {
  //   return {
  //   };
  // },
  computed: {
    ...mapGetters([
      'allDrafts',
      'activeDraft',
    ]),
    observationId () {
      return this.activeDraft
       ? this.activeDraft.id
       : null;
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
  },
  methods: {
    ...mapActions([
      'createObservation',
    ]),
    async newObservation () {
      const newObs = await this.createObservation();
      return newObs;
    },
    navigateTo (routeName) {
      this.$router.push({ name: routeName, params: { obsId: this.observationId } });
    },
  },
  mounted: async function mountedEvent () {
    const activeDraft = this.activeDraft;
    if (!activeDraft) {
      const obsId = await this.newObservation();
      console.log(`new draft created ${obsId}`);
      this.$store.dispatch('setActiveDraft', { obsId });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
