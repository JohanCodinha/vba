<template>
  <div class="extra-info">
    <label for="count">Extra information:</label>
    <select name="extra-info" v-model="selected">
      <option v-for="option in options"
        :value="option.value">{{ option.text }}</option>
    </select>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import vbaSpecies from '../api/vbaSpecies';


export default {
  name: 'extraInfo',
  data () {
    return {
      options: [
        { text: 'Beach washed', value: 'w' },
        { text: 'Breeding', value: 'b' },
        { text: 'Carnivore bait', value: 'carni' },
        { text: 'Cultivated', value: 'cult' },
        { text: 'Escapee', value: 'e' },
        { text: 'Evidence of past use', value: 'past' },
        { text: 'Found dead', value: 'k' },
        { text: 'Herbivore bait', value: 'herbi' },
        { text: 'In predator scat', value: 'z' },
        { text: 'No longer present at site', value: 'x' },
        { text: 'EscaReleased / Introduced', value: 'r' },
        { text: 'Roost site', value: 'c' },
        { text: 'Sub fossil', value: 's' },
        { text: 'Voucher specimen', value: 'v' },
      ],
      selected: null,
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
