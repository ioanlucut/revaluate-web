angular
    .module("revaluate.categories")
    .service("CategoriesSetupProvider", function () {

        this.getPredefinedCategories = function () {

            return ["Bills", "Food", "Clothes", "Car", "Donations", "Hobby", "Health", "Education", "Investments", "House"];
        };

    });
