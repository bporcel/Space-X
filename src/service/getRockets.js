import { get } from "@/service/http.js";

const getAllRockets = () => {
  const url = "https://api.spacexdata.com/v4/rockets";
  return new Promise((resolve, reject) => {
    get(url)
      .then(resolve)
      .catch(reject);
  });
};

export { getAllRockets };
