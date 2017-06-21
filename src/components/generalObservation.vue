<template>
  <div class="general-observation">
    <h2>General Observation</h2>
    <imagePicker :obsId="observationId"></imagePicker>
    <speciePicker :obsId="observationId"></speciePicker>
    <textarea name="notes"
      rows="5">Notes ...</textarea>
    <datePicker :obsId="observationId"></datePicker>
    <locationPicker :obsId="observationId"></locationPicker>
  </div>
</template>

<script>
import imagePicker from '@/components/imagePicker';
import speciePicker from '@/components/speciePicker';
import datePicker from '@/components/datePicker';
import locationPicker from '@/components/locationPicker';

import { mapActions } from 'vuex';

export default {
  name: 'generalObservation',
  components: {
    imagePicker,
    speciePicker,
    datePicker,
    locationPicker,
  },
  data () {
    return {
      observationId: undefined,
    };
  },
  methods: {
    ...mapActions([
      'createObservation',
    ]),
    async newObservation () {
      const newObs = await this.createObservation();
      this.$data.observationId = newObs;
      console.log(newObs);
    },
  },
  mounted: function mountedEvent () { this.newObservation(); },
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
