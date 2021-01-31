const get = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url).then((res) =>
      res
        .json()
        .then((data) => data)
        .then(resolve)
        .catch(reject)
    );
  });
};

export { get };
