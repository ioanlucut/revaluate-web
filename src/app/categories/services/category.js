angular
    .module("categories")
    .factory("Category", function ($q, $http, CategoryService, CategoryTransformerService) {

        /**
         * Category class.
         * @constructor
         */
        function Category() {

            /**
             * Represents the DTO model of the category.
             */
            this.model = {

                /**
                 * The category id.
                 */
                id: "",

                /**
                 * The category text.
                 */
                name: "",

                /**
                 * The color
                 */
                color: {

                    color: "",

                    id: 0,

                    priority: 0
                }
            };

            /**
             * Is category new.
             * @returns {boolean}
             */
            this.isNew = function () {
                return this.model.id === "" || _.isUndefined(this.model.id);
            };

            /**
             * Saves a category and update model with response.
             * @returns {*}
             */
            this.save = function () {
                if ( this.isNew() ) {
                    return CategoryService.createCategory(this);
                }
                else {
                    return CategoryService.updateCategory(this);
                }
            };

            /**
             * Destroys (deletes) a category.
             * @returns {*}
             */
            this.destroy = function () {
                return CategoryService.deleteCategory(this);
            };
        }

        /**
         * Builds a category with given data.
         * @param data
         * @returns {Category}
         */
        Category.build = function (data) {
            if ( _.isEmpty(data) ) {
                return new Category();
            }

            return CategoryTransformerService.toCategory(data, new Category());
        };

        return Category;
    });