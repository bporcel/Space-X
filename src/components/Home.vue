<template>
  <p v-if="latestFetching || pastFetching || nextFetching">
    Fetching data
  </p>
  <p v-else-if="latestError || pastError || nextError">
    An error occurred fetching the latest launch.
  </p>
  <div v-else>
    <div class="flights">
      <h1>Next flight</h1>
      <b-card
        :title="nextLaunch.name"
        :subtitle="{
          first: `Flight number ${nextLaunch.flight_number}`,
          second: nextLaunch.date_utc
            .replace('T', ' · ')
            .replace(':00.000Z', ''),
        }"
        :img="nextLaunch.links.patch.small"
        :description="nextLaunch.details"
        :additionalInfo="[
          {
            text: 'Rocket: ',
            data: rockets.find((rocket) => rocket.id === nextLaunch.rocket)
              .name,
          },
          {
            text: 'Mission status: ',
            data: nextLaunch.success
              ? 'Success'
              : nextLaunch.success === false
              ? 'Failure'
              : 'Yet unknown',
          },
        ]"
        :links="[
          { url: nextLaunch.links.webcast, text: 'Watch on youtube' },
          { url: nextLaunch.links.article, text: 'Read the full article' },
          { url: nextLaunch.links.reddit.campaign, text: 'Campaign in Reddit' },
        ]"
      />
      <h1>Latest flight</h1>
      <b-card
        :title="latestLaunch.name"
        :subtitle="{
          first: `Flight number ${latestLaunch.flight_number}`,
          second: latestLaunch.date_utc
            .replace('T', ' · ')
            .replace(':00.000Z', ''),
        }"
        :img="latestLaunch.links.patch.small"
        :description="latestLaunch.details"
        :additionalInfo="[
          {
            text: 'Rocket: ',
            data: rockets.find((rocket) => rocket.id === latestLaunch.rocket)
              .name,
          },
          {
            text: 'Mission status: ',
            data: latestLaunch.success
              ? 'Success'
              : latestLaunch.success === false
              ? 'Failure'
              : '',
          },
        ]"
        :links="[
          { url: latestLaunch.links.webcast, text: 'Watch on youtube' },
          { url: latestLaunch.links.article, text: 'Read the full article' },
          {
            url: latestLaunch.links.reddit.campaign,
            text: 'Campaign in Reddit',
          },
        ]"
      />
      <div id="scroll"></div>
      <h1>Past flights</h1>
      <b-card-pagination
        :records="pastLaunches.length"
        :perPage="5"
        :data="pastLaunches"
        :rockets="rockets"
      />
    </div>
  </div>
</template>
<script>
import useFetch from "@/hooks/useFetch";
import BCard from "@/components/app/BCard";
import BCardPagination from "@/components/shared/BCardPagination";

export default {
  name: "Home",
  components: {
    BCard,
    BCardPagination,
  },
  setup() {
    const latestLaunchUrl = "https://api.spacexdata.com/v4/launches/latest";
    const pastLaunchesUrl = "https://api.spacexdata.com/v4/launches/past";
    const nextLaunchUrl = "https://api.spacexdata.com/v4/launches/next";
    const rocketsUrl = "https://api.spacexdata.com/v4/rockets";

    const {
      response: rockets,
      error: rocketsError,
      fetching: rocketsFetching,
      fetchData: rocketsFetch,
    } = useFetch(rocketsUrl);
    rocketsFetch();

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
      rockets,
      rocketsError,
      rocketsFetching,
    };
  },
};
</script>
