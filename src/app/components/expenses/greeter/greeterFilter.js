function greeterFilter() {
  return (greets, userName) => greets.format(userName);
}

export default greeterFilter;
