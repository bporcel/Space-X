<template>
  <b-card-small :key="key" v-for="(item, key) in items" :launch="item" />

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
import BCardSmall from "@/components/app/BCardSmall";
export default {
  name: "b-card-pagination",
  components: { BCardSmall },
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
