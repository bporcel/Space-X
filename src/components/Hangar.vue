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
import BCard from "@/components/shared/BCard";
import { getAllRockets } from "@/service/getRockets";
import { onBeforeMount, reactive, toRefs } from "vue";
export default {
  name: "Hangar",
  components: { BCard },
  setup() {
    const state = reactive({
      rockets: [],
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
        })
        .finally(() => {
          state.fetching = false;
        });
    });

    return { ...toRefs(state) };
  },
};
</script>
