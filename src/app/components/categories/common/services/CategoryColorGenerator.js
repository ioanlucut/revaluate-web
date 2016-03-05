export default function () {

  return {
    randomizedColor: function (colors) {

      return colors[Math.floor(Math.random() * colors.length)];
    },
  };
}

