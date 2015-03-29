angular
    .module("common")
    .service("SetupCategoriesProvider", function () {

        this.categories = [
            {
                "name": "Hobby",
                "color": "#8471B1",
                selected: false
            },
            {
                "name": "Travel",
                "color": "#826274",
                selected: false
            },
            {
                "name": "Food",
                "color": "#8471B1",
                selected: true
            },
            {
                "name": "Car",
                "color": "#FFDD00",
                selected: true
            },
            {
                "name": "Donations",
                "color": "#826274",
                selected: true
            },
            {
                "name": "Bills",
                "color": "#FFDD00",
                selected: true
            },
            {
                "name": "Health",
                "color": "#826274",
                selected: true
            },
            {
                "name": "Education",
                "color": "#8471B1",
                selected: true
            }];

        this.getCategories = function () {
            return this.categories;
        };

    });
