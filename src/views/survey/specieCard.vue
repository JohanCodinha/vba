<template>
  <li class="card">
      <div class="card-image" v-if="imageSources">
        <img v-for="sourceUrl in imageSources"
          :src="sourceUrl">
      </div>
    <div class="card-content">
      <p>{{commonName}}</p>
      <p>{{scientificName}}</p>
      <p>count: {{count}}</p>
    </div>
  </li>
</template>

<script>
// import { mapGetters } from 'vuex';

export default {
  name: 'observation-card',
  data () {
    return {
    };
  },
  props: {
    count: {
      type: Number,
      default () { return undefined; },
    },
    commonName: {
      type: String,
      default () { return undefined; },
    },
    scientificName: {
      type: String,
      default () { return undefined; },
    },
    imagesId: {
      type: Array,
      default () { return null; },
    },
  },
  computed: {
    imageSources () {
      if (this.imagesId.length < 1) return null;
      return this.imagesId.map(id => `https://vba.dse.vic.gov.au/vba/getFile.do?id=${id}`);
    },
  },
  methods: {
    // ...mapActions([
    // ]),
  },
  mounted () {
  },
};
</script>

<style scoped>
img {
  width: 100px;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
