function CategoryService(CATEGORY_URLS, $q, $http, CategoryTransformerService) {
  'ngInject';

  this.createCategory = (category, tracker) => $http
    .post(URLTo.api(CATEGORY_URLS.create), CategoryTransformerService.categoryApiRequestTransformer(category), { tracker })
    .then(CategoryTransformerService.categoryApiResponseTransformer);

  this.updateCategory = (category, tracker) => {
    const categoryDto = CategoryTransformerService.categoryApiRequestTransformer(category);

    return $http
      .put(URLTo.api(CATEGORY_URLS.update), categoryDto, { tracker })
      .then(CategoryTransformerService.categoryApiResponseTransformer);
  };

  this.deleteCategory = (category, tracker) => $http
    .delete(URLTo.api(CATEGORY_URLS.delete, { ':id': category.id }), { tracker });

  this.getAllCategories = () => $http
    .get(URLTo.api(CATEGORY_URLS.allCategories))
    .then(CategoryTransformerService.categoryApiResponseTransformer);

  /**
   * Bulk create action of a list of categories.
   */
  this.setupBulkCreateCategories = categories => $http
    .post(URLTo.api(CATEGORY_URLS.setupBulkCreateCategories), CategoryTransformerService.categoryApiRequestTransformer(categories))
    .then(CategoryTransformerService.categoryApiResponseTransformer);

  /**
   * Bulk delete action of a list of categories.
   */
  this.bulkDelete = categories => $http
    .put(URLTo.api(CATEGORY_URLS.bulkDelete), CategoryTransformerService.categoryApiRequestTransformer(categories));

  /**
   * Check if a category name is unique.
   */
  this.isUnique = function (name) {
    const deferred = $q.defer();

    $http
      .get(URLTo.api(CATEGORY_URLS.isUnique), { params: { name } })
      .then(_.bind(response => {
        deferred.resolve({
          isUnique: response.data.isUniqueCategory,
          name,
        });
      }, this))
      .catch(() => {
        deferred.resolve({
          isUnique: false,
          name,
        });
      });

    return deferred.promise;
  };
}

export default CategoryService;
