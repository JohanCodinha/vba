import axios from 'axios';

const apiUrl = 'http://54.66.166.195/api';

const searchSpecies = query => axios
  .get(`${apiUrl}/search`, {
    params: {
      query,
    },
  })
  .then(res => res.data)
  .catch(error => console.log(error.message));

export default searchSpecies;
