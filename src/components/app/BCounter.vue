<template>
  <div class="card">
    <p><strong>Total flights:</strong> {{ totalFlights }}</p>
    <p><strong>Succesfull flights:</strong> {{ successfullFlights }}</p>
    <p><strong>Failures:</strong> {{ totalFlights - successfullFlights }}</p>
    <p><strong>Upcoming flights:</strong> {{ upcomingFlights }}</p>
  </div>
</template>

<script>
export default {
  name: "b-counter",
  props: {
    totalFlights: {
      type: Number,
      required: true,
    },
    successfullFlights: {
      type: Number,
      required: true,
    },
    upcomingFlights: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped></style>
