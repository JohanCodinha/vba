<template>
  <div class="container">
    <div class="instruction">
      <img src="../../assets/Environment.svg">
      <h1>Let's get started</h1>
      <h2>Enter your VBA credentials to log in.</h2>
    </div>
    <form @submit.prevent="login">
      <div class="form-block">
        <label for="signin-username">
          Username
        </label>
        <div class="text-input">
          <input id="signin-username" v-model="username" type="string" name="username">
        </div>
      </div>
      <div class="form-block">
        <label for="signin-password">
          Password
        </label>
        <div class="text-input">
          <input id="signin-password" v-model="password" type="string" name="password">
        </div>
      </div>
      <div class="action">
        <button>Log in</button>
      </div>
    </form>
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
      this.$router.push({ name: 'observations' });
    },
  },
};
</script>

<style scoped>

h1 {
  font-size: 1.8rem;
}

h2 {
  margin-top: .2rem;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  margin-top: 10%;
}

.instruction {
  text-align: center;
}

.instruction img {
  max-width: 50%;
  margin-bottom: 5%;
}

form {
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-block {
  margin-bottom: 1rem;
}

.text-input {
  width: 100%;
  position: relative;
  display: block;
  background-color: #d2d6df;
  border-radius: 2px;
  box-sizing: border-box;
  padding: 1px;
  outline: none;
  color: #45494e;
  font-size: 1.2rem;
}

.text-input input {
  font-size: 1.2rem;
  display: block;
  width: 100%;
  height: 100%;
  padding: 8px 12px 9px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 2px;
  outline: none;
  border: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  -webkit-appearance: none;
}

.action {
  display: flex;
  justify-content: center;
}

button {
  background: #201547;
  border: 0;
  color: #fff;
  font-size: 1rem;
  height: 3.125rem;
  min-width: 9.6875rem;
  margin: 1rem;
  padding: 0.875rem 1.25rem;
  letter-spacing: .05rem;
  text-align: center;
  text-decoration: none;
  border-radius: 2px;
  box-shadow: 
  0 2px 2px 0 rgba(0,0,0,0.14),
  0 1px 5px 0 rgba(0,0,0,0.12),
  0 3px 1px -2px rgba(0,0,0,0.2);
}

</style>
