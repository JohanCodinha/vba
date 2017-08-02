<template>
  <div class="speciePicker">
    <div class="card">
      <div class="card-content">
      <div class="input-content">
        <label for="search">Search species</label>
        <input type="text" name="search"
          id="search"
          :value="selection
          ? selection.COMMON_NAME
          : null"
          @change="searchSpecie">
      </div>
      </div>
    </div>
    <ul class="collection">
      <li class="collection-item"
        v-for="suggestion in species" @click="select(suggestion)">
        <h5>{{suggestion.COMMON_NAME}}</h5>
        <p>{{suggestion.SCIENTIFIC_NAME}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import vbaSpecies from '@/api/vbaSpecies';


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
/*h1, h2 {
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
}*/
</style>
