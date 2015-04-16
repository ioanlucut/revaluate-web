angular
    .module("categories")
    .service('CategoryColorService', function () {
        var hexPool = [
            {
                color: "#C3272B"
            },
            {
                color: "#DB5A6B"
            },
            {
                color: "#875F9A"
            },
            {
                color: "#22A7F0"
            },
            {
                color: "#317589"
            },
            {
                color: "#1F4788"
            },
            {
                color: "#006442"
            },
            {
                color: "#26A65B"
            },
            {
                color: "#36D7B7"
            },
            {
                color: "#FFB61E"
            },
            {
                color: "#CA6924"
            },
            {
                color: "#6C7A89"
            },
            {
                color: "#121212"
            },
            {
                color: "#BDC3C7"
            }];

        return {
            randomizedColor: function () {
                return hexPool[Math.floor(Math.random() * hexPool.length)];
            },

            getColorsPool: function () {
                return hexPool;
            },

            generateColor: function () {
                return '#' + Math.floor(Math.random() * 16777215).toString(16);
            }
        }
    });