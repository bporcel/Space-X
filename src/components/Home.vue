<template>
  <teleport to="head">
    <title>SpaceX flight missions</title>
  </teleport>
  <p v-if="fetching">
    Fetching data
  </p>
  <p v-else-if="error">
    An error occurred fetching the latest launch.
  </p>
  <div
    v-else-if="
      rockets.length > 0 && nextFlight && latestFlight && pastFlights.length > 0
    "
  >
    <div class="flights">
      <h2>Next flight</h2>
      <b-card
        :title="nextFlight.name"
        :subtitle="{
          first: `Flight number ${nextFlight.flight_number}`,
          second: nextFlight.date_utc,
        }"
        :img="nextFlight.links.patch.small"
        :description="nextFlight.details"
        :additionalInfo="[
          {
            text: 'Rocket: ',
            data: rockets.find((rocket) => rocket.id === nextFlight.rocket)
              .name,
          },
          {
            text: 'Mission status: ',
            data: nextFlight.success
              ? 'Success'
              : nextFlight.success === false
              ? 'Failure'
              : 'Yet unknown',
          },
        ]"
        :links="[
          { url: nextFlight.links.webcast, text: 'Watch on youtube' },
          { url: nextFlight.links.article, text: 'Read the full article' },
          { url: nextFlight.links.reddit.campaign, text: 'Campaign in Reddit' },
        ]"
      />
      <h2>Latest flight</h2>
      <b-card
        :title="latestFlight.name"
        :subtitle="{
          first: `Flight number ${latestFlight.flight_number}`,
          second: latestFlight.date_utc,
        }"
        :img="latestFlight.links.patch.small"
        :description="latestFlight.details"
        :additionalInfo="[
          {
            text: 'Rocket: ',
            data: rockets.find((rocket) => rocket.id === latestFlight.rocket)
              .name,
          },
          {
            text: 'Mission status: ',
            data: latestFlight.success
              ? 'Success'
              : latestFlight.success === false
              ? 'Failure'
              : '',
          },
        ]"
        :links="[
          { url: latestFlight.links.webcast, text: 'Watch on youtube' },
          { url: latestFlight.links.article, text: 'Read the full article' },
          {
            url: latestFlight.links.reddit.campaign,
            text: 'Campaign in Reddit',
          },
        ]"
      />
      <div id="scroll"></div>
      <h2>Past flights</h2>
      <b-card-pagination
        :records="pastFlights.length"
        :perPage="5"
        :data="pastFlights"
        :rockets="rockets"
      />
    </div>
  </div>
</template>
<script>
import { onBeforeMount, reactive, toRefs } from "vue";
import { getPastFlights, getNextFlight } from "@/service/getFlights";
import { getAllRockets } from "@/service/getRockets";
import BCard from "@/components/shared/BCard";
import BCardPagination from "@/components/app/BCardPagination";

export default {
  name: "Home",
  components: {
    BCard,
    BCardPagination,
  },
  setup() {
    const state = reactive({
      rockets: [],
      pastFlights: [],
      nextFlight: {},
      latestFlight: {},
      fetching: false,
      error: false,
    });

    onBeforeMount(() => {
      state.fetching = true;
      getAllRockets()
        .then((res) => {
          state.rockets = res;
        })
        .catch(() => {
          state.error = true;
        });

      getPastFlights()
        .then((res) => {
          state.pastFlights = res;
          state.pastFlights.reverse();
          state.latestFlight = res[0];
          state.pastFlights = state.pastFlights.slice(1);
        })
        .catch(() => {
          state.error = true;
        });

      getNextFlight()
        .then((res) => {
          state.nextFlight = res;
        })
        .catch(() => {
          state.error = true;
        })
        .finally(() => {
          state.fetching = false;
        });
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
