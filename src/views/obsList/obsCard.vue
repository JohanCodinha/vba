<template>
  <card>
    <dl slot="content"
      @click="$router.push({ name: 'survey', params: { surveyId } })">
      <dt>Site name</dt>
      <dd>{{siteName}}</dd>
      <dt>Survey ID</dt>
      <dd>{{surveyId}}</dd>
      <dt>Status</dt>
      <dd>{{status}}</dd>
    </dl>
    <div slot="reveal">
      <a class="btn_ red_"
        @click='deleteRecord(surveyId)'>Delete
        <!-- <i class="material-icons right">delete</i> -->
      </a>
      <a class="btn_"
        @click=''>Edit</a>
    </div>
  </card>
</template>

<script>
import card from '@/views/components/card';

export default {
  name: 'observation-card',
  components: {
    card,
  },
  data () {
    return {
    };
  },
  props: {
    siteName: {
      type: String,
      default () { return undefined; },
    },
    status: {
      type: String,
      default () { return undefined; },
    },
    surveyId: {
      type: Number,
      default () { return undefined; },
    },
  },
  computed: {
    // ...mapGetters({
    //   generalObs: 'general',
    // }),
  },
  methods: {
    // ...mapActions([
    // ]),
    deleteRecord (surveyId) {
      this.$store.dispatch('deleteSurvey', surveyId);
    },
  },
};
</script>

<style scoped>

</style>
