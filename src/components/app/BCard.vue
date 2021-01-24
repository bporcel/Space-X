<template>
  <div class="card">
    <p>
      Flight number {{ launch.flight_number }}
      <span class="date"
        >{{
          launch.date_utc.replace("T", " · ").replace(":00.000Z", "")
        }}
        UTC</span
      >
    </p>
    <div class="grid">
      <img v-if="launch.links.patch.small" :src="launch.links.patch.small" />
      <div>
        <p v-if="launch.details">{{ launch.details }}</p>
        <p v-else>No details</p>
        <p v-if="fetching">Fetching Rocket</p>
        <p v-else-if="error">An error occurred</p>
        <p v-else><strong>Rocket:</strong> {{ rocket.name }}</p>
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
import useFetch from "@/hooks/useFetch";
export default {
  name: "b-card",
  props: {
    launch: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const getRocketUrl = `https://api.spacexdata.com/v4/rockets/${props.launch.rocket}`;
    const { response: rocket, error, fetching, fetchData } = useFetch(
      getRocketUrl
    );
    fetchData();
    return { rocket, error, fetching };
  },
};
</script>

<style lang="scss" scoped>
.card {
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

  & .date {
    color: #858585;
    &::before {
      content: "\2022";
      padding: 1em;
    }
  }
}

@media screen and (max-width: 1400px) {
  .card {
    & a {
      display: block;
    }
  }
}

@media screen and (max-width: 1200px) {
  .card {
    & .grid {
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: 0.15fr 1fr;
    }

    & img {
      justify-self: center;
    }

    & a {
      display: inline;
    }
  }

  @media screen and (max-width: 760px) {
    .card {
      & .date {
        display: block;
        &::before {
          content: none;
        }
      }

      & a {
        display: block;
      }
    }
  }
}
</style>
