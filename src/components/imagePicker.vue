<template>
  <div class="imagePicker">
   <ul>
     <li v-for="thumbnail in thumbnails">
       <img :src="thumbnail">
     </li>
     <li>
      <input type="file" name="imagePicker" id="imagePicker" class="inputFile"
        multiple
        @change="onFileChange">
      <label for="imagePicker">+</label>
     </li>
   </ul>
  </div>
</template>

<script>
import Exif from 'exif-js';

export default {
  name: 'imagePicker',
  data () {
    return {
      files: [],
    };
  },
  methods: {
    onFileChange (e) {
      const files = e.target.files;
      if (!files.length) {
        return;
      }
      [...files].forEach((file) => {
        this.getCoordinates(file)
          .then((pos) => {
            const image = {
              data: file,
              position: pos,
            };
            this.$data.files.push(image);
          });
      });
    },
    getCoordinates (file) {
      function getExif (image) {
        return new Promise((resolve, reject) => {
          Exif.getData(image, function exifCallback () {
            const latitude = Exif.getTag(this, 'GPSLatitude');
            const latitudeRef = Exif.getTag(this, 'GPSLatitudeRef');
            const longitude = Exif.getTag(this, 'GPSLongitude');
            const longitudeRef = Exif.getTag(this, 'GPSLongitudeRef');
            if (typeof longitude === 'undefined'
              || typeof latitude === 'undefined') reject(new Error('no gps data found in exif'));
            resolve({ latitude, latitudeRef, longitude, longitudeRef });
          });
        });
      }
      function ConvertDMSToDD (degrees, minutes, seconds, direction) {
        const dd = Number(degrees)
          + Number(minutes) / 60
          + Number(seconds) / (60 * 60);
        if (direction === 'S' || direction === 'W') {
          return dd * -1;
        } // Don't do anything for N or E
        return dd;
      }
      console.time('getExif');
      return getExif(file)
        .then((exif) => {
          console.timeEnd('getExif');
          const latitude = ConvertDMSToDD(
            // [Number, Number, Number] to [123, -456, 789]
            ...exif.latitude.map(n => n.valueOf()),
            exif.latitudeRef);
          const longitude = ConvertDMSToDD(
            ...exif.longitude.map(n => n.valueOf()),
            exif.longitudeRef);
          return { latitude, longitude };
        }).catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    // supportsPreview () {
    //   return window.FileReader && !!window.CanvasRenderingContext2D;
    // },
    thumbnails () {
      const files = this.$data.files;
      return files.map(image => URL.createObjectURL(image.data));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
}

li {
  display: flex;
  max-width: 20vw;
  flex-direction: column;
  justify-content: center;
  margin: .2rem;
}

a {
  color: #42b983;
}

img {
  width: 100%;
}

.imagePicker {
  display: flex;
  align-items: flex-start;
}


.inputFile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.inputFile + label {
  font-size: 1.25em;
  font-weight: 700;
  display: inline-block;
  min-width: 40px;
  min-height: 40px;
  border: 2px solid;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
