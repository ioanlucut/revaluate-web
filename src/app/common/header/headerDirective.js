function headerDirective() {
  return {
    restrict: 'A',
    templateUrl: '/app/common/header/headerDirective.tpl.html',
    controller: 'HeaderController',
    controllerAs: 'vm',
    link: function () {
    },
  };
}

export default headerDirective;
