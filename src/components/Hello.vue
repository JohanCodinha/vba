<template>
  <div class="hello">
    <button @click='newObservation'>new Obs</button>
    <ul>
      <li><router-link :to="{ name: 'ImagePicker'}">imagePicker</router-link></li>
      <li><router-link :to="{ name: 'SpeciePicker'}">speciePicker</router-link></li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      // observationId: undefined,
    };
  },
  methods: {
    ...mapActions([
      // 'createObservation',
    ]),
    newObservation () {
      this.$router.push({ name: 'GeneralObs' });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
