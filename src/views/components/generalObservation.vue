<template>
  <div class="general-observation">
    <div class="navigation">
      <i @click="$router.push('/observations/drafts')"class="material-icons">arrow_back</i>
      <h1>General Observation</h1>
    </div>
    <div class="container">
      <div class="form-block">
        <p>Add images :</p>
        <imagePicker :observationId="obsId"></imagePicker>
      </div>
      <div @click="$router.push({ name: 'SpeciePicker', params : { observationId: obsId } })"class="form-block">
        <template v-if="taxonId">
        <dl>
          <dt>Common name :</dt>
          <dd>{{commonName}}</dd>
          <dt>Scientifique :</dt>
          <dd>{{scientificName}}</dd>
        </dl>
        </template>
        <template v-else>
          <div class="specie-lookup">
            <div>
              <i class="material-icons">search</i>
              <p class="specie-lookup-text">Lookup Species</p>
            </div>
            <div>
              <i class="material-icons">chevron_right</i>
            </div>
          </div>
        </template>
      </div>
      <div @click="$router.push({ name: 'LocationPicker', params : { observationId: obsId } })"class="form-block">
        <template v-if="coordinates">
          <p>Lat: {{latitude}}</p>
          <p>Long: {{longitude}}</p>
          <p>{{locationDescription}}</p>
        </template>
        <div v-else class="location-picker">
          <div class="">
            <i class="material-icons">pin_drop</i>
            <p class="location-picker-initial-text">Enter location :</p>
          </div>
            <i class="material-icons">chevron_right</i>
        </div>
      </div>
      <div class="form-block">
        <datePicker :obsId="obsId"></datePicker>
      </div>
      <div class="form-block">
        <extraInfo :obsId="obsId"></extraInfo>  
      </div>
      <div class="form-block">
        <div class="input-field">
          <label>
            Notes :
          </label>
          <textarea class="textarea" name="notes"
            placeholder="Stuck in the fence..."></textarea>
        </div>
      </div>
      <div class="form-block">
        <countPicker :obsId="obsId"></countPicker>
      </div>
      <div class="action">
        <button class="button" 
          @click="upload"
          :class="{ deactivated: !obsIsValid }">Upload</button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import imagePicker from './imagePicker';
import speciePicker from './speciePicker';
import datePicker from './datePicker';
import countPicker from './countPicker';
import extraInfo from './extraInfo';

export default {
  name: 'generalObservation',
  components: {
    imagePicker,
    speciePicker,
    datePicker,
    countPicker,
    extraInfo,
  },
  props: {
    observationId: {
      type: [Number, String],
      default () { return undefined; },
    },
  },
  // data () {
  //   return {
  //     obsId: Number(this.observationId),
  //   };
  // },
  computed: {
    ...mapGetters([
      'allitems',
    ]),
    obsId () {
      return Number(this.observationId);
    },
    activeDraft () {
      const draft = this.allitems.find(item => item.id === this.obsId);
      return draft;
    },
    taxonomy () {
      const draftObservation = this.activeDraft;
      return draftObservation
        ? draftObservation.taxonomy
        : null;
    },
    taxonId () {
      return this.taxonomy
        ? this.taxonomy.taxonId
        : null;
    },
    commonName () {
      const draft = this.activeDraft;
      return draft
        ? draft.taxonomy.commonName
        : null;
    },
    scientificName () {
      const draft = this.activeDraft;
      return draft
        ? draft.taxonomy.scientificName
        : null;
    },
    coordinates () {
      const draft = this.activeDraft;
      if (!draft || !draft.position) return null;
      return (draft.position.latitude && draft.position.longitude)
        ? draft.position
        : null;
    },
    latitude () {
      return this.coordinates
        ? this.coordinates.latitude
        : null;
    },
    longitude () {
      return this.coordinates
        ? this.coordinates.longitude
        : null;
    },
    locationDescription () {
      return this.activeDraft.position.description;
    },
    obsIsValid () {
      const draft = this.activeDraft;
      if (!draft) return true;
      if (draft.taxonomy.taxonId !== null
        && draft.position.latitude !== null
        && draft.position.longitude !== null
        && draft.datetime !== null) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions([
      'createObservation',
    ]),
    navigateTo (routeName) {
      this.$router.push({ name: routeName, params: { obsId: this.obsId } });
    },
    upload () {
      console.log('uploading start');
      this.$store.dispatch('uploadObservation', { observation: this.activeDraft });
    },
  },
  mounted: async function mountedEvent () {
    if (this.observationId === undefined) {
      const observationId = await this.createObservation();
      // this.obsId = newObsId;
      console.log(`new draft created ${observationId}`);
      this.$router.replace({ name: 'GeneralObs', params: { observationId } });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.general-observation {
  margin: .5rem;
}

.specie-lookup {
  margin: 1rem 1rem .5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
}

.specie-lookup div:first-child {
  display: flex;
  align-items: center;
}

.specie-lookup-text {
  margin-left: .5rem;
}

.location-picker {
  margin: 1rem 1rem .5rem 1rem;
  display: flex;
  justify-content: space-between;
}

.location-picker div:first-child {
  display: flex;
  align-items: center;
}

.location-picker-initial-text {
  margin-left: .5rem;
  display: flex;
}
.form-block {
  border-bottom: 0.05rem solid rgba(32, 22, 71, 0.3);
  margin: .5rem 0 .5rem;
  padding-bottom: .5rem;
}

.action {
  display: flex;
  width: 100%;
  justify-content: center;
}

.button {
  box-shadow: 
    0 2px 2px 0 rgba(0,0,0,0.14),
    0 1px 5px 0 rgba(0,0,0,0.12),
    0 3px 1px -2px rgba(0,0,0,0.2);
}

.deactivated {
  box-shadow: none;
  background-color: #c9c9c9;
}

.textarea {
  box-sizing: border-box;
  width: 100%;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  border: 1px #D2D6DF solid;
  border-radius: 3px;
  color: #45494E;
  background-color: #fff;
  font-size: 16px;
  line-height: 16px;
  height: 5rem;
}

.navigation {
  display: flex;
  justify-content: space-around;
}

</style>
