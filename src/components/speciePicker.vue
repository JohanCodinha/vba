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
import vbaSpecies from '../api/vbaSpecies';

export default {
  name: 'hello',
  data () {
    return {
      species: [],
      selection: undefined,
    };
  },
  methods: {
    searchSpecie (e) {
      const input = e.target.value;
      console.log(e.target.value);
      vbaSpecies(input)
        .then((response) => {
          console.log(response);
          this.$data.species = response;
        });
    },
    select (suggestion) {
      console.log(suggestion);
      this.$data.selection = suggestion;
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
