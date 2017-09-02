<template>
  <li class="specie-li">
    <div class="avatar">
      <img :src="imageSource">
    </div>
    <div class="text-container">
      <div class="taxonomy">
      <div class="top-row">
        <p class="common-name">{{commonName}}</p>
        <p v-if="conservationStatus" class="status">{{conservationStatus}}</p>
      </div>
        <p>{{scientificName}}</p>
      </div>
    </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    commonName: {
      type: String,
      default () { return ''; },
    },
    conservationStatus: {
      type: String,
      default () { return false; },
    },
    scientificName: {
      type: String,
      default () { return ''; },
    },
    imageSource: {
      type: String,
      default () { return ''; },
    },
  },
  methods: {
  },
  computed: {

  },
};
</script>

<style scoped>
.specie-li {
  display: flex;
  align-items: center;
  height: 15vh;
  padding: .5rem;
}

.text-container {
  display: flex;
  flex-direction: column; 
  justify-content: space-between;
  flex: 1;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 25vw;
  min-width: 25vw;
  height: 100%;
  max-height: 100%;
  margin-right: .5rem;
}

.avatar img {
  height: auto;
  max-width: 100%;
  max-height: 100%;
  mix-blend-mode: multiply;
}

.taxonomy {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  white-space: normal;
}

.common-name {
  font-size: 1.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.top-row {
  white-space: nowrap;
  display: flex;
  justify-content: space-between;
}

.observation {
  display: flex;
  justify-content: space-between;
}

.observation p:first-child {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status {
  background-color: #cedc00;
  padding: 0 5px 0 5px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
