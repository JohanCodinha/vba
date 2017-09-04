<template>
  <div class="speciePicker">
    <div class="search-card">
      <label for="search">Search species :</label>
      <input type="text" name="search"
        id="search"
        v-model="searchInput">
    </div>
    <ul class="collection">
      <li v-for="suggestion in species">
        <specieSearchItem
          :commonName="suggestion.commonName"
          :scientificName="suggestion.scientificName"
          :conservationStatus="suggestion.conservationStatus.vicAdvisory"
          :imageSource="get(suggestion, 'images[0].s3Url')"
          @click.native="select(suggestion)"
        ></specieSearchItem>
      </li>
      <!-- :imageLink="suggestion.images" -->
      <!-- <li class="taxon-card"
        v-for="suggestion in species" @click="select(suggestion)">
        <div class="description">
          <img class="thumbnail" v-if="suggestion.images[0]"
            :src="suggestion.images[0].s3Url">
          <i :style="{ visibility: (suggestion.description || suggestion.images[0])
              ? 'visible' : 'hidden'}"
              class="material-icons">info_outline</i>
        </div>
        <div class="taxonomy">
          <h5>{{suggestion.commonName}}</h5>
          <p>{{suggestion.scientificName}}</p>
        </div>
      </li> -->
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import vbaSpecies from '@/api/vbaSpecies';
import { debounce, get } from 'lodash'; // eslint-disable-line
import specieSearchItem from './specieSearchItem';
// import card from './card';


export default {
  name: 'speciePicker',
  components: {
    specieSearchItem,
  },
  data () {
    return {
      obsId: Number(this.observationId),
      species: [],
      searchInput: undefined,
    };
  },
  props: {
    observationId: {
      type: [Number, String],
      default () { return undefined; },
    },
  },
  watch: {
    // eslint-disable-next-line
    searchInput: function (inputString) { this.searchSpecie(inputString) },
  },
  methods: {
    ...mapActions([
      'selectSpecie',
    ]),
    // eslint-disable-next-line
    searchSpecie: debounce(
      function searchSpecie (inputString) {
        vbaSpecies(inputString)
          .then((response) => {
            this.$data.species = response;
          });
      }, 500),
    select (specie) {
      const obsId = this.obsId;
      console.log(specie, obsId);
      this.$store.dispatch('selectSpecie', { specie, obsId });
      this.$data.searchInput = specie;
      this.$router.go(-1);
    },
    get (object, path) {
      return get(object, path);
    },
  },
};
</script>

<style scoped>
.thumbnail {
  max-width: 10rem;
}

.description {
  width: 12rem;
}

.taxon-card {
  display: flex;
  justify-content: space-between;
}

.description {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.info-svg {
  margin-left: auto;
}

.search-card{
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.search-card input {
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  border: 1px #D2D6DF solid;
  border-radius: 3px;
  color: #45494E;
  background-color: #fff;
  font-size: 1rem;
  height: 2rem;
  -webkit-appearance: textfield;
}

.speciePicker {
  margin: .5rem;
}

.collection {
  background: white;
}

.taxon-card {
  padding: .5rem;
  border-bottom: 1px solid #c9c9c9;
}

.collection li:nth-child(even) {
  background-color: #f7f7f7;
}
</style>
