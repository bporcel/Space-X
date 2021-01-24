<template>
  <Home />
</template>

<script>
import Home from "./components/Home.vue";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style>
body {
  background-color: #2c3e50;
}

#app {
  font-family: "Roboto slab", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  margin: 2% 20% 2% 10%;
  letter-spacing: 0.1em;
}

.title {
  font-size: 3em;
}

.card {
  background-color: #ffffff;
  color: #2c3e50;
  border: solid 1px #f3f3f3;
  border-radius: 0.1em;
  margin: 1em 0;
  padding: 1em;
}

@media screen and (max-width: 1050px) {
  #app {
    margin: 1em;
  }
}
</style>
