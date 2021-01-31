<template>
  <header>
    <div>
      <router-link
        :class="`link ${route.fullPath === '/' ? 'active' : ''}`"
        :to="{ name: 'Home' }"
        >Home</router-link
      ><span class="bullet" /><router-link
        :class="`link ${route.fullPath === '/hangar' ? 'active' : ''}`"
        :to="{ name: 'Hangar' }"
        >Hangar</router-link
      >
    </div>
    <a
      class="link coffee"
      href="https://www.buymeacoffee.com/bporcel"
      target="_blank"
      >Buy me a cofee <img src="~@/assets/bmac.png"
    /></a>
  </header>
</template>

<script>
import { useRoute } from "vue-router";
export default {
  name: "b-header",
  setup() {
    const route = useRoute();
    return { route };
  },
};
</script>

<style lang="scss">
header {
  position: fixed;
  background-color: #2c3e50;
  width: 100%;
  top: 0;
  padding: 2em 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  justify-content: space-between;
  grid-gap: 10em;

  & .coffee {
    width: 170px;
    & img {
      width: 25px;
      vertical-align: middle;
    }
  }
}

@media screen and (max-width: 450px) {
  header {
    grid-template-rows: auto auto;
    grid-template-columns: auto;
    grid-gap: 0.5em;
  }
}
</style>
