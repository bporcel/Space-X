<template>
  <h2>Mission's status</h2>
  <div v-if="fetching">Fetching flights</div>
  <div v-else-if="error">An error occurred</div>
  <div v-else class="card">
    <p><strong>Total flights:</strong> {{ totalFlights }}</p>
    <p><strong>Succesfull flights:</strong> {{ successfullFlights }}</p>
    <p><strong>Failures:</strong> {{ failures }}</p>
    <p><strong>Upcoming flights:</strong> {{ upcommingFlights }}</p>
  </div>
</template>

<script>
import { toRefs, reactive, onBeforeMount } from "vue";
import { getPastFlights, getUpcommingFlights } from "@/service/getFlights";
export default {
  name: "b-counter",
  props: {},
  setup() {
    const state = reactive({
      totalFlights: 0,
      successfullFlights: 0,
      failures: 0,
      upcommingFlights: 0,
      fetching: false,
      error: false,
    });

    onBeforeMount(() => {
      state.fetching = true;
      getPastFlights()
        .then((res) => {
          state.successfullFlights = res.reduce(reducer, 0);
          state.totalFlights = res.length;
          state.failures = state.totalFlights - state.successfullFlights;
        })
        .catch(() => {
          state.error = true;
        })

      getUpcommingFlights()
        .then((res) => {
          state.upcommingFlights = res.length;
        })
        .catch(() => {
          state.error = true;
        })
        .finally(() => {
          state.fetching = false;
        });
    });

    const reducer = (acc, currentLaunch) =>
      currentLaunch.success ? acc + 1 : acc;

    return { ...toRefs(state) };
  },
};
</script>
