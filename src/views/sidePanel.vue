<template>
  <div class="slideout-menu">
    <div class="content">
      <h1>Settings</h1>
      <router-link @click.native="closeMenu" :to="{ name: 'login'}">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidePanel',
  data () {
    return {
    };
  },
  computed: {
  },
  methods: {
    closeMenu () {
      console.log('close');
      this.$emit('closeMenu');
    },
  },
};
</script>

<style scoped>
.slideout-menu {
  -webkit-overflow-scrolling: touch;
  bottom: 0;
  left: auto;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 0;
  width: 268px;
  z-index: 0;
}

.content { 
  padding: 1rem;
}

h1 {
  font-size: 1.5rem;
  margin: .5rem 0 .5rem 0;
}

h2 {
  font-size: 1.125rem;
  margin: .25rem;
}

.slideout-menu::before {
  background: #00b7bd;
  content: '';
  display: block;
  height: 3.125rem;
  width: 100%;
}

.content-text {
  margin-left: .5rem;
}

/*select {
  appearance: none;
  border-radius: 0;
  font-family: inherit;
  background-color: transparent;
  padding: 0;
  border: none;
  border-bottom: 1px solid #42b983;
}

.select-wrapper::after {
  content: '▾';
  color: #42b983;
  display: inline-block;
  margin-left: .5rem;
  pointer-events: none;
}*/

</style>
