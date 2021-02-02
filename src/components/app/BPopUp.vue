<template>
  <div>
    <div class="opacity" />
    <div class="pop-up card">
      <h1>Hey!</h1>
      <p>
        If you like my work consider inviting me to a
        <a
          class="beer"
          href="https://www.buymeacoffee.com/bporcel"
          target="_blank"
          >beer</a
        >
        or ...
      </p>
      <button class="close" @click="handleClick()">
        Deny my right to enjoy a cold sparky beer
      </button>
      <br />
      <br />
      <p>Here's a cookie 🍪</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "b-pop-up",
  props: {
    handleClick: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.opacity {
  position: fixed;
  background-color: $black;
  opacity: 0.7;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.pop-up {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 30%;
  padding: 0em 2em 1em 2em;
  border: solid 2px $darkBlue;

  & .beer {
    text-decoration: none;
    color: $yellow;
    transition-duration: 1s;
    font-weight: bold;
    font-size: 1.6em;
    &:hover {
      font-size: 4em;
    }
  }

  & .close {
    float: right;
    font-weight: bold;
    font-size: 1em;
    color: $darkBlue;
    border: none;
    cursor: pointer;
    outline: none;

    &:hover {
      color: $red;
    }
  }

  & img {
    width: 300px;
  }
}

@media only screen and (max-width: 1400px) {
  .pop-up {
    width: 40%;
  }
}

@media only screen and (max-width: 1040px) {
  .pop-up {
    width: 60%;
  }
}

@media only screen and (max-width: 700px) {
  .pop-up {
    width: 90%;
  }
}
</style>
