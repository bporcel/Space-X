<template>
  <Home />
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
body {
  background-color: #2c3e50;
}

#app {
  font-family: 'Roboto slab', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  margin: 2% 30% 2% 10%;
  letter-spacing: .1em;
}

.title {
  font-size: 3em;
}


@media screen and (max-width: 900px) {
  #app {
    margin: 1em;
  }
}
</style>
