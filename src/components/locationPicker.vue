<template>
  <div class="location-picker">
  <div id="map" class="mapboxgl-map">
    <div class="location-display">
      <a href="#" @click="$router.go(-1)">⬅</a>
      <div>
        <p>latitude: {{markerLatitude}}</p>
        <p>longitude: {{markerLongitude}}</p>
      </div>
    </div>
    <img class="center-marker" :style="{ left: markerLeft, top: markerTop}" src="https://image.flaticon.com/icons/png/128/8/8168.png">
    <div v-show="showButton" class="validate-location actions">
      <button class="action-button" @click="pickLocation">
        {{buttonMessage}}
      </button>
      <button v-show="coordinates" class="action-button" @click="revertLocation">
        revert
      </button>
    </div>
  </div>
    <div v-if="coordinates && false">
      <p>{{coordinates.latitude}}</p>
      <p>{{coordinates.longitude}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import mapboxgl from 'mapbox-gl';
import mapboxToken from './token';

export default {
  name: 'locationPicker',
  data () {
    return {
      centerMarker: {
        x: null,
        y: null,
      },
      mapCenter: {
        lng: null,
        lat: null,
      },
      moved: false,
    };
  },
  props: {
    obsId: {
      type: Number,
      default () { return undefined; },
    },
  },
  computed: {
    ...mapGetters([
      'activeDraft',
    ]),
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
    markerLongitude () {
      const value = this.mapCenter.lng || this.longitude;
      return value
        ? value.toString().slice(0, 10)
        : value;
    },
    markerLatitude () {
      const value = this.mapCenter.lat || this.latitude;
      return value
        ? value.toString().slice(0, 10)
        : value;
    },
    markerTop () {
      // 48 px is height of the pin image
      return `${this.centerMarker.y - 48}px`;
    },
    markerLeft () {
      // 24 px is half of pin image
      return `${this.centerMarker.x - 24}px`;
    },
    zoom () {
      const zoom = this.coordinates
        ? 12
        : 5;
      return zoom;
    },
    buttonMessage () {
      return 'Validate Location';
    },
    showButton () {
      return this.$data.moved;
    },
  },
  methods: {
    ...mapActions([
      'selectSpecie',
    ]),
    pickLocation () {
      const location = this.$data.mapCenter;
      const obsId = this.activeDraft.id;
      const { lat: latitude, lng: longitude } = location;
      this.$data.moved = false;
      this.$store.dispatch('saveLocation', { latitude, longitude, obsId });
      console.log(JSON.stringify({ latitude, longitude, obsId }));
    },
    revertLocation () {
      const center = [this.longitude, this.latitude];
      this.$data.map.flyTo({
        center,
        zoom: 12,
      });
      this.$data.map.fire('flystart');
      this.$data.moved = false;
    },
    createMap () {
      const data = this.$data;
      const vicCenterlat = -37.228263;
      const vicCenterlon = 145.406267;
      const lat = this.latitude || vicCenterlat;
      const lon = this.longitude || vicCenterlon;
      const bounds = [
        [136.713355, -44.584973], // Southwest coordinates
        [153.225627, -27.204801], // Northeast coordinates
      ];
      mapboxgl.accessToken = mapboxToken;
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/panelvw/cj4f5jcy500pw2rsetkub2wos',
        center: [lon, lat],
        zoom: this.zoom,
        maxBounds: bounds,
      });
      map.on('load', () => {
        const mapCenter = map.getCenter();
        const mapCenterInPx = map.project(map.getCenter());
        data.centerMarker = {
          x: mapCenterInPx.x,
          y: mapCenterInPx.y,
        };

        data.mapCenter = {
          lat: mapCenter.lat,
          lng: mapCenter.lng,
        };
        // disable map rotation using right click + drag
        map.dragRotate.disable();
        // disable map rotation using touch rotation gesture
        map.touchZoomRotate.disableRotation();
      });
      map.on('move', () => {
        const center = map.getCenter();
        data.mapCenter.lat = center.lat;
        data.mapCenter.lng = center.lng;
        data.moved = true;
      });

      map.on('moveend', () => {
        if (data.flying) { //eslint-disable-line
          data.moved = false;
          map.fire('flyend');
        }
      });

      map.on('flyend', () => {
        data.flying = false; //eslint-disable-line
      });

      map.on('flystart', () => {
        data.flying = true; //eslint-disable-line
      });

      this.$data.map = map;
    },
  },
  mounted () {
    this.createMap();
  },
};
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  display: flex;
  flex-direction: column;
}

li {
  display: inline-block;
  margin: .1rem;
  border: 1px solid black
}

li:hover {
  display: inline-block;
  margin: .1rem;
  border: 1px solid pink
}

a {
  color: #42b983;
}

.mapboxgl-map {
  position: relative;
  height: 100vh;
  width: 100vw;
}

.center-marker {
  position: absolute;
  z-index: 2;
  width: 48px;
}

.validate-location {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 75%;
  z-index: 2;
  box-shadow: 5px black;
  display: flex;
}

.action-button {
  padding: 1rem;
  background: purple;
  color: white;
  border: 1px;
  margin-left: 2px;
}

.location-display {
  position: absolute;
  z-index: 2;
  background: white;
  width: 90vw;
  left: 50%;
  transform: translateX(-50%);
  top: 1%;
  padding: .2rem;
  display: flex;
  font-size: 1rem;
  align-items: center;
}

.location-display a {
  font-size: 2rem;
  margin-right: 1rem;
  margin-left: .5rem;
}
</style>
