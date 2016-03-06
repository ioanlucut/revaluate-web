function CategoryColorGenerator() {

  return {
    randomizedColor: function (colors) {

      return colors[Math.floor(Math.random() * colors.length)];
    },
  };
}

export default CategoryColorGenerator;
