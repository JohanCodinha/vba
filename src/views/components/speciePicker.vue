<template>
  <div class="speciePicker">
    <div class="card">
      <div class="card-content">
      <div class="input-content">
        <label for="search">Search species</label>
        <input type="text" name="search"
          id="search"
          :value="selection
          ? selection.commonName
          : null"
          @change="searchSpecie">
      </div>
      </div>
    </div>
    <ul class="collection">
      <li class="collection-item taxon-card"
        v-for="suggestion in species" @click="select(suggestion)">
        <div class="taxonomy">
          <h5>{{suggestion.commonName}}</h5>
          <p>{{suggestion.scientificName}}</p>
        </div>
        <div class="description">
          <img class="thumbnail" v-if="suggestion.images[0]"
            :src="suggestion.images[0].s3Url">
          <img class="info-svg"
            :style="{ visibility: (suggestion.description || suggestion.images[0])
              ? 'visible' : 'hidden'}"
            src="../../assets/ic_info_outline_black_24px.svg">
        </div>
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
