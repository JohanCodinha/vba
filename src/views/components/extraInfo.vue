<template>
  <div class="extra-info">
    <label for="extra-info">Extra information:</label>
    <select name="extra-info" id="extra-info" v-model="selected">
      <option v-for="option in options"
        :value="option.value">{{ option.text }}</option>
    </select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

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
      'allitems',
    ]),
    activeDraft () {
      const draft = this.allitems.find(item => item.id === this.obsId);
      return draft;
    },
    selected: {
      get: function getter () {
        if (!this.activeDraft) return null;
        return this.activeDraft.extraInfoCode;
      },
      set: function setter (code) {
        this.$store.dispatch('setExtraInfo', { code, obsId: this.obsId });
      },
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
