<template>
  <div class="card">
    <p>Flight number {{ launch.flight_number }}</p>
    <div class="grid">
      <img v-if="launch.links.patch.small" :src="launch.links.patch.small" />
      <div>
        <p v-if="launch.details">{{ launch.details }}</p>
        <p v-else>No details</p>
        <br />
        <p>
          <a
            v-if="launch.links.webcast"
            :href="launch.links.webcast"
            target="_blank"
            >Watch on YouTube</a
          >
          <a
            v-if="launch.links.article"
            :href="launch.links.article"
            target="_blank"
            >Read the full article</a
          >
          <a
            v-if="launch.links.reddit.campaign"
            :href="launch.links.reddit.campaign"
            target="_blank"
            >Check it out on Reddit</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "b-card-small",
  props: {
    launch: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  background-color: #ffffff;
  color: #2c3e50;
  border: solid 1px #f3f3f3;
  border-radius: 0.1em;
  margin: 1em 0;
  padding: 1em;

  & img {
    width: 100px;
  }

  & a {
    text-decoration: none;
    color: #2c3e50;
    padding-right: 1em;
    margin-top: 1em;

    &:hover {
      color: #5481af;
    }

    &::before {
      content: "\2022";
      padding: 1em 1em 1em 0;
    }
  }

  & .grid {
    display: grid;
    grid-template-columns: 0.15fr 1fr;
    grid-template-rows: auto;
  }

  & p {
    margin: 0 0 1em 0;
  }
}

@media screen and (max-width: 900px) {
  .card {
    & .grid {
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: 0.15fr 1fr;
    }

    & img {
      justify-self: center;
    }
  }
}
</style>
