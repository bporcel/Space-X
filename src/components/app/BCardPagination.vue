<template>
  <b-card
    :key="key"
    v-for="(item, key) in items"
    :title="item.name"
    :subtitle="{
      first: `Flight number ${item.flight_number}`,
      second: item.date_utc,
    }"
    :img="item.links.patch.small"
    :description="item.details"
    :additionalInfo="[
      {
        text: 'Rocket: ',
        data: rockets.find((rocket) => rocket.id === item.rocket).name,
      },
      {
        text: 'Mission status: ',
        data: item.success
          ? 'Success'
          : item.success === false
          ? 'Failure'
          : 'Yet unknown',
      },
    ]"
    :links="[
      { url: item.links.webcast, text: 'Watch on youtube' },
      { url: item.links.article, text: 'Read the full article' },
      { url: item.links.reddit.campaign, text: 'Campaign in Reddit' },
    ]"
  />

  <button
    id="prev"
    v-on:click="(e) => currentPage > 1 && handleClickButton(e.currentTarget.id)"
  >
    &lt;
  </button>
  <button
    :key="i"
    :id="i"
    v-for="i in totalPages"
    v-on:click="(e) => handleClickButton(e.currentTarget.id)"
    :class="i === currentPage && 'active'"
  >
    {{ i }}
  </button>
  <button
    id="next"
    v-on:click="
      (e) => currentPage < totalPages && handleClickButton(e.currentTarget.id)
    "
  >
    &gt;
  </button>
</template>

<script>
import { reactive, toRefs } from "vue";
import BCard from "@/components/shared/BCard";
export default {
  name: "b-card-pagination",
  components: { BCard },
  props: {
    records: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    rockets: {
      type: Array,
    },
  },
  setup(props) {
    const state = reactive({
      currentPage: 1,
      items: props.data.slice(0, props.perPage),
    });

    const totalPages = Math.ceil(props.records / props.perPage);

    const handleClickButton = (id) => {
      if (id === "next") {
        state.currentPage++;
      } else if (id === "prev") {
        state.currentPage--;
      } else {
        state.currentPage = parseInt(id);
      }
      const start = (state.currentPage - 1) * props.perPage;
      const end = start + props.perPage;
      state.items = props.data.slice(start, end);
      const scroll = document.getElementById("scroll");
      scroll.scrollIntoView({ behavior: "smooth" });
    };

    return { ...toRefs(state), totalPages, handleClickButton };
  },
};
</script>

<style lang="scss" scoped>
button {
  font-family: "Roboto slab", serif;
  font-size: 1.1em;
  color: $white;
  background: none;
  border: none;
  outline: none;
  margin: 0.2em;
  cursor: pointer;

  &.active {
    color: $brown;
  }

  &:hover {
    color: $brown;
  }

  &#next {
    font-size: 1.5em;
  }

  &#prev {
    font-size: 1.5em;
  }
}
</style>
