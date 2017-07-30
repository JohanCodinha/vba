<template>
  <div class="date-picker">
    <input :value="obsDatetime" id="datetime" type="datetime-local">
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'datePicker',
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
    obsDatetime () {
      if (!this.activeDraft) return null;
      return this.activeDraft.datetime;
    },
  },
  methods: {
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
