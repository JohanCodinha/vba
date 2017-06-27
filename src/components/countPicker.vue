<template>
  <div class="count-picker">
    <label for="count">Count:</label>
    <input :value="count" id="count" type="number" pattern="\d*">
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import vbaSpecies from '../api/vbaSpecies';


export default {
  name: 'countPicker',
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
    count: {
      get: function getter () {
        if (!this.activeDraft) return null;
        return this.activeDraft.count;
      },
      set: function setter (value) {
        console.log(value);
      },
    },
  },
  methods: {
    ...mapActions([
      'addCount',
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
