<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    {{ health.alive }}
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

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
        .get('https://rebus-leadersofdigital-2020.herokuapp.com/api/health/' + filter)
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
