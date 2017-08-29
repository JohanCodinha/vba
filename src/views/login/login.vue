<template>
  <div class="login">
  <h1>Vba login</h1>
    <div class="">
      <label>
        Username
        <input v-model="username" type="string" name="username">
      </label>
      <label>
        Password
        <input v-model="password" type="string" name="password">
      </label>
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login () {
      const tokenFetched = await this.$store.dispatch('fetchToken', {
        username: this.username,
        password: this.password });
      console.log(`${tokenFetched ? 'login succesfull' : 'failled login'}`);
      this.$store.dispatch('getGeneralObs');
      this.$router.push({ name: 'obsList' });
    },
  },
};
</script>

<style scoped>

</style>
