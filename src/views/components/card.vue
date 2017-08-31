<template>
  <li class="card">
    <div v-if="this.$slots['image']" class="image">
      <slot name="image"></slot>
    </div>
    <div class="card-content_">
      <div class="visible-content">
        <slot name="content"></slot>
        <a href="#">
          <i @click="cardReveal" class="material-icons">more_vert</i>
        </a>
      </div>
      <div class="card-reveal_" v-bind:class="{'card-revealed': cardRevealed}">
        <div class="card-reveal-content">
          <slot name="reveal"></slot>
          <a href="#">
            <i @click="cardHide" class="material-icons">close</i>
          </a>
        </div>
      </div>
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
  box-shadow: 
    0 2px 2px 0 rgba(0,0,0,0.14),
    0 1px 5px 0 rgba(0,0,0,0.12),
    0 3px 1px -2px rgba(0,0,0,0.2);
  transition: box-shadow .25s, -webkit-box-shadow .25s;
  border-radius: 2px;
  position: relative;
  margin: .5rem 0 1rem 0;
  background-color: #fff;
  overflow: hidden;
}

.card-content_ {
  /*padding: 1.5rem;*/
  position: relative;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  /*align-items: center;*/
  flex-direction: column;
  /*height: 5rem;*/
}

.visible-content{
  margin: 1.5rem;
  justify-content: space-between;
  flex: 1;
  display: flex;
  flex-direction: row;
}

.card-reveal_ {
  display: flex;
  justify-content: space-between;
  /*align-items: center;*/
  /*padding: 1.5rem;*/
  /*margin: 1.5rem;*/
  position: absolute;
  background-color: #fff;
  width: 100%;
  height: 100%;
  top: 100%;
  bottom:  0;
  transition: transform .3s;
  /*display: none;*/
  /*visibility: hidden;*/
}

.card-reveal-content{
  display: flex;
  justify-content: space-between;
  flex: 1;
  margin: 1.5rem;
}


.card-revealed {
  visibility: visible;
  /*margin: 1.5rem;*/
  display: flex;
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

.image {
  display: flex;
  justify-content: center;
  height: 10rem;
  background-color: lightgrey;
}
.image img {
  max-height: 100%;
  max-width: 100%;
}

dt::after { 
  content: ' :';
}
dd {
  padding-left: 1rem;
}
</style>
