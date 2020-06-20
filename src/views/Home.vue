<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    {{ health.alive }}
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import {API_BASE_URL} from "../utils/axios-helper";

export default {
  name: 'Home',
  components: {

  },
  data() {
    return {
      health: {}
    }
  },
  mounted() {
    this.getHealth();
  },
  methods: {
    getHealth() {
      const filter = '';
      axios
        .get(API_BASE_URL + 'health/' + filter)
        .then(response => {
          console.log('roger that', response.data);
          this.health = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
</script>
