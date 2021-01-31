import { get } from "@/service/http.js";
import { formatDate } from "@/service/helper.js";

const getPastFlights = () => {
  const url = "https://api.spacexdata.com/v4/launches/past";
  return new Promise((resolve, reject) => {
    get(url)
      .then((res) => {
        res.forEach((item) => {
          item.date_utc = formatDate(item.date_utc);
        });
        resolve(res);
      })
      .catch(reject);
  });
};

const getUpcommingFlights = () => {
  const url = "https://api.spacexdata.com/v4/launches/upcoming";
  return new Promise((resolve, reject) => {
    get(url)
      .then(resolve)
      .catch(reject);
  });
};

const getNextFlight = () => {
  const url = "https://api.spacexdata.com/v4/launches/next";
  return new Promise((resolve, reject) => {
    get(url)
      .then(res => {
        res.date_utc = formatDate(res.date_utc)
        resolve(res)
      })
      .catch(reject);
  });
};

export { getPastFlights, getUpcommingFlights, getNextFlight };
