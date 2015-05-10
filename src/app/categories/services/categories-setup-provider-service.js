angular
    .module("revaluate.categories")
    .service("CategoriesSetupProvider", function () {

        this.predefinedCategories = [
            {
                "name": "Bills",
                selected: false
            },
            {
                "name": "Food",
                selected: false
            },
            {
                "name": "Clothes",
                selected: false
            },
            {
                "name": "Car",
                selected: false
            },
            {
                "name": "Donations",
                selected: false
            },
            {
                "name": "Hobby",
                selected: false
            },
            {
                "name": "Health",
                selected: false
            },
            {
                "name": "Education",
                selected: false
            },
            {
                "name": "Investments",
                selected: false
            },
            {
                "name": "House",
                selected: false
            },
            {
                "name": "Entertainment",
                selected: false
            }];

        this.getPredefinedCategories = function () {
            return this.predefinedCategories;
        };

    });
