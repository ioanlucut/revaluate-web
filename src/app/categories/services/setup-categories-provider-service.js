angular
    .module("categories")
    .service("SetupCategoriesProvider", function () {

        this.categories = [
            {
                "name": "Bills",
                "color": "#8471B1",
                selected: false
            },
            {
                "name": "Food",
                "color": "#826274",
                selected: false
            },
            {
                "name": "Clothes",
                "color": "#8471B1",
                selected: false
            },
            {
                "name": "Car",
                "color": "#FFDD00",
                selected: false
            },
            {
                "name": "Donations",
                "color": "#826274",
                selected: false
            },
            {
                "name": "Hobby",
                "color": "#FFDD00",
                selected: false
            },
            {
                "name": "Health",
                "color": "#826274",
                selected: false
            },
            {
                "name": "Education",
                "color": "#8471B1",
                selected: false
            },
            {
                "name": "Investments",
                "color": "#8471B1",
                selected: false
            },
            {
                "name": "House",
                "color": "#8471B1",
                selected: false
            },
            {
                "name": "Entertainment",
                "color": "#8471B1",
                selected: false
            }];

        this.getCategories = function () {
            return this.categories;
        };

    });
