function CategoryColorGenerator() {

  return {
    randomizedColor(colors) {

      return colors[Math.floor(Math.random() * colors.length)];
    },
  };
}

export default CategoryColorGenerator;
