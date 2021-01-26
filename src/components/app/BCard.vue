<template>
  <div class="card">
    <p class="name">{{ title }}</p>
    <p>
      {{ subtitle.first
      }}<span class="subtitleSecond">{{ subtitle.second }}</span>
    </p>
    <div :class="img ? 'grid' : ''">
      <img v-if="img" :src="img" />
      <div>
        <p class="mr-1">{{ description }}</p>
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

<style lang="scss" scoped>
.success {
  color: #43a160;
}

.failure {
  color: #e4345a;
}

.unknown {
  color: #342bb1;
}

.card {
  & .additionalInfo {
    margin-bottom: 0;
  }

  & .mr-1 {
    margin-right: 1em;
  }

  & .links {
    margin: 1em 0;
  }

  & a {
    text-decoration: none;
    color: #23baf5;
    padding-right: 1em;
    margin-top: 1em;

    &:hover {
      color: #2c3e50;
    }

    &::before {
      content: "\2022";
      padding: 1em 0.3em 1em 0;
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
      display: block;
    }
  }
}
</style>
