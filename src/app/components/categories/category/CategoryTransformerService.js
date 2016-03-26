function CategoryTransformerService(Category) {
  'ngInject';

  // ---
  // Name should be always upper case.
  // ---

  this.categoryApiRequestTransformer = requestData => {

    function buildCategoryPayload(data) {
      return _.merge(data, { name: data.name.toUpperCase() });
    }

    if (_.isArray(requestData)) {
      return _.map(requestData, buildCategoryPayload);
    } else {
      return buildCategoryPayload(requestData);
    }
  };

  this.categoryApiResponseTransformer = responseData => {
    function buildCategory(data) {
      return new Category(_.extend(data, {
        name: data.name.toUpperCase(),
      }));
    }

    if (_.isArray(responseData.data)) {
      return _.map(responseData.data, buildCategory);
    } else {
      return buildCategory(responseData.data);
    }
  };
}

export default CategoryTransformerService;
