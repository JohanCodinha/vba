<template>
  <div class="location-picker">
  <div id="map" class="mapboxgl-map">
    <!-- map will be mounted here -->
<!--     <div class="marker">
      <p>X</p>
    </div> -->
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
import vbaSpecies from '../api/vbaSpecies';
import mapboxToken from './token';

export default {
  name: 'locationPicker',
  // data () {
  //   return {
  //   };
  // },
  props: {
    obsId: {
      type: Number,
      default () { return undefined; },
    },
  },
  computed: {
    ...mapGetters([
      'allDrafts',
      'activeDraft',
    ]),
    coordinates () {
      if (!this.activeDraft) return null;
      return this.activeDraft.position;
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
  },
  methods: {
    ...mapActions([
      'selectSpecie',
    ]),
    searchSpecie (e) {
      const input = e.target.value;
      console.log(e.target.value);
      vbaSpecies(input)
        .then((response) => {
          console.log(response);
          this.$data.species = response;
        });
    },
    select (specie) {
      const obsId = this.obsId;
      console.log(specie, obsId);
      this.$store.dispatch('selectSpecie', { specie, obsId });
      this.$data.selection = specie;
    },
    createMap () {
      const vicCenterlat = -37.228263;
      const vicCenterlon = 145.406267;
      const lat = this.latitude || vicCenterlat;
      const lon = this.longitude || vicCenterlon;
      // const mapCenterLat = lat || vicCenterlat;
      // const mapCenterLon = lon || vicCenterlon;

      const bounds = [
        [140.779346, -39.231739], // Southwest coordinates
        [150.510827, -33.846260],  // Northeast coordinates
      ];

      mapboxgl.accessToken = mapboxToken;
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/panelvw/cj4f5jcy500pw2rsetkub2wos',
        center: [lon, lat],
        zoom: 5,
        maxBounds: bounds,
      });
      map.on('load', () => {
        const mapCenterLon = map.getCenter().lng;
        const mapCenterLat = map.getCenter().lat;
        map.addSource('center-point', {
          type: 'geojson',
          data: {
            type: 'Point',
            coordinates: [
              mapCenterLon,
              mapCenterLat,
            ],
          },
        });

        map.addLayer({
          id: 'point',
          source: 'center-point',
          type: 'circle',
          paint: {
            'circle-radius': 8,
            'circle-color': 'orange',
            'circle-opacity': 0.8,
          },
        });
        // disable map rotation using right click + drag
        map.dragRotate.disable();

        // disable map rotation using touch rotation gesture
        map.touchZoomRotate.disableRotation();
      });
      map.on('move', (e) => {
        // map.flyTo({center: [vicCenterlon, vicCenterlat]});
        const center = map.getCenter();
        console.log(center, e);
        map.getSource('center-point').setData({
          type: 'Point',
          coordinates: [
            center.lng,
            center.lat,
          ],
        });
      });
      this.map = map;
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

/*.mapboxgl-map::before {
  background: red;
  content: "";
  height: .1rem;
  left: 46vw;
  position: absolute;
  top: 50vh;
  width: 8vw;
  z-index: 1;
}

.mapboxgl-map::after {
  background: red;
  content: "";
  height: 50px;
  left: 50vw;
  position: absolute;
  top: 46.5vh;
  width: .1rem;
  z-index: 1;
}*/

/*.marker {
  background-color: transparent;
  text-align: center;
  height: 1rem;
  width: 1rem;
  margin: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  color: red;
  font-size: 2rem;
}*/
</style>
