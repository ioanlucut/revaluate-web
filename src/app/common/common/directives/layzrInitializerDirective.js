function layzrInitializerDirective() {
  return {
    restrict: 'A',
    link: function () {

      new Layzr();
    },
  };
}

export default layzrInitializerDirective;
