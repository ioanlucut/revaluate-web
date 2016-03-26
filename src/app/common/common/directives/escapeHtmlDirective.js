function escapeHtmlDirective() {
  return {
    require: '?ngModel',
    link(scope, elem, attrs, ctrl) {
      if (!ctrl) {
        return;
      }

      ctrl.$parsers.unshift(value => {
        if (value === '' || value === null || value === undefined) {
          // null means that there is no value which is fine
          return null;
        }

        return _.escape(value);
      });
    },
  };
}

export default escapeHtmlDirective;
