/**
 * Header directive responsible for header common template.
 */
function flashMessagesDirective() {
  return {
    scope: {
      flash: '=',
      identifierId: '@',
    },
    restrict: 'A',
    templateUrl: '/app/common/flashMessage/flashMessagesDirective.tpl.html',
    link() {
    },
  };
}

export default flashMessagesDirective;
