<template>
  <header>
    <router-link
      :class="`link ${route.fullPath === '/' ? 'active' : ''}`"
      :to="{ name: 'Home' }"
      >Home</router-link
    ><span class="bullet" /><router-link
      :class="`link ${route.fullPath === '/hangar' ? 'active' : ''}`"
      :to="{ name: 'Hangar' }"
      >Hangar</router-link
    >
  </header>
  <h1 class="title">Space-x launch missions</h1>
  <div class="grid">
    <div class="cardWrapper">
      <router-view />
    </div>
    <div class="counter">
      <h1>Counter</h1>
      <div class="card" v-if="pastFetching || upcomingFetching">
        <p>Fetching data</p>
      </div>
      <div class="card" v-else-if="pastError || upcomingError">
        <p>An error occurred</p>
      </div>

      <b-counter
        v-if="
          !pastError && !upcomingError && !pastFetching && !upcomingFetching
        "
        :totalFlights="pastResponse.length"
        :successfullFlights="pastResponse.reduce(reducer, 0)"
        :upcomingFlights="upcomingFlights.length"
      />
    </div>
  </div>
</template>

<script>
import BCounter from "@/components/app/BCounter";
import getPastFlights from "@/http/getPastFlights";
import getUpcomingFlights from "@/http/getUpcomingFlights";
import { useRoute } from "vue-router";
export default {
  name: "App",
  components: {
    BCounter,
  },
  setup() {
    const route = useRoute();

    const reducer = (acc, currentLaunch) =>
      currentLaunch.success ? acc + 1 : acc;

    const {
      response: pastResponse,
      error: pastError,
      fetching: pastFetching,
      fetchData: pastFetch,
    } = getPastFlights();
    pastFetch();

    const {
      response: upcomingFlights,
      error: upcomingError,
      fetching: upcomingFetching,
      fetchData: upcominfFetch,
    } = getUpcomingFlights();
    upcominfFetch();

    return {
      pastResponse,
      pastError,
      pastFetching,
      reducer,
      upcomingFlights,
      upcomingError,
      upcomingFetching,
      route,
    };
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 0.33fr;
  align-items: start;
  grid-gap: 10em;
}

header {
  position: fixed;
  background-color: #2c3e50;
  width: 100%;
  top: 0;
  padding: 2em 0;
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
  margin-top: 2em;
  font-size: 3em;
}

.link {
  color: #ffffff;
  text-decoration: none;

  &:hover {
    color: #5481af;
  }

  &.active {
    color: #5481af;
  }
}

.bullet::after {
  content: "\2022";
  padding: 1em;
  color: #ffffff;
}

.card {
  background-color: #ffffff;
  color: #2c3e50;
  border: solid 1px #f3f3f3;
  border-radius: 0.1em;
  margin: 1em 0;
  padding: 1em;

  & img {
    width: 100px;
  }

  & .grid {
    display: grid;
    grid-template-columns: 0.15fr 1fr;
    grid-template-rows: auto;
  }

  & p {
    margin: 0 0 1em 0;
  }

  & .subtitleSecond {
    color: #858585;
    &::before {
      content: "\2022";
      padding: 1em;
    }
  }

  & .name {
    font-size: 1.3em;
    margin-bottom: 0;
    font-weight: bold;
  }
}

@media screen and (max-width: 1800px) {
  #app {
    margin: 1em;
  }
}

@media screen and (max-width: 450px) {
  .card {
    & .subtitleSecond {
      display: block;
      &::before {
        content: none;
      }
    }

    & a {
      display: block;
    }
  }
}
</style>
