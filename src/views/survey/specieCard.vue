<template>
  <card class="specie-card">
    <img v-if="imageSources" slot="image" :src="imageSources">
    <div class="content" slot="content">
      <dl>
        <dt>Specie</dt>
        <dd>{{commonName}}</dd>
        <dd>{{scientificName}}</dd>
<!--         <dt>Site name</dt>
        <dd>{{siteName || 'Unknown location'}}</dd> -->
        <dt>Status</dt>
        <dd>{{status === 'a' ? 'Approved' : status}}</dd>
        <dt>Extra</dt>
        <dd>{{extraDescription}}</dd>
      </dl>
    </div>
<!--     <div slot="reveal">
      <a class="btn red_" @click='deleteDraft'>Delete </a>
    </div> -->
  </card>
</template>

<script>
import card from '@/views/components/card';

import { mapGetters /* , mapActions*/ } from 'vuex';

export default {
  name: 'draft-observation-card',
  components: {
    card,
  },
  data () {
    return {
      cardRevealed: false,
    };
  },
  props: {
    siteName: {
      type: String,
      default () { return 'Location not specified'; },
    },
    status: {
      type: String,
      default () { return undefined; },
    },
    commonName: {
      type: String,
      default () { return undefined; },
    },
    scientificName: {
      type: String,
      default () { return ''; },
    },
    obsId: {
      type: Number,
      default () { return undefined; },
    },
    imagesId: {
      type: Array,
      default () { return null; },
    },
    extraDescription: {
      type: String,
      default () { return undefined; },
    },
  },
  computed: {
    ...mapGetters([
      // 'isLogin',
    ]),
    imageSources () {
      if (this.imagesId.length < 1) return null;
      return this.imagesId.map(id => `https://vba.dse.vic.gov.au/vba/getFile.do?id=${id}`);
    },
  },
  methods: {
    // ...mapActions([
    // ]),
  },
};
</script>

<style scoped>
.button {
  color: #26a69a;
  background-color: transparent;
}

.action {
  display: flex;
  justify-content: flex-end;
}

.deactivated {
  color: grey;
}

.content {
  width: 100%;
}

.content dl dd {
  font-size: 1.2rem;
  font-weight: 600;
}

.content dl dt {
  color: #5d636a;
}
.specie-card {
  width: 100%;
}
</style>
