angular
    .module("categories")
    .service('CategoryColorService', function () {
        var hexPool = ["#fbd039", "#4dc5d9", "#f26f26", "#00ac4d", "#29aae1", "#ff4d00", "#c0392b", "#f39c12", "#2980b9", "#f39c12", "#16a085", "#370c33"];

        return {
            randomizedColor: function () {
                return hexPool[Math.floor(Math.random() * hexPool.length)];
            },

            generateColor: function () {
                return '#' + Math.floor(Math.random() * 16777215).toString(16);
            }
        }
    });