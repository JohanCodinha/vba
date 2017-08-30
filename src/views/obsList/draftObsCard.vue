<template>
  <card>
    <img v-if="imageUrl" slot="image" :src="imageUrl">
    <dl slot="content"
      @click="$router.push({ name: 'GeneralObs', params: { observationId: obsId } })">
        <dt>Specie</dt>
        <dd>{{specieName || 'Unidentified specie'}}</dd>
        <dt>Site name</dt>
        <dd>{{siteName || 'Unknown location'}}</dd>
        <dt>Status</dt>
        <dd>{{status}}</dd>
    </dl>
    <div slot="reveal">
      <a class="btn_ red_" @click='deleteDraft'>Delete </a>
      <a class="btn_" @click=''>upload </a>
    </div>
  </card>
</template>

<script>
import card from '@/views/components/card';

// import { mapGetters, mapActions } from 'vuex';

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
    specieName: {
      type: String,
      default () { return 'Specie not selected'; },
    },
    obsId: {
      type: Number,
      default () { return undefined; },
    },
    image: {},
  },
  computed: {
    // ...mapGetters({
    //   generalObs: 'general',
    // }),
    imageUrl () {
      if (this.image) return URL.createObjectURL(this.image);
      return null;
    },
  },
  methods: {
    // ...mapActions([
    // ]),
    deleteDraft () {
      this.$store.dispatch('deleteObservation', this.obsId);
    },
    upload () {
      console.log('uploading start');
      this.$store.dispatch('uploadObservation', { observation: this.obsId });
    },
  },
};
</script>

<style scoped>

</style>
