function headerSideDirective() {
  return {
    restrict: 'AE',
    templateUrl: '/app/common/header/headerSideDirective.tpl.html',
    controller: 'HeaderController',
    controllerAs: 'vm',
    link() {
    },
  };
}

export default headerSideDirective;
