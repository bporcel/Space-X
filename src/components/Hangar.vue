<template>
  <h1>Hangar</h1>
  <div v-if="fetching">Fetching data</div>
  <div v-else-if="error">An error occurred</div>
  <div v-else>
    <b-card
      :key="key"
      v-for="(rocket, key) in rockets"
      :title="rocket.name"
      :subtitle="{ first: `First flight`, second: `${rocket.first_flight}` }"
      :description="rocket.description"
      :additionalInfo="[
        { text: 'Height (m): ', data: rocket.height.meters },
        { text: 'Diameter (m): ', data: rocket.diameter.meters },
        { text: 'Mass (kg): ', data: rocket.mass.kg },
        { text: 'Cost per launch ($): ', data: rocket.cost_per_launch },
      ]"
      :links="[{ url: rocket.wikipedia, text: 'Read more in Wikipedia' }]"
    />
  </div>
</template>

<script>
import BCard from "@/components/app/BCard";
import useFetch from "@/hooks/useFetch";
export default {
  name: "Hangar",
  components: { BCard },
  setup() {
    const rocketsUrl = "https://api.spacexdata.com/v4/rockets";
    const { response: rockets, error, fetching, fetchData } = useFetch(
      rocketsUrl
    );
    fetchData();
    return { rockets, error, fetching };
  },
};
</script>

<style scoped></style>
