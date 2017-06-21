<template>
  <div class="date-picker">
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
  data () {
    return {
      species: [],
      selection: undefined,
    };
  },
  props: {
    obsId: {
      type: Number,
      default () { return undefined; },
    },
  },
  computed: {
    ...mapGetters([
      'allDrafts',
    ]),
    coordinates () {
      const drafts = this.allDrafts;
      const draftObservation = drafts.find(draft => draft.id === this.obsId);
      if (!draftObservation || draftObservation.length < 1) return '';
      const coordinates = draftObservation.images[0];
      console.log(`image coordinates : ${coordinates}`);
      return coordinates;
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
