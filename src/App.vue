<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted: async function login () {
    const tokenFetched = await this.$store.dispatch('fetchToken', { username: 'codeforvic', password: 19910908 });
    console.log(`${tokenFetched ? 'login succesfull' : 'failled login'}`);
    this.$store.dispatch('getGeneralObs');
  },
};
</script>

<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
