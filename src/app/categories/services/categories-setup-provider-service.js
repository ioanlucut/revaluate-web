angular
    .module("revaluate.categories")
    .service("CategoriesSetupProvider", function () {

        this.predefinedCategories = [
            {
                "name": "Bills",
                selected: true
            },
            {
                "name": "Food",
                selected: true
            },
            {
                "name": "Clothes",
                selected: true
            },
            {
                "name": "Car",
                selected: true
            },
            {
                "name": "Donations",
                selected: true
            },
            {
                "name": "Hobby",
                selected: true
            },
            {
                "name": "Health",
                selected: true
            },
            {
                "name": "Education",
                selected: true
            },
            {
                "name": "Investments",
                selected: true
            },
            {
                "name": "Entertainment",
                selected: true
            }];

        this.getPredefinedCategories = function () {
            return this.predefinedCategories;
        };

    });
