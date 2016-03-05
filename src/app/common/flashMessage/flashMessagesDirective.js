export default

  /**
   * Header directive responsible for header common template.
   */
  function () {
      return {
        scope: {
          flash: '=',
          identifierId: '@',
        },
        restrict: 'A',
        templateUrl: '/app/common/flashMessage/flashMessagesDirective.tpl.html',
        link: function () {
        },
      };
    }
