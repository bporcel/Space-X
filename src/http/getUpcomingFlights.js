import { toRefs, reactive } from "vue";

const getUpcomingFlights = () => {
  const url = "https://api.spacexdata.com/v4/launches/upcoming";
  const state = reactive({
    response: [],
    error: null,
    fetching: false,
  });

  const fetchData = async () => {
    state.fetching = true;
    try {
      await fetch(url).then((response) =>
        response
          .json()
          .then((data) => data)
          .then((res) => {
            state.response = res
          })
      );
    } catch (err) {
      state.error = err;
    } finally {
      state.fetching = false;
    }
  };

  return { ...toRefs(state), fetchData };
};

export default getUpcomingFlights;
