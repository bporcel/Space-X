<template>
  <div class="card">
    <p><strong>Total flights:</strong> {{ totalFlights }}</p>
    <p><strong>Succesfull flights:</strong> {{ succesFullFlights }}</p>
    <p><strong>Failures:</strong> {{ totalFlights - succesFullFlights }}</p>
    <p v-if="fetching">Fetching upcoming flights</p>
    <p v-else-if="error">An error occurred</p>
    <p v-else>
      <strong>Upcoming flights:</strong> {{ upcomingLaunches.length }}
    </p>
  </div>
</template>

<script>
import useFetch from "@/hooks/useFetch";

export default {
  name: "b-counter",
  props: {
    totalFlights: {
      type: Number,
      required: true,
    },
    succesFullFlights: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const upcomingUrl = "https://api.spacexdata.com/v4/launches/upcoming";
    const { response: upcomingLaunches, error, fetching, fetchData } = useFetch(
      upcomingUrl
    );
    fetchData();
    return { upcomingLaunches, error, fetching };
  },
};
</script>

<style scoped></style>
