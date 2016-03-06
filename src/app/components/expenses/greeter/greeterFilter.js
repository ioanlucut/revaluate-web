function greeterFilter() {
  return function (greets, userName) {

    return greets.format(userName);
  };
}

export default greeterFilter;
