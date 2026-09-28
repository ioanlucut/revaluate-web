function headerDirective() {
  return {
    restrict: 'E',
    templateUrl: '/app/common/header/headerDirective.tpl.html',
    controller: 'HeaderController',
    controllerAs: 'vm',
    link() {
    },
  };
}

export default headerDirective;
