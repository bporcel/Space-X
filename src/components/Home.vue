<template>
  <h1 class="title">Space-x launch missions</h1>
  <p v-if="latestFetching || pastFetching || nextFetching">Fetching data</p>
  <p v-else-if="latestError || pastError || nextError">
    An error occurred fetching the latest launch.
  </p>
  <div v-else class="grid">
    <div class="flights">
      <h1>Next flight</h1>
      <b-card :launch="nextLaunch" />
      <h1>Latest flight</h1>
      <b-card :launch="latestLaunch" />
      <h1>Past flights</h1>
      <b-card-pagination
        :records="pastLaunches.length"
        :perPage="4"
        :data="pastLaunches"
      />
    </div>
    <div class="counter">
      <h1>Counter</h1>
      <b-counter
        :totalFlights="pastLaunches.length + 1"
        :succesFullFlights="
          pastLaunches.reduce(reducer, latestLaunch.success ? 1 : 0)
        "
      />
    </div>
  </div>
</template>

<script>
import useFetch from "@/hooks/useFetch";
import BCard from "@/components/app/BCard";
import BCardPagination from "@/components/shared/BCardPagination";
import BCounter from "@/components/app/BCounter";

export default {
  name: "Home",
  components: {
    BCard,
    BCardPagination,
    BCounter,
  },
  setup() {
    const latestLaunchUrl = "https://api.spacexdata.com/v4/launches/latest";
    const pastLaunchesUrl = "https://api.spacexdata.com/v4/launches/past";
    const nextLaunchUrl = "https://api.spacexdata.com/v4/launches/next";

    const {
      response: latestLaunch,
      error: latestError,
      fetching: latestFetching,
      fetchData: latestFetchData,
    } = useFetch(latestLaunchUrl);
    latestFetchData();

    const {
      response: pastLaunches,
      error: pastError,
      fetching: pastFetching,
      fetchData: pastFetchData,
    } = useFetch(pastLaunchesUrl);
    pastFetchData();

    const reducer = (acc, currentLaunch) =>
      currentLaunch.success ? acc + 1 : acc;

    const {
      response: nextLaunch,
      fetching: nextFetching,
      error: nextError,
      fetchData: nextFetchData,
    } = useFetch(nextLaunchUrl);
    nextFetchData();

    return {
      latestLaunch,
      latestError,
      latestFetching,
      pastLaunches,
      pastError,
      pastFetching,
      nextLaunch,
      nextFetching,
      nextError,
      reducer,
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

@media screen and (max-width: 1800px) {
  .grid {
    grid-template-rows: auto auto;
    grid-template-columns: auto;
    grid-template-areas:
      "counter"
      "flights";
  }

  .flights {
    grid-area: flights;
  }

  .counter {
    grid-area: counter;
  }
}
</style>
