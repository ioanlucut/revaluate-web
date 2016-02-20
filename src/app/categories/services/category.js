(function () {
  'use strict';

  function CategoryFactory() {

    /**
     * Category class.
     */
    function Category(data) {
      /**
       * The id.
       */
      this.id = data.id;

      /**
       * The name.
       */
      this.name = data.name;

      /**
       * The color
       */
      this.color = data.color;
    }

    return Category;
  }

  angular
    .module('revaluate.insights')
    .factory('Category', CategoryFactory);
}());
