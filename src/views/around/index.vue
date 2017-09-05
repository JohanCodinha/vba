<template>
  <div class="around container">
    <div v-if="!status.searched" class="description">
      <h1>Explore flora &amp; fauna near you </h1>
      <i class="material-icons">location_searching</i>
    </div>
    <template v-else>
      <div v-if="species" @click="searchSpecies" class="reload">
        <h1><i class="material-icons">autorenew</i>{{species.length}} species found</h1>
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
      </ul>
    </template>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { debounce, get } from 'lodash'; // eslint-disable-line
import specieSearchItem from '../components/specieSearchItem';

const { mapActions, mapGetters } = createNamespacedHelpers('explore');


export default {
  name: 'explore',
  components: {
    specieSearchItem,
  },
  data () {
    return {
      // species: [],
    };
  },
  props: {
  },
  watch: {
  },
  computed: {
    ...mapGetters([
      'species',
      'status',
    ]),
  },
  methods: {
    ...mapActions([
      'searchSpecies',
    ]),
    // fetchSpecies () {
    //   console.log('fetching');
    // },
    get (object, path) {
      return get(object, path);
    },
  },
  mounted: function mountedEvent () { this.searchSpecies(); },
};
</script>

<style scoped>
.description {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.container {
  /*margin: .5rem;*/
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
}

.collection {
  background: white;
  max-width: 100%;
}

.collection li:nth-child(even) {
  background-color: #f7f7f7;
}

.reload {
  margin: .5rem;
}
</style>
