<template>
  <div class="date-picker">
  <div class="map">
    
  </div>
    <div v-if="coordinates">
      <p>{{coordinates.latitude}}</p>
      <p>{{coordinates.longitude}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import vbaSpecies from '../api/vbaSpecies';


export default {
  name: 'locationPicker',
  // data () {
  //   return {
  //   };
  // },
  props: {
    obsId: {
      type: Number,
      default () { return undefined; },
    },
  },
  computed: {
    ...mapGetters([
      'allDrafts',
      'activeDraft',
    ]),
    coordinates () {
      if (!this.activeDraft) return null;
      return this.activeDraft.position;
      // const drafts = this.allDrafts;
      // const draftObservation = this.activeDraft;
      // if (!draftObservation) return null;
      // const coordinates = draftObservation.position;
      // console.log(`coordinates found in exif : ${coordinates ? coordinates.latitude : null}`);
      // return coordinates;
    },
  },
  methods: {
    ...mapActions([
      'selectSpecie',
    ]),
    searchSpecie (e) {
      const input = e.target.value;
      console.log(e.target.value);
      vbaSpecies(input)
        .then((response) => {
          console.log(response);
          this.$data.species = response;
        });
    },
    select (specie) {
      const obsId = this.obsId;
      console.log(specie, obsId);
      this.$store.dispatch('selectSpecie', { specie, obsId });
      this.$data.selection = specie;
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
  display: flex;
  flex-direction: column;
}

li {
  display: inline-block;
  margin: .1rem;
  border: 1px solid black
}

li:hover {
  display: inline-block;
  margin: .1rem;
  border: 1px solid pink
}

a {
  color: #42b983;
}
</style>
