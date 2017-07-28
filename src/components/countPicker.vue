<template>
  <div class="count-picker">
    <label for="count">Count:</label>
    <input v-model="count" id="count" type="number" pattern="\d*">
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
      'allitems',
    ]),
    activeDraft () {
      const draft = this.allitems.find(item => item.id === this.obsId);
      return draft;
    },
    count: {
      get: function getter () {
        if (!this.activeDraft) return null;
        return this.activeDraft.count || 0;
      },
      set: function setter (value) {
        const count = Number(value);
        const obsId = this.obsId;
        if (!isNaN(count)) {
          console.log(`count set to ${value}`);
          this.$store.dispatch('setCount', { count, obsId });
        } else {
          console.log(`value : ${count} of type ${typeof count} is not valid`);
        }
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
