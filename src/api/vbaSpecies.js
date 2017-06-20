import axios from 'axios';

const apiUrl = 'https://vbaspecies.herokuapp.com';

const searchSpecies = query => axios
  .get(`${apiUrl}/species/search`, {
    params: {
      q: query,
    },
  })
  .then(res => res.data)
  .catch(error => console.log(error.message));

export default searchSpecies;
