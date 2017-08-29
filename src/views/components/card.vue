<template>
  <li class="card">
    <div class="card-content_">
      <slot name="content"></slot>
      <a href="#">
        <i @click="cardReveal" class="material-icons">more_vert</i>
      </a>
    </div>
    <div class="card-reveal_" v-bind:class="{'card-revealed': cardRevealed}">
      <slot name="reveal"></slot>
      <a href="#">
        <i @click="cardHide" class="material-icons">close</i>
      </a>
    </div>
  </li>
</template>

<script>
export default {
  name: 'card',
  data () {
    return {
      cardRevealed: false,
    };
  },
  methods: {
    cardReveal () {
      this.$data.cardRevealed = true;
      console.log(this.$data.cardRevealed);
    },
    cardHide () {
      this.$data.cardRevealed = false;
      console.log(this.$data.cardRevealed);
    },
  },
};
</script>

<style scoped>
.card {
  overflow: hidden;
}

.card-content_ {
  padding: 1.5rem;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
}

.card-reveal_ {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  position: absolute;
  background-color: #fff;
  width: 100%;
  height: 100%;
  top: 100%;
  transition: transform .3s;
}

.card-revealed {
  transform: translateY(-100%);
}

.btn_ {
  text-decoration: none;
  color: #fff;
  background-color: #26a69a;
  text-align: center;
  letter-spacing: .5px;
  border: none;
  border-radius: 2px;
  display: inline-block;
  height: 36px;
  line-height: 36px;
  padding: 0 2rem;
  text-transform: uppercase;
}

.red_ {
  background-color: #D32F2F;
}

dt::after { 
  content: ' :';
}
dd {
  padding-left: 1rem;
}
</style>
