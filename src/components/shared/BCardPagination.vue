<template>
  <b-card
    :key="key"
    v-for="(item, key) in items"
    :title="item.name"
    :subtitle="{
      first: `Flight number ${item.flight_number}`,
      second: item.date_utc.replace('T', ' · ').replace(':00.000Z', ''),
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
import { ref } from "vue";
import BCard from "@/components/app/BCard";
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
    const state = {
      currentPage: ref(1),
      totalPages: Math.ceil(props.records / props.perPage),
      items: ref(props.data.slice(0, props.perPage)),
    };

    const handleClickButton = (id) => {
      if (id === "next") {
        state.currentPage.value++;
      } else if (id === "prev") {
        state.currentPage.value--;
      } else {
        state.currentPage.value = parseInt(id);
      }
      const start = (state.currentPage.value - 1) * props.perPage;
      const end = start + props.perPage;
      state.items.value = props.data.slice(start, end);
      const scroll = document.getElementById("scroll");
      scroll.scrollIntoView({ behavior: "smooth" });
    };

    return { ...state, handleClickButton };
  },
};
</script>

<style lang="scss" scoped>
button {
  color: #ffffff;
  background: none;
  border: none;
  font-family: "Roboto slab", serif;
  font-size: 1.5em;
  cursor: pointer;
  outline: none;
  margin: 0.2em;

  &.active {
    color: #5481af;
  }

  &#next {
    font-size: 3em;
    vertical-align: sub;
  }

  &#prev {
    font-size: 3em;
    vertical-align: sub;
  }

  &:hover {
    color: #5481af;
  }
}
</style>
