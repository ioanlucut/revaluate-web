function postAddExpenseFocus($timeout, EXPENSE_EVENTS) {
  return {
    restrict: 'A',
    link(scope, el) {

      function focus() {
        $timeout(() => {
          el.focus();
        });
      }

      scope
        .$on(EXPENSE_EVENTS.isCreated, focus);
      scope
        .$on(EXPENSE_EVENTS.isDeleted, focus);
      scope
        .$on(EXPENSE_EVENTS.isUpdated, focus);
    },
  };
}

export default postAddExpenseFocus;
