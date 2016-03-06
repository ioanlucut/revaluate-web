function validDateDirective() {
  return {
    require: 'ngModel',
    scope: {
      ngModel: '=',
    },
    link(scope, el, attr, ngModel) {

      function isValidDate(date) {
        return !(date === '' || _.isUndefined(date));
      }

      ngModel.$validators.validDate = date => isValidDate(date);
    },
  };
}

export default validDateDirective;
