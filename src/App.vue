<template>
  <b-header />
  <h1 class="title">Space-x launch missions</h1>
  <div class="grid">
    <div class="cardWrapper">
      <router-view />
    </div>
    <div class="counter">
      <b-counter />
    </div>
  </div>
  <transition name="fade" mode="out-in">
    <b-pop-up v-if="showPopUp" :handleClick="handleClickClosePopup" />
  </transition>
</template>

<script>
import { onMounted, ref } from "vue";
import BHeader from "@/components/shared/BHeader";
import BCounter from "@/components/app/BCounter";
import BPopUp from "@/components/app/BPopUp";
export default {
  name: "App",
  components: {
    BCounter,
    BHeader,
    BPopUp,
  },
  setup() {
    const showPopUp = ref(false);

    const handleClickClosePopup = () => {
      showPopUp.value = false;
    };

    onMounted(() => {
      window.setTimeout(() => {
        showPopUp.value = true;
      }, 20000);
    });

    return { showPopUp, handleClickClosePopup };
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 700ms;
}

.title {
  margin-top: 2.5em;
  font-size: 3em;
}

.grid {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 0.33fr;
  align-items: start;
  grid-gap: 10em;
}

@media screen and (max-width: 1200px) {
  .grid {
    grid-template-rows: auto auto;
    grid-template-columns: auto;
    grid-template-areas:
      "counter"
      "cardWrapper";
    grid-gap: 2em;
  }

  .counter {
    grid-area: counter;
  }

  .cardWrapper {
    grid-area: cardWrapper;
  }
}
</style>

<style lang="scss">
body {
  background-color: $darkBlue;
}

#app {
  font-family: "Roboto slab", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $white;
  margin: 2% 20% 2% 10%;
  letter-spacing: 0.1em;
}

.link {
  color: $white;
  text-decoration: none;

  &:hover {
    color: $blue;
  }

  &.active {
    color: $blue;
  }
}

.bullet::after {
  content: "\2022";
  padding: 1em;
  color: #ffffff;
}

@media screen and (max-width: 1800px) {
  #app {
    margin: 1em;
  }
}
</style>
