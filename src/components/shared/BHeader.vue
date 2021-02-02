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
  background-color: $darkBlue;
  width: 100%;
  top: 0;
  padding: 2em 0;
}
</style>
