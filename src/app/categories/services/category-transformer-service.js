/**
 * Category transformer service which transforms a category DTO model object to a category business object.
 */
angular
    .module("categories")
    .service("CategoryTransformerService", function ($injector, TransformerUtils) {

        /**
         * Converts a category business object model to a categoryDto object.
         * @param category
         * @param skipKeys
         * @returns {{}}
         */
        this.toCategoryDto = function (category, skipKeys) {
            var categoryDto = {};

            TransformerUtils.copyKeysFromTo(category.model, categoryDto, skipKeys);

            return categoryDto;
        };

        /**
         * Converts a categoryDto object to a category business object model.
         * @param categoryDto
         * @param category
         * @param skipKeys
         * @returns {*}
         */
        this.toCategory = function (categoryDto, category, skipKeys) {
            category = category || $injector.get('Category').build();

            TransformerUtils.copyKeysFromTo(categoryDto, category.model, skipKeys);

            //handle addresses conversion
            var recipient = category.model.recipients;
            if ( _.isEmpty(recipient) ) {
                category.model.recipients = [];
            }
            else if ( _.isArray(recipient) ) {
                category.model.recipients = recipient;
            }

            return category;
        };

        /**
         * Transform a list of categories as JSON to a list of categories as business object.
         * @param categoryDtos
         * @returns {Array}
         */
        this.toCategories = function (categoryDtos) {
            var categories = [];

            _.each(categoryDtos, _.bind(function (categoryDto) {
                categories.push(this.toCategory(categoryDto));
            }, this));

            return categories;
        };
    });
