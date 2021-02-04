<template>
  <div class="card">
    <p class="title">{{ title }}</p>
    <p>
      {{ subtitle.first
      }}<span class="subtitleSecond">{{ subtitle.second }}</span>
    </p>
    <div :class="img ? 'grid' : ''">
      <img v-if="img" :src="img" :alt="title" />
      <div>
        <p class="description">{{ description }}</p>
        <p
          class="additionalInfo"
          :key="key"
          v-for="(info, key) in additionalInfo"
        >
          <strong>{{ info.text }}</strong
          ><span
            :class="
              info.data === 'Success'
                ? 'success'
                : info.data === 'Failure'
                ? 'failure'
                : 'unknown'
            "
            >{{ info.data }}</span
          >
        </p>
        <p class="links">
          <a :key="key" v-for="(link, key) in filteredLinks" :href="link.url">{{
            link.text
          }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "b-card",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: Object,
      required: true,
    },
    description: {
      type: String,
    },
    additionalInfo: {
      type: Array,
      required: true,
    },
    links: {
      type: Array,
      required: true,
    },
    img: {
      type: String,
    },
  },
  setup(props) {
    const filteredLinks = props.links.filter((link) => link.url !== null);
    return { filteredLinks };
  },
};
</script>

<style lang="scss">
.card {
  background-color: $white;
  color: $darkBlue;
  border-radius: 0.1em;
  padding: 1em;
  margin: 2em 0;

  & p {
    margin: 0 0 1em 0;
  }
}
</style>

<style lang="scss" scoped>
.card {
  & .title {
    font-size: 1.3em;
    margin-bottom: 0;
    font-weight: bold;
  }

  & .subtitleSecond {
    color: $lightGray;
    &::before {
      content: "\2022";
      padding: 1em;
    }
  }

  & .grid {
    display: grid;
    grid-template-columns: 0.15fr 1fr;
    grid-template-rows: auto;
  }

  & img {
    width: 100px;
  }

  & .description {
    margin-right: 1em;
  }

  & .additionalInfo {
    margin-bottom: 0;

    & .success {
      color: $green;
    }

    & .failure {
      color: $red;
    }

    & .unknown {
      color: $purple;
    }
  }

  & .links {
    margin: 1em 0;

    & a {
      text-decoration: none;
      color: $blue;
      padding-right: 1em;

      &:hover {
        color: $lightBlue;
      }

      &::before {
        content: "\2022";
        padding: 1em 0.3em 1em 0;
      }
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
      padding: 0 0 1em 0;
    }

    & a {
      display: inline;
    }
  }
}

@media screen and (max-width: 700px) {
  .card {
    & a {
      padding: .5em 0;
      margin: .5em 0;
      display: block;
    }
  }
}

@media screen and (max-width: 450px) {
  .card {
    & .subtitleSecond {
      display: block;
      &::before {
        content: none;
      }
    }
  }
}
</style>
