/**
 * Category transformer service which transforms a category DTO model object to a category business object.
 */
angular
    .module("revaluate.categories")
    .service("CategoryTransformerService", function ($injector, TransformerUtils) {

        /**
         * Converts a category business object model to a categoryDto object.
         */
        this.toCategoryDto = function (category, skipKeys) {
            var categoryDto = {};

            TransformerUtils.copyKeysFromTo(category.model, categoryDto, skipKeys);

            return categoryDto;
        };

        /**
         * Converts a categoryDto object to a category business object model.
         */
        this.toCategory = function (categoryDto, category, skipKeys) {
            category = category || $injector.get('Category').build();

            TransformerUtils.copyKeysFromTo(categoryDto, category.model, skipKeys);

            // ---
            // Should be always upper case (one way).
            // ---
            category.model.name = category.model.name.toUpperCase();

            return category;
        };

        /**
         * Transform a list of categories as JSON to a list of categories as business object.
         */
        this.toCategories = function (categoryDtos) {
            var categories = [];

            _.each(categoryDtos, _.bind(function (categoryDto) {
                categories.push(this.toCategory(categoryDto));
            }, this));

            return categories;
        };

        /**
         * Transform a list of categories as business objects to a list of DTOs.
         */
        this.toCategoryDTOs = function (categories) {
            var categoryDTOs = [];

            _.each(categories, _.bind(function (category) {
                categoryDTOs.push(this.toCategoryDto(category));
            }, this));

            return categoryDTOs;
        };
    });
