<template>
  <h1 class="title">Space-x launch missions</h1>
  <p v-if="latestFetching || pastFetching || nextFetching">Fetching data</p>
  <p v-else-if="latestError || pastError || nextError">
    It has been a problem fetching the latest launch.
  </p>
  <div v-else>
    <h1>Latest Launch</h1>
    <b-card-small :launch="latestLaunch" />
    <h1>Next Launch</h1>
    <b-card-small :launch="nextLaunches" />
    <h1>Past launches</h1>
    <b-card-pagination :records="pastLaunches.length" :perPage="4" :data="pastLaunches" />
  </div>
</template>

<script>
import useFetch from "@/hooks/useFetch";
import BCardSmall from "@/components/app/BCardSmall";
import BCardPagination from "@/components/shared/BCardPagination";

export default {
  name: "Home",
  components: {
    BCardSmall,
    BCardPagination,
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

    const {
      response: nextLaunches,
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
      nextLaunches,
      nextFetching,
      nextError,
    };
  },
};
</script>

<style scoped></style>
