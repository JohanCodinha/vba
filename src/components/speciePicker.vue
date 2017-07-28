<template>
  <div class="speciePicker">
    <input type="text" name="search"
      :value="selection
      ? selection.COMMON_NAME
      : null"
      placeholder="search ..." 
      @change="searchSpecie">
    <ul>
      <li v-for="suggestion in species" @click="select(suggestion)">
        <p>{{suggestion.COMMON_NAME}}</p>
        <p>{{suggestion.SCIENTIFIC_NAME}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import vbaSpecies from '../api/vbaSpecies';


export default {
  name: 'speciePicker',
  data () {
    return {
      obsId: Number(this.observationId),
      species: [],
      selection: undefined,
    };
  },
  props: {
    observationId: {
      type: [Number, String],
      default () { return undefined; },
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
      this.$router.go(-1);
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
